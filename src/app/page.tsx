"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { challenges } from "@/data/challenges"
import { useProfile } from "@/lib/profile-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, Zap, Target, Trophy, Sparkles, CheckCircle, Menu, X } from "lucide-react"

export default function Home() {
  const { profile, updateProfile, isLoaded } = useProfile()
  const [showOnboarding, setShowOnboarding] = useState(!profile && isLoaded)
  const [name, setName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  const handleStart = () => {
    if (!name.trim() || !businessName.trim()) return
    updateProfile({ name: name.trim(), businessName: businessName.trim(), businessType: "" })
    setShowOnboarding(false)
  }

  const firstChallenge = challenges[0]

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Onboarding Dialog ─── */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="sm:max-w-md border-0 shadow-2xl">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center text-3xl mb-4">
              🚀
            </div>
            <DialogTitle className="text-2xl text-center">¡Bienvenido a Digitalízate!</DialogTitle>
            <DialogDescription className="text-center text-base text-muted">
              Solo 2 datos y empezamos con tu primer desafío. 5 minutos y tu negocio ya está más digital.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block text-foreground">Tu nombre</label>
              <input
                className="w-full px-4 py-3 border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white transition-all"
                placeholder="Ej: María González"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block text-foreground">Nombre de tu negocio</label>
              <input
                className="w-full px-4 py-3 border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white transition-all"
                placeholder="Ej: Panadería La Esquina"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <Button
              className="w-full text-base py-6 gradient-brand hover:opacity-90 transition-opacity shadow-lg shadow-brand/25"
              size="lg"
              disabled={!name.trim() || !businessName.trim()}
              onClick={handleStart}
            >
              ¡Empezar mi primer desafío! <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <span className="font-bold text-lg text-foreground">Digitalízate</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <a href="#como-funciona" className="text-sm text-muted hover:text-foreground transition-colors">Cómo funciona</a>
            <a href="#categorias" className="text-sm text-muted hover:text-foreground transition-colors">Categorías</a>
            {profile ? (
              <Link href={`/desafio/${firstChallenge.slug}`}>
                <Button size="sm" className="gradient-brand shadow-md shadow-brand/20">
                  {firstChallenge.iconEmoji} Continuar desafío
                </Button>
              </Link>
            ) : (
              <Button size="sm" className="gradient-brand shadow-md shadow-brand/20" onClick={() => setShowOnboarding(true)}>
                Empezar gratis
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="sm:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="sm:hidden border-t border-border/50 bg-white px-4 py-4 space-y-3 animate-fade-up">
            <a href="#como-funciona" className="block text-sm text-muted py-2" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
            <a href="#categorias" className="block text-sm text-muted py-2" onClick={() => setMenuOpen(false)}>Categorías</a>
            {profile ? (
              <Link href={`/desafio/${firstChallenge.slug}`} onClick={() => setMenuOpen(false)}>
                <Button className="w-full gradient-brand">Continuar desafío</Button>
              </Link>
            ) : (
              <Button className="w-full gradient-brand" onClick={() => { setMenuOpen(false); setShowOnboarding(true); }}>Empezar gratis</Button>
            )}
          </div>
        )}
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-dots" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full text-brand text-sm font-medium animate-fade-up">
              <Sparkles className="w-4 h-4" />
              <span>5 minutos al día · Sin teoría · Pura acción</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1] animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {profile
                ? `¿Listo para el siguiente, ${profile.name.split(" ")[0]}?`
                : "Digitaliza tu negocio\nen 5 minutos"}
            </h1>

            <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto text-balance animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {profile
                ? `${profile.businessName} ya empezó su camino digital. Sigue con el siguiente desafío.`
                : "No es un curso. Son desafíos. Cada día haces UNA cosa concreta que mueve tu negocio."}
            </p>

            {/* Profile card si logueado */}
            {profile && (
              <div className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
                <Card className="max-w-sm mx-auto glass border-brand/10 shadow-lg shadow-brand/5">
                  <CardContent className="flex items-center gap-4 py-4 px-5">
                    <Avatar className="w-12 h-12 ring-2 ring-brand/20">
                      <AvatarFallback className="gradient-brand text-white">
                        {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-foreground">{profile.businessName}</p>
                      <p className="text-sm text-muted">
                        Nivel {profile.level} · {profile.challengesCompleted} desafíos · {profile.totalPoints} pts
                      </p>
                    </div>
                    <div className="w-3 h-3 bg-brand rounded-full animate-pulse" />
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {profile ? (
                <>
                  <Link href={`/desafio/${firstChallenge.slug}`}>
                    <Button size="lg" className="text-base px-8 py-6 gradient-brand shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 transition-all">
                      {firstChallenge.iconEmoji} {firstChallenge.title}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="text-base px-8 py-6 border-2 hover:bg-brand/5 hover:border-brand/30 transition-all">
                      📊 Mi progreso
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button size="lg" className="text-base px-10 py-6 gradient-brand shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 transition-all animate-pulse-glow" onClick={() => setShowOnboarding(true)}>
                    🚀 Empezar ahora — es gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-base px-8 py-6 border-2 hover:bg-brand/5 transition-all">
                    <Zap className="w-5 h-5 mr-2" />
                    Ver desafíos
                  </Button>
                </>
              )}
            </div>

            {/* Trust metrics */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 pt-8 text-sm text-muted animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand" />
                <span>Sin tarjeta</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand" />
                <span>5 min por desafío</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand" />
                <span>Resultado inmediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="como-funciona" className="relative px-4 sm:px-6 py-24 bg-surface-alt">
        <div className="absolute inset-0 bg-grid" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full text-brand text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Cómo funciona
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Así de simple</h2>
            <p className="text-muted mt-3 max-w-md mx-auto">Olvídate de cursos de 40 horas. Esto es acción pura.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "01", icon: "📱", title: "Eliges un desafío", desc: "Ves el desafío del día y dices 'lo hago'. Son 5 minutos.", color: "from-brand to-brand-dark" },
              { step: "02", icon: "⚡", title: "Haces la acción", desc: "Pasos guiados. Abres la app, configuras, publicas. Sin rodeos.", color: "from-accent-yellow to-accent-orange" },
              { step: "03", icon: "🏆", title: "Ganas tu badge", desc: "Completaste. Te llevas un badge que puedes compartir en tus redes.", color: "from-accent-blue to-accent-purple" },
            ].map((item) => (
              <div key={item.step} className="group relative card-hover">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-brand/10 to-brand/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                <Card className="relative border-0 shadow-sm bg-white overflow-hidden">
                  <div className={`h-2 w-full bg-gradient-to-r ${item.color}`} />
                  <CardContent className="pt-6 pb-8 px-6 text-center">
                    <div className={`w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-brand tracking-widest">{item.step}</span>
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-3">{item.title}</h3>
                    <p className="text-muted leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section id="categorias" className="relative px-4 sm:px-6 py-24">
        <div className="absolute inset-0 bg-dots" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-purple/10 rounded-full text-accent-purple text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              60 desafíos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">¿Qué puedes lograr?</h2>
            <p className="text-muted mt-3 max-w-md mx-auto">Tú eliges por dónde empezar según lo que más le duela a tu negocio hoy.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: "📍", title: "Presencia Digital", desc: "Aparece en Google Maps, crea tu perfil de WhatsApp Business, optimiza tus redes", gradient: "from-blue-500 to-cyan-500", count: "15 desafíos" },
              { icon: "💳", title: "Ventas y Pagos", desc: "Acepta pagos online, crea links de pago, automatiza cobros", gradient: "from-emerald-500 to-teal-500", count: "15 desafíos" },
              { icon: "📢", title: "Marketing", desc: "Diseña posts, escribe copys que vendan, planea tu contenido semanal", gradient: "from-orange-500 to-amber-500", count: "15 desafíos" },
              { icon: "🔧", title: "Herramientas", desc: "Organiza tu Drive, configura respuestas automáticas, protege tus datos", gradient: "from-purple-500 to-violet-500", count: "15 desafíos" },
            ].map((cat) => (
              <div key={cat.title} className="group card-hover">
                <Card className="relative border-0 overflow-hidden bg-white shadow-sm hover:shadow-xl">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.gradient} opacity-5 rounded-bl-full`} />
                  <CardContent className="p-5 sm:p-6 flex gap-4 items-start">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg text-foreground">{cat.title}</h3>
                      <p className="text-sm text-muted mt-1 leading-relaxed">{cat.desc}</p>
                      <span className="inline-block text-xs font-semibold text-brand mt-3 bg-brand/10 px-3 py-1 rounded-full">
                        {cat.count}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="px-4 sm:px-6 py-16 gradient-hero">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: "60", label: "Desafíos", icon: "🎯" },
              { value: "5 min", label: "Por desafío", icon: "⏱️" },
              { value: "4", label: "Categorías", icon: "📂" },
              { value: "100%", label: "Práctico", icon: "💪" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Final ─── */}
      <section className="relative px-4 sm:px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-white to-accent-blue/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl" />
        <div className="relative max-w-lg mx-auto text-center space-y-8">
          <div className="text-5xl animate-float">🚀</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Tu negocio merece estar en el mapa digital
          </h2>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-lg border border-border/50 space-y-4">
            <p className="text-muted italic text-lg">
              &ldquo;No sabía por dónde empezar. En 5 minutos ya había configurado mi horario de WhatsApp.&rdquo;
            </p>
            <p className="text-sm font-medium text-foreground">
              — María, dueña de Panadería La Esquina
            </p>
          </div>
          <Button size="lg" className="text-base px-10 py-6 gradient-brand shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 transition-all animate-pulse-glow" onClick={() => setShowOnboarding(true)}>
            🚀 Empieza gratis — no necesitas tarjeta
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/50 bg-surface-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 gradient-brand rounded-lg flex items-center justify-center text-white font-bold text-xs">D</div>
                <span className="font-bold text-foreground">Digitalízate</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Hecho para emprendedores latinos que quieren digitalizar su negocio sin complicaciones.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Producto</h4>
              <div className="flex flex-col gap-2 text-sm text-muted">
                <a href="#como-funciona" className="hover:text-brand transition-colors">Cómo funciona</a>
                <a href="#categorias" className="hover:text-brand transition-colors">Desafíos</a>
                <button onClick={() => setShowOnboarding(true)} className="text-left hover:text-brand transition-colors">Empezar</button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Código Guerrero Dev</h4>
              <div className="flex flex-col gap-2 text-sm text-muted">
                <span>Hecho en Chile 🇨🇱 para Latam 🌎</span>
                <span className="flex gap-2 mt-2">
                  <span>🇨🇱</span><span>🇲🇽</span><span>🇨🇴</span><span>🇦🇷</span><span>🇵🇪</span>
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted">
            Digitalízate by Código Guerrero Dev
          </div>
        </div>
      </footer>
    </div>
  )
}