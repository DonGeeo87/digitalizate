import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import pool from './pool.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const ACHIEVEMENTS = [
  // Generales
  { slug: 'primer-desafio', name: 'Primer Paso', description: 'Completa tu primer desafío', icon_emoji: '🌱', category: 'general', requirement_type: 'challenges_completed', requirement_value: 1, xp_reward: 50 },
  { slug: 'cinco-desafios', name: 'Ritmo Constante', description: 'Completa 5 desafíos', icon_emoji: '🔥', category: 'general', requirement_type: 'challenges_completed', requirement_value: 5, xp_reward: 100 },
  { slug: 'diez-desafios', name: 'Modo Turbo', description: 'Completa 10 desafíos', icon_emoji: '⚡', category: 'general', requirement_type: 'challenges_completed', requirement_value: 10, xp_reward: 200 },
  { slug: 'veinte-desafios', name: 'Imparable', description: 'Completa 20 desafíos', icon_emoji: '🚀', category: 'general', requirement_type: 'challenges_completed', requirement_value: 20, xp_reward: 400 },
  { slug: 'treinta-desafios', name: 'Maestro Digital', description: 'Completa 30 desafíos', icon_emoji: '👑', category: 'general', requirement_type: 'challenges_completed', requirement_value: 30, xp_reward: 600 },

  // Rachas
  { slug: 'racha-3', name: '3 Días Seguidos', description: 'Mantén una racha de 3 días', icon_emoji: '🔥', category: 'streak', requirement_type: 'streak_days', requirement_value: 3, xp_reward: 50 },
  { slug: 'racha-7', name: 'Una Semana', description: 'Mantén una racha de 7 días', icon_emoji: '📅', category: 'streak', requirement_type: 'streak_days', requirement_value: 7, xp_reward: 150 },
  { slug: 'racha-14', name: 'Dos Semanas', description: 'Mantén una racha de 14 días', icon_emoji: '💪', category: 'streak', requirement_type: 'streak_days', requirement_value: 14, xp_reward: 300 },
  { slug: 'racha-30', name: 'Un Mes', description: 'Mantén una racha de 30 días', icon_emoji: '🏅', category: 'streak', requirement_type: 'streak_days', requirement_value: 30, xp_reward: 500 },

  // Niveles
  { slug: 'nivel-2', name: 'Aprendiz', description: 'Alcanza el nivel 2', icon_emoji: '📖', category: 'level', requirement_type: 'level_reached', requirement_value: 2, xp_reward: 100 },
  { slug: 'nivel-3', name: 'Digital', description: 'Alcanza el nivel 3', icon_emoji: '💻', category: 'level', requirement_type: 'level_reached', requirement_value: 3, xp_reward: 200 },
  { slug: 'nivel-5', name: 'Experto', description: 'Alcanza el nivel 5', icon_emoji: '🎓', category: 'level', requirement_type: 'level_reached', requirement_value: 5, xp_reward: 500 },

  // Puntos
  { slug: 'puntos-500', name: '500 Puntos', description: 'Acumula 500 puntos', icon_emoji: '⭐', category: 'general', requirement_type: 'points_earned', requirement_value: 500, xp_reward: 100 },
  { slug: 'puntos-1000', name: '4 Dígitos', description: 'Acumula 1,000 puntos', icon_emoji: '🌟', category: 'general', requirement_type: 'points_earned', requirement_value: 1000, xp_reward: 200 },
  { slug: 'puntos-2500', name: 'Leyenda en Progreso', description: 'Acumula 2,500 puntos', icon_emoji: '💎', category: 'general', requirement_type: 'points_earned', requirement_value: 2500, xp_reward: 500 },

  // Módulos completos
  { slug: 'modulo-presencia', name: 'Presencia Digital Completa', description: 'Completa el módulo de Presencia Digital (7 desafíos)', icon_emoji: '🌐', category: 'challenges', requirement_type: 'category_complete', requirement_value: 7, requirement_category: 'presencia', xp_reward: 300 },
  { slug: 'modulo-ventas', name: 'Ventas y Pagos Completos', description: 'Completa el módulo de Ventas y Pagos (7 desafíos)', icon_emoji: '🛒', category: 'challenges', requirement_type: 'category_complete', requirement_value: 7, requirement_category: 'ventas', xp_reward: 300 },
  { slug: 'modulo-marketing', name: 'Marketing Completo', description: 'Completa el módulo de Marketing (7 desafíos)', icon_emoji: '📢', category: 'challenges', requirement_type: 'category_complete', requirement_value: 7, requirement_category: 'marketing', xp_reward: 300 },
  { slug: 'modulo-herramientas', name: 'Herramientas Completas', description: 'Completa el módulo de Herramientas (7 desafíos)', icon_emoji: '🔧', category: 'challenges', requirement_type: 'category_complete', requirement_value: 7, requirement_category: 'herramientas', xp_reward: 300 },
  { slug: 'digitalizacion-completa', name: 'Digitalización Completa', description: 'Completa los 28 desafíos', icon_emoji: '👑', category: 'challenges', requirement_type: 'challenges_completed', requirement_value: 28, xp_reward: 1000 },
]

async function seedAchievements() {
  try {
    for (const a of ACHIEVEMENTS) {
      await pool.query(
        `INSERT INTO achievements (slug, name, description, icon_emoji, category, requirement_type, requirement_value, xp_reward)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name,
           description = EXCLUDED.description,
           icon_emoji = EXCLUDED.icon_emoji,
           xp_reward = EXCLUDED.xp_reward`,
        [a.slug, a.name, a.description, a.icon_emoji, a.category, a.requirement_type, a.requirement_value, a.xp_reward]
      )
    }
    console.log(`✅ Seeded ${ACHIEVEMENTS.length} achievements`)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
  await pool.end()
}

seedAchievements()
