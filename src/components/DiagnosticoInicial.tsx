'use client'

import { useState } from 'react'
import { DIAGNOSTICO_PREGUNTAS, calcularDiagnostico } from '@/data/diagnostico'
import type { DiagnosticoResultado } from '@/data/diagnostico'

interface DiagnosticoInicialProps {
  onComplete: (resultado: DiagnosticoResultado) => void
  onSkip: () => void
}

export default function DiagnosticoInicial({ onComplete, onSkip }: DiagnosticoInicialProps) {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, number>>({})
  const [resultado, setResultado] = useState<DiagnosticoResultado | null>(null)

  const totalPreguntas = DIAGNOSTICO_PREGUNTAS.length
  const porcentaje = ((preguntaActual) / totalPreguntas) * 100
  const esUltimaPregunta = preguntaActual === totalPreguntas - 1

  const seleccionarOpcion = (indice: number) => {
    const pregunta = DIAGNOSTICO_PREGUNTAS[preguntaActual]
    const nuevasRespuestas = { ...respuestas, [pregunta.id]: indice }
    setRespuestas(nuevasRespuestas)

    setTimeout(() => {
      if (esUltimaPregunta) {
        const res = calcularDiagnostico(nuevasRespuestas)
        setResultado(res)
      } else {
        setPreguntaActual((p) => p + 1)
      }
    }, 300)
  }

  if (resultado) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 animate-fade-in">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 animate-slide-up">
            <div className="text-7xl mb-6">{resultado.nivelEmoji}</div>

            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
              Tu nivel
            </p>
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              {resultado.nivelNombre}
            </h2>
            <p className="text-gray-400 mb-6">{resultado.nivelDescripcion}</p>

            <div className="bg-white/5 rounded-xl p-4 mb-2 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Módulo recomendado</p>
              <p className="text-white font-bold text-xl">{resultado.moduloNombre}</p>
            </div>

            <p className="text-gray-500 text-sm mt-4 mb-8">
              Puntaje: {resultado.puntajeTotal}/{resultado.puntajeMaximo}
            </p>

            <button
              onClick={() => onComplete(resultado)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-3 rounded-xl transition-colors duration-200 mb-3"
            >
              Empezar con {resultado.moduloNombre}
            </button>

            <button
              onClick={onComplete.bind(null, resultado)}
              className="w-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white py-3 rounded-xl transition-colors duration-200"
            >
              Ver todos los desafíos
            </button>
          </div>
        </div>
      </div>
    )
  }

  const pregunta = DIAGNOSTICO_PREGUNTAS[preguntaActual]

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {preguntaActual === 0 && (
          <div className="text-center mb-6">
            <button
              onClick={onSkip}
              className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-200"
            >
              Saltar diagnóstico →
            </button>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-4">
          <p className="text-gray-500 text-sm mb-1">
            Pregunta {preguntaActual + 1} de {totalPreguntas}
          </p>

          <div className="w-full bg-white/5 rounded-full h-1.5 mb-6">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${porcentaje}%` }}
            />
          </div>

          <h2 className="text-white text-lg font-bold mb-6" key={pregunta.id}>
            {pregunta.pregunta}
          </h2>

          <div className="space-y-3">
            {pregunta.opciones.map((opcion, idx) => (
              <button
                key={idx}
                onClick={() => seleccionarOpcion(idx)}
                className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 rounded-xl p-4 text-gray-200 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {opcion.texto}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
