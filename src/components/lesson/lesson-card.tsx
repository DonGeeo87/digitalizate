"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb } from "lucide-react"
import type { LessonContent } from "@/types/lesson"

interface LessonCardProps {
  lesson: LessonContent
  onContinue: () => void
}

export function LessonCard({ lesson, onContinue }: LessonCardProps) {
  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Hook */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 border border-blue-500/10 p-6">
        <div className="absolute top-3 right-3 text-4xl opacity-20">💡</div>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">Dato clave</p>
            <p className="text-slate-700 leading-relaxed">{lesson.introHook}</p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{lesson.title}</h2>
      </div>

      {/* Key Points */}
      <div className="space-y-4">
        {lesson.keyPoints.map((point, i) => (
          <Card key={i} className="border-0 shadow-sm bg-white overflow-hidden animate-slide-in-up" style={{ animationDelay: `${i * 100}ms` }}>
            <CardContent className="p-5 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center text-2xl flex-shrink-0">
                {point.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1">{point.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{point.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-green-500/5 border border-green-500/10 p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl">✅</span>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">{lesson.summary}</p>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        className="w-full text-base py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 transition-all"
        size="lg"
        onClick={onContinue}
      >
        Entendido, al quiz
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}
