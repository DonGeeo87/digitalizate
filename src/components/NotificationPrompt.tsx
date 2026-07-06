'use client'

import { useState, useEffect } from 'react'
import { useNotifications } from '@/hooks/useNotifications'

interface NotificationPromptProps {
  onDismiss?: () => void
}

export function NotificationPrompt({ onDismiss }: NotificationPromptProps) {
  const { permission, requestPermission } = useNotifications()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (permission === 'granted') return
    const dismissed = localStorage.getItem('notification_prompt_dismissed')
    if (dismissed) return
    setVisible(true)
  }, [permission])

  if (!visible || permission === 'granted') return null

  const handleDismiss = () => {
    localStorage.setItem('notification_prompt_dismissed', 'true')
    setVisible(false)
    onDismiss?.()
  }

  const handleActivate = async () => {
    const granted = await requestPermission()
    if (granted) {
      setVisible(false)
    }
  }

  if (permission === 'denied') {
    return (
      <div className="animate-fade-in flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <span className="text-2xl">🔕</span>
        <div className="flex-1">
          <p className="font-bold text-white">Notificaciones bloqueadas</p>
          <p className="text-sm text-gray-400">
            Actívalas desde la configuración de tu navegador
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-sm text-gray-500 hover:text-gray-300"
        >
          Cerrar
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:flex-row sm:items-center">
      <span className="text-3xl">🔔</span>
      <div className="flex-1">
        <p className="font-bold text-white">¿Recibir recordatorios?</p>
        <p className="text-sm text-gray-400">
          Te avisaremos cuando tengas un desafío pendiente
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleActivate}
          className="rounded-lg bg-amber-500 px-4 py-2 font-bold text-gray-900 transition-colors hover:bg-amber-400"
        >
          Activar notificaciones
        </button>
        <button
          onClick={handleDismiss}
          className="text-sm text-gray-500 hover:text-gray-300"
        >
          Ahora no
        </button>
      </div>
    </div>
  )
}
