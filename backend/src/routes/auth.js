import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import pool from '../db/pool.js'

const JWT_SECRET = process.env.JWT_SECRET || 'digitalizate-dev-secret-change-in-prod'

export const authRouter = Router()

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  businessName: z.string().max(200).optional(),
})

const loginSchema = z.object({
  email: z.string().email(),
})

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  try {
    const { email, name, businessName } = registerSchema.parse(req.body)

    // Check if user exists
    const existing = await pool.query('SELECT id FROM profiles WHERE email = $1', [email])
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Este email ya está registrado' })
    }

    // Create profile
    const result = await pool.query(
      `INSERT INTO profiles (email, name, business_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, name, business_name, level, total_points, challenges_completed`,
      [email, name, businessName || '']
    )

    const profile = result.rows[0]
    const token = jwt.sign({ userId: profile.id, email: profile.email }, JWT_SECRET, { expiresIn: '30d' })

    res.status(201).json({ token, profile })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Datos inválidos', details: err.errors })
    }
    console.error('Register error:', err)
    res.status(500).json({ error: 'Error al registrar' })
  }
})

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const { email } = loginSchema.parse(req.body)

    const result = await pool.query(
      `SELECT id, email, name, business_name, level, total_points, challenges_completed, current_streak
       FROM profiles WHERE email = $1`,
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado. Regístrate primero.' })
    }

    const profile = result.rows[0]
    const token = jwt.sign({ userId: profile.id, email: profile.email }, JWT_SECRET, { expiresIn: '30d' })

    res.json({ token, profile })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Email inválido' })
    }
    console.error('Login error:', err)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
})