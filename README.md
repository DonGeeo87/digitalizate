# Digitalízate 🚀

**Tu entrenador personal de digitalización. 5 minutos al día. Sin teoría. Pura acción.**

Digitalízate es una plataforma de micro-desafíos que transforma emprendedores latinos en dueños de negocios digitales. No es un curso, no es un LMS — es un sistema de acción diaria que empuja a hacer UNA cosa concreta que mueva el negocio.

## Filosofía

> "No enseñamos digitalización. Desafiamos al emprendedor a hacer UNA cosa que mueva su negocio."

Menos teoría, más acción. Cada desafío se completa en 5 minutos. Cada badge compartible es un logro real.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS 4 + shadcn/ui |
| Backend | Hono (Edge-ready, TypeScript) |
| DB + Auth | Supabase (PostgreSQL + Auth + Storage) |
| Badges/Imágenes | Canva Engine (Docker VPS) |
| Audio | Edge-TTS → ElevenLabs (prod) |
| Validación IA | MiMo Code / Groq |
| Hosting | Vercel |

## Estructura del Proyecto

```
digitalizate/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Landing page
│   ├── layout.tsx          # Layout global
│   ├── desafio/
│   │   └── [slug]/
│   │       └── page.tsx    # Flow del desafío
│   ├── dashboard/
│   │   └── page.tsx        # Perfil + progreso
│   └── admin/
│       └── page.tsx        # Panel admin (futuro)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── challenge/          # Challenge Flow components
│   ├── badge/              # Badge generator
│   └── landing/            # Landing page components
├── lib/
│   ├── profile-store.ts    # Estado del perfil
│   ├── challenges.ts       # Datos de desafíos
│   └── supabase/           # Supabase client (futuro)
├── public/
│   └── badges/             # Badges generados
└── docs/
    ├── ROADMAP.md
    └── CHANGELOG.md
```

## Primeros Pasos

```bash
npm install
npm run dev
```

## Licencia

Privado — Código Guerrero Dev