import { challenges } from './challenges'
import type { UserProgress } from '@/types/challenge'

export interface WeekDay {
  day: number
  label: string
  challengeSlug?: string
  challengeTitle?: string
  challengeEmoji?: string
  completed: boolean
  isToday: boolean
  isFuture: boolean
}

export interface WeeklyProgress {
  weekNumber: number
  moduleName: string
  moduleEmoji: string
  days: WeekDay[]
  completedCount: number
  totalCount: number
  progressPercent: number
}

const MODULES = [
  { name: 'Presencia Digital', emoji: '🌐', startIndex: 0 },
  { name: 'Ventas y Pagos', emoji: '🛒', startIndex: 7 },
  { name: 'Marketing Digital', emoji: '📢', startIndex: 14 },
  { name: 'Herramientas', emoji: '🔧', startIndex: 21 },
]

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export function getWeeklyProgress(userProgress: Record<string, UserProgress>): WeeklyProgress[] {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0=Dom, 1=Lun...
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  return MODULES.map((mod, modIdx) => {
    const weekChallenges = challenges.slice(mod.startIndex, mod.startIndex + 7)
    const days: WeekDay[] = weekChallenges.map((ch, dayIdx) => {
      const isToday = dayIdx === daysSinceMonday
      const isFuture = dayIdx > daysSinceMonday
      const completed = userProgress[ch.slug]?.status === 'completed'

      return {
        day: dayIdx + 1,
        label: DAY_LABELS[dayIdx],
        challengeSlug: ch.slug,
        challengeTitle: ch.title,
        challengeEmoji: ch.iconEmoji,
        completed,
        isToday,
        isFuture,
      }
    })

    const completedCount = days.filter((d) => d.completed).length
    return {
      weekNumber: modIdx + 1,
      moduleName: mod.name,
      moduleEmoji: mod.emoji,
      days,
      completedCount,
      totalCount: 7,
      progressPercent: Math.round((completedCount / 7) * 100),
    }
  })
}
