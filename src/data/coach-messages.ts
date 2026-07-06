export interface CoachMessage {
  id: string
  trigger: 'first_challenge' | 'streak_3' | 'streak_7' | 'level_up' | 'module_complete' | 'checkpoint' | 'daily_return' | 'badge_unlock' | 'diagnostico_complete'
  emoji: string
  title: string
  message: string
  tip?: string
}

export const COACH_MESSAGES: CoachMessage[] = [
  {
    id: 'first_challenge',
    trigger: 'first_challenge',
    emoji: '🚀',
    title: '¡Primer desafío!',
    message: 'El primer paso es el más importante. No necesitas ser experto, solo empezar. Cada desafío que completes te acerca más a tener un negocio digital funcional.',
    tip: 'Concéntrate en un solo desafío a la vez. No hagas multitarea.',
  },
  {
    id: 'streak_3',
    trigger: 'streak_3',
    emoji: '🔥',
    title: '¡3 días seguidos!',
    message: 'Tres días seguidos es señal de que estás tomando esto en serio. La consistencia es lo que separa a quienes lo logran de quienes lo intentan.',
    tip: 'Si sientes que vas muy rápido, está bien. Mejor avanzar que perfecto.',
  },
  {
    id: 'streak_7',
    trigger: 'streak_7',
    emoji: '⭐',
    title: '¡Una semana completa!',
    message: '¡7 días! Ya es un hábito. En este punto tu negocio ya debería tener cambios visibles. ¿Has notado la diferencia?',
    tip: 'Revisa tu Google Maps o WhatsApp Business para ver si algo cambió.',
  },
  {
    id: 'level_up',
    trigger: 'level_up',
    emoji: '⬆️',
    title: '¡Subiste de nivel!',
    message: 'Cada nivel desbloquea nuevas habilidades en tu árbol. Revisa qué puedes aprender ahora y planifica tu próximo movimiento.',
    tip: 'Los niveles más altos tienen desafíos más avanzados. No los saltes.',
  },
  {
    id: 'module_complete',
    trigger: 'module_complete',
    emoji: '🏆',
    title: '¡Módulo completado!',
    message: 'Acabas de completar un módulo completo. Eso significa que dominas un área clave de la digitalización. Tómate un momento para celebrar.',
    tip: 'Comparte tu logro en redes. Inspirar a otros también es parte del crecimiento.',
  },
  {
    id: 'checkpoint',
    trigger: 'checkpoint',
    emoji: '✅',
    title: 'Checkpoint alcanzado',
    message: 'Los checkpoints son para reflexionar, no solo para avanzar. Revisa lo que has aprendido y ajusta el rumbo si es necesario.',
    tip: 'Responde con honestidad en los checkpoints. Son para ti, no para nadie más.',
  },
  {
    id: 'daily_return',
    trigger: 'daily_return',
    emoji: '👋',
    title: '¡Bienvenido de vuelta!',
    message: 'Cada día que vuelves, tu negocio crece un poco más. La digitalización no es un sprint, es una maratón de 28 días.',
    tip: 'Empieza por el desafío que dejaste pendiente ayer.',
  },
  {
    id: 'badge_unlock',
    trigger: 'badge_unlock',
    emoji: '🎖️',
    title: '¡Nuevo badge!',
    message: 'Has desbloqueado un nuevo badge. Cada insignia cuenta tu historia de transformación digital. Colecciónalas todas.',
    tip: 'Los badges se pueden compartir. Úsalos como prueba social en tu perfil.',
  },
  {
    id: 'diagnostico_complete',
    trigger: 'diagnostico_complete',
    emoji: '📋',
    title: 'Diagnóstico completado',
    message: 'Ya sabemos por dónde empezar. Tu módulo recomendado es el que más se ajusta a tu situación actual. Pero recuerda: tú decides el orden.',
    tip: 'Si un desafío te parece muy fácil, puedes saltarlo. Lo importante es avanzar.',
  },
]

export function getCoachMessage(trigger: CoachMessage['trigger']): CoachMessage | undefined {
  return COACH_MESSAGES.find((m) => m.trigger === trigger)
}
