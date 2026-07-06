"use client"

import { BookOpen, Brain, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type Phase = "lesson" | "quiz" | "challenge"

interface LessonProgressProps {
  currentPhase: Phase
  challengeProgress?: number
  quizProgress?: number
}

const phases: { key: Phase; label: string; icon: typeof BookOpen }[] = [
  { key: "lesson", label: "Aprende", icon: BookOpen },
  { key: "quiz", label: "Quiz", icon: Brain },
  { key: "challenge", label: "Desafío", icon: Zap },
]

export function LessonProgress({ currentPhase, challengeProgress = 0, quizProgress = 0 }: LessonProgressProps) {
  const phaseIndex = phases.findIndex((p) => p.key === currentPhase)

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {phases.map((phase, i) => {
        const isActive = i === phaseIndex
        const isCompleted = i < phaseIndex
        const Icon = phase.icon

        return (
          <div key={phase.key} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                isActive && "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/25",
                isCompleted && "bg-green-500/10 text-green-600",
                !isActive && !isCompleted && "bg-slate-100 text-slate-400"
              )}
            >
              {isCompleted ? (
                <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">✓</span>
              ) : (
                <Icon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{phase.label}</span>
            </div>
            {i < phases.length - 1 && (
              <div className={cn("w-6 h-0.5 rounded-full transition-colors", i < phaseIndex ? "bg-green-500" : "bg-slate-200")} />
            )}
          </div>
        )
      })}
    </div>
  )
}
