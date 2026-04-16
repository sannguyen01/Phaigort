import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Legacy tokens (preserved for non-homepage pages) ──────────
        navy: "#03195e",
        "deep-navy": "#0F172A",
        platinum: "#F8F9FB",
        "royal-navy": "#03195e",
        silver: "#8B9DC3",
        "warm-ivory": "#F7F3EE",
        coral: "#FF6B4A",
        "coral-reef": "#FF6B4A",
        sapphire: "#0F52BA",
        emerald: "#1B4332",
        // ── New design system tokens ──────────────────────────────────
        ground: "#0D0B09", // warm near-black — primary surface (dark-first)
        stone: "#1A1714", // warm dark surface — secondary surface
        "near-black": "#0D0B09", // dark field
        ink: "#F0EDE8", // primary text — warm platinum
        muted: "#9B9590", // secondary / captions — warm stone gray
        gold: "#C9A55A", // warm gold accent
        "gold-dark": "#B8923F", // deep gold hover
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
        subtle: "rgba(139, 157, 195, 0.1)",
      },
      transitionDuration: {
        1200: "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;
