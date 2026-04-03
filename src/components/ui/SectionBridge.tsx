// src/components/ui/SectionBridge.tsx
//
// SVG-based translucent colour diffusion bridge between page sections.
//
// Mechanism: Each bridge renders an SVG <linearGradient> that fades the
// outgoing colour to transparent at the midpoint, then fades the incoming
// colour up from transparent. The browser composites the two alpha layers
// through its native display pipeline — producing perceptually clean colour
// merging with no sRGB mud zone, unlike CSS linear-gradient interpolation.
//
// Same-surface transitions (navy-to-navy, platinum-to-platinum) return null
// and render nothing. It is safe to call them — they cost nothing in layout.

import { cn } from "@/lib/utils";

// ─── Colour token hex values ────────────────────────────────────────────────
// These must stay in sync with tailwind.config.ts
const HEX = {
  platinum: "#F8F9FB", // primary bg (60–75%)
  warmIvory: "#F7F3EE", // OurStory section bg
  royalNavy: "#03195e", // primary text, DarkFieldStage full, PrivateAccessCTA
} as const;

// ─── Transition type ─────────────────────────────────────────────────────────
export type BridgeTransition =
  | "platinum-to-ivory"
  | "ivory-to-platinum"
  | "platinum-to-navy"
  | "navy-to-platinum"
  | "ivory-to-navy"
  | "navy-to-ivory"
  | "navy-to-navy" // same-surface — renders nothing
  | "platinum-to-platinum"; // same-surface — renders nothing

// ─── Bridge configuration ────────────────────────────────────────────────────
interface BridgeConfig {
  fromHex: string;
  toHex: string;
  /** Height of the dissolve zone in px — taller for high-contrast pairs */
  height: number;
  /**
   * Opacity of both colour stops at the midpoint (0–1).
   * 0.0 = both fully transparent → maximum optical merge ("clear window").
   * 0.25 = both partially visible → glassy colour-collision effect.
   */
  midOpacity: number;
}

const BRIDGE_MAP: Record<BridgeTransition, BridgeConfig | null> = {
  // Same-surface — no bridge
  "navy-to-navy": null,
  "platinum-to-platinum": null,

  // Light ↔ light — 40px, full dissolve (luminance shift is ~3%)
  // The midOpacity of 0.0 creates a clear-window effect; both sections
  // appear to share one continuous surface with a warm/cool temperature shift.
  "platinum-to-ivory": {
    fromHex: HEX.platinum,
    toHex: HEX.warmIvory,
    height: 40,
    midOpacity: 0.0,
  },
  "ivory-to-platinum": {
    fromHex: HEX.warmIvory,
    toHex: HEX.platinum,
    height: 40,
    midOpacity: 0.0,
  },

  // Light ↔ dark — 96px theatrical caesura.
  // midOpacity 0.25 keeps a whisper of both colours at the midpoint,
  // producing the "oil pigments meeting at a waterline" effect.
  "platinum-to-navy": {
    fromHex: HEX.platinum,
    toHex: HEX.royalNavy,
    height: 96,
    midOpacity: 0.25,
  },
  "navy-to-platinum": {
    fromHex: HEX.royalNavy,
    toHex: HEX.platinum,
    height: 96,
    midOpacity: 0.25,
  },
  "ivory-to-navy": {
    fromHex: HEX.warmIvory,
    toHex: HEX.royalNavy,
    height: 96,
    midOpacity: 0.25,
  },
  "navy-to-ivory": {
    fromHex: HEX.royalNavy,
    toHex: HEX.warmIvory,
    height: 96,
    midOpacity: 0.25,
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
interface SectionBridgeProps {
  transition: BridgeTransition;
  /**
   * Optional class — use "bridge-blur" (defined in globals.css) for
   * light-to-light transitions to eliminate sub-pixel rendering artifacts.
   * Do NOT apply to high-contrast (navy) transitions — it creates a halo.
   */
  className?: string;
}

export function SectionBridge({ transition, className }: SectionBridgeProps) {
  const config = BRIDGE_MAP[transition];

  // Same-surface transitions are safe no-ops
  if (!config) return null;

  const { fromHex, toHex, height, midOpacity } = config;

  // Gradient ID is transition-scoped. If the same transition appears twice on
  // a page both instances generate identical gradient definitions — harmless.
  const gradId = `sb-${transition}`;

  return (
    <div
      aria-hidden="true"
      className={cn("block w-full overflow-hidden leading-none", className)}
      style={{
        height: `${height}px`,
        // Close sub-pixel gaps that appear between section edge and bridge
        // on high-DPI displays when the browser rounds fractional pixels.
        marginTop: "-1px",
        marginBottom: "-1px",
      }}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            {/* Outgoing section colour — fully opaque at the top */}
            <stop offset="0%" stopColor={fromHex} stopOpacity={1} />

            {/* Mid-zone: both colours fade toward transparent.
                At midOpacity 0.0 → pure alpha blending through the document
                stack ("clear window"). At 0.25 → partial colour collision,
                the "oil-on-water" effect for high-contrast pairs. */}
            <stop offset="35%" stopColor={fromHex} stopOpacity={midOpacity} />
            <stop offset="65%" stopColor={toHex} stopOpacity={midOpacity} />

            {/* Incoming section colour — fully opaque at the bottom */}
            <stop offset="100%" stopColor={toHex} stopOpacity={1} />
          </linearGradient>
        </defs>
        <rect width="1440" height={height} fill={`url(#${gradId})`} />
      </svg>
    </div>
  );
}

export default SectionBridge;
