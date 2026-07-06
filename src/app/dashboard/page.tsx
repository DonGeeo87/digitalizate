"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useProfile } from "@/lib/profile-store"
import { challenges, getActiveChallenges } from "@/data/challenges"
import { getAchievements } from "@/lib/api"
import { ArrowLeft, Trophy, Flame, Target, Share2, Zap, ChevronRight, CheckCircle2, AlertTriangle, Lock, GitBranch } from "lucide-react"
import Link from "next/link"
import CoachBanner from "@/components/CoachBanner"
import { NotificationPrompt } from "@/components/NotificationPrompt"
import WeeklyProgress from "@/components/WeeklyProgress"

interface Achievement {
  slug: string
  name: string
  description: string
  icon_emoji: string
  category: "general" | "streak" | "level" | "challenges" | "category"
  unlocked: boolean
  unlockedAt: string | null
  xp_reward: number
}

const LEVEL_NAMES: Record<number, string> = {
  1: "Novato",
  2: "Aprendiz",
  3: "Digital",
  4: "Experto",
  5: "Master",
}

function getLevelName(level: number): string {
  return LEVEL_NAMES[level] || "Leyenda"
}

function xpForLevel(lvl: number): number {
  return lvl * lvl * 100 + lvl * 50
}

function sumOfPreviousLevels(level: number): number {
  let sum = 0
  for (let lvl = 1; lvl < level; lvl++) {
    sum += xpForLevel(lvl)
  }
  return sum
}

