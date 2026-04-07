// src/components/sections/TrustSignalStrip.tsx
// Horizontal provenance authority bar — positions Phaigort within the
// institutional gemological framework. Sits between CollectionGrid and PrivateAccessCTA.

"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const TRUST_SIGNALS = [
  { label: "GIA", sublabel: "Gemological Institute of America" },
  { label: "AGL", sublabel: "American Gemological Laboratories" },
  { label: "Gübelin", sublabel: "Lucerne · Switzerland" },
  { label: "SSEF", sublabel: "Swiss Gemmological Institute" },
  { label: "Conflict-Free", sublabel: "Direct-source provenance only" },
];

export function TrustSignalStrip() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      aria-label="Certification and provenance authorities"
      className="border-y border-royal-navy/[0.06] bg-warm-ivory py-10 md:py-12"
    >
      <Container>
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 12 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          })}
          className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-0"
        >
          {/* Left eyebrow */}
          <p className="font-brand text-[9px] uppercase tracking-[0.45em] text-royal-navy/30">
            Documentation &amp; Provenance
          </p>

          {/* Trust items — with thin vertical rules between */}
          <div className="flex flex-wrap items-center justify-center divide-x divide-royal-navy/[0.07]">
            {TRUST_SIGNALS.map((signal, i) => (
              <motion.div
                key={signal.label}
                {...(!prefersReducedMotion && {
                  initial: { opacity: 0 },
                  animate: isInView ? { opacity: 1 } : {},
                  transition: { delay: 0.1 + i * 0.08, duration: 0.5 },
                })}
                className="flex flex-col items-center px-7 py-1 text-center first:pl-0 last:pr-0"
              >
                <span className="font-brand text-[11px] font-medium uppercase tracking-[0.22em] text-royal-navy/70">
                  {signal.label}
                </span>
                <span className="text-royal-navy/38 mt-[3px] font-body text-[10px] tracking-wide">
                  {signal.sublabel}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right label — hidden on mobile */}
          <p className="hidden font-brand text-[9px] uppercase tracking-[0.45em] text-royal-navy/30 md:block">
            Scientific Rigour
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export default TrustSignalStrip;
