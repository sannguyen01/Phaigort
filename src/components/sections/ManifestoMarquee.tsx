// src/components/sections/ManifestoMarquee.tsx
// Full-width centred institution statement with T-09 Platinum Mist ruled lines.
// Replaces the old scrolling ticker — that read as promotional; this reads as institutional.
// Monochromatic: T-01 ground, T-12 text, T-09 rules.
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function ManifestoMarquee() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const animate = !prefersReducedMotion;

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="mx-auto px-[clamp(24px,4vw,64px)]"
        style={{ maxWidth: "800px" }}
      >
        {/* T-09 Platinum Mist rule — above */}
        <motion.div
          style={{
            height: "1px",
            background: "rgba(200, 200, 200, 0.22)",
            transformOrigin: "left center",
            marginBottom: "var(--space-12)",
          }}
          {...(animate && {
            initial: { scaleX: 0 },
            animate: isInView ? { scaleX: 1 } : { scaleX: 0 },
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          })}
        />

        {/* Institution statement — Cardo italic, T-12 Pure Aperture */}
        <motion.p
          className="text-center font-display italic leading-[1.55]"
          style={{
            fontSize: "var(--text-2xl)",
            color: "var(--color-text)",
          }}
          {...(animate && {
            initial: { opacity: 0, y: 18 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
            transition: { duration: 0.9, delay: 0.3, ease: "easeOut" },
          })}
        >
          Phaigort represents more than a jewellery house — it is the institution
          behind our Wonderhouse of material and craftmanship consciousness.
        </motion.p>

        {/* T-09 Platinum Mist rule — below */}
        <motion.div
          style={{
            height: "1px",
            background: "rgba(200, 200, 200, 0.22)",
            transformOrigin: "right center",
            marginTop: "var(--space-12)",
          }}
          {...(animate && {
            initial: { scaleX: 0 },
            animate: isInView ? { scaleX: 1 } : { scaleX: 0 },
            transition: { duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] },
          })}
        />
      </div>
    </section>
  );
}

export default ManifestoMarquee;
