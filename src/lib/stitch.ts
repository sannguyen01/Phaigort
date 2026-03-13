/**
 * Google Stitch Integration Utilities
 *
 * Provides the mapping layer between Google Stitch / Material Design 3
 * design tokens and Phaigort's brand architecture. Use these utilities
 * when adapting Stitch-exported components to the Phaigort visual system.
 *
 * Pattern:
 *   1. Google Stitch designs a component using MD3 color roles.
 *   2. stitch-tokens.css overrides those roles globally at :root.
 *   3. For isolated overrides, spread getStitchScopeStyle() as inline style.
 *   4. Wrap Stitch-exported JSX in <StitchScope> to apply the token scope
 *      without polluting the global cascade.
 */

import type { CSSProperties, ReactNode } from "react";

/** Phaigort canonical brand palette. */
export const BRAND_PALETTE = {
  platinum:  "#F8F9FB",
  royalNavy: "#1A2851",
  deepNavy:  "#0F172A",
  silver:    "#8B9DC3",
  coral:     "#FF6B4A",
  sapphire:  "#0F52BA",
  emerald:   "#1B4332",
} as const;

export type BrandColor = keyof typeof BRAND_PALETTE;

/**
 * Maps Material Design 3 color-role CSS custom properties to Phaigort tokens.
 * Applying these as inline styles on a wrapper element scopes the override
 * to that subtree only — useful for isolated Stitch component adoption.
 */
export const STITCH_COLOR_MAP: Record<string, string> = {
  "--md-sys-color-primary":                 BRAND_PALETTE.coral,
  "--md-sys-color-on-primary":              BRAND_PALETTE.platinum,
  "--md-sys-color-primary-container":       BRAND_PALETTE.royalNavy,
  "--md-sys-color-on-primary-container":    BRAND_PALETTE.platinum,

  "--md-sys-color-secondary":               BRAND_PALETTE.sapphire,
  "--md-sys-color-on-secondary":            BRAND_PALETTE.platinum,
  "--md-sys-color-secondary-container":     BRAND_PALETTE.deepNavy,
  "--md-sys-color-on-secondary-container":  BRAND_PALETTE.platinum,

  "--md-sys-color-surface":                 BRAND_PALETTE.platinum,
  "--md-sys-color-on-surface":              BRAND_PALETTE.royalNavy,
  "--md-sys-color-surface-variant":         BRAND_PALETTE.royalNavy,
  "--md-sys-color-on-surface-variant":      BRAND_PALETTE.silver,
  "--md-sys-color-surface-container":       "rgba(26, 40, 81, 0.04)",
  "--md-sys-color-surface-container-high":  "rgba(26, 40, 81, 0.08)",

  "--md-sys-color-background":              BRAND_PALETTE.platinum,
  "--md-sys-color-on-background":           BRAND_PALETTE.royalNavy,

  "--md-sys-color-outline":                 "rgba(139, 157, 195, 0.15)",
  "--md-sys-color-outline-variant":         BRAND_PALETTE.silver,

  "--md-sys-color-error":                   BRAND_PALETTE.emerald,
  "--md-sys-color-on-error":                BRAND_PALETTE.platinum,
};

/**
 * Returns a CSSProperties object containing all Stitch → Phaigort token
 * overrides. Spread onto a wrapper element to scope without a global rule.
 *
 * @example
 * <div style={getStitchScopeStyle()}>
 *   <StitchExportedComponent />
 * </div>
 */
export function getStitchScopeStyle(): CSSProperties {
  return STITCH_COLOR_MAP as unknown as CSSProperties;
}

/**
 * Framer Motion easing aligned with both Phaigort brand and MD3 "emphasized".
 * Use as `ease` in any transition: transition={{ ease: STITCH_EASE }}.
 */
export const STITCH_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Standard duration map mirroring MD3 motion tokens, expressed in seconds
 * for direct use with Framer Motion transition objects.
 */
export const STITCH_DURATION = {
  short:      0.2,
  medium:     0.4,
  standard:   0.6,
  long:       0.8,
  extraLong:  1.2,
} as const;

/**
 * Shared animation variants derived from both Stitch motion principles and
 * Phaigort's purposeful-motion policy. Always pair with useReducedMotion().
 */
export const stitchVariants = {
  fadeUp: {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0,  transition: { duration: STITCH_DURATION.standard, ease: STITCH_EASE } },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: STITCH_DURATION.medium, ease: STITCH_EASE } },
  },
  slideRight: {
    hidden:  { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0,  transition: { duration: STITCH_DURATION.standard, ease: STITCH_EASE } },
  },
  staggerContainer: (stagger = 0.10) => ({
    hidden:  {},
    visible: { transition: { staggerChildren: stagger } },
  }),
} as const;

/**
 * Props accepted by any Stitch-aligned section wrapper component.
 * Extend this interface when building Stitch-sourced sections.
 */
export interface StitchSectionProps {
  children: ReactNode;
  className?: string;
}
