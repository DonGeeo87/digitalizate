<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project runs **Next.js 16.2.9** with **React 19.2** — APIs, conventions, and file structure may differ from your training data. Before writing any Next.js code:

- Read the relevant guide in `node_modules/next/dist/docs/`.
- Check `node_modules/next/CHANGELOG.md` for breaking changes since 15.
- Heed deprecation notices in compiler output.
- App Router is the default; do not introduce `pages/`.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

Plataforma de micro-desafíos de 5 minutos para emprendedores latinos — no es un LMS, es un sistema de acción diaria que empuja a hacer UNA cosa concreta.

## Setup commands

Frontend (raíz):
- Install: `npm install`
- Dev:      `npm run dev`     (Next.js 16 + Turbopack)
- Build:    `npm run build`
- Start:    `npm run start`   (producción)
- Lint:     `npm run lint`    (ESLint flat config — `eslint.config.mjs`)

Backend (`backend/`):
- Install:  `npm install`
- Dev:      `npm run dev`     (`node --watch src/server.js`)
- Start:    `npm run start`   (`node src/server.js`)
- Migrate:  `npm run migrate` (aplica `src/db/schema.sql` a Postgres)

Infra local (opcional): `docker compose up -d` para Postgres.

## Project layout

```
digitalizate/
├── src/                     # Next.js 16 App Router (frontend)
│   ├── app/                 # Rutas: page, /desafio/[slug], /dashboard
│   ├── components/          # ui/ (shadcn) + challenge/, badge/, lesson/, quiz/, landing/
│   ├── data/                # challenges.ts, lessons.ts (datos estáticos MVP)
│   ├── lib/                 # api.ts, profile-store.tsx, utils.ts
│   └── types/               # challenge.ts, lesson.ts
├── backend/                 # Express + Postgres (ESM)
│   └── src/
│       ├── server.js        # entrypoint
│       ├── routes/          # auth.js, profile.js, progress.js
│       ├── middleware/      # auth.js (JWT)
│       └── db/              # pool.js, schema.sql, migrate.js
├── docs/                    # ROADMAP.md, CHANGELOG.md
├── public/                  # assets estáticos (badges/, favicons)
└── docker-compose.yml       # Postgres local
```

## Code style

- **TypeScript strict** en frontend (`tsconfig.json`). Backend es JS ESM — mantener consistencia, no migrar sin decisión.
- **Naming**: kebab-case para archivos (`lesson-card.tsx`), PascalCase para componentes, camelCase para funciones/vars.
- **Imports**: usa los alias de `@/` (configurado en `tsconfig.json`); evita paths relativos largos.
- **Estilos**: Tailwind CSS 3.4 + `tailwind-merge` + `clsx`. Orden: layout → spacing → color → state.
- **UI base**: shadcn/ui en `src/components/ui/` — no agregues otra librería de componentes sin商议.
- **Backend**: `zod` para validar request bodies en `routes/*.js`. Errores → `res.status(4xx).json({ error })`.
- ESLint flat config se ejecuta antes de commit (`npm run lint` debe pasar limpio).

## Testing instructions

- **Unit/integration**: no hay suite todavía — cuando agregues, usa **Vitest** en frontend y **node:test** en backend (ya disponible sin instalar). Sigue el patrón `*.test.<ext>` junto al archivo.
- **Manual**: `npm run dev` + `npm run dev` en `backend/` con Postgres arriba; verifica flujo landing → /desafio/[slug] → /dashboard.
- **Antes de PR**: `npm run lint` y `npm run build` deben pasar.

## PR & commit conventions

- Branch desde `master`; nunca push directo a `master`.
- Commits: conventional commits (`feat:` / `fix:` / `docs:` / `refactor:` / `chore:` / `style:`).
- PR en español (descripción) cuando aplique; títulos en inglés corto.
- Si el cambio toca `backend/`, incluye un snippet del request/response en la descripción.

## Security

- **Nunca** commitear `.env` ni secretos — `.env` está en `.gitignore`.
- Backend usa JWT + bcryptjs. Secrets vía `process.env.JWT_SECRET`, nunca hardcoded.
- SQL: usar siempre el pool con queries parametrizadas (`pool.query(text, params)`); nada de string interpolation.
- Validar TODO input externo con `zod` antes de tocar la DB.
- Supabase keys (cuando se integren) — sólo `NEXT_PUBLIC_*` para el cliente; service-role sólo server-side.

## Stack reference

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16 (App Router) + React 19 + Tailwind 3 + shadcn/ui |
| Backend | Express (ESM) + Postgres (`pg`) + JWT (`jsonwebtoken`) + `zod` |
| Auth/DB (plan) | Supabase |
| Hosting | Vercel (frontend), backend separado |