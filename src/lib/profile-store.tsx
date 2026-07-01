'use client'

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from 'react'
import type { UserProfile, UserProgress, UserBadge } from '@/types/challenge'

interface ProfileContextType {
  profile: UserProfile | null
  progress: Record<string, UserProgress>
  badges: UserBadge[]
  updateProfile: (data: Partial<UserProfile>) => void
  startChallenge: (slug: string) => void
  completeStep: (slug: string, stepId: string) => void
  completeChallenge: (slug: string) => void
  addBadge: (badge: UserBadge) => void
  incrementShare: (challengeSlug: string) => void
  isLoaded: boolean
}

const ProfileContext = createContext<ProfileContextType | null>(null)

const STORAGE_KEY = 'digitalizate_profile'
const PROGRESS_KEY = 'digitalizate_progress'
const BADGES_KEY = 'digitalizate_badges'

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key: string, data: unknown) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // localStorage lleno o privado — ignoramos
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [progress, setProgress] = useState<Record<string, UserProgress>>({})
  const [badges, setBadges] = useState<UserBadge[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setProfile(loadFromStorage<UserProfile | null>(STORAGE_KEY, null))
    setProgress(loadFromStorage<Record<string, UserProgress>>(PROGRESS_KEY, {}))
    setBadges(loadFromStorage<UserBadge[]>(BADGES_KEY, []))
    setIsLoaded(true)
  }, [])

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setProfile((prev) => {
      const base = prev || {
        id: crypto.randomUUID(), name: '', businessName: '', businessType: '',
        level: 1, totalPoints: 0, currentStreak: 0, longestStreak: 0, challengesCompleted: 0,
      }
      const updated: UserProfile = { ...base, ...data }
      saveToStorage(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  const startChallenge = useCallback((slug: string) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [slug]: { challengeSlug: slug, status: 'started' as const, currentStep: 1, startedAt: new Date().toISOString() },
      }
      saveToStorage(PROGRESS_KEY, updated)
      return updated
    })
  }, [])

  const completeStep = useCallback((slug: string, _stepId: string) => {
    setProgress((prev) => {
      const current = prev[slug]
      if (!current || current.status === 'completed') return prev
      const updated = {
        ...prev,
        [slug]: { ...current, currentStep: current.currentStep + 1 },
      }
      saveToStorage(PROGRESS_KEY, updated)
      return updated
    })
  }, [])

  const completeChallenge = useCallback((slug: string) => {
    const now = new Date().toISOString()
    setProgress((prev) => {
      const updated = {
        ...prev,
        [slug]: { challengeSlug: slug, status: 'completed' as const, currentStep: 0, startedAt: prev[slug]?.startedAt || now, completedAt: now },
      }
      saveToStorage(PROGRESS_KEY, updated)
      return updated
    })
    setProfile((prev) => {
      if (!prev) return prev
      const updated = { ...prev, challengesCompleted: prev.challengesCompleted + 1, totalPoints: prev.totalPoints + 100 }
      saveToStorage(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  const addBadge = useCallback((badge: UserBadge) => {
    setBadges((prev) => {
      if (prev.some((b) => b.challengeSlug === badge.challengeSlug)) return prev
      const updated = [...prev, badge]
      saveToStorage(BADGES_KEY, updated)
      return updated
    })
  }, [])

  const incrementShare = useCallback((challengeSlug: string) => {
    setBadges((prev) => {
      const updated = prev.map((b) => (b.challengeSlug === challengeSlug ? { ...b, sharedCount: b.sharedCount + 1 } : b))
      saveToStorage(BADGES_KEY, updated)
      return updated
    })
  }, [])

  return (
    <ProfileContext.Provider value={{ profile, progress, badges, updateProfile, startChallenge, completeStep, completeChallenge, addBadge, incrementShare, isLoaded }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}