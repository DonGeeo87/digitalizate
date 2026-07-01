"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useProfile } from "@/lib/profile-store"
import { challenges, getActiveChallenges } from "@/data/challenges"
import { ArrowLeft, Trophy, Flame, Target, Share2, Zap, ChevronRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { profile, progress, badges, isLoaded } = useProfile()

  if (!isLoaded) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto animate-pulse" />
        <div className="text-slate-500">Cargando tu progreso...</div>
      </div>
    </div>
  )

  if (!profile) { router.push("/"); return null }

  const completedCount = Object.values(progress).filter((p) => p.status === "completed").length

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
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">Mi Progreso</h1>
          </div>
          <Avatar className="w-9 h-9 ring-2 ring-green-500/20">
            <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-sm">
              {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-lg bg-white overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-green-500 to-emerald-600" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-14 h-14 ring-2 ring-green-500/20">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-lg">
                  {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">{profile.businessName}</h2>
                <p className="text-sm text-slate-500">{profile.name}</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                  {profile.level}
                </div>
                <p className="text-xs text-slate-500 mt-1">Nivel</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Siguiente nivel</span>
                <span className="font-medium text-slate-900">{profile.totalPoints} / {profile.level * 500} pts</span>
              </div>
              <div className="h-2.5 bg-green-500/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.round((profile.totalPoints / (profile.level * 500)) * 100))}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Trophy, label: "Completados", value: completedCount, gradient: "from-emerald-500 to-teal-500" },
            { icon: Flame, label: "Racha", value: `${profile.currentStreak} días`, gradient: "from-orange-500 to-amber-500" },
            { icon: Target, label: "Puntos", value: profile.totalPoints, gradient: "from-green-500 to-emerald-600" },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm bg-white overflow-hidden">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-2 shadow-md`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-slate-900">Mis Badges</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => {
                const ch = challenges.find((c) => c.slug === badge.challengeSlug)
                return (
                  <Card key={badge.challengeSlug} className="border-0 shadow-sm bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className={`bg-gradient-to-br ${
                      badge.sharedCount > 0 ? "from-green-500 to-emerald-600" : "from-slate-600 to-slate-700"
                    } p-4 text-center text-white relative`}>
                      <div className="absolute top-2 right-2 text-xs bg-white/20 rounded-full px-2 py-0.5">
                        {new Date(badge.unlockedAt).toLocaleDateString("es", { day: "numeric", month: "short" })}
                      </div>
                      <div className="text-4xl mb-2">{ch?.iconEmoji || "🏆"}</div>
                      <p className="font-bold text-sm">{badge.badgeName}</p>
                    </div>
                    <CardContent className="p-3 text-center">
                      {badge.sharedCount > 0 ? (
                        <p className="text-xs text-green-600">
                          <Share2 className="w-3 h-3 inline mr-1" />
                          Compartido {badge.sharedCount} vez{badge.sharedCount !== 1 ? "es" : ""}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500">Sin compartir</p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {/* Desafíos */}
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-slate-900">Desafíos disponibles</h3>
        </div>
        <div className="space-y-3">
          {getActiveChallenges().map((ch) => {
            const isDone = progress[ch.slug]?.status === "completed"
            const isStarted = progress[ch.slug]?.status === "started"
            return (
              <Link key={ch.slug} href={isDone ? "#" : `/desafio/${ch.slug}`}>
                <Card className={`border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${isDone ? "opacity-60" : ""}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm ${
                      isDone ? "bg-emerald-50" : "bg-green-500/10"
                    }`}>
                      {isDone ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : ch.iconEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">{ch.title}</p>
                      <p className="text-xs text-slate-500">{ch.estimatedMinutes} min · {ch.category}</p>
                    </div>
                    {isStarted && !isDone && (
                      <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">
                        En curso
                      </span>
                    )}
                    {!isStarted && !isDone && (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
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