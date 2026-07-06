import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { profileRouter } from './routes/profile.js'
import { progressRouter } from './routes/progress.js'
import { achievementsRouter } from './routes/achievements.js'

const app = express()
const PORT = parseInt(process.env.PORT || '3031')

app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }))
app.use(express.json())

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