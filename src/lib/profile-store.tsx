'use client'

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from 'react'
import type { UserProfile, UserProgress, UserBadge } from '@/types/challenge'
import type { QuizScore } from '@/types/lesson'
import * as api from './api'
import { challenges } from '@/data/challenges'

interface ProfileContextType {
  profile: UserProfile | null
  progress: Record<string, UserProgress>
  badges: UserBadge[]
  quizScores: Record<string, QuizScore>
  updateProfile: (data: Partial<UserProfile>) => void
  startChallenge: (slug: string) => void
  completeStep: (slug: string, stepId: string) => void
  completeChallenge: (slug: string) => void
  addBadge: (badge: UserBadge) => void
  incrementShare: (challengeSlug: string) => void
  saveQuizScore: (slug: string, score: number, total: number) => void
  register: (email: string, name: string, businessName?: string) => Promise<string | null>
  login: (email: string) => Promise<string | null>
  logout: () => void
  isLoaded: boolean
  isOnline: boolean
}

const ProfileContext = createContext<ProfileContextType | null>(null)

const LS_PROFILE = 'dz_profile'
const LS_PROGRESS = 'dz_progress'
const LS_BADGES = 'dz_badges'
const LS_TOKEN = 'dz_token'
const LS_QUIZ_SCORES = 'dz_quiz_scores'

function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback }
  catch { return fallback }
}

function lsSet(key: string, data: unknown) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(key, JSON.stringify(data)) } catch {}
}

