# Digitalízate — Code Standards

The single source of truth for code conventions. Linked from each rein's `agent.md` so we don't duplicate rules.

## TypeScript (frontend)

- `tsconfig.json` has `strict: true` — keep it that way.
- No `any` unless justified by an inline comment.
- Prefer `type` over `interface` for object shapes; use `interface` only for extendable contracts.
- Exports: named exports preferred; default only for Next.js `page.tsx` / `layout.tsx`.
- Path alias: `@/*` → `src/*`. Never use `../../../`.

## Styling

- Tailwind 3.4 utility classes. Order in className: layout → spacing → size → color → state.
- Use the `cn()` helper in `src/lib/utils.ts` for conditional classes — never template-string conditional classes.
- New components compose the shadcn primitives in `src/components/ui/`. Don't fork them.

## Backend (Express ESM)

- `"type": "module"`. Use `import`/`export` only.
- Request body validation: `zod` schema → `safeParse` → 400 on failure with `{ error }`.
- DB calls: `await pool.query("... $1 ...", [value])`. Never build SQL with template literals over user input.
- Errors: `try/catch` at the route level; respond `4xx` for client errors, `5xx` for unexpected, never leak stack.
- Auth middleware (`backend/src/middleware/auth.js`) reads `Authorization: Bearer <jwt>`; reject if missing/invalid.

## Commits & branches

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `style:`, `test:`.
- One logical change per commit. Avoid "fix typo + refactor + new feature" combos.
- Branch from `master`. No direct pushes to `master`.

## Pre-commit checklist

- `npm run lint` clean.
- `npm run build` passes for frontend changes touching routing/config/types.
- `npm run migrate` idempotent for SQL changes.
- No `.env`, no secrets, no `node_modules` in the diff.