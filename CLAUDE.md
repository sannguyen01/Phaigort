# CLAUDE.md — Phaigort Website

## Project Identity
Phaigort is a "Wonderhouse of Material Consciousness" — a curator of geological
rarities, precious metals, historical artifacts, and contemporary material innovations.
Visual identity draws from Iberian trading heritage (15th–18th century). The brand
is not a jewellery store. It is a knowledge-driven material institution.

Positioning: Accessible Premium with luxury appeals. Warm, inclusive, intellectually
curious — not exclusive or intimidating. "For the genuinely curious," not "for the chosen few."

## Tech Stack
- Framework: Next.js 14, App Router, TypeScript (strict mode)
- Styling: Tailwind CSS v3, no inline styles
- Animation: Framer Motion (purposeful only — no gratuitous motion)
- Fonts: Bodoni Moda (headings/display), EB Garamond (body/reading) — Google Fonts
- Deployment: Vercel (zero-config)
- Package manager: pnpm

## Brand Design Tokens (enforce in tailwind.config.ts)
- royal-navy / navy: #1A2851  (dark-field blocks — DarkFieldStage component)
- deep-navy: #0F172A          (deepest dark variant)
- platinum: #F8F9FB            (global background — the default canvas)
- silver: #8B9DC3              (secondary text, captions)
- coral / coral-reef: #FF6B4A  (primary accent, CTAs — 5-8% usage)
- sapphire: #0F52BA            (secondary accent, links)
- emerald: #1B4332             (positive signals)

## Color Philosophy (Platinum-First)
- Platinum (#F8F9FB) is the default background for the entire site
- Dark sections use DarkFieldStage component with text-platinum inversion
- Homepage rhythm: Dark (Hero) → Light (MaterialStory) → Dark (CollectionGrid) → Light (Philosophy)
- Subpages default to platinum background with royal-navy text
- Coral: 5-8% only — life signal, CTAs, discovery markers

## Typography Rules
- Bodoni Moda: headings, display text, logo text — editorial serif, high contrast
- EB Garamond: body copy, UI elements, captions — humanist serif, warm readability
- Logo treatment: uppercase, tracking-[0.25em], font-medium weight
- Body text: always use max-w-prose for 65-75 char line length

## Layout Governance
- Use Section component (py-16 md:py-24) for consistent vertical spacing
- Use Stack component for vertical rhythm (gap: sm=16px, md=32px, lg=64px, xl=96px)
- Use DarkFieldStage for dark-background sections (intensity: full/deep/medium)
- 8px grid rule: all spacing should be multiples of 8px
- No ad-hoc py-32/py-48 — use Section primitive instead

## Motion Governance
- Centralized motion helpers in src/lib/motion.ts (fadeUp, stagger, fade)
- Always gate animations with useReducedMotion
- Do not animate LCP elements on initial load
- Infinite animations (scroll indicator) must be gated behind reduced-motion check

## Architecture Principles
- Server Components by default; use 'use client' only for interactive elements
- All pages under src/app/ with layout.tsx and page.tsx convention
- Components split into: ui/ (atoms), layout/ (structure), sections/ (page blocks)
- No component exceeds 150 lines; extract sub-components aggressively
- All images use next/image with explicit width/height and alt text
- No lorem ipsum — use real Phaigort brand copy only

## Site Map
/ → Homepage (Wonderhouse entry experience)
/collections → Gemstones, metals, artifacts, innovations
/material-consciousness → Brand philosophy + geological science
/archive → Historical artifacts + provenance records
/atelier → Custom acquisition + consultation
/contact → Direct inquiry form

## Coding Standards
- Strict TypeScript, no `any`
- All components export named + default
- Tailwind class order: layout → spacing → typography → color → effects
- Run `pnpm lint && pnpm build` before every commit
- Commit format: feat|fix|style|content: short description
