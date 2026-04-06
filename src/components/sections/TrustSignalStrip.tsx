// src/components/sections/TrustSignalStrip.tsx
// Horizontal provenance authority bar — positions Phaigort within the
// institutional gemological framework. Sits between CollectionGrid and PrivateAccessCTA.

"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const TRUST_SIGNALS = [
  { label: "GIA Certified", sublabel: "Gemological Institute of America" },
  { label: "AGL Origin Reports", sublabel: "American Gemological Laboratories" },
  { label: "Gübelin Gem Lab", sublabel: "Lucerne, Switzerland" },
  { label: "SSEF Swiss Lab", sublabel: "Swiss Gemmological Institute" },
  { label: "Conflict-Free Provenance", sublabel: "Direct-source acquisition only" },
];

export function TrustSignalStrip() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      aria-label="Certification and provenance authorities"
      className="border-y border-royal-navy/8 bg-warm-ivory py-8"
    >
      <Container>
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 12 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          })}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 md:justify-between"
        >
          {/* Left label */}
          <span className="font-brand text-[10px] uppercase tracking-[0.4em] text-royal-navy/35 md:shrink-0">
            Documentation & Provenance
          </span>

          {/* Trust signal items */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {TRUST_SIGNALS.map((signal, i) => (
              <motion.div
                key={signal.label}
                {...(!prefersReducedMotion && {
                  initial: { opacity: 0 },
                  animate: isInView ? { opacity: 1 } : {},
                  transition: { delay: 0.1 + i * 0.08, duration: 0.5 },
                })}
                className="flex flex-col items-center text-center"
              >
                <span className="font-brand text-[11px] font-medium uppercase tracking-[0.2em] text-royal-navy/75">
                  {signal.label}
                </span>
                <span className="mt-0.5 font-body text-[10px] text-royal-navy/40">
                  {signal.sublabel}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right label — hidden on mobile */}
          <span className="hidden font-brand text-[10px] uppercase tracking-[0.4em] text-royal-navy/35 md:block">
            Scientific Rigour
          </span>
        </motion.div>
      </Container>
    </section>
  );
}

export default TrustSignalStrip;
