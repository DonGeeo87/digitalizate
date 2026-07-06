import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { authRouter } from './routes/auth.js'
import { profileRouter } from './routes/profile.js'
import { progressRouter } from './routes/progress.js'
import { achievementsRouter } from './routes/achievements.js'

const app = express()
const PORT = parseInt(process.env.PORT || '3031')

app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',').map(s => s.trim()) || ['https://digitalizate.codigoguerrero.dev'],
  credentials: true,
}))
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes, intenta de nuevo en 15 minutos' },
})
app.use('/api/auth', limiter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/progress', progressRouter)
app.use('/api/achievements', achievementsRouter)

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Digitalízate API running on port ${PORT}`)
})