export default function DashboardPage() {
  const router = useRouter()
  const { profile, progress, badges, quizScores, isLoaded } = useProfile()
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    async function loadAchievements() {
      const res = await getAchievements()
      if (res.data?.achievements) {
        setAchievements(res.data.achievements)
      }
    }
    if (isLoaded) {
      loadAchievements()
    }
  }, [isLoaded])

  if (!isLoaded) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl mx-auto animate-pulse bg-amber-500" />
        <div className="text-gray-400">Cargando tu progreso...</div>
      </div>
    </div>
  )

  if (!profile) { router.push("/"); return null }

  const completedCount = Object.values(progress).filter((p) => p.status === "completed").length
  const quizCount = Object.keys(quizScores).length
  const avgQuizScore = quizCount > 0
    ? Math.round(Object.values(quizScores).reduce((sum, q) => sum + Math.round((q.score / q.total) * 100), 0) / quizCount)
    : 0

  const xpForNext = xpForLevel(profile.level)
  const prevLevelsSum = sumOfPreviousLevels(profile.level)
  const xpInLevel = profile.totalPoints - prevLevelsSum
  const progressPct = Math.min(100, Math.max(0, (xpInLevel / xpForNext) * 100))

  // Estado de racha
  const streakActive = profile.currentStreak > 0
  const hoursSinceLast = profile.lastChallengeDate
    ? Math.round((Date.now() - new Date(profile.lastChallengeDate).getTime()) / (1000 * 60 * 60))
    : null
  const streakAtRisk = hoursSinceLast !== null && hoursSinceLast > 24 && hoursSinceLast < 48
  const streakBroken = hoursSinceLast !== null && hoursSinceLast >= 48

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
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Mi Progreso</h1>
          </div>
          <Avatar className="w-9 h-9 ring-2 ring-amber-500/30">
            <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-gray-900 text-sm font-bold">
              {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Coach Banner */}
        <CoachBanner trigger="daily_return" autoDismiss={8000} />

        {/* Notification Prompt */}
        <NotificationPrompt />

        {/* Profile Card */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden animate-fade-in">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-5">
              <Avatar className="w-16 h-16 ring-2 ring-amber-500/30">
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-gray-900 text-xl font-bold">
                  {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-white truncate">{profile.businessName || profile.name}</h2>
                <p className="text-sm text-gray-400 truncate">{profile.businessName ? profile.name : ""}</p>
              </div>
              <div className="text-center shrink-0">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-2xl font-bold text-amber-400">
                  {profile.level}
                </div>
                <p className="text-xs text-gray-500 mt-1">{getLevelName(profile.level)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{getLevelName(profile.level)} &middot; Nivel {profile.level}</span>
                <span className="font-medium text-gray-300">{xpInLevel} / {xpForNext} XP</span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-slide-up">
          {[
            { icon: Trophy, label: "Completados", value: completedCount, gradient: "from-emerald-500 to-teal-500" },
            { icon: Flame, label: "Racha", value: `${profile.currentStreak} días`, gradient: "from-amber-500 to-orange-500",
              extra: streakAtRisk ? (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] text-amber-400/80">¡Hoy vence!</span>
                </div>
              ) : streakBroken ? (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-[10px] text-gray-500">Reinicia mañana</span>
                </div>
              ) : streakActive ? (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-[10px] text-emerald-400/80">Racha activa</span>
                </div>
              ) : null,
            },
            { icon: Target, label: "Puntos", value: profile.totalPoints, gradient: "from-purple-500 to-violet-500" },
            { icon: Zap, label: "Quizzes", value: `${quizCount} (${avgQuizScore}%)`, gradient: "from-blue-500 to-cyan-500" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
                {stat.extra}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Mis Badges</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => {
                const ch = challenges.find((c) => c.slug === badge.challengeSlug)
                return (
                  <Card key={badge.challengeSlug} className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                    <div className="bg-white/5 p-4 text-center relative">
                      <div className="absolute top-2 right-2 text-xs bg-white/10 text-gray-400 rounded-full px-2 py-0.5">
                        {new Date(badge.unlockedAt).toLocaleDateString("es", { day: "numeric", month: "short" })}
                      </div>
                      <div className="text-4xl mb-2">{ch?.iconEmoji || "🏆"}</div>
                      <p className="font-bold text-sm text-white">{badge.badgeName}</p>
                    </div>
                    <CardContent className="p-3 text-center">
                      {badge.sharedCount > 0 ? (
                        <p className="text-xs text-emerald-400">
                          <Share2 className="w-3 h-3 inline mr-1" />
                          Compartido {badge.sharedCount} vez{badge.sharedCount !== 1 ? "es" : ""}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500">Sin compartir</p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {/* Logros */}
        {achievements.length > 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏅</span>
              <div>
                <h3 className="text-lg font-bold text-white">Logros</h3>
                <p className="text-xs text-gray-400">Logros automáticos que se desbloquean al cumplir requisitos</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {achievements.map((achievement) => {
                const categoryGradients: Record<string, string> = {
                  general: "from-amber-500 to-orange-500",
                  streak: "from-red-500 to-rose-500",
                  level: "from-purple-500 to-violet-500",
                  challenges: "from-emerald-500 to-teal-500",
                  category: "from-blue-500 to-cyan-500"
                }
                const gradient = categoryGradients[achievement.category] || "from-gray-500 to-gray-600"
                return (
                  <Card
                    key={achievement.slug}
                    className={`bg-white/5 backdrop-blur-sm border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${
                      achievement.unlocked
                        ? "border-amber-500/30 shadow-lg shadow-amber-500/10"
                        : "border-white/10 opacity-50"
                    }`}
                  >
                    <div className={`bg-gradient-to-br ${gradient} p-4 text-center relative`}>
                      {achievement.unlocked && (
                        <div className="absolute inset-0 bg-white/10" />
                      )}
                      <div className={`text-3xl mb-2 relative ${!achievement.unlocked ? "grayscale" : ""}`}>
                        {achievement.icon_emoji}
                        {!achievement.unlocked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 rounded-full p-1">
                              <Lock className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        )}
                      </div>
                      <p className={`font-bold text-sm relative ${achievement.unlocked ? "text-white" : "text-gray-300"}`}>
                        {achievement.name}
                      </p>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-400/80">
                          +{achievement.xp_reward} XP
                        </span>
                        {achievement.unlocked && achievement.unlockedAt ? (
                          <span className="text-xs text-gray-500">
                            {new Date(achievement.unlockedAt).toLocaleDateString("es", { day: "numeric", month: "short" })}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-600">Bloqueado</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Progreso Semanal */}
        <WeeklyProgress userProgress={progress} />

        {/* Árbol de Habilidades link */}
        <Link href="/habilidades">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 cursor-pointer">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                <GitBranch className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white">Árbol de Habilidades</p>
                <p className="text-xs text-gray-400">Explora las 4 ramas y 20 habilidades para dominar</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </CardContent>
          </Card>
        </Link>

        {/* Desafíos */}
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Desafíos disponibles</h3>
        </div>
        <div className="space-y-3">
          {getActiveChallenges().map((ch) => {
            const isDone = progress[ch.slug]?.status === "completed"
            const isStarted = progress[ch.slug]?.status === "started"
            return (
              <Link key={ch.slug} href={isDone ? "#" : `/desafio/${ch.slug}`}>
                <Card className={`bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 ${isDone ? "opacity-60" : ""}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                      isDone ? "bg-emerald-500/10" : "bg-amber-500/10"
                    }`}>
                      {isDone ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : ch.iconEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate">{ch.title}</p>
                      <p className="text-xs text-gray-500">{ch.estimatedMinutes} min · {ch.category}</p>
                    </div>
                    {isStarted && !isDone && (
                      <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                        En curso
                      </span>
                    )}
                    {!isStarted && !isDone && (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
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
