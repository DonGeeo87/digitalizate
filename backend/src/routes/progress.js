import { Router } from 'express'
import { z } from 'zod'
import pool from '../db/pool.js'
import { authenticate } from '../middleware/auth.js'

export const progressRouter = Router()

// Helper: check and unlock achievements
async function checkAchievements(client, userId) {
  const profile = await client.query(
    `SELECT level, total_points, current_streak, challenges_completed FROM profiles WHERE id = $1`,
    [userId]
  )
  const p = profile.rows[0]
  if (!p) return []

  const categories = await client.query(
    `SELECT c.category, COUNT(*) as completed
     FROM user_progress up
     JOIN LATERAL (SELECT category FROM challenges WHERE slug = up.challenge_slug) c ON true
     WHERE up.user_id = $1 AND up.status = 'completed'
     GROUP BY c.category`,
    [userId]
  )
  const catMap = {}
  categories.rows.forEach((r) => { catMap[r.category] = parseInt(r.completed) })

  const allAchievements = await client.query(
    `SELECT slug, requirement_type, requirement_value, requirement_category, xp_reward FROM achievements`
  )

  const unlocked = await client.query(
    `SELECT achievement_slug FROM user_achievements WHERE user_id = $1`,
    [userId]
  )
  const unlockedSet = new Set(unlocked.rows.map((r) => r.achievement_slug))

  const newlyUnlocked = []
  let totalXpReward = 0

  for (const ach of allAchievements.rows) {
    if (unlockedSet.has(ach.slug)) continue

    let met = false
    switch (ach.requirement_type) {
      case 'challenges_completed':
        met = p.challenges_completed >= ach.requirement_value
        break
      case 'streak_days':
        met = p.current_streak >= ach.requirement_value
        break
      case 'level_reached':
        met = p.level >= ach.requirement_value
        break
      case 'points_earned':
        met = p.total_points >= ach.requirement_value
        break
      case 'category_complete':
        met = (catMap[ach.requirement_category] || 0) >= ach.requirement_value
        break
    }

    if (met) {
      await client.query(
        `INSERT INTO user_achievements (user_id, achievement_slug) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [userId, ach.slug]
      )
      newlyUnlocked.push(ach.slug)
      totalXpReward += ach.xp_reward
    }
  }

  if (totalXpReward > 0) {
    await client.query(
      `UPDATE profiles SET total_points = total_points + $1 WHERE id = $2`,
      [totalXpReward, userId]
    )
  }

  return newlyUnlocked
}

const startSchema = z.object({
  challengeSlug: z.string(),
})

const completeSchema = z.object({
  challengeSlug: z.string(),
  stepId: z.string(),
})

// GET /api/progress — get all progress for user
progressRouter.get('/', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT challenge_slug, status, current_step, started_at, completed_at
       FROM user_progress WHERE user_id = $1
       ORDER BY started_at DESC`,
      [req.userId]
    )
    const badges = await pool.query(
      `SELECT badge_slug, badge_name, unlocked_at, shared_count
       FROM user_badges WHERE user_id = $1`,
      [req.userId]
    )
    res.json({ progress: result.rows, badges: badges.rows })
  } catch (err) {
    console.error('Progress fetch error:', err)
    res.status(500).json({ error: 'Error fetching progress' })
  }
})

// POST /api/progress/start
progressRouter.post('/start', authenticate, async (req, res) => {
  try {
    const { challengeSlug } = startSchema.parse(req.body)
    const result = await pool.query(
      `INSERT INTO user_progress (user_id, challenge_slug, status, current_step)
       VALUES ($1, $2, 'started', 1)
       ON CONFLICT (user_id, challenge_slug) DO UPDATE SET status = 'started', current_step = 1
       RETURNING challenge_slug, status, current_step, started_at`,
      [req.userId, challengeSlug]
    )
    res.json({ progress: result.rows[0] })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data' })
    }
    console.error('Start challenge error:', err)
    res.status(500).json({ error: 'Error starting challenge' })
  }
})

