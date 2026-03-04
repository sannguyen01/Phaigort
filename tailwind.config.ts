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
        "royal-navy": "#1A2851",
        platinum: "#F8F9FB",
        silver: "#8B9DC3",
        coral: "#FF6B4A",
        "coral-reef": "#FF6B4A",
        sapphire: "#0F52BA",
        emerald: "#1B4332",
      },
      fontFamily: {
        heading: ["var(--font-bodoni)", "Bodoni Moda", "serif"],
        body: ["var(--font-eb-garamond)", "EB Garamond", "serif"],
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
