# CLAUDE.md — Phaigort Website

## Project Identity
Phaigort is a "Wonderhouse of Material Consciousness" — a curator of geological
rarities, precious metals, historical artefacts, and contemporary material innovations.
Visual identity draws from 15th–18th-century Iberian trading heritage (Garcia de Orta /
Portuguese natural-history tradition). The brand is not a jewellery store. It is a
knowledge-driven material institution — closer to a private research institution than
a retail site.

Positioning: Uncompromising material authority, quiet prestige, collector-grade
intelligence. "For the genuinely curious."

## Tech Stack
- Framework: Next.js 14, App Router, TypeScript (strict mode)
- Styling: Tailwind CSS v3 + CSS custom properties (tokens in globals.css)
- Animation: Framer Motion — slow and deliberate only. 600–900ms ease-out. No bouncing.
- Fonts: Cardo (display/headlines) + Garet (UI/body) — PRIMARY STACK
  - Legacy variables --font-jost / --font-cormorant / --font-inter loaded for backward compat only
- Deployment: Vercel (zero-config)
- Package manager: pnpm

## Design System — 12-Tone Monochromatic Scale
No warm tones. No blue cast. No accent color. Pure geological achromatic depth.
Compose pages as a descent into depth: darkest tones (T-01→T-03) anchor large fields;
lightest tones (T-10→T-12) carry highest-value text. Never reverse this.

| Token | Hex      | Name              | Tailwind alias | Primary use                        |
|-------|----------|-------------------|----------------|------------------------------------|
| T-01  | #0A0A0A  | Void Obsidian     | `bg-ground`    | Page field, packaging, ground      |
| T-02  | #141414  | Abyssal Carbon    | `bg-t02`       | Hero section backgrounds           |
| T-03  | #1C1C1C  | Void Ink          | `bg-stone`     | Navigation, UI containers          |
| T-04  | #2E2E2E  | Iron Veil         | `bg-t04`       | Dividers, secondary surfaces       |
| T-05  | #3D3D3D  | Slate Cipher      | `bg-t05`       | Caption backgrounds, product cards |
| T-06  | #525252  | Graphite Stratum  | —              | Secondary text, metadata           |
| T-07  | #7A7A7A  | Dust of Ages      | `text-muted`   | Tertiary text, timestamps          |
| T-08  | #A8A8A8  | Mineral Quartz    | —              | Body copy support, inactive UI     |
| T-09  | #C8C8C8  | Platinum Mist     | `text-platinum`| Ruled lines, fine ornamental       |
| T-10  | #DEDEDE  | Sterling Breath   | —              | Subheadings, secondary headings    |
| T-11  | #F2F2F2  | White Void        | `text-ink-body`| Primary body copy                  |
| T-12  | #FAFAFA  | Pure Aperture     | `text-ink`     | Display headlines, logo on dark    |

### CSS Semantic Tokens (consume these in components)
```
--color-bg           → var(--t01)   Void Obsidian — page ground
--color-surface      → var(--t03)   Void Ink — elevated surfaces
--color-dark         → var(--t02)   Abyssal Carbon — hero layer
--color-text         → var(--t12)   Pure Aperture — display text / logo
--color-text-body    → var(--t11)   White Void — body copy
--color-text-muted   → var(--t07)   Dust of Ages — captions / metadata
--color-text-faint   → var(--t06)   Graphite Stratum — inactive / ghost
--color-rule         → var(--t09)   Platinum Mist — divider lines
```

### Domain Tone Mapping
Each domain must feel like a distinct room in the same house:
| Domain                  | Ground tone      | Headline tone     |
|------------------------|------------------|-------------------|
| Geological Rarities    | T-02 #141414     | T-12 #FAFAFA      |
| Historical Artefacts   | T-04 #2E2E2E     | T-10 #DEDEDE      |
| Precious Metals        | T-03 #1C1C1C     | T-09 #C8C8C8      |
| Contemporary Innovations| T-05 #3D3D3D    | T-11 #F2F2F2      |

### Ghost Button Rule
All buttons are ghost style ONLY:
- Border: `1px solid rgba(250, 250, 250, 0.25)`
- Background: transparent
- Text: T-12 `#FAFAFA`
- Hover: border opacity → 50%. No fill change. No colour change.

### Surface Texture
Apply `.grain-field` class (defined in globals.css) to hero and primary ground sections.
This renders an SVG fractal-noise grain at ~5% opacity — simulating SEM gemstone
texture. The grain must be nearly invisible at normal viewing distance.

