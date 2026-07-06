'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Lock, CheckCircle2, Sparkles } from 'lucide-react'
import { useProfile } from '@/lib/profile-store'
import { SKILL_TREE, getNodeStatus } from '@/data/skill-tree'
import type { SkillBranch, SkillNode } from '@/data/skill-tree'
import Link from 'next/link'

const TOTAL_NODES = 20

function BranchSection({ branch, progress }: { branch: SkillBranch; progress: Record<string, { status: string }> }) {
  const router = useRouter()

  function getNodeState(index: number) {
    const prevUnlocked = index === 0 || getNodeStatus(branch.nodes[index - 1], index - 1, progress, true) === 'unlocked'
    return getNodeStatus(branch.nodes[index], index, progress, prevUnlocked)
  }

  function handleNodeClick(node: SkillNode, state: string) {
    if (state === 'available') {
      const firstIncomplete = node.challengeSlugs.find((slug) => progress[slug]?.status !== 'completed')
      if (firstIncomplete) {
        router.push(`/desafio/${firstIncomplete}`)
      } else {
        router.push('/dashboard')
      }
    } else if (state === 'unlocked') {
      router.push('/dashboard')
    }
  }

  function getBorderColor(state: string) {
    if (state === 'unlocked') return `bg-gradient-to-b ${branch.color}`
    if (state === 'available') return `bg-gradient-to-b ${branch.color}`
    return 'bg-gray-700'
  }

  function getCircleStyle(state: string) {
    if (state === 'unlocked') {
      return `bg-gradient-to-br ${branch.color} shadow-lg`
    }
    if (state === 'available') {
      return `border-2 border-current bg-white/5`
    }
    return 'bg-gray-800 border-2 border-gray-700 opacity-50'
  }

  function getTextColor(state: string) {
    if (state === 'unlocked') return 'text-white'
    if (state === 'available') return 'text-gray-300'
    return 'text-gray-600'
  }

  function getDescriptionColor(state: string) {
    if (state === 'unlocked') return 'text-gray-200'
    if (state === 'available') return 'text-gray-400'
    return 'text-gray-600'
  }

  return (
    <div className="glass rounded-2xl overflow-hidden animate-fade-in">
      <div className={`h-1.5 w-full bg-gradient-to-r ${branch.color}`} />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${branch.color} flex items-center justify-center text-lg shadow-lg`}>
            {branch.iconEmoji}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{branch.name}</h2>
            <p className="text-xs text-gray-400">{branch.description}</p>
          </div>
        </div>

        <div className="relative">
          {branch.nodes.map((node, i) => {
            const state = getNodeState(i)
            const isLast = i === branch.nodes.length - 1

            return (
              <div key={node.id} className="flex gap-4">
                {/* Vertical line + circle */}
                <div className="flex flex-col items-center shrink-0">
                  <button
                    onClick={() => handleNodeClick(node, state)}
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-300 shrink-0 ${
                      state === 'unlocked'
                        ? `${getCircleStyle(state)} scale-100`
                        : state === 'available'
                        ? `${getCircleStyle(state)} scale-100 hover:scale-105`
                        : `${getCircleStyle(state)} scale-95`
                    } ${state !== 'locked' ? 'cursor-pointer' : 'cursor-default'}`}
                    style={state === 'available' ? { color: branch.color.includes('blue') ? '#3b82f6' : branch.color.includes('emerald') ? '#10b981' : branch.color.includes('orange') ? '#f97316' : '#a855f7' } : undefined}
                  >
                    {state === 'unlocked' ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : state === 'locked' ? (
                      <Lock className="w-4 h-4 text-gray-500" />
                    ) : (
                      <span>{node.iconEmoji}</span>
                    )}
                    {state === 'unlocked' && (
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${branch.color} opacity-30 blur-md`} />
                    )}
                  </button>
                  {!isLast && (
                    <div className={`w-0.5 h-8 ${getBorderColor(getNodeState(i + 1))} ${getNodeState(i + 1) === 'locked' ? 'opacity-30' : ''}`} />
                  )}
                </div>

                {/* Content */}
                <button
                  onClick={() => handleNodeClick(node, state)}
                  className={`flex-1 text-left py-3 pr-2 rounded-xl transition-all duration-200 ${
                    state === 'available' ? 'hover:bg-white/5' : state === 'unlocked' ? 'hover:bg-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-bold ${getTextColor(state)}`}>{node.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      state === 'unlocked'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : state === 'available'
                        ? 'bg-white/10 text-gray-400'
                        : 'bg-gray-800 text-gray-600'
                    }`}>
                      Nivel {node.level}
                    </span>
                  </div>
                  <p className={`text-xs ${getDescriptionColor(state)}`}>{node.description}</p>
                  {state === 'available' && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span className="text-[10px] font-semibold text-amber-400">Haz clic para empezar</span>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function HabilidadesPage() {
  const { progress, isLoaded } = useProfile()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl mx-auto animate-pulse bg-amber-500" />
          <div className="text-gray-400">Cargando habilidades...</div>
        </div>
      </div>
    )
  }

  let unlockedCount = 0
  for (const branch of SKILL_TREE) {
    for (let i = 0; i < branch.nodes.length; i++) {
      const prevUnlocked = i === 0 || getNodeStatus(branch.nodes[i - 1], i - 1, progress, true) === 'unlocked'
      if (getNodeStatus(branch.nodes[i], i, progress, prevUnlocked) === 'unlocked') {
        unlockedCount++
      }
    }
  }

  const progressPct = Math.round((unlockedCount / TOTAL_NODES) * 100)

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0 hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Árbol de Habilidades</h1>
            <p className="text-xs text-gray-400">{unlockedCount} de {TOTAL_NODES} habilidades desbloqueadas</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 w-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_TREE.map((branch) => (
            <BranchSection key={branch.id} branch={branch} progress={progress} />
          ))}
        </div>
      </main>
    </div>
  )
}
