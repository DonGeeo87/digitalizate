export type QuestionType = 'true_false' | 'multiple_choice' | 'order_steps' | 'fill_blank'

export interface QuizQuestion {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  correctIndex?: number
  correctOrder?: string[]
  sentence?: string
  blankAnswer?: string
  explanation: string
}

export interface LessonPoint {
  icon: string
  title: string
  text: string
}

export interface LessonContent {
  challengeSlug: string
  title: string
  introHook: string
  keyPoints: LessonPoint[]
  summary: string
  quiz: QuizQuestion[]
}

export interface QuizScore {
  score: number
  total: number
  completedAt: string
}
