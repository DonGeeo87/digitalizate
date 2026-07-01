import { Router } from 'express'
import { z } from 'zod'
import pool from '../db/pool.js'
import { authenticate } from '../middleware/auth.js'

export const profileRouter = Router()

const updateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  businessName: z.string().max(200).optional(),
  businessType: z.string().max(100).optional(),
})

// GET /api/profile — get current profile
profileRouter.get('/', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, name, business_name, business_type, level, total_points,
              current_streak, longest_streak, challenges_completed, created_at
       FROM profiles WHERE id = $1`,
      [req.userId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' })
    }
    res.json({ profile: result.rows[0] })
  } catch (err) {
    console.error('Profile fetch error:', err)
    res.status(500).json({ error: 'Error fetching profile' })
  }
})

// PATCH /api/profile — update profile
profileRouter.patch('/', authenticate, async (req, res) => {
  try {
    const data = updateSchema.parse(req.body)
    const fields = []
    const values = []
    let idx = 1

    if (data.name) { fields.push(`name = $${idx++}`); values.push(data.name) }
    if (data.businessName) { fields.push(`business_name = $${idx++}`); values.push(data.businessName) }
    if (data.businessType) { fields.push(`business_type = $${idx++}`); values.push(data.businessType) }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    fields.push(`updated_at = NOW()`)
    values.push(req.userId)

    const result = await pool.query(
      `UPDATE profiles SET ${fields.join(', ')} WHERE id = $${idx}
       RETURNING id, email, name, business_name, business_type, level, total_points, challenges_completed`,
      values
    )

    res.json({ profile: result.rows[0] })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: err.errors })
    }
    console.error('Profile update error:', err)
    res.status(500).json({ error: 'Error updating profile' })
  }
})