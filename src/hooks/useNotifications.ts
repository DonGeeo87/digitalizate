'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

export type NotificationPermission = 'default' | 'granted' | 'denied'

interface UseNotificationsReturn {
  permission: NotificationPermission
  requestPermission: () => Promise<boolean>
  notify: (title: string, options?: { body?: string; icon?: string; tag?: string }) => void
  scheduleReminder: (hours: number, message: string) => void
  cancelReminder: () => void
}

export function useNotifications(): UseNotificationsReturn {
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      toast.error('Tu navegador no soporta notificaciones')
      return false
    }
    const result = await Notification.requestPermission()
    setPermission(result)
    if (result === 'granted') {
      toast.success('Notificaciones activadas ✅')
    }
    return result === 'granted'
  }, [])

  const notify = useCallback(
    (title: string, options?: { body?: string; icon?: string; tag?: string }) => {
      toast.info(title, { description: options?.body })

      if (permission === 'granted' && 'Notification' in window) {
        new Notification(title, {
          body: options?.body,
          icon: options?.icon || '/favicon.ico',
          tag: options?.tag || 'digitalizate',
        })
      }
    },
    [permission],
  )

  const scheduleReminder = useCallback((hours: number, message: string) => {
    if (typeof window === 'undefined') return
    const key = 'digitalizate_reminder'
    const existing = localStorage.getItem(key)
    if (existing) {
      const data = JSON.parse(existing)
      if (data.hours === hours && data.message === message) return
    }
    localStorage.setItem(key, JSON.stringify({ hours, message, scheduledAt: Date.now() }))
    toast.success(`Te recordaré en ${hours} hora${hours > 1 ? 's' : ''}`)
  }, [])

  const cancelReminder = useCallback(() => {
    localStorage.removeItem('digitalizate_reminder')
    toast.success('Recordatorio cancelado')
  }, [])

  return { permission, requestPermission, notify, scheduleReminder, cancelReminder }
}
