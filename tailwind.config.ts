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
        silver: "#8B9DC3",
        coral: "#FF6B4A",
        sapphire: "#0F52BA",
        emerald: "#1B4332",
      },
      fontFamily: {
        heading: ["var(--font-raleway)", "Raleway", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      maxWidth: {
        content: "1280px",
      },
      letterSpacing: {
        logo: "0.25em",
      },
      transitionDuration: {
        1200: "1200ms",
        1800: "1800ms",
      },
    },
  },
  plugins: [],
};

export default config;
