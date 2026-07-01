"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { challenges } from "@/data/challenges"
import { useProfile } from "@/lib/profile-store"
import { toast } from "sonner"
import { BadgeShareCard } from "@/components/badge/badge-share-card"
import { ArrowLeft, Check, ExternalLink, Sparkles, ChevronRight } from "lucide-react"

export default function ChallengePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const challenge = challenges.find((c) => c.slug === slug)
  const { profile, progress, startChallenge, completeStep, completeChallenge, addBadge, isLoaded } = useProfile()

  const currentProgress = progress[slug]
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (!isLoaded) return
    if (!profile && slug) { router.push("/"); return }
    if (!currentProgress || currentProgress.status === "started") startChallenge(slug)
    if (currentProgress?.status === "completed") setIsCompleted(true)
    if (currentProgress?.currentStep) setCurrentStepIdx(currentProgress.currentStep - 1)
  }, [isLoaded, slug])

  if (!isLoaded) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto animate-pulse" />
        <div className="text-slate-500">Preparando tu desafío...</div>
      </div>
    </div>
  )

  if (!challenge) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 gap-4">
      <div className="text-6xl">🔍</div>
      <h1 className="text-2xl font-bold text-slate-900">Desafío no encontrado</h1>
      <Link href="/"><Button variant="outline">Volver al inicio</Button></Link>
    </div>
  )

  if (isCompleted) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          {["🎉", "✨", "🌟", "💫", "⭐"].map((emoji, i) => (
            <span key={i} className="absolute text-xl" style={{ left: `${20 + i * 15}%`, top: '-20px', animation: `float ${2 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
              {emoji}
            </span>
          ))}
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-green-500/25 relative">
            🎉
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">¡Desafío completado!</h1>
        <p className="text-slate-500 text-lg">
          {profile?.name}, lograste que <strong className="text-slate-900">{profile?.businessName}</strong> ahora sea visible en Google Maps.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
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
            <Button variant="outline" className="w-full py-6 border-2 border-slate-200">
              📊 Ver mi progreso
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              🚀 Siguiente desafío <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )

  const currentStep = challenge.steps[currentStepIdx]
  const totalSteps = challenge.steps.length
  const progressPercent = Math.round(((currentStepIdx + 1) / totalSteps) * 100)

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
    }
  }

  const handleChoice = (nextStepId: string) => {
    completeStep(challenge.slug, currentStep.id)
    const nextIdx = challenge.steps.findIndex((s) => s.id === nextStepId)
    if (nextIdx >= 0) setCurrentStepIdx(nextIdx)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0 hover:bg-green-500/10">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold truncate text-slate-900">{challenge.iconEmoji} {challenge.title}</h1>
            <p className="text-xs text-slate-500">{challenge.estimatedMinutes} min · {challenge.difficulty === 1 ? "Fácil" : "Medio"}</p>
          </div>
          <div className="text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">
            {Math.round((currentStepIdx + 1) / totalSteps * 100)}%
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="h-2 bg-green-500/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-xs text-slate-500 mt-1.5 text-right">
            Paso {currentStepIdx + 1} de {totalSteps}
          </p>
        </div>
      </header>

      {/* Step Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div key={currentStepIdx}>
          {currentStep && (
            <Card className="border-0 shadow-lg bg-white overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-green-500 to-emerald-600" />
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md ${
                  currentStepIdx === totalSteps - 1 ? "bg-gradient-to-br from-amber-500 to-orange-500" : "bg-gradient-to-br from-green-500 to-emerald-600"
                } text-white`}>
                  {currentStepIdx === totalSteps - 1 ? "🏁" : currentStepIdx + 1}
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{currentStep.title}</h2>
                  <p className="text-slate-500 leading-relaxed">{currentStep.description}</p>
                </div>

                {currentStep.actionType === "external_link" && currentStep.actionUrl && (
                  <a
                    href={currentStep.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 font-medium hover:underline p-3 bg-green-500/5 rounded-xl"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Abrir {currentStep.actionUrl.replace("https://", "")}
                  </a>
                )}

                {currentStep.actionType === "choice" && currentStep.choices && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-500">¿Qué pasó?</p>
                    {currentStep.choices.map((choice, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-4 px-5 border-2 border-slate-200 hover:border-green-500/30 hover:bg-green-500/5 transition-all group"
                        onClick={() => handleChoice(choice.next)}
                      >
                        <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 mr-3 group-hover:bg-green-500/20 transition-colors">
                          {i + 1}
                        </span>
                        <span className="text-base text-slate-700">{choice.text}</span>
                      </Button>
                    ))}
                  </div>
                )}

                {(currentStep.actionType === "confirm" || currentStep.actionType === "external_link") && (
                  <Button
                    className="w-full text-base py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:shadow-xl transition-all"
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

        {currentStepIdx < totalSteps - 1 && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-600 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Tú puedes. Ya casi terminas.
            </div>
          </div>
        )}
      </main>
    </div>
  )
}