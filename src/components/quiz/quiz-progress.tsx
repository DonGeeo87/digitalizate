"use client"

import { cn } from "@/lib/utils"

interface QuizProgressProps {
  current: number
  total: number
  correctCount: number
}

export function QuizProgress({ current, total, correctCount }: QuizProgressProps) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">
          {current} / {total}
        </span>
        <span className="font-semibold text-slate-500">
          {correctCount} correcta{correctCount !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="h-2 bg-blue-500/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
