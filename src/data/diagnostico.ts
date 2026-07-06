export interface DiagnosticoPregunta {
  id: string
  pregunta: string
  opciones: {
    texto: string
    puntaje: number
    modulo: 'presencia' | 'ventas' | 'marketing' | 'herramientas' | null
  }[]
}

export interface DiagnosticoResultado {
  nivel: 'principiante' | 'intermedio' | 'avanzado'
  nivelNombre: string
  nivelDescripcion: string
  nivelEmoji: string
  moduloRecomendado: 'presencia' | 'ventas' | 'marketing' | 'herramientas'
  moduloNombre: string
  puntajeTotal: number
  puntajeMaximo: number
}

export const DIAGNOSTICO_PREGUNTAS: DiagnosticoPregunta[] = [
  {
    id: 'd1',
    pregunta: '¿Tu negocio aparece en Google Maps cuando alguien busca?',
    opciones: [
      { texto: 'No, ni siquiera lo he revisado', puntaje: 0, modulo: 'presencia' },
      { texto: 'Sí, pero sin fotos ni horarios', puntaje: 1, modulo: 'presencia' },
      { texto: 'Sí, completo con fotos, horario y reseñas', puntaje: 2, modulo: null },
      { texto: 'Sí, y respondo reseñas regularmente', puntaje: 3, modulo: null },
    ],
  },
  {
    id: 'd2',
    pregunta: '¿Cómo aceptas pagos de tus clientes?',
    opciones: [
      { texto: 'Solo efectivo o transferencia', puntaje: 0, modulo: 'ventas' },
      { texto: 'A veces con MercadoPago o link de pago', puntaje: 1, modulo: 'ventas' },
      { texto: 'Siempre con link de pago o POS', puntaje: 2, modulo: null },
      { texto: 'Tienda online con múltiples métodos', puntaje: 3, modulo: null },
    ],
  },
  {
    id: 'd3',
    pregunta: '¿Con qué frecuencia publicas contenido de tu negocio en redes?',
    opciones: [
      { texto: 'Casi nunca, no tengo tiempo', puntaje: 0, modulo: 'marketing' },
      { texto: 'Una vez a la semana, sin plan', puntaje: 1, modulo: 'marketing' },
      { texto: '2-3 veces por semana con contenido variado', puntaje: 2, modulo: null },
      { texto: 'A diario, con calendario y estrategia', puntaje: 3, modulo: null },
    ],
  },
  {
    id: 'd4',
    pregunta: '¿Tienes organizados los archivos y datos de tu negocio?',
    opciones: [
      { texto: 'Todo en mi celular, nada organizado', puntaje: 0, modulo: 'herramientas' },
      { texto: 'Algo en Drive, pero desordenado', puntaje: 1, modulo: 'herramientas' },
      { texto: 'Drive organizado con carpetas', puntaje: 2, modulo: null },
      { texto: 'Sistema completo con backups y seguridad', puntaje: 3, modulo: null },
    ],
  },
  {
    id: 'd5',
    pregunta: '¿Usas WhatsApp Business con catálogo y respuestas automáticas?',
    opciones: [
      { texto: 'Uso WhatsApp normal, sin cuenta business', puntaje: 0, modulo: 'presencia' },
      { texto: 'Tengo WhatsApp Business pero sin configurar', puntaje: 1, modulo: 'presencia' },
      { texto: 'WhatsApp Business con perfil completo', puntaje: 2, modulo: null },
      { texto: 'WhatsApp Business con catálogo y automatizaciones', puntaje: 3, modulo: null },
    ],
  },
]

export function calcularDiagnostico(respuestas: Record<string, number>): DiagnosticoResultado {
  const puntajeTotal = Object.values(respuestas).reduce((sum, v) => sum + v, 0)
  const puntajeMaximo = DIAGNOSTICO_PREGUNTAS.length * 3

  const modVotos: Record<string, number> = { presencia: 0, ventas: 0, marketing: 0, herramientas: 0 }
  DIAGNOSTICO_PREGUNTAS.forEach((p) => {
    const idx = respuestas[p.id]
    if (idx !== undefined) {
      const opcion = p.opciones[idx]
      if (opcion.modulo) {
        modVotos[opcion.modulo] = (modVotos[opcion.modulo] || 0) + 1
      }
    }
  })

  let moduloRecomendado: 'presencia' | 'ventas' | 'marketing' | 'herramientas' = 'presencia'
  let maxVotos = 0
  for (const [mod, votos] of Object.entries(modVotos)) {
    if (votos > maxVotos) {
      maxVotos = votos
      moduloRecomendado = mod as 'presencia' | 'ventas' | 'marketing' | 'herramientas'
    }
  }

  const modNombres: Record<string, string> = {
    presencia: 'Presencia Digital',
    ventas: 'Ventas y Pagos',
    marketing: 'Marketing Digital',
    herramientas: 'Herramientas',
  }

  let nivel: 'principiante' | 'intermedio' | 'avanzado'
  let nivelNombre: string
  let nivelDescripcion: string
  let nivelEmoji: string

  if (puntajeTotal <= 4) {
    nivel = 'principiante'
    nivelNombre = 'Principiante Digital'
    nivelDescripcion = 'Estás empezando. No te preocupes, todos empezamos así. Vamos paso a paso.'
    nivelEmoji = '🌱'
  } else if (puntajeTotal <= 9) {
    nivel = 'intermedio'
    nivelNombre = 'En Progreso'
    nivelDescripcion = 'Ya tienes algunas bases. Vamos a fortalecer lo que te falta.'
    nivelEmoji = '🔥'
  } else {
    nivel = 'avanzado'
    nivelNombre = 'Casi Experto'
    nivelDescripcion = 'Tienes buena base digital. Vamos a pulir los detalles y automatizar.'
    nivelEmoji = '🚀'
  }

  return {
    nivel,
    nivelNombre,
    nivelDescripcion,
    nivelEmoji,
    moduloRecomendado,
    moduloNombre: modNombres[moduloRecomendado],
    puntajeTotal,
    puntajeMaximo,
  }
}
