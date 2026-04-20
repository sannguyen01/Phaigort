// src/components/sections/Philosophy.tsx
// Centred institutional promise — max-width 640px, T-01 ground, Cardo + Garet.
"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Stagger delays — each element enters 100ms after the previous one.
  const stagger = (step: number) =>
    !prefersReducedMotion
      ? {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: {
            duration: 0.85,
            delay: step * 0.1,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        }
      : {};

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="mx-auto px-[clamp(24px,4vw,64px)] text-center" style={{ maxWidth: "640px" }}>
        {/* Heading — Cardo display — step 0 */}
        <motion.h2
          className="font-display font-normal leading-[1.15]"
          style={{ fontSize: "var(--text-2xl)", color: "var(--color-text)" }}
          {...stagger(0)}
        >
          Material consciousness is not a luxury concept. It is the empirical practice of
          understanding what Earth creates and what human craft tradition builds around it.
        </motion.h2>

        {/* T-09 rule — step 1 */}
        <motion.div
          className="mx-auto mt-8 origin-center"
          style={{
            height: "1px",
            width: "40px",
            background: "rgba(200,200,200,0.2)",
          }}
          {...(!prefersReducedMotion
            ? {
                initial: { scaleX: 0 },
                animate: isInView ? { scaleX: 1 } : {},
                transition: { duration: 0.6, delay: 0.1, ease: "easeOut" },
              }
            : {})}
        />

        {/* Body — Garet — step 2 */}
        <motion.p
          className="mx-auto mt-8 font-ui leading-[1.85]"
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-body)",
            opacity: 0.68,
          }}
          {...stagger(2)}
        >
          Our philosophy draws inspiration from the 16th-century Portuguese and Spanish trade routes
          — a time when seafaring vessels carried more than just cargo; they carried the collective
          knowledge of distant horizons across the oceans. In that same spirit, we welcome all who
          seek a deeper understanding of what truly makes a treasure meaningful.
        </motion.p>

        {/* Text CTA — step 3 */}
        <motion.div className="mt-10 flex justify-center" {...stagger(3)}>
          <a
            href="/material-consciousness"
            className="group inline-flex items-center gap-3 font-ui text-[11px] uppercase tracking-[0.16em] transition-opacity duration-200 hover:opacity-100"
            style={{ color: "var(--color-text-muted)", opacity: 0.7 }}
          >
            Discover Our Story
            <span
              className="inline-block h-px w-7 transition-all duration-300 group-hover:w-12"
              style={{ background: "var(--color-text-muted)" }}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Philosophy;
