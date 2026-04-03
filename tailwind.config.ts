import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#03195e",
        "deep-navy": "#0F172A",
        platinum: "#F8F9FB",
        "royal-navy": "#03195e",
        silver: "#8B9DC3",
        "warm-ivory": "#F7F3EE",
        // @deprecated — coral is reserved for decorative accents only (timeline spine,
        // marquee separators, section label markers). No CTA or interactive element
        // should reference these tokens. Use platinum/royal-navy for all CTAs.
        coral: "#FF6B4A",
        "coral-reef": "#FF6B4A",
        sapphire: "#0F52BA",
        emerald: "#1B4332",
      },
      fontFamily: {
        // Jost: logo identity, navigation, labels, UI chrome
        brand: ["var(--font-jost)", "Jost", "sans-serif"],
        // Cormorant: editorial headings H1–H3
        heading: ["var(--font-cormorant)", "Cormorant", "serif"],
        // Inter: body copy, captions, metadata
        body: ["var(--font-inter)", "Inter", "sans-serif"],
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
