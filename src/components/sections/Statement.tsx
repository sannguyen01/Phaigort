// src/components/sections/Statement.tsx
// Three-pillar feature row — 01 / 02 / 03
// Numbers: T-09 Platinum Mist — the tonal hierarchy replaces chromatic accent.
// Cardo bold headings, Garet body. Dark T-01 ground. No cards, no borders.
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PILLARS = [
  {
    number: "01",
    headline: "Sourced at Origin",
    body: "Every specimen is acquired at the geological source — mines, riverbed estates, and lapidary workshops in Burma, Colombia, Kashmir, and the Iberian belt. No intermediaries. Full provenance documented.",
  },
  {
    number: "02",
    headline: "Documented with Rigour",
    body: "Each piece carries a scientific record: formation type, origin certification, spectral analysis, and a chain of custody tracing the material from earth to collection.",
  },
  {
    number: "03",
    headline: "Presented to the Curious",
    body: "Phaigort is not built for the market. It is built for those who understand what a stone holds — its deep time, its rarity, its irreversibility. That understanding is the admission.",
  },
] as const;

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const animate = !prefersReducedMotion;

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="mx-auto grid gap-16 px-[clamp(24px,4vw,64px)] md:grid-cols-3 md:gap-10 lg:gap-16"
        style={{ maxWidth: "var(--content-wide)" }}
      >
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.number}
            {...(animate && {
              initial: { opacity: 0, y: 24 },
              animate: isInView ? { opacity: 1, y: 0 } : {},
              transition: {
                duration: 0.75,
                delay: i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              },
            })}
          >
            {/* Number — T-09 Platinum Mist, tonal hierarchy */}
            <p
              className="mb-5 font-ui font-bold tracking-[0.2em]"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--t09)",
              }}
            >
              {pillar.number}
            </p>

            {/* Headline — Cardo bold, T-12 Pure Aperture */}
            <h3
              className="mb-4 font-display font-bold leading-[1.15]"
              style={{
                fontSize: "var(--text-xl)",
                color: "var(--color-text)",
              }}
            >
              {pillar.headline}
            </h3>

            {/* Body — Garet, T-11 White Void (editorial register) */}
            <p
              className="font-ui leading-[1.8]"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-body)",
              }}
            >
              {pillar.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Statement;
