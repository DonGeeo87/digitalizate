"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { challenges } from "@/data/challenges"
import { useProfile } from "@/lib/profile-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, Zap, Target, Trophy, Sparkles, CheckCircle, Menu, X, Globe, ShoppingCart, Megaphone, Wrench, Loader2, AlertCircle } from "lucide-react"
import DiagnosticoInicial from "@/components/DiagnosticoInicial"
import type { DiagnosticoResultado } from "@/data/diagnostico"

export default function Home() {
  const { profile, updateProfile, register, login, isLoaded, isOnline } = useProfile()
  const [showOnboarding, setShowOnboarding] = useState(!profile && isLoaded)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [showDiagnostico, setShowDiagnostico] = useState(false)
  const [diagnosticoResultado, setDiagnosticoResultado] = useState<DiagnosticoResultado | null>(null)

  const handleStart = async () => {
    if (!name.trim() || !businessName.trim() || !email.trim()) return
    setIsSubmitting(true)
    setError("")

    if (isLogin) {
      const err = await login(email.trim())
      if (err) { setError(err); setIsSubmitting(false); return }
    } else {
      const err = await register(email.trim(), name.trim(), businessName.trim())
      if (err) { setError(err); setIsSubmitting(false); return }
    }

    setIsSubmitting(false)
    setShowDiagnostico(true)
  }

  const firstChallenge = challenges[0]

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      {/* ─── Onboarding Dialog ─── */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-amber-500/30">
              🚀
            </div>
            <DialogTitle className="text-2xl text-center">¡Bienvenido a Digitalízate!</DialogTitle>
            <DialogDescription className="text-center text-base">
              Solo 2 datos y empezamos con tu primer desafío. 5 minutos y tu negocio ya está más digital.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 px-1">
            {!isOnline && (
              <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Sin conexión al servidor. Tus datos se guardan localmente.</span>
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                {error}
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-300">Tu email</label>
              <input
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-800 text-white transition-all"
                placeholder="Ej: maria@mirestaurante.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            {!isLogin && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-gray-300">Tu nombre</label>
                  <input
                    className="w-full px-4 py-3 border border-white/10 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-800 text-white transition-all"
                    placeholder="Ej: María González"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-gray-300">Nombre de tu negocio</label>
                  <input
                    className="w-full px-4 py-3 border border-white/10 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-800 text-white transition-all"
                    placeholder="Ej: Panadería La Esquina"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </>
            )}
            <Button
              className="w-full text-base py-6 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50"
              size="lg"
              disabled={isSubmitting || !email.trim() || (!isLogin && (!name.trim() || !businessName.trim()))}
              onClick={handleStart}
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creando cuenta...</>
              ) : isLogin ? (
                <>{'Entrar a mi cuenta'} <ArrowRight className="w-5 h-5 ml-2" /></>
              ) : (
                <>{'¡Empezar mi primer desafío!'} <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
            <p className="text-center text-sm text-gray-500">
              {isLogin ? (
                <>¿No tienes cuenta?{' '}<button onClick={() => { setIsLogin(false); setError(''); setName(''); setBusinessName(''); }} className="text-amber-400 font-medium hover:underline">Regístrate</button></>
              ) : (
                <>¿Ya tienes cuenta?{' '}<button onClick={() => { setIsLogin(true); setError(''); }} className="text-amber-400 font-medium hover:underline">Entrar</button></>
              )}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Diagnóstico Inicial ─── */}
      {showDiagnostico && profile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/90 backdrop-blur-sm">
          <DiagnosticoInicial
            onComplete={(resultado) => {
              setDiagnosticoResultado(resultado)
              setShowDiagnostico(false)
            }}
            onSkip={() => {
              setShowDiagnostico(false)
            }}
          />
        </div>
      )}

      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-bold text-lg text-white">Digitalízate</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#como-funciona" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">Cómo funciona</a>
            <a href="#categorias" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">Categorías</a>
            {profile ? (
              <Link href={`/desafio/${firstChallenge.slug}`}>
                <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold shadow-md shadow-amber-500/20">
                  {firstChallenge.iconEmoji} Continuar desafío
                </Button>
              </Link>
            ) : (
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold shadow-md shadow-amber-500/20" onClick={() => setShowOnboarding(true)}>
                Empezar gratis
              </Button>
            )}
          </div>

          <button className="md:hidden p-2 text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-gray-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
            <a href="#como-funciona" className="block text-sm text-gray-400 py-2 hover:text-amber-400 transition-colors" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
            <a href="#categorias" className="block text-sm text-gray-400 py-2 hover:text-amber-400 transition-colors" onClick={() => setMenuOpen(false)}>Categorías</a>
            {profile ? (
              <Link href={`/desafio/${firstChallenge.slug}`} onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold">Continuar desafío</Button>
              </Link>
            ) : (
              <Button className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold" onClick={() => { setMenuOpen(false); setShowOnboarding(true); }}>Empezar gratis</Button>
            )}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-amber-400 text-sm font-medium border border-amber-500/20" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}>
              <Sparkles className="w-4 h-4" />
              <span>5 minutos al día · Sin teoría · Pura acción</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              {profile
                ? `¿Listo para el siguiente, ${profile.name.split(" ")[0]}?`
                : <>Digitaliza tu negocio<br />en 5 minutos <span className="text-amber-500">empieza hoy.</span></>}
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto">
              {profile
                ? `${profile.businessName} ya empezó su camino digital. Sigue con el siguiente desafío.`
                : "No es un curso. Son desafíos. Cada día haces UNA cosa concreta que mueve tu negocio."}
            </p>

            {profile && (
              <Card className="max-w-sm mx-auto border border-white/10 shadow-lg shadow-amber-500/5" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}>
                <CardContent className="flex items-center gap-4 py-4 px-5">
                  <Avatar className="w-12 h-12 ring-2 ring-amber-500/20">
                    <AvatarFallback className="bg-amber-500/20 text-amber-400 font-bold">
                      {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-white">{profile.businessName}</p>
                    <p className="text-sm text-gray-400">
                      Nivel {profile.level} · {profile.challengesCompleted} desafíos · {profile.totalPoints} pts
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {profile ? (
                <>
                  <Link href={`/desafio/${firstChallenge.slug}`}>
                    <Button size="lg" className="text-base px-8 py-6 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all">
                      {firstChallenge.iconEmoji} {firstChallenge.title}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="text-base px-8 py-6 border-2 border-white/10 text-gray-300 hover:bg-white/5 hover:border-amber-500/30 transition-all">
                      📊 Mi progreso
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button size="lg" className="text-base px-10 py-6 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all" onClick={() => setShowOnboarding(true)}
                    style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>
                    🚀 Empezar ahora — es gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-base px-8 py-6 border-2 border-white/10 text-gray-300 hover:bg-white/5 transition-all">
                    <Zap className="w-5 h-5 mr-2" />
                    Ver desafíos
                  </Button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>Sin tarjeta</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>5 min por desafío</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>Resultado inmediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CÓMO FUNCIONA ─── */}
      <section id="como-funciona" className="py-16 sm:py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-amber-400 text-sm font-medium mb-4 border border-amber-500/20" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}>
              <Target className="w-4 h-4" />
              Cómo funciona
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Así de simple</h2>
            <p className="text-gray-400 mt-3 max-w-md mx-auto">Olvídate de cursos de 40 horas. Esto es acción pura.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "01", icon: "📱", title: "Eliges un desafío", desc: "Ves el desafío del día y dices 'lo hago'. Son 5 minutos.", gradient: "from-emerald-500 to-emerald-600" },
              { step: "02", icon: "⚡", title: "Haces la acción", desc: "Pasos guiados. Abres la app, configuras, publicas. Sin rodeos.", gradient: "from-amber-500 to-amber-600" },
              { step: "03", icon: "🏆", title: "Ganas tu badge", desc: "Completaste. Te llevas un badge que puedes compartir en tus redes.", gradient: "from-purple-500 to-purple-600" },
            ].map((item) => (
              <div key={item.step} className="group relative">
                <div className="absolute -inset-0.5 bg-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <Card className="relative border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/5" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}>
                  <div className={`h-1 w-full bg-gradient-to-r ${item.gradient}`} />
                  <CardContent className="pt-6 pb-8 px-6 text-center">
                    <div className={`w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-amber-400 tracking-widest">{item.step}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORÍAS ─── */}
      <section id="categorias" className="py-16 sm:py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-amber-400 text-sm font-medium mb-4 border border-amber-500/20" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}>
              <Trophy className="w-4 h-4" />
              60 desafíos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">¿Qué puedes lograr?</h2>
            <p className="text-gray-400 mt-3 max-w-md mx-auto">Tú eliges por dónde empezar según lo que más le duela a tu negocio hoy.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: <Globe className="w-6 h-6" />, title: "Presencia Digital", desc: "Aparece en Google Maps, crea tu perfil de WhatsApp Business, optimiza tus redes", gradient: "from-blue-500 to-cyan-500", count: "15 desafíos" },
              { icon: <ShoppingCart className="w-6 h-6" />, title: "Ventas y Pagos", desc: "Acepta pagos online, crea links de pago, automatiza cobros", gradient: "from-emerald-500 to-teal-500", count: "15 desafíos" },
              { icon: <Megaphone className="w-6 h-6" />, title: "Marketing", desc: "Diseña posts, escribe copys que vendan, planea tu contenido semanal", gradient: "from-orange-500 to-amber-500", count: "15 desafíos" },
              { icon: <Wrench className="w-6 h-6" />, title: "Herramientas", desc: "Organiza tu Drive, configura respuestas automáticas, protege tus datos", gradient: "from-purple-500 to-violet-500", count: "15 desafíos" },
            ].map((cat) => (
              <div key={cat.title} className="group transition-all duration-300 hover:-translate-y-1">
                <Card className="relative border border-white/5 overflow-hidden transition-all hover:shadow-lg hover:shadow-amber-500/5" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.gradient} opacity-5 rounded-bl-full`} />
                  <CardContent className="p-5 sm:p-6 flex gap-4 items-start">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{cat.title}</h3>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">{cat.desc}</p>
                      <span className="inline-block text-xs font-semibold text-amber-400 mt-3 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
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

      {/* ─── STATS ─── */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "60", label: "Desafíos", icon: "🎯" },
              { value: "5 min", label: "Por desafío", icon: "⏱️" },
              { value: "4", label: "Categorías", icon: "📂" },
              { value: "100%", label: "Práctico", icon: "💪" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-500">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gray-950">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(245,158,11,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-lg mx-auto text-center px-4 space-y-8">
          <div className="text-5xl" style={{ animation: 'float 3s ease-in-out infinite' }}>🚀</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Tu negocio merece estar en el mapa digital
          </h2>
          <div className="rounded-2xl p-6 sm:p-8 shadow-lg border border-white/10 space-y-4" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}>
            <p className="text-gray-400 italic text-lg">
              &ldquo;No sabía por dónde empezar. En 5 minutos ya había configurado mi horario de WhatsApp.&rdquo;
            </p>
            <p className="text-sm font-medium text-white">
              — María, dueña de Panadería La Esquina
            </p>
          </div>
          <Button size="lg" className="text-base px-10 py-6 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all"
            onClick={() => setShowOnboarding(true)}
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>
            🚀 Empieza gratis — no necesitas tarjeta
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <span className="font-bold text-white">Digitalízate</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Hecho para emprendedores latinos que quieren digitalizar su negocio sin complicaciones.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Producto</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <a href="#como-funciona" className="hover:text-amber-400 transition-colors">Cómo funciona</a>
                <a href="#categorias" className="hover:text-amber-400 transition-colors">Desafíos</a>
                <button onClick={() => setShowOnboarding(true)} className="text-left hover:text-amber-400 transition-colors">Empezar</button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Código Guerrero Dev</h4>
              <p className="text-sm text-gray-500">Hecho en Chile 🇨🇱 para Latam 🌎</p>
              <div className="flex gap-2 text-lg mt-2">
                <span>🇨🇱</span><span>🇲🇽</span><span>🇨🇴</span><span>🇦🇷</span><span>🇵🇪</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-gray-500">
            Digitalízate by Código Guerrero Dev
          </div>
        </div>
      </footer>
    </div>
  )
}
