export interface ChallengeStep {
  id: string
  title: string
  description: string
  actionType: 'confirm' | 'choice' | 'external_link' | 'quiz' | 'photo'
  actionUrl?: string
  buttonText?: string
  choices?: StepChoice[]
  imageUrl?: string
}

export interface StepChoice {
  text: string
  next: string
}

export interface Challenge {
  id: string
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  difficulty: number // 1-5
  estimatedMinutes: number
  category: 'presencia' | 'ventas' | 'marketing' | 'herramientas'
  iconEmoji: string
  badgeName: string
  badgeImageUrl?: string
  isActive: boolean
  hasLesson?: boolean
  isCheckpoint?: boolean
  moduleName?: string // 'presencia' | 'ventas' | 'marketing' | 'herramientas'
  steps: ChallengeStep[]
  alternatives?: { title: string; description: string; iconEmoji: string }[]
  validationType: 'confirm' | 'upload' | 'quiz'
  audioUrl?: string
  orderIndex: number
}

export interface UserProfile {
  id: string
  name: string
  businessName: string
  businessType: string
  email?: string
  level: number
  totalPoints: number
  currentStreak: number
  longestStreak: number
  challengesCompleted: number
  lastChallengeDate?: string
  avatarUrl?: string
}

export interface UserProgress {
  challengeSlug: string
  status: 'started' | 'completed' | 'abandoned'
  currentStep: number
  startedAt: string
  completedAt?: string
}

export interface UserBadge {
  challengeSlug: string
  badgeName: string
  badgeImageUrl?: string
  unlockedAt: string
  sharedCount: number
}