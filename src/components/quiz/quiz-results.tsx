"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, RotateCcw, Trophy, Star, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { QuizQuestion } from "@/types/lesson"

interface QuizResultsProps {
  score: number
  total: number
  questions: QuizQuestion[]
  answers: Record<string, boolean>
  onRetry: () => void
  onContinue: () => void
}

export function QuizResults({ score, total, questions, answers, onRetry, onContinue }: QuizResultsProps) {
  const percent = Math.round((score / total) * 100)
  const passed = percent >= 60

  const getMessage = () => {
    if (percent === 100) return { title: "¡Perfecto!", subtitle: "Dominas este tema. ¡Al desafío!", icon: <Trophy className="w-8 h-8" /> }
    if (percent >= 80) return { title: "¡Excelente!", subtitle: "Muy bien. Estás listo para el desafío.", icon: <Star className="w-8 h-8" /> }
    if (percent >= 60) return { title: "¡Bien!", subtitle: "Pasaste. Puedes intentar el desafío.", icon: <Zap className="w-8 h-8" /> }
    return { title: "¡Sigue intentando!", subtitle: "Repasa la lección e intenta de nuevo.", icon: <RotateCcw className="w-8 h-8" /> }
  }

  const msg = getMessage()

  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Score Card */}
      <Card className="border-0 shadow-xl bg-white overflow-hidden">
        <div className={cn(
          "p-8 text-center text-white relative overflow-hidden",
          passed
            ? "bg-gradient-to-br from-green-600 via-emerald-600 to-green-700"
            : "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700"
        )}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative space-y-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-white animate-score-reveal">
              {msg.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold animate-score-reveal">{msg.title}</h2>
              <p className="text-white/80 mt-1">{msg.subtitle}</p>
            </div>
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur rounded-full px-6 py-3">
              <span className="text-4xl font-bold">{score}</span>
              <span className="text-white/60">/</span>
              <span className="text-xl text-white/80">{total}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Question Breakdown */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-900 px-1">Detalle de respuestas</p>
        {questions.map((q, i) => {
          const correct = answers[q.id]
          return (
            <div key={q.id} className={cn(
              "flex items-center gap-3 p-3 rounded-xl border transition-all",
              correct ? "bg-green-500/5 border-green-500/10" : "bg-red-50 border-red-200"
            )}>
              <span className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
                correct ? "bg-green-500 text-white" : "bg-red-400 text-white"
              )}>
                {correct ? "✓" : "✗"}
              </span>
              <p className="text-sm text-slate-700 flex-1 line-clamp-2">{q.question}</p>
            </div>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {!passed && (
          <Button
            variant="outline"
            className="flex-1 py-6 border-2 border-slate-200 text-slate-700"
            onClick={onRetry}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Repasar y reintentar
          </Button>
        )}
        <Button
          className={cn(
            "flex-1 py-6 text-white shadow-lg transition-all text-base",
            passed
              ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/25"
              : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/25"
          )}
          onClick={onContinue}
        >
          {passed ? "Empezar desafío" : "Continuar de todos modos"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
