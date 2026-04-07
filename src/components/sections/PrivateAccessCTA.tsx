// src/components/sections/PrivateAccessCTA.tsx
// Replaces Philosophy.tsx — converts the section from brand explanation to conversion action
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
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-royal-navy py-28 text-platinum md:py-40"
    >
      {/* Photographic backdrop — extreme close-up stone pavilion at low opacity */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/editorial/hero-break.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.18]"
          loading="lazy"
        />
        {/* Colour-correction overlay — pulls image toward royal-navy palette */}
        <div className="absolute inset-0 bg-royal-navy/55 mix-blend-multiply" />
      </div>

      {/* Ambient glowing radial effect */}
      <motion.div
        {...(!prefersReducedMotion && {
          animate: { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] },
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        })}
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_rgba(15,82,186,0.15)_0%,_transparent_70%)]"
      />

      {/* Subtle floating particles / noise pattern */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-platinum/5 opacity-5" />

      <Container className="relative z-10 max-w-2xl text-center">
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          })}
          className="flex flex-col items-center space-y-8"
        >
          <h2 className="font-heading text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            Not every exceptional stone
            <br />
            reaches the open market.
            <br />
            <em className="font-normal italic text-platinum/90">
              Some are reserved. Some are waiting.
            </em>
          </h2>
          <p className="mx-auto max-w-md text-balance font-body text-[15px] leading-relaxed text-platinum/65 md:text-base">
            Certain pieces in the Phaigort archive have never been publicly listed — not because
            they are unavailable, but because the right conversation has not yet happened. We do not
            believe rarity should be announced. It should be discovered, by those who are looking,
            and occasionally by those who did not know they were.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary" onDark>
              Begin a Private Conversation
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
