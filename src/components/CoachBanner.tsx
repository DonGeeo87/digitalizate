'use client'

import { useEffect, useState } from 'react'
import { COACH_MESSAGES, type CoachMessage } from '@/data/coach-messages'

interface CoachBannerProps {
  trigger: CoachMessage['trigger']
  onDismiss?: () => void
  autoDismiss?: number
}

export default function CoachBanner({ trigger, onDismiss, autoDismiss }: CoachBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const key = `coach_dismissed_${trigger}`
    if (localStorage.getItem(key)) return
    setVisible(true)
  }, [trigger])

  useEffect(() => {
    if (!visible || !autoDismiss) return
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss?.()
    }, autoDismiss)
    return () => clearTimeout(timer)
  }, [visible, autoDismiss, onDismiss])

  function handleDismiss() {
    const key = `coach_dismissed_${trigger}`
    localStorage.setItem(key, '1')
    setVisible(false)
    onDismiss?.()
  }

  if (!visible) return null

  const msg = COACH_MESSAGES.find((m) => m.trigger === trigger)
  if (!msg) return null

  return (
    <div className="animate-fade-in flex flex-col gap-3 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:flex-row sm:items-start sm:gap-4">
      <span className="text-3xl shrink-0">{msg.emoji}</span>

      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-base">{msg.title}</h3>
        <p className="text-gray-300 text-sm mt-1">{msg.message}</p>
        {msg.tip && (
          <p className="text-amber-400/80 text-xs italic mt-2">💡 {msg.tip}</p>
        )}
      </div>

      <button
        onClick={handleDismiss}
        className="shrink-0 self-start rounded-xl bg-amber-500/20 px-4 py-1.5 text-amber-400 text-sm transition-colors hover:bg-amber-500/30"
      >
        Entendido
      </button>
    </div>
  )
}
