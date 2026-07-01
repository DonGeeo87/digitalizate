"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useProfile } from "@/lib/profile-store"
import { challenges, getActiveChallenges } from "@/data/challenges"
import { ArrowLeft, Trophy, Flame, Target, Share2 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { profile, progress, badges, isLoaded } = useProfile()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  if (!profile) {
    router.push("/")
    return null
  }

  const completedCount = Object.values(progress).filter((p) => p.status === "completed").length
  const startedCount = Object.values(progress).filter((p) => p.status === "started").length
  const totalChallenges = getActiveChallenges().length
  const nextLevelAt = profile.level * 500
  const progressToNextLevel = Math.min(100, Math.round((profile.totalPoints / nextLevelAt) * 100))

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold">Mi Progreso</h1>
          </div>
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-brand text-white text-sm">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-14 h-14">
                <AvatarFallback className="bg-brand text-white text-lg">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{profile.businessName}</h2>
                <p className="text-sm text-muted-foreground">{profile.name}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">{profile.level}</div>
                <p className="text-xs text-muted-foreground">Nivel</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Siguiente nivel</span>
                <span className="font-medium">{profile.totalPoints} / {nextLevelAt} pts</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Trophy, label: "Completados", value: completedCount, color: "text-emerald-600 bg-emerald-50" },
            { icon: Flame, label: "Racha", value: `${profile.currentStreak} días`, color: "text-orange-600 bg-orange-50" },
            { icon: Target, label: "Puntos", value: profile.totalPoints, color: "text-brand bg-brand-bg" },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <>
            <h3 className="text-lg font-bold">🏅 Mis Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => {
                const ch = challenges.find((c) => c.slug === badge.challengeSlug)
                return (
                  <Card key={badge.challengeSlug} className="border-0 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-br from-brand to-brand-dark p-4 text-center text-white">
                      <div className="text-3xl mb-2">{ch?.iconEmoji || "🏆"}</div>
                      <p className="font-semibold text-sm">{badge.badgeName}</p>
                    </div>
                    <CardContent className="p-3 text-center">
                      <p className="text-xs text-muted-foreground">
                        {new Date(badge.unlockedAt).toLocaleDateString("es")}
                      </p>
                      {badge.sharedCount > 0 && (
                        <p className="text-xs text-brand mt-1">
                          <Share2 className="w-3 h-3 inline mr-1" />
                          Compartido {badge.sharedCount} vez{badge.sharedCount !== 1 ? "es" : ""}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        <Separator />

        {/* Next Challenges */}
        <h3 className="text-lg font-bold">📋 Desafíos disponibles</h3>
        <div className="space-y-3">
          {getActiveChallenges().map((ch) => {
            const isDone = progress[ch.slug]?.status === "completed"
            const isStarted = progress[ch.slug]?.status === "started"
            return (
              <Link key={ch.slug} href={isDone ? "#" : `/desafio/${ch.slug}`}>
                <Card
                  className={`border-0 shadow-sm hover:shadow-md transition-all ${isDone ? "opacity-60" : "hover:border-brand/30"}`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                        isDone ? "bg-emerald-50" : "bg-brand-bg"
                      }`}
                    >
                      {isDone ? "✅" : ch.iconEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{ch.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {ch.estimatedMinutes} min · {ch.category}
                      </p>
                    </div>
                    {isStarted && !isDone && (
                      <span className="text-xs text-brand font-medium">En curso</span>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}