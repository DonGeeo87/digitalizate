import { Router } from 'express'
import pool from '../db/pool.js'
import { authenticate } from '../middleware/auth.js'

export const achievementsRouter = Router()

// GET /api/achievements — get all achievements + user's unlocked ones
achievementsRouter.get('/', authenticate, async (req, res) => {
  try {
    const all = await pool.query(
      `SELECT slug, name, description, icon_emoji, category, requirement_type, requirement_value, xp_reward
       FROM achievements ORDER BY requirement_value ASC`
    )
    const user = await pool.query(
      `SELECT achievement_slug, unlocked_at FROM user_achievements WHERE user_id = $1`,
      [req.userId]
    )
    const unlocked = new Set(user.rows.map((r) => r.achievement_slug))
    const achievements = all.rows.map((a) => ({
      ...a,
      unlocked: unlocked.has(a.slug),
      unlockedAt: user.rows.find((r) => r.achievement_slug === a.slug)?.unlocked_at || null,
    }))
    res.json({ achievements })
  } catch (err) {
    console.error('Achievements fetch error:', err)
    res.status(500).json({ error: 'Error fetching achievements' })
  }
})

// POST /api/achievements/check — check and unlock any new achievements
achievementsRouter.post('/check', authenticate, async (req, res) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // Get current profile stats
    const profile = await client.query(
      `SELECT level, total_points, current_streak, challenges_completed FROM profiles WHERE id = $1`,
      [req.userId]
    )
    const p = profile.rows[0]
    if (!p) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'Profile not found' }) }

    // Get category completion counts
    const categories = await client.query(
      `SELECT c.category, COUNT(*) as completed
       FROM user_progress up
       JOIN LATERAL (SELECT category FROM challenges WHERE slug = up.challenge_slug) c ON true
       WHERE up.user_id = $1 AND up.status = 'completed'
       GROUP BY c.category`,
      [req.userId]
    )
    const catMap = {}
    categories.rows.forEach((r) => { catMap[r.category] = parseInt(r.completed) })

    // Get all achievements
    const allAchievements = await client.query(
      `SELECT slug, requirement_type, requirement_value, requirement_category, xp_reward FROM achievements`
    )

    // Get already unlocked
    const unlocked = await client.query(
      `SELECT achievement_slug FROM user_achievements WHERE user_id = $1`,
      [req.userId]
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
          [req.userId, ach.slug]
        )
        newlyUnlocked.push(ach.slug)
        totalXpReward += ach.xp_reward
      }
    }

    // Award XP for new achievements
    if (totalXpReward > 0) {
      await client.query(
        `UPDATE profiles SET total_points = total_points + $1 WHERE id = $2`,
        [totalXpReward, req.userId]
      )
    }

    await client.query('COMMIT')

    res.json({
      newlyUnlocked,
      xpReward: totalXpReward,
    })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Achievements check error:', err)
    res.status(500).json({ error: 'Error checking achievements' })
  } finally {
    client.release()
  }
})
