# Digitalízate — Roadmap

## Fase 1: El Primer Desafío 🏁 (2 días)

**Objetivo:** Tener UN desafío funcional, completo, en producción. Validar el flow de usuario, el stack técnico y a MiMo como agente de código.

### Alcance
- [ ] Landing page con hero + CTA
- [ ] Flow del desafío #1: "Aparece en Google Maps" (5 pasos interactivos)
- [ ] Badge generado al completar
- [ ] Compartir por WhatsApp
- [ ] Perfil mínimo (nombre + negocio, localStorage)
- [ ] Deploy a Vercel

### Lo que escribe MiMo
- Landing page (`app/page.tsx`)
- Challenge Flow (`app/desafio/[slug]/page.tsx`)
- Step components (`components/challenge/`)
- Badge generator (`components/badge/`)
- Share button
- Perfil store (`lib/profile-store.ts`)

---

## Fase 2: Motor Completo ⚙️ (1 semana)

**Objetivo:** Pasar de localStorage a Supabase. Agregar 5 desafíos más. Audio.

### Alcance
- [ ] Supabase online: DB schema + Auth (Google OAuth)
- [ ] Migrar perfil + progreso de localStorage a PostgreSQL
- [ ] Desafío #2: "Configura tu horario en WhatsApp"
- [ ] Desafío #3: "Crea tu primer link de pago"
- [ ] Desafío #4: "Foto de perfil profesional"
- [ ] Desafío #5: "Responde reseñas de Google"
- [ ] Desafío #6: "Crea tu catálogo de WhatsApp"
- [ ] Audio Edge-TTS integrado en cada desafío
- [ ] Canva Engine: template de badge Digitalízate

---

## Fase 3: Gamificación 🎮 (1 semana)

**Objetivo:** Sistema de niveles, rachas, ranking. 15 desafíos en plataforma.

### Alcance
- [ ] 15 desafíos activos
- [ ] Sistema de niveles (1-10)
- [ ] Rachas diarias (streak)
- [ ] Ranking semanal por país
- [ ] Notificaciones push diarias
- [ ] Badges especiales por categoría completa
- [ ] Compartir badge = bonus de puntos

---

## Fase 4: Validación IA + Contenido 🤖 (2 semanas)

**Objetivo:** Validación automática de capturas. Recomendación inteligente de siguiente desafío.

### Alcance
- [ ] 30 desafíos en plataforma
- [ ] Validación de capturas con IA (MiMo/Groq)
- [ ] Recomendación de siguiente desafío según rubro
- [ ] Generación de audio batch
- [ ] Panel admin funcional
- [ ] Dashboard de analíticas

---

## Fase 5: Lanzamiento + Viralidad 🚀 (2 semanas)

**Objetivo:** 60 desafíos. Campaña de referidos. SEO. Embajadores.

### Alcance
- [ ] 60 desafíos completos
- [ ] Campaña de referidos (invita a otro negocio)
- [ ] Landing SEO por desafío (`/desafio/aparece-en-google-maps`)
- [ ] Meta Ads + WhatsApp viral
- [ ] Programa "Embajador Digitalízate"
- [ ] Planes de monetización (Pro, Equipo, White Label)

---

## Métricas de Éxito

| Métrica | F1 | F3 | F5 |
|---------|----|----|----|
| Desafíos completados/día | 10 | 500 | 5,000 |
| Usuarios registrados | 50 | 2,000 | 20,000 |
| Tasa finalización 1er desafío | — | >60% | >70% |
| Retención D7 | — | >30% | >40% |
| DAU | 10 | 300 | 3,000 |