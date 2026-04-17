import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── 12-TONE MONOCHROMATIC SCALE — Geological Depth System ─────
        // No warm tones. No blue cast. No accent color.
        // Compose pages as descent into depth: T-01 anchors large fields,
        // T-10–T-12 carry highest-value text.
        t01: "#0A0A0A", // Void Obsidian    — page ground / packaging
        t02: "#141414", // Abyssal Carbon   — hero section bg
        t03: "#1C1C1C", // Void Ink         — nav / UI containers
        t04: "#2E2E2E", // Iron Veil        — dividers / secondary surfaces
        t05: "#3D3D3D", // Slate Cipher     — card backgrounds
        t06: "#525252", // Graphite Stratum — secondary text / metadata
        t07: "#7A7A7A", // Dust of Ages     — tertiary text / footnotes
        t08: "#A8A8A8", // Mineral Quartz   — body copy support
        t09: "#C8C8C8", // Platinum Mist    — ruled lines / ornamental
        t10: "#DEDEDE", // Sterling Breath  — subheadings
        t11: "#F2F2F2", // White Void       — primary body copy
        t12: "#FAFAFA", // Pure Aperture    — display headlines / logo

        // ── Semantic aliases → mapped to 12-tone scale ────────────────
        ground: "#0A0A0A", // T-01 — page field
        stone: "#1C1C1C", // T-03 — elevated surface
        "near-black": "#0A0A0A", // T-01 — alias
        ink: "#FAFAFA", // T-12 — display text / logo
        "ink-body": "#F2F2F2", // T-11 — editorial body copy
        muted: "#7A7A7A", // T-07 — captions / metadata
        platinum: "#C8C8C8", // T-09 — ornamental ruled lines

        // ── DEPRECATED — remapped to prevent build breaks ─────────────
        // Replace all usages; these aliases are NOT design intent.
        "royal-navy": "#0A0A0A", // was #1A2851
        navy: "#0A0A0A", // was #03195e
        "deep-navy": "#141414", // was #0F172A
        coral: "#A8A8A8", // was #FF6B4A — neutralized
        "coral-reef": "#A8A8A8", // was #FF6B4A — neutralized
        silver: "#7A7A7A", // was #8B9DC3 — neutralized
        "warm-ivory": "#F2F2F2", // was #F7F3EE — neutralized
      },
      fontFamily: {
        // ── Legacy (preserved for non-homepage pages) ─────────────────
        brand: ["var(--font-jost)", "Jost", "sans-serif"],
        heading: ["var(--font-cormorant)", "Cormorant", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        // ── New design system ─────────────────────────────────────────
        // Cardo: display headlines, hero text, philosophical statements (24px+)
        display: ["var(--font-cardo)", "Georgia", "serif"],
        // Garet: navigation, body copy, buttons, labels, metadata
        ui: ["var(--font-garet)", "var(--font-inter)", "Inter", "sans-serif"],
      },
      spacing: {},
      maxWidth: {
        content: "1280px",
      },
      letterSpacing: {
        logo: "0.25em",
      },
      borderColor: {
        subtle: "rgba(200, 200, 200, 0.08)",
      },
      transitionDuration: {
        1200: "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;
