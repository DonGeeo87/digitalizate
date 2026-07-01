"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { challenges } from "@/data/challenges"
import { useProfile } from "@/lib/profile-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function Home() {
  const { profile, updateProfile, isLoaded } = useProfile()
  const [showOnboarding, setShowOnboarding] = useState(!profile && isLoaded)
  const [name, setName] = useState("")
  const [businessName, setBusinessName] = useState("")

  const handleStart = () => {
    if (!name.trim() || !businessName.trim()) return
    updateProfile({ name: name.trim(), businessName: businessName.trim(), businessType: "" })
    setShowOnboarding(false)
  }

  const firstChallenge = challenges[0]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Onboarding Dialog */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">¡Bienvenido a Digitalízate! 🚀</DialogTitle>
            <DialogDescription className="text-center text-base">
              Solo necesitamos saber quién eres para empezar con tu primer desafío.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Tu nombre</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="Ej: María González"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Nombre de tu negocio</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="Ej: Panadería La Esquina"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <Button className="w-full text-base py-6" size="lg" disabled={!name.trim() || !businessName.trim()} onClick={handleStart}>
              ¡Empezar mi primer desafío!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-20 bg-gradient-to-b from-brand-bg to-white text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 rounded-full text-brand text-sm font-medium">
            🎯 5 minutos al día · Sin teoría · Pura acción
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
            {profile ? `¿Listo para el siguiente, ${profile.name.split(" ")[0]}?` : "Digitaliza tu negocio en 5 minutos"}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto text-balance">
            {profile
              ? `${profile.businessName} ya empezó su camino digital. Sigue con el siguiente desafío.`
              : "No es un curso. Son desafíos. Cada día haces UNA cosa concreta que mueve tu negocio. Hoy: aparece en Google Maps."}
          </p>

          {/* Profile card if logged in */}
          {profile && (
            <Card className="max-w-sm mx-auto bg-white/80 backdrop-blur border-brand/20">
              <CardContent className="flex items-center gap-4 py-4">
                <Avatar>
                  <AvatarFallback className="bg-brand text-white">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1">
                  <p className="font-semibold">{profile.businessName}</p>
                  <p className="text-sm text-muted-foreground">
                    Nivel {profile.level} · {profile.challengesCompleted} desafíos · {profile.totalPoints} pts
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {profile ? (
              <Link href={`/desafio/${firstChallenge.slug}`}>
                <Button size="lg" className="text-base px-8 py-6">
                  {firstChallenge.iconEmoji} {firstChallenge.title}
                </Button>
              </Link>
            ) : (
              <Button size="lg" className="text-base px-8 py-6" onClick={() => setShowOnboarding(true)}>
                🚀 Empezar ahora — es gratis
              </Button>
            )}
            {profile && (
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-base px-8 py-6">
                  📊 Mi progreso
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Así funciona</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            Olvídate de cursos de 40 horas. Esto es acción pura.
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", icon: "📱", title: "Eliges un desafío", desc: "Ves el desafío del día y dices 'lo hago'. Son 5 minutos." },
              { step: "2", icon: "⚡", title: "Haces la acción", desc: "Pasos guiados. Abres la app, configuras, publicas. Sin rodeos." },
              { step: "3", icon: "🏆", title: "Ganas tu badge", desc: "Completaste. Te llevas un badge que puedes compartir en tus redes." },
            ].map((item) => (
              <Card key={item.step} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 py-20 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">¿Qué puedes lograr?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">60 desafíos en 4 categorías. Tú eliges por dónde empezar.</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: "📍", title: "Presencia Digital", desc: "Aparece en Google Maps, crea tu perfil de WhatsApp Business, optimiza tus redes", color: "bg-blue-50 text-blue-600", count: "15 desafíos" },
              { icon: "💳", title: "Ventas y Pagos", desc: "Acepta pagos online, crea links de pago, automatiza cobros", color: "bg-emerald-50 text-emerald-600", count: "15 desafíos" },
              { icon: "📢", title: "Marketing", desc: "Diseña posts, escribe copys que vendan, planea tu contenido semanal", color: "bg-orange-50 text-orange-600", count: "15 desafíos" },
              { icon: "🔧", title: "Herramientas", desc: "Organiza tu Drive, configura respuestas automáticas, protege tus datos", color: "bg-purple-50 text-purple-600", count: "15 desafíos" },
            ].map((cat) => (
              <Card key={cat.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex gap-4">
                  <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {cat.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cat.desc}</p>
                    <span className="text-xs font-medium text-brand mt-2 inline-block">{cat.count}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-20 bg-gradient-to-b from-white to-brand-bg text-center">
        <div className="max-w-lg mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Tu negocio merece estar en el mapa digital</h2>
          <p className="text-muted-foreground text-lg">
            〝No sabía por dónde empezar. En 5 minutos ya había configurado mi horario de WhatsApp.〞
          </p>
          <p className="text-sm text-muted-foreground">— María, dueña de Panadería La Esquina</p>
          <Button size="lg" className="text-base px-10 py-6" onClick={() => setShowOnboarding(true)}>
            🚀 Empieza gratis — no necesitas tarjeta
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t text-center text-sm text-muted-foreground">
        <p>Digitalízate by Código Guerrero Dev — Hecho para emprendedores latinos 🇨🇱🇲🇽🇨🇴🇦🇷🇵🇪</p>
      </footer>
    </div>
  )
}