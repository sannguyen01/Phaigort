"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function PrivateArchive() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative bg-near-black py-28 text-platinum md:py-40">
      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]"
      />

      <Container className="relative z-10 max-w-2xl text-center">
        <motion.div
          className="flex flex-col items-center space-y-8"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.48, ease: "easeOut" },
              })}
        >
          {/* Eyebrow */}
          <p className="font-ui text-[10px] uppercase tracking-[0.18em] text-platinum/40">
            The Private Archive
          </p>

          {/* Headline — Cardo, off-white */}
          <h2 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-bold leading-[1.1] text-[#F0EDE8]">
            Not every exceptional stone
            <br />
            reaches the open market.
            <br />
            <em className="font-normal italic text-[#F0EDE8]/70">
              Some are reserved. Some are waiting.
            </em>
          </h2>

          {/* Body — Garet */}
          <p className="mx-auto max-w-md font-ui text-[15px] leading-relaxed text-platinum/55 md:text-base">
            Certain pieces in the Phaigort archive have never been publicly listed — not because
            they are unavailable, but because the right conversation has not yet happened. We do not
            believe rarity should be announced. It should be discovered.
          </p>

          {/* Coral CTA */}
          <div className="pt-2">
            <Button
              href="/contact"
              variant="ghost"
              onDark
              className="border border-coral/50 text-coral hover:bg-coral hover:text-platinum active:bg-coral/90"
            >
              Begin a Private Consultation
            </Button>
          </div>
        </motion.div>

        {/* Signature diamond motif */}
        <motion.div
          aria-hidden
          className="mt-16 flex justify-center"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: isInView ? { opacity: 1 } : {},
                transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
              })}
        >
          <svg viewBox="0 0 40 40" width="18" height="18" fill="none" aria-hidden="true">
            <polygon
              points="20,2 38,20 20,38 2,20"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </Container>
    </section>
  );
}

export default PrivateArchive;
