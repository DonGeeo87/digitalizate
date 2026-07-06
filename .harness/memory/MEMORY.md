# MEMORY

Shared team memory for the Digitalízate harness. Reins can write project-wide facts here; per-rein facts stay in the rein's own memory.

## Project

- Name: **Digitalízate** — micro-desafíos de 5 minutos para emprendedores latinos.
- Frontend: Next.js 16.2.9 (App Router) + React 19.2 + Tailwind 3.4 + shadcn/ui. ⚠️ **NOT the Next.js you know** — read `node_modules/next/dist/docs/` before writing.
- Backend: Express (ESM) + Postgres (`pg`) + JWT + `zod`. Lives in `backend/`, separate `package.json`.
- DB locally: `docker compose up -d` (Postgres).
- Hosting: Vercel (frontend only — backend separado).

## Conventions pinned here

- Default branch: `master`.
- Package manager: `npm` (lockfile = `package-lock.json`).
- No test suite yet — when added: **Vitest** (frontend), **node:test** (backend).
- UI library: shadcn/ui only. Don't introduce alternatives.
- State: React Context (`src/lib/profile-store.tsx`). No Redux/Zustand without explicit approval.

## Gotchas

- `lucide-react` is pinned at `^1.23.0` (very old) — be careful when importing icons; the API may differ from training data.
- `tailwind-merge` + `clsx` are the canonical way to merge classes; use the `cn()` helper.
- Backend is ESM — no `require()` inside `backend/src`.
- Supabase integration is planned but not present yet — don't introduce Supabase client calls until `backend-dev` wires the contract.

## Do not

- Don't push directly to `master`.
- Don't commit `.env` or secrets.
- Don't add new UI/component libraries.
- Don't migrate backend from ESM to CJS (or vice versa) without user approval.