function mapApiProfile(apiProfile: any): UserProfile {
  return {
    id: apiProfile.id,
    name: apiProfile.name,
    businessName: apiProfile.business_name || '',
    businessType: apiProfile.business_type || '',
    email: apiProfile.email,
    level: apiProfile.level || 1,
    totalPoints: apiProfile.total_points || 0,
    currentStreak: apiProfile.current_streak || 0,
    longestStreak: apiProfile.longest_streak || 0,
    challengesCompleted: apiProfile.challenges_completed || 0,
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [progress, setProgress] = useState<Record<string, UserProgress>>({})
  const [badges, setBadges] = useState<UserBadge[]>([])
  const [quizScores, setQuizScores] = useState<Record<string, QuizScore>>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    setProfile(lsGet<UserProfile | null>(LS_PROFILE, null))
    setProgress(lsGet<Record<string, UserProgress>>(LS_PROGRESS, {}))
    setBadges(lsGet<UserBadge[]>(LS_BADGES, []))
    setQuizScores(lsGet<Record<string, QuizScore>>(LS_QUIZ_SCORES, {}))
    setIsLoaded(true)
  }, [])

  // If token exists, try to sync with API
  useEffect(() => {
    if (!isLoaded) return
    const token = lsGet<string | null>(LS_TOKEN, null)
    if (!token || profile) return

    // Try to fetch latest profile from API
    ;(async () => {
      const result = await api.getProfile()
      if (result.data && result.data.profile) {
        const mapped = mapApiProfile(result.data.profile)
        setProfile(mapped)
        lsSet(LS_PROFILE, mapped)
        setIsOnline(true)

        // Sync progress
        const progResult = await api.getProgress()
        if (progResult.data) {
          const progMap: Record<string, UserProgress> = {}
          progResult.data.progress.forEach((p: any) => {
            progMap[p.challenge_slug] = {
              challengeSlug: p.challenge_slug,
              status: p.status,
              currentStep: p.current_step,
              startedAt: p.started_at,
              completedAt: p.completed_at,
            }
          })
          setProgress(progMap)
          lsSet(LS_PROGRESS, progMap)

          const badgeList: UserBadge[] = (progResult.data.badges || []).map((b: any) => ({
            challengeSlug: b.badge_slug,
            badgeName: b.badge_name,
            unlockedAt: b.unlocked_at,
            sharedCount: b.shared_count || 0,
          }))
          setBadges(badgeList)
          lsSet(LS_BADGES, badgeList)
        }
      } else {
        // Token expired or invalid
        lsSet(LS_TOKEN, null)
      }
    })()
  }, [isLoaded])

  const register = useCallback(async (email: string, name: string, businessName?: string): Promise<string | null> => {
    const result = await api.register(email, name, businessName)
    if (result.error) return result.error
    if (result.data) {
      lsSet(LS_TOKEN, result.data.token)
      const mapped = mapApiProfile(result.data.profile)
      setProfile(mapped)
      lsSet(LS_PROFILE, mapped)
      setIsOnline(true)
      return null // success
    }
    return 'Error al registrar'
  }, [])

  const login = useCallback(async (email: string): Promise<string | null> => {
    const result = await api.login(email)
    if (result.error) return result.error
    if (result.data) {
      lsSet(LS_TOKEN, result.data.token)
      const mapped = mapApiProfile(result.data.profile)
      setProfile(mapped)
      lsSet(LS_PROFILE, mapped)
      setIsOnline(true)
      return null // success
    }
    return 'Error al iniciar sesión'
  }, [])

  const logout = useCallback(() => {
    lsSet(LS_TOKEN, null)
    setProfile(null)
    lsSet(LS_PROFILE, null)
  }, [])

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setProfile((prev) => {
      const base = prev || {
        id: crypto.randomUUID(), name: '', businessName: '', businessType: '',
        level: 1, totalPoints: 0, currentStreak: 0, longestStreak: 0, challengesCompleted: 0,
      }
      const updated: UserProfile = { ...base, ...data }
      lsSet(LS_PROFILE, updated)
      if (lsGet<string | null>(LS_TOKEN, null)) {
        api.updateProfile({
          name: data.name,
          businessName: data.businessName,
          businessType: data.businessType,
        }).then(res => {
          if (res.error) setIsOnline(false)
          else setIsOnline(true)
        })
      }
      return updated
    })
  }, [])

  const startChallenge = useCallback((slug: string) => {
    setProgress((prev) => {
      const entry: UserProgress = {
        challengeSlug: slug, status: 'started', currentStep: 1,
        startedAt: new Date().toISOString(),
      }
      const updated = { ...prev, [slug]: entry }
      lsSet(LS_PROGRESS, updated)
      if (lsGet<string | null>(LS_TOKEN, null)) {
        api.startChallenge(slug).then(r => { if (r.error) setIsOnline(false) })
      }
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
      lsSet(LS_PROGRESS, updated)
      if (lsGet<string | null>(LS_TOKEN, null)) {
        api.completeStep(slug, _stepId).then(r => { if (r.error) setIsOnline(false) })
      }
      return updated
    })
  }, [])

  const completeChallenge = useCallback((slug: string) => {
    const now = new Date().toISOString()
    setProgress((prev) => {
      const updated = {
        ...prev,
        [slug]: {
          challengeSlug: slug, status: 'completed' as const, currentStep: 0,
          startedAt: prev[slug]?.startedAt || now, completedAt: now,
        },
      }
      lsSet(LS_PROGRESS, updated)
      return updated
    })
    setProfile((prev) => {
      if (!prev) return prev
      const updated = {
        ...prev,
        challengesCompleted: prev.challengesCompleted + 1,
        totalPoints: prev.totalPoints + 100,
      }
      lsSet(LS_PROFILE, updated)
      return updated
    })
    if (lsGet<string | null>(LS_TOKEN, null)) {
      // We need badgeName - find from challenges data
      // challenges is imported at top
      const ch = challenges.find((c: any) => c.slug === slug)
      api.completeChallenge(slug, ch?.badgeName).then(r => {
        if (r.data?.profile) {
          setProfile(mapApiProfile(r.data.profile))
        }
        if (r.error) setIsOnline(false)
        else setIsOnline(true)
      })
    }
  }, [])

  const addBadge = useCallback((badge: UserBadge) => {
    setBadges((prev) => {
      if (prev.some((b) => b.challengeSlug === badge.challengeSlug)) return prev
      const updated = [...prev, badge]
      lsSet(LS_BADGES, updated)
      return updated
    })
  }, [])

  const incrementShare = useCallback((challengeSlug: string) => {
    setBadges((prev) => {
      const updated = prev.map((b) =>
        b.challengeSlug === challengeSlug ? { ...b, sharedCount: b.sharedCount + 1 } : b
      )
      lsSet(LS_BADGES, updated)
      return updated
    })
  }, [])

  const saveQuizScore = useCallback((slug: string, score: number, total: number) => {
    setQuizScores((prev) => {
      const updated = {
        ...prev,
        [slug]: { score, total, completedAt: new Date().toISOString() },
      }
      lsSet(LS_QUIZ_SCORES, updated)
      return updated
    })
  }, [])

  return (
    <ProfileContext.Provider value={{
      profile, progress, badges, quizScores, updateProfile, startChallenge,
      completeStep, completeChallenge, addBadge, incrementShare, saveQuizScore,
      register, login, logout, isLoaded, isOnline,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}