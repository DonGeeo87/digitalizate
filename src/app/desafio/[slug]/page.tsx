"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { challenges } from "@/data/challenges"
import { useProfile } from "@/lib/profile-store"
import { toast } from "sonner"
import { BadgeShareCard } from "@/components/badge/badge-share-card"
import { ArrowLeft, Check, ExternalLink, Share2, Sparkles } from "lucide-react"

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

    if (!profile && slug) {
      router.push("/")
      return
    }

    if (!currentProgress || currentProgress.status === "started") {
      startChallenge(slug)
    }

    if (currentProgress?.status === "completed") {
      setIsCompleted(true)
    }

    if (currentProgress?.currentStep) {
      setCurrentStepIdx(currentProgress.currentStep - 1)
    }
  }, [isLoaded, slug])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Desafío no encontrado</h1>
        <Link href="/">
          <Button variant="outline">Volver al inicio</Button>
        </Link>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-brand-bg to-white">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-bold">¡Desafío completado!</h1>
          <p className="text-muted-foreground text-lg">
            {profile?.name}, lograste que <strong>{profile?.businessName}</strong> ahora sea visible en Google Maps.
          </p>

          <BadgeShareCard
            challengeTitle={challenge.title}
            badgeName={challenge.badgeName}
            iconEmoji={challenge.iconEmoji}
            userName={profile?.name || ""}
            businessName={profile?.businessName || ""}
            challengeSlug={challenge.slug}
            onShare={() => {
              toast.success("¡Compartido! +50 puntos por compartir tu logro 🎉")
            }}
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                📊 Ver mi progreso
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full">
                🚀 Siguiente desafío
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentStep = challenge.steps[currentStepIdx]
  const totalSteps = challenge.steps.length
  const progressPercent = Math.round(((currentStepIdx + 1) / totalSteps) * 100)

  const handleNextStep = (nextStepId?: string) => {
    completeStep(challenge.slug, currentStep.id)

    if (nextStepId) {
      const nextIdx = challenge.steps.findIndex((s) => s.id === nextStepId)
      if (nextIdx >= 0) {
        setCurrentStepIdx(nextIdx)
        return
      }
    }

    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(currentStepIdx + 1)
    } else {
      // Último paso — completar desafío
      completeChallenge(challenge.slug)
      addBadge({
        challengeSlug: challenge.slug,
        badgeName: challenge.badgeName,
        unlockedAt: new Date().toISOString(),
        sharedCount: 0,
      })
      setIsCompleted(true)
    }
  }

  const handleChoice = (nextStepId: string) => {
    completeStep(challenge.slug, currentStep.id)
    const nextIdx = challenge.steps.findIndex((s) => s.id === nextStepId)
    if (nextIdx >= 0) {
      setCurrentStepIdx(nextIdx)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold truncate">{challenge.iconEmoji} {challenge.title}</h1>
            <p className="text-xs text-muted-foreground">{challenge.estimatedMinutes} min · {challenge.difficulty === 1 ? "Fácil" : "Medio"}</p>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            Paso {currentStepIdx + 1} de {totalSteps}
          </p>
        </div>
      </header>

      {/* Step Content */}
      <main className="max-w-lg mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 sm:p-8 space-y-6">
            {currentStep && (
              <>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">{currentStep.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{currentStep.description}</p>
                </div>

                {/* External Link */}
                {currentStep.actionType === "external_link" && currentStep.actionUrl && (
                  <a
                    href={currentStep.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-brand font-medium hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Abrir {currentStep.actionUrl.replace("https://", "")}
                  </a>
                )}

                {/* Choices */}
                {currentStep.actionType === "choice" && currentStep.choices && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">¿Qué pasó?</p>
                    {currentStep.choices.map((choice, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-4 px-4"
                        onClick={() => handleChoice(choice.next)}
                      >
                        <span className="text-base">{choice.text}</span>
                      </Button>
                    ))}
                  </div>
                )}

                {/* Confirm Button */}
                {(currentStep.actionType === "confirm" || currentStep.actionType === "external_link") && (
                  <Button className="w-full text-base py-6" size="lg" onClick={() => handleNextStep()}>
                    {currentStep.buttonText || "✅ Continuar"}
                    {currentStepIdx < totalSteps - 1 && currentStep.id !== "step_complete" && (
                      <Check className="w-5 h-5 ml-2" />
                    )}
                    {(currentStepIdx >= totalSteps - 1 || currentStep.id === "step_complete") && (
                      <Sparkles className="w-5 h-5 ml-2" />
                    )}
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Motivation Tip */}
        {currentStepIdx < totalSteps - 1 && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            💪 Tú puedes. Solo son {challenge.estimatedMinutes} minutos y ya casi terminas.
          </p>
        )}
      </main>
    </div>
  )
}