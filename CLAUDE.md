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
- Fonts: Bodoni Moda (headings/display), EB Garamond (body/ui) — Google Fonts
- Deployment: Vercel (zero-config)
- Package manager: pnpm

## Brand Design Tokens (enforce in tailwind.config.ts)
- platinum: #F8F9FB       (primary bg — Platinum White)
- royal-navy: #1A2851     (primary text — Royal Navy)
- navy: #1A2851           (legacy alias for royal-navy)
- deep-navy: #0F172A      (secondary bg — Charcoal Navy, DarkFieldStage)
- silver: #8B9DC3         (secondary text — Crystalline Silver)
- coral: #FF6B4A          (primary accent, CTAs — Coral Reef, 5-8% usage)
- coral-reef: #FF6B4A     (alias for coral)
- sapphire: #0F52BA       (secondary accent, links — Sapphire Blue)
- emerald: #1B4332        (positive signals)

## Color Coverage Rules
- Platinum: 60-75% of any composition (light, airy breathing space)
- Royal Navy: 40-50% as text and DarkFieldStage blocks
- Coral: 5-8% only — life signal, CTAs, discovery markers

## Typography Rules
- Bodoni Moda: headings, display text, logo text — bold/semibold, tight tracking
- EB Garamond: body copy, UI elements, captions — clean, readable serif
- Logo treatment: uppercase, tracking-[0.25em], font-medium weight

## Layout Governance
- All spacing must be multiples of 8px (Tailwind: 2=8px, 4=16px, 8=32px)
- Use Section, Stack, Container primitives. No ad-hoc py-* on top-level sections.
- No popups, no persistent cart, no urgency timers — ever.
- Void space (40–50%) is intentional. Never fill empty quadrants "to use space."

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
