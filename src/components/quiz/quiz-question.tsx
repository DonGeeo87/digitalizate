"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, ArrowRight, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import type { QuizQuestion } from "@/types/lesson"

interface QuizQuestionProps {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
  questionNumber: number
  totalQuestions: number
}

export function QuizQuestionComponent({ question, onAnswer, questionNumber, totalQuestions }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [textAnswer, setTextAnswer] = useState("")
  const [orderAnswer, setOrderAnswer] = useState<string[]>(question.options || [])
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const checkAnswer = () => {
    let correct = false

    switch (question.type) {
      case "true_false":
      case "multiple_choice":
        correct = selected === question.correctIndex
        break
      case "fill_blank":
        correct = textAnswer.trim().toLowerCase() === (question.blankAnswer || "").toLowerCase()
        break
      case "order_steps":
        correct = JSON.stringify(orderAnswer) === JSON.stringify(question.correctOrder)
        break
    }

    setIsCorrect(correct)
    setAnswered(true)
  }

  const handleContinue = () => {
    onAnswer(isCorrect)
  }

  const moveOption = (fromIndex: number, direction: "up" | "down") => {
    const newOrder = [...orderAnswer]
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1
    if (toIndex < 0 || toIndex >= newOrder.length) return
    ;[newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]]
    setOrderAnswer(newOrder)
  }

  const canSubmit = () => {
    switch (question.type) {
      case "true_false":
      case "multiple_choice":
        return selected !== null
      case "fill_blank":
        return textAnswer.trim().length > 0
      case "order_steps":
        return true
      default:
        return false
    }
  }

  return (
    <div className="space-y-6 animate-slide-in-right">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">
          Pregunta {questionNumber} / {totalQuestions}
        </span>
      </div>

      {/* Question Card */}
      <Card className={cn(
        "border-0 shadow-lg bg-white overflow-hidden transition-all",
        answered && !isCorrect && "ring-2 ring-red-400"
      )}>
        <div className={cn(
          "h-2 w-full transition-colors",
          !answered ? "bg-gradient-to-r from-blue-500 to-purple-600" :
          isCorrect ? "bg-gradient-to-r from-green-500 to-emerald-600" :
          "bg-gradient-to-r from-red-500 to-red-600"
        )} />
        <CardContent className="p-6 space-y-6">
          {/* Question Text */}
          <p className="text-lg font-bold text-slate-900 leading-relaxed">{question.question}</p>

          {/* True/False */}
          {question.type === "true_false" && question.options && (
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((opt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className={cn(
                    "h-auto py-5 text-base font-semibold border-2 transition-all",
                    selected === i && !answered && "border-blue-500 bg-blue-500/5 text-blue-700",
                    answered && i === question.correctIndex && "border-green-500 bg-green-500/10 text-green-700",
                    answered && selected === i && !isCorrect && i !== question.correctIndex && "border-red-400 bg-red-50 text-red-600",
                    answered && "pointer-events-none"
                  )}
                  onClick={() => !answered && setSelected(i)}
                >
                  {answered && i === question.correctIndex && <Check className="w-5 h-5 mr-2" />}
                  {answered && selected === i && !isCorrect && i !== question.correctIndex && <X className="w-5 h-5 mr-2" />}
                  {opt}
                </Button>
              ))}
            </div>
          )}

          {/* Multiple Choice */}
          {question.type === "multiple_choice" && question.options && (
            <div className="space-y-3">
              {question.options.map((opt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className={cn(
                    "w-full justify-start h-auto py-4 px-5 text-left border-2 transition-all",
                    selected === i && !answered && "border-blue-500 bg-blue-500/5 text-blue-700",
                    answered && i === question.correctIndex && "border-green-500 bg-green-500/10 text-green-700",
                    answered && selected === i && !isCorrect && i !== question.correctIndex && "border-red-400 bg-red-50 text-red-600",
                    answered && "pointer-events-none"
                  )}
                  onClick={() => !answered && setSelected(i)}
                >
                  <span className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0",
                    answered && i === question.correctIndex ? "bg-green-500 text-white" :
                    selected === i ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"
                  )}>
                    {answered && i === question.correctIndex ? <Check className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm text-slate-700">{opt}</span>
                </Button>
              ))}
            </div>
          )}

          {/* Fill in the blank */}
          {question.type === "fill_blank" && question.sentence && (
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-base text-slate-700 leading-relaxed">
                  {question.sentence.split("___").map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={cn(
                          "inline-block min-w-[120px] mx-1 px-3 py-1 rounded-lg border-b-2 text-center font-semibold transition-all",
                          answered && isCorrect && "border-green-500 bg-green-500/10 text-green-700",
                          answered && !isCorrect && "border-red-400 bg-red-50 text-red-600",
                          !answered && "border-blue-400 bg-blue-500/5 text-blue-700"
                        )}>
                          {answered ? (isCorrect ? question.blankAnswer : textAnswer || "___") : textAnswer || "___"}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
              {!answered && (
                <input
                  type="text"
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all text-slate-900"
                  onKeyDown={(e) => e.key === "Enter" && canSubmit() && checkAnswer()}
                  autoFocus
                />
              )}
            </div>
          )}

          {/* Order Steps */}
          {question.type === "order_steps" && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500 mb-3">Ordena los pasos en el orden correcto:</p>
              {orderAnswer.map((opt, i) => {
                const correctIdx = question.correctOrder?.indexOf(opt)
                const isCorrectPosition = answered && correctIdx === i
                const isWrongPosition = answered && !isCorrectPosition
                return (
                  <div key={opt} className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border-2 transition-all",
                    answered && isCorrectPosition && "border-green-500 bg-green-500/5",
                    answered && isWrongPosition && "border-red-400 bg-red-50",
                    !answered && "border-slate-200 bg-white"
                  )}>
                    {!answered && (
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => moveOption(i, "up")}
                          disabled={i === 0}
                          className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                        >
                          <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 7L6 2L11 7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                        </button>
                        <button
                          onClick={() => moveOption(i, "down")}
                          disabled={i === orderAnswer.length - 1}
                          className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                        >
                          <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                        </button>
                      </div>
                    )}
                    <span className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
                      answered && isCorrectPosition ? "bg-green-500 text-white" :
                      answered && isWrongPosition ? "bg-red-400 text-white" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {answered ? (isCorrectPosition ? <Check className="w-4 h-4" /> : i + 1) : i + 1}
                    </span>
                    <span className="text-sm text-slate-700 flex-1">{opt}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Explanation */}
          {answered && (
            <div className={cn(
              "rounded-xl p-4 animate-slide-in-up",
              isCorrect ? "bg-green-500/5 border border-green-500/10" : "bg-amber-500/5 border border-amber-500/10"
            )}>
              <div className="flex items-start gap-2">
                <span className="text-lg">{isCorrect ? "✅" : "💡"}</span>
                <p className="text-sm text-slate-600 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!answered && (
        <Button
          className="w-full text-base py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 transition-all"
          size="lg"
          onClick={checkAnswer}
          disabled={!canSubmit()}
        >
          Verificar respuesta
        </Button>
      )}

      {answered && (
        <Button
          className={cn(
            "w-full text-base py-6 shadow-lg transition-all text-white",
            isCorrect
              ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/25"
              : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/25"
          )}
          size="lg"
          onClick={handleContinue}
        >
          {isCorrect ? "¡Correcto!" : "Siguiente pregunta"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  )
}