### Photography Rules
- Photography of gemstones, specimens, and artefacts is **required** on Homepage and sub-pages
- Shot against neutral-black fields only — T-01 `#0A0A0A` or T-02 `#141414` backgrounds
- No warm gels, no ambient blue cast, no reflective coloured surfaces in frame
- The object itself is the only permitted light source in the composition
- Hero section: full-bleed specimen photography with slow parallax and radial mask is the canonical treatment
- Domain cards (DomainsGrid): each domain must have a representative image mapped from `/hero/` or `/story/`
- All domain images must use `next/image` with `fill`, `sizes`, and descriptive `alt` text

## PROHIBITED — DO NOT USE, DO NOT REINTRODUCE
These are permanently removed from the Phaigort design system:
- ~~warm gold / amber / tan: #C9A55A~~ → DELETED (any warm tone is forbidden)
- ~~royal-navy: #1A2851~~ → DELETED (Void Obsidian #0A0A0A is the absolute ground)
- ~~coral: #FF6B4A~~ → DELETED (deprecated aliases now map to neutral greys)
- ~~decorative illustration or pattern in any domain~~ → DELETED
- ~~more than two typeface weights on any single page~~ → RULE

If you see any warm hex value (orange, amber, tan, gold cast) in a component, replace it.

## Typography System
Three optical registers — never deviate:

| Register  | Weight       | Tracking      | Color  | Use                                    |
|-----------|-------------|---------------|--------|----------------------------------------|
| Display   | Ultra-light | +80 to +120   | T-12   | Brand statements, hero headlines       |
| Editorial | Regular     | Normal        | T-11   | Domain intros, narrative body copy     |
| Reference | Mono-spaced | Narrow        | T-07   | Provenance data, specs, metadata       |

Primary font stack:
- `font-display` → Cardo — display headlines, hero text, philosophical statements ≥24px
- `font-ui` → Garet — navigation, body copy, labels, buttons, metadata

Fluid type scale (CSS custom properties):
| Token       | Range                             | Use                       |
|-------------|-----------------------------------|---------------------------|
| --text-hero | clamp(3rem, 0.5rem + 7vw, 8rem)  | Hero H1 ONLY              |
| --text-2xl  | clamp(2rem, 1.2rem + 2.5vw, 3.5rem) | Section anchor headlines |
| --text-base | clamp(1rem, 0.95rem + 0.25vw, 1.125rem) | Body copy               |
| --text-xs   | clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem) | Labels, nav, eyebrow  |

Rules: Body copy = `--text-base`. NEVER `--text-lg` for body.
Labels/nav = `--text-xs` + `letter-spacing: 0.12em` + `text-transform: uppercase`.

## Homepage Section Sequence (src/app/page.tsx)
Mount in this exact order:
1. `<Hero />`            — 100dvh, necklace/specimen photography permitted, botanical pattern overlay
2. `<Philosophy />`      — centred editorial text, max-width 640px, dark ground
3. `<MaterialStory />`   — two-column: copy left, arch-masked image right
4. `<Statement />`       — three numbered pillars (01 / 02 / 03), T-09 numbers
5. `<ManifestoMarquee />`— centred Cardo italic, T-09 ruled lines above/below
6. `<BrandPremise />`    — two-column: editorial copy left, T-12 script logotype right
7. `<DomainsGrid />`     — 2×2 grid, domain-specific tone mapping above
8. `<PrivateAccessCTA />`— T-02 Abyssal Carbon background, single ghost CTA

## Architecture Principles
- Server Components by default; `'use client'` only for interactive/animated elements
- Components: `ui/` (atoms), `layout/` (structure), `sections/` (page-level blocks)
- No component exceeds 200 lines; extract sub-components when approaching limit
- All images: `next/image` with `alt`, `width`, `height`, `loading="lazy"` (or `priority` above fold)
- Arch-mask (`.arch-mask`): `border-radius: 50% 50% 0 0 / 30% 30% 0 0` — all stone photography containers
- No lorem ipsum — real Phaigort brand copy only

## Site Map
- `/` → Homepage (Wonderhouse entry experience)
- `/collections` → Gemstones, metals, artefacts, innovations
- `/material-consciousness` → Brand philosophy + geological science
- `/archive` → Historical artefacts + provenance records
- `/atelier` → Custom acquisition + consultation
- `/contact` → Direct inquiry form

## Coding Standards
- Strict TypeScript, no `any`
- All components export named + default
- Tailwind class order: layout → spacing → typography → color → effects
- Run `pnpm lint && pnpm build` before every commit
- Commit format: `feat|fix|style|content: short description`
