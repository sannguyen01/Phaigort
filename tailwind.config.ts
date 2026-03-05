import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1A2851",
        "deep-navy": "#0F172A",
        platinum: "#F8F9FB",
        "royal-navy": "#1A2851",
        silver: "#8B9DC3",
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
