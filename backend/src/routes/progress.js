import { Router } from 'express'
import { z } from 'zod'
import pool from '../db/pool.js'
import { authenticate } from '../middleware/auth.js'

export const progressRouter = Router()

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

    // Update profile stats
    await client.query(
      `UPDATE profiles SET
        challenges_completed = challenges_completed + 1,
        total_points = total_points + 100,
        current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1)
       WHERE id = $1`,
      [req.userId]
    )

    // Add badge
    if (badgeName) {
      await client.query(
        `INSERT INTO user_badges (user_id, badge_slug, badge_name)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, badge_slug) DO NOTHING`,
        [req.userId, challengeSlug, badgeName]
      )
    }

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