// POST /api/progress/step
progressRouter.post('/step', authenticate, async (req, res) => {
  try {
    const { challengeSlug } = completeSchema.parse(req.body)

    // Advance step
    const result = await pool.query(
      `UPDATE user_progress SET current_step = current_step + 1
       WHERE user_id = $1 AND challenge_slug = $2 AND status = 'started'
       RETURNING challenge_slug, status, current_step`,
      [req.userId, challengeSlug]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Challenge not found or already completed' })
    }

    res.json({ progress: result.rows[0] })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data' })
    }
    console.error('Step error:', err)
    res.status(500).json({ error: 'Error advancing step' })
  }
})

// POST /api/progress/complete
progressRouter.post('/complete', authenticate, async (req, res) => {
  const client = await pool.connect()
  try {
    const { challengeSlug, badgeName } = req.body
    if (!challengeSlug) {
      return res.status(400).json({ error: 'challengeSlug is required' })
    }

    await client.query('BEGIN')

    // Mark challenge as completed
    await client.query(
      `UPDATE user_progress SET status = 'completed', completed_at = NOW()
       WHERE user_id = $1 AND challenge_slug = $2`,
      [req.userId, challengeSlug]
    )

    // XP por desafío completado
    const XP_PER_CHALLENGE = 100

    // Lógica de racha: verificar última fecha
    const lastDate = await client.query(
      `SELECT last_challenge_date FROM profiles WHERE id = $1`,
      [req.userId]
    )
    const lastChallengeDate = lastDate.rows[0]?.last_challenge_date
    const now = new Date()
    let newStreak = 1

    if (!lastChallengeDate) {
      // Primer desafío
      newStreak = 1
    } else {
      const hoursSinceLast = (now.getTime() - new Date(lastChallengeDate).getTime()) / (1000 * 60 * 60)
      if (hoursSinceLast < 48) {
        // Dentro de la ventana de 48h → suma racha
        newStreak = 0 // el UPDATE abajo suma 1
      } else {
        // Pasaron más de 48h → reinicia racha
        newStreak = 1
      }
    }

    // Update profile stats + calcular nivel
    await client.query(
      `UPDATE profiles SET
        challenges_completed = challenges_completed + 1,
        total_points = total_points + $2,
        current_streak = CASE WHEN $3 = 0 THEN current_streak + 1 ELSE $3 END,
        longest_streak = GREATEST(longest_streak, CASE WHEN $3 = 0 THEN current_streak + 1 ELSE $3 END),
        last_challenge_date = NOW()
       WHERE id = $1`,
      [req.userId, XP_PER_CHALLENGE, newStreak]
    )

    // Recalcular nivel basado en total_points
    await client.query(`
      UPDATE profiles SET level = (
        SELECT max(lvl) FROM (
          SELECT generate_series(1, 100) AS lvl
        ) levels
        WHERE total_points >= (lvl * lvl * 100 + lvl * 50)
      )
      WHERE id = $1
    `, [req.userId])

    // Add badge
    if (badgeName) {
      await client.query(
        `INSERT INTO user_badges (user_id, badge_slug, badge_name)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, badge_slug) DO NOTHING`,
        [req.userId, challengeSlug, badgeName]
      )
    }

    // Check and unlock achievements
    const newlyUnlocked = await checkAchievements(client, req.userId)

    await client.query('COMMIT')

    // Return updated profile
    const profile = await client.query(
      `SELECT id, email, name, business_name, level, total_points,
              current_streak, longest_streak, challenges_completed
       FROM profiles WHERE id = $1`,
      [req.userId]
    )

    res.json({ profile: profile.rows[0], challenge: challengeSlug, completed: true })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Complete challenge error:', err)
    res.status(500).json({ error: 'Error completing challenge' })
  } finally {
    client.release()
  }
})