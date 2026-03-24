// src/components/sections/PrivateAccessCTA.tsx
// Replaces Philosophy.tsx — converts the section from brand explanation to conversion action
"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
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
      {/* Ambient glowing radial effect */}
      <motion.div
        {...(!prefersReducedMotion && {
          animate: { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] },
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        })}
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(15,82,186,0.15)_0%,_transparent_70%)]"
      />

      {/* Subtle floating particles / noise pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-platinum/5 opacity-5" />

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
            Not everything precious
            <br />
            is displayed.
            <br />
            <em className="font-normal italic text-platinum/90">Some of it is discovered.</em>
          </h2>
          <p className="mx-auto max-w-md text-balance font-body text-[15px] leading-relaxed text-platinum/65 md:text-base">
            Some of what we carry has never been listed publicly. Some pieces are reserved for those
            who arrive knowing what they are looking for — and some for those who arrive not
            knowing, and find it anyway. Either way, the conversation begins here.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary" onDark>
              Request a Private Introduction
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
