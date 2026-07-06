"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { challenges } from "@/data/challenges"
import { getLessonBySlug } from "@/data/lessons"
import { useProfile } from "@/lib/profile-store"
import { toast } from "sonner"
import { BadgeShareCard } from "@/components/badge/badge-share-card"
import { LessonCard } from "@/components/lesson/lesson-card"
import { LessonProgress } from "@/components/lesson/lesson-progress"
import { QuizQuestionComponent } from "@/components/quiz/quiz-question"
import { QuizResults } from "@/components/quiz/quiz-results"
import { QuizProgress } from "@/components/quiz/quiz-progress"
import { ArrowLeft, Check, ExternalLink, Sparkles, ChevronRight, Lightbulb, Rocket, Target } from "lucide-react"
import CoachBanner from "@/components/CoachBanner"

type Phase = "lesson" | "quiz" | "challenge" | "completed"

const ALTERNATIVE_ICONS = [Lightbulb, Rocket, Target]

export default function ChallengePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const challenge = challenges.find((c) => c.slug === slug)
  const lesson = getLessonBySlug(slug)
  const { profile, progress, quizScores, startChallenge, completeStep, completeChallenge, addBadge, saveQuizScore, isLoaded } = useProfile()

  const currentProgress = progress[slug]
  const [phase, setPhase] = useState<Phase>("lesson")
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Quiz state
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({})
  const [quizCorrectCount, setQuizCorrectCount] = useState(0)

  useEffect(() => {
    if (!isLoaded) return
    if (!profile && slug) { router.push("/"); return }
    if (!currentProgress || currentProgress.status === "started") startChallenge(slug)
    if (currentProgress?.status === "completed") {
      setIsCompleted(true)
      setPhase("completed")
    }
    if (currentProgress?.currentStep) setCurrentStepIdx(currentProgress.currentStep - 1)

    // If no lesson, skip to challenge
    if (challenge && !challenge.hasLesson) {
      setPhase("challenge")
    }

    // If already has quiz score, skip to challenge
    if (quizScores[slug]) {
      setPhase("challenge")
    }
  }, [isLoaded, slug])

  if (!isLoaded) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-amber-500 rounded-2xl mx-auto animate-pulse" />
        <div className="text-gray-400">Preparando tu desafío...</div>
      </div>
    </div>
  )

  if (!challenge) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 gap-4">
      <div className="text-6xl">🔍</div>
      <h1 className="text-2xl font-bold text-white">Desafío no encontrado</h1>
      <Link href="/"><Button variant="outline" className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10">Volver al inicio</Button></Link>
    </div>
  )

  if (isCompleted || phase === "completed") return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          {["🎉", "✨", "🌟", "💫", "⭐"].map((emoji, i) => (
            <span key={i} className="absolute text-xl" style={{ left: `${20 + i * 15}%`, top: '-20px', animation: `float ${2 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
              {emoji}
            </span>
          ))}
          <div className="w-20 h-20 mx-auto bg-amber-500 rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-amber-500/25 relative">
            🎉
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white">¡Desafío completado!</h1>
        <p className="text-gray-400 text-lg">
          {profile?.name}, lograste que <strong className="text-white">{profile?.businessName}</strong> ahora sea visible en Google Maps.
        </p>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <BadgeShareCard
            challengeTitle={challenge.title}
            badgeName={challenge.badgeName}
            iconEmoji={challenge.iconEmoji}
            userName={profile?.name || ""}
            businessName={profile?.businessName || ""}
            challengeSlug={challenge.slug}
            onShare={() => toast.success("¡Compartido! +50 puntos por compartir tu logro 🎉")}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full py-6 bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10">
              📊 Ver mi progreso
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full py-6 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold">
              🚀 Siguiente desafío <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )

  // ─── LESSON PHASE ───
  if (phase === "lesson" && lesson) {
    return (
      <div className="min-h-screen bg-gray-950">
        <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0 hover:bg-white/10">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold truncate text-white">{challenge.iconEmoji} {challenge.title}</h1>
              <p className="text-xs text-gray-400">{challenge.estimatedMinutes} min · {challenge.difficulty === 1 ? "Fácil" : "Medio"}</p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto px-4 pb-3">
            <LessonProgress currentPhase="lesson" />
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <LessonCard lesson={lesson} onContinue={() => setPhase("quiz")} />
        </main>
      </div>
    )
  }

  // ─── QUIZ PHASE ───
  if (phase === "quiz" && lesson) {
    const quiz = lesson.quiz
    const currentQuestion = quiz[quizQuestionIdx]
    const quizComplete = quizQuestionIdx >= quiz.length

    if (quizComplete) {
      const finalScore = quizCorrectCount
      saveQuizScore(slug, finalScore, quiz.length)

      return (
        <div className="min-h-screen bg-gray-950">
          <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="shrink-0 hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Button>
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className="text-sm font-bold truncate text-white">{challenge.iconEmoji} {challenge.title}</h1>
              </div>
            </div>
            <div className="max-w-2xl mx-auto px-4 pb-3">
              <LessonProgress currentPhase="quiz" />
            </div>
          </header>

          <main className="max-w-2xl mx-auto px-4 py-8">
            <QuizResults
              score={finalScore}
              total={quiz.length}
              questions={quiz}
              answers={quizAnswers}
              onRetry={() => {
                setQuizQuestionIdx(0)
                setQuizAnswers({})
                setQuizCorrectCount(0)
              }}
              onContinue={() => setPhase("challenge")}
            />
          </main>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-950">
        <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0 hover:bg-white/10">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold truncate text-white">{challenge.iconEmoji} {challenge.title}</h1>
            </div>
          </div>
          <div className="max-w-2xl mx-auto px-4 pb-3 space-y-2">
            <LessonProgress currentPhase="quiz" />
            <QuizProgress current={quizQuestionIdx + 1} total={quiz.length} correctCount={quizCorrectCount} />
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          {currentQuestion && (
            <QuizQuestionComponent
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={quizQuestionIdx + 1}
              totalQuestions={quiz.length}
              onAnswer={(correct) => {
                setQuizAnswers((prev) => ({ ...prev, [currentQuestion.id]: correct }))
                if (correct) setQuizCorrectCount((c) => c + 1)
                setQuizQuestionIdx((i) => i + 1)
              }}
            />
          )}
        </main>
      </div>
    )
  }

  // ─── CHALLENGE PHASE ───
  const currentStep = challenge.steps[currentStepIdx]
  const totalSteps = challenge.steps.length
  const progressPercent = Math.round(((currentStepIdx + 1) / totalSteps) * 100)
  const showAlternatives = challenge.alternatives && challenge.alternatives.length > 0 && currentStep?.id === "step_complete" && !isCompleted

  const handleNextStep = (nextStepId?: string) => {
    completeStep(challenge.slug, currentStep.id)
    if (nextStepId) {
      const nextIdx = challenge.steps.findIndex((s) => s.id === nextStepId)
      if (nextIdx >= 0) { setCurrentStepIdx(nextIdx); return }
    }
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(currentStepIdx + 1)
    } else {
      completeChallenge(challenge.slug)
      addBadge({ challengeSlug: challenge.slug, badgeName: challenge.badgeName, unlockedAt: new Date().toISOString(), sharedCount: 0 })
      setIsCompleted(true)
      setPhase("completed")
    }
  }

  const handleChoice = (nextStepId: string) => {
    completeStep(challenge.slug, currentStep.id)
    const nextIdx = challenge.steps.findIndex((s) => s.id === nextStepId)
    if (nextIdx >= 0) setCurrentStepIdx(nextIdx)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0 hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold truncate text-white">{challenge.iconEmoji} {challenge.title}</h1>
            <p className="text-xs text-gray-400">{challenge.estimatedMinutes} min · {challenge.difficulty === 1 ? "Fácil" : "Medio"}</p>
          </div>
          <div className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
            {Math.round((currentStepIdx + 1) / totalSteps * 100)}%
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-3 space-y-2">
          <LessonProgress currentPhase="challenge" />
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-xs text-gray-500 text-right">
            Paso {currentStepIdx + 1} de {totalSteps}
          </p>
        </div>
      </header>

      {/* Step Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div key={currentStepIdx}>
          {currentStep && (
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-amber-400" />
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md ${
                  currentStepIdx === totalSteps - 1 ? "bg-gradient-to-br from-amber-500 to-orange-500" : "bg-gradient-to-br from-amber-500 to-amber-400"
                } text-gray-900`}>
                  {currentStepIdx === totalSteps - 1 ? "🏁" : currentStepIdx + 1}
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{currentStep.title}</h2>
                  <p className="text-gray-400 leading-relaxed">{currentStep.description}</p>
                </div>

                {currentStep.actionType === "external_link" && currentStep.actionUrl && (
                  <a
                    href={currentStep.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-400 font-medium hover:underline p-3 bg-amber-500/10 rounded-xl"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Abrir {currentStep.actionUrl.replace("https://", "")}
                  </a>
                )}

                {currentStep.actionType === "choice" && currentStep.choices && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-400">¿Qué pasó?</p>
                    {currentStep.choices.map((choice, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-4 px-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group"
                        onClick={() => handleChoice(choice.next)}
                      >
                        <span className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-sm font-bold text-amber-400 mr-3 group-hover:bg-amber-500/20 transition-colors">
                          {i + 1}
                        </span>
                        <span className="text-base text-gray-300">{choice.text}</span>
                      </Button>
                    ))}
                  </div>
                )}

                {(currentStep.actionType === "confirm" || currentStep.actionType === "external_link") && (
                  <Button
                    className="w-full text-base py-6 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all"
                    size="lg"
                    onClick={() => handleNextStep()}
                  >
                    {currentStep.buttonText || "✅ Continuar"}
                    {currentStepIdx < totalSteps - 1 && currentStep.id !== "step_complete"
                      ? <Check className="w-5 h-5 ml-2" />
                      : <Sparkles className="w-5 h-5 ml-2" />
                    }
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Alternatives Section */}
        {showAlternatives && challenge.alternatives && (
          <div className="mt-8 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white">¿Quieres ir más allá?</h3>
              <p className="text-gray-400 text-sm mt-1">Alternativas para este desafío</p>
            </div>
            <div className="grid gap-4">
              {challenge.alternatives.map((alt, i) => {
                const Icon = ALTERNATIVE_ICONS[i % ALTERNATIVE_ICONS.length]
                return (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{alt.title}</h4>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">{alt.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {currentStepIdx < totalSteps - 1 && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Tú puedes. Ya casi terminas.
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
