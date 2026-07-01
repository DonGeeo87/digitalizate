"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Check, Sparkles } from "lucide-react"
import { useProfile } from "@/lib/profile-store"

interface BadgeShareCardProps {
  challengeTitle: string
  badgeName: string
  iconEmoji: string
  userName: string
  businessName: string
  challengeSlug: string
  onShare?: () => void
}

export function BadgeShareCard({
  challengeTitle,
  badgeName,
  iconEmoji,
  userName,
  businessName,
  challengeSlug,
  onShare,
}: BadgeShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { incrementShare } = useProfile()
  const [isSharing, setIsSharing] = useState(false)
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    try {
      setIsSharing(true)
      const shareText = `🏆 ¡Acabo de completar "${challengeTitle}" en Digitalízate!\n\n${userName} · ${businessName}\n\n📍 Badge: ${badgeName}\n\nHaz el desafío en 5 min → digitalizate-murex.vercel.app/desafio/${challengeSlug}`

      if (navigator.share) {
        await navigator.share({ title: `Digitalízate - ${badgeName}`, text: shareText })
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
      }

      incrementShare(challengeSlug)
      setShared(true)
      onShare?.()
    } catch {
      // User cancelled
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Badge Card */}
      <Card ref={cardRef} className="overflow-hidden border-0 shadow-xl bg-white">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 sm:p-8 text-center text-white relative">
          {/* Decorative circles */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/5 rounded-full" />
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand/10 rounded-full blur-2xl" />

          <div className="relative">
            <div className="text-6xl mb-3">{iconEmoji}</div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {badgeName}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">{challengeTitle}</h3>
          </div>
        </div>
        <CardContent className="p-6 text-center space-y-3">
          <div className="w-14 h-14 mx-auto gradient-brand rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            {userName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <p className="text-lg font-bold text-foreground">{userName}</p>
          <p className="text-muted">{businessName}</p>
          <div className="inline-flex items-center gap-2 text-sm text-brand bg-brand/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            Desafío completado
          </div>
        </CardContent>
      </Card>

      {/* Share Button */}
      <Button
        className={`w-full text-base py-6 transition-all ${shared ? "bg-emerald-500 hover:bg-emerald-600" : "gradient-brand shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30"}`}
        size="lg"
        onClick={handleShare}
        disabled={isSharing}
      >
        {shared ? (
          <><Check className="w-5 h-5 mr-2" /> ¡Compartido!</>
        ) : (
          <><Share2 className="w-5 h-5 mr-2" /> {isSharing ? "Compartiendo..." : "Compartir en WhatsApp 🎉"}</>
        )}
      </Button>
    </div>
  )
}