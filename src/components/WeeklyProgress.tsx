'use client'

import { getWeeklyProgress } from '@/data/weekly-progress'
import type { UserProgress } from '@/types/challenge'

interface WeeklyProgressProps {
  userProgress: Record<string, UserProgress>
}

export default function WeeklyProgress({ userProgress }: WeeklyProgressProps) {
  const weeks = getWeeklyProgress(userProgress)

  const hasProgress = Object.keys(userProgress).length > 0

  if (!hasProgress) {
    return (
      <div className="animate-fade-in rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
        <p className="text-lg text-gray-400">
          Aún no has comenzado ningún desafío
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ¡Empieza hoy y construye tu primer badge!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {weeks.map((week) => (
        <div
          key={week.weekNumber}
          className="animate-fade-in rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{week.moduleEmoji}</span>
              <div>
                <h3 className="font-bold text-white">{week.moduleName}</h3>
                <p className="text-xs text-gray-400">
                  Semana {week.weekNumber}
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-amber-400">
              {week.completedCount}/{week.totalCount} completados
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
              style={{ width: `${week.progressPercent}%` }}
            />
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-2">
            {week.days.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-gray-500">{day.label}</span>
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors
                    ${
                      day.completed
                        ? 'border border-amber-500/50 bg-amber-500/20 text-amber-400'
                        : day.isToday
                          ? 'border-2 border-amber-500 bg-white/5 text-gray-300'
                          : day.isFuture
                            ? 'border border-white/10 bg-white/5 text-gray-500 opacity-30'
                            : 'border border-white/10 bg-white/5 text-gray-500'
                    }
                  `}
                  title={day.challengeTitle}
                >
                  {day.completed ? day.challengeEmoji || '✓' : day.day}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
