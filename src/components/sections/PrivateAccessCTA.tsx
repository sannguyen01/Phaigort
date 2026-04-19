// src/components/sections/PrivateAccessCTA.tsx
// T-02 Abyssal Carbon ground — single ghost CTA — no blue cast, no warm tones.
"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function PrivateAccessCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="grain-field relative flex min-h-[60vh] items-center justify-center overflow-hidden py-28 text-platinum md:py-40"
      style={{ background: "var(--color-dark)" }}
    >
      {/* Photographic backdrop — extreme close-up stone pavilion at low opacity */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/editorial/hero-break.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.12]"
          loading="lazy"
        />
        {/* Neutral darkening overlay */}
        <div className="absolute inset-0 bg-[#141414]/65" />
      </div>

      {/* Neutral ambient radial — very subtle */}
      <motion.div
        {...(!prefersReducedMotion && {
          animate: { scale: [1, 1.04, 1], opacity: [0.25, 0.4, 0.25] },
          transition: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        })}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200,200,200,0.04) 0%, transparent 70%)",
        }}
      />

      <Container className="relative z-10 max-w-2xl text-center">
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          })}
          className="flex flex-col items-center space-y-8"
        >
          <h2
            className="font-display font-normal leading-[1.18]"
            style={{ fontSize: "var(--text-2xl)", color: "var(--color-text)" }}
          >
            Not every exceptional stone
            <br />
            reaches the open market.
            <br />
            <em
              className="font-normal italic"
              style={{ color: "var(--color-text-body)", opacity: 0.85 }}
            >
              Some are reserved. Some are waiting.
            </em>
          </h2>

          <p
            className="mx-auto max-w-md font-ui leading-relaxed"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-body)",
              opacity: 0.6,
            }}
          >
            Certain pieces in the Phaigort archive have never been publicly listed — not because
            they are unavailable, but because the right conversation has not yet happened. We do not
            believe rarity should be announced. It should be discovered, by those who are looking,
            and occasionally by those who did not know they were.
          </p>

          <div className="pt-2">
            <Button href="/contact">Begin a Private Consultation</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default PrivateAccessCTA;
