"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Download } from "lucide-react"
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

  const handleShare = async () => {
    try {
      setIsSharing(true)

      // Share via Web Share API (mobile) or WhatsApp fallback
      const shareText = `🏆 ¡Acabo de completar "${challengeTitle}" en Digitalízate!\n\n${userName} · ${businessName}\n\n📍 Badge: ${badgeName}\n\nHaz el desafío en 5 min → digitalizate.app/desafio/${challengeSlug}`

      if (navigator.share) {
        await navigator.share({ title: `Digitalízate - ${badgeName}`, text: shareText })
      } else {
        // WhatsApp fallback
        const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
        window.open(waUrl, "_blank")
      }

      incrementShare(challengeSlug)
      onShare?.()
    } catch {
      // User cancelled share
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Badge Card */}
      <Card ref={cardRef} className="overflow-hidden border-2 border-brand/20 shadow-lg">
        <div className="bg-gradient-to-br from-brand to-brand-dark p-8 text-center text-white">
          <div className="text-6xl mb-4">{iconEmoji}</div>
          <div className="inline-block bg-white/20 rounded-full px-4 py-1 text-sm font-medium mb-3">
            🏆 {badgeName}
          </div>
          <h3 className="text-2xl font-bold">{challengeTitle}</h3>
        </div>
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-semibold">{userName}</p>
          <p className="text-muted-foreground">{businessName}</p>
          <div className="flex items-center justify-center gap-1 text-sm text-brand">
            <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            Desafío completado
          </div>
        </CardContent>
      </Card>

      {/* Share Button */}
      <Button className="w-full text-base py-6" size="lg" onClick={handleShare} disabled={isSharing}>
        <Share2 className="w-5 h-5 mr-2" />
        {isSharing ? "Compartiendo..." : "Compartir en WhatsApp 🎉"}
      </Button>
    </div>
  )
}