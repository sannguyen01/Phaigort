# /project:light-ground-migration

One-time execution: migrate the visual register from dark/heavy ground to light, mineral-warm ground across the entire Phaigort UI.

## Context
Phaigort's visual identity is grounded in geological consciousness and Iberian trading heritage — warm parchment surfaces, oxidised gold accents, deep mineral text. This migration converts any legacy dark-first or neutral-cold styling to the warm light register.

## Steps
1. **Surface migration** — replace all `#000`, `#111`, `#1a1a1a`, cold-gray backgrounds with the warm surface token stack (`--color-bg`, `--color-surface`, `--color-surface-2`, `--color-surface-offset`)
2. **Accent migration** — replace any blue/purple/generic teal accents with the Phaigort gold/amber/oxidised palette defined in `tailwind.config.ts`
3. **Text migration** — ensure primary text uses warm dark (`--color-text`), not pure black; muted text uses warm gray (`--color-text-muted`)
4. **Image overlays** — convert any cold-tone overlays on hero/editorial images to warm sepia or amber-tinted gradients
5. **Dark mode check** — verify the warm register holds in dark mode; dark surfaces should feel like aged parchment or oxidised metal, not generic charcoal
6. **Typography register** — confirm display font (Boska or equivalent serif) is applied at all headings `--text-xl` and above; body font (Satoshi or equivalent) handles everything below

## Output
- Full list of files modified
- Before/after token mapping summary
- Confirmation that no cold-register values remain

## Run frequency
One-time execution only. Do not re-run after the initial migration is confirmed complete.
