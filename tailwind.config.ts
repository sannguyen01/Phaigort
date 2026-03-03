import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0D0D0D",
        charcoal: "#1A1A1A",
        ivory: "#F5F0E8",
        cream: "#FFFDF7",
        gold: "#C9A86C",
        garnet: "#8B1A2F",
        "slate-stone": "#3D3D3D",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
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
      transitionDuration: {
        1200: "1200ms",
        1800: "1800ms",
      },
    },
  },
  plugins: [],
};

export default config;
