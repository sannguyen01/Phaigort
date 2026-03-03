# CLAUDE.md — Phaigort Website

## Project Identity
Phaigort is a "Wonderhouse of Material Consciousness" — a curator of geological
rarities, precious metals, historical artifacts, and contemporary material innovations.
Visual identity draws from Iberian trading heritage (15th–18th century). The brand
is not a jewellery store. It is a knowledge-driven material institution.

## Tech Stack
- Framework: Next.js 14, App Router, TypeScript (strict mode)
- Styling: Tailwind CSS v3, no inline styles
- Animation: Framer Motion (purposeful only — no gratuitous motion)
- Fonts: Cormorant Garamond (headings), Inter (body) — Google Fonts
- Deployment: Vercel (zero-config)
- Package manager: pnpm

## Brand Design Tokens (enforce in tailwind.config.ts)
- obsidian: #0D0D0D      (primary bg)
- charcoal: #1A1A1A      (secondary bg)
- ivory: #F5F0E8         (primary text)
- cream: #FFFDF7         (headings)
- gold: #C9A86C          (accent, CTAs)
- garnet: #8B1A2F        (secondary accent)
- slate-stone: #3D3D3D   (borders, dividers)

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
