"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-ground"
    >
      {/* Diamond image — bleeds in from the left edge */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[58%]"
        style={{ clipPath: "polygon(0 0, 92% 0, 100% 100%, 0 100%)" }}
        {...(prefersReducedMotion
          ? {}
          : {
              initial: { x: -20, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            })}
      >
        <Image
          src="/hero/hero-diamond.jpg"
          alt=""
          fill
          priority
          sizes="58vw"
          className="object-cover object-center"
        />
        {/* Right-edge dissolve into ground bg */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ground" />
      </motion.div>

      {/* Content — right portion */}
      <Container className="relative z-10">
        <div className="flex justify-end">
          <div className="w-full max-w-xl space-y-8 py-24 md:py-32 lg:w-[52%]">
            {/* Eyebrow */}
            <motion.p
              className="font-ui text-[10px] uppercase tracking-[0.18em] text-muted"
              {...(prefersReducedMotion
                ? {}
                : {
                    ...fadeUp,
                    transition: { duration: 0.48, ease: "easeOut" },
                  })}
            >
              Rare Gemstones · Precious Metals · Material Culture
            </motion.p>

            {/* Headline — Cardo with letter-spacing animation */}
            <motion.h1
              className="font-display text-[clamp(2.25rem,4.5vw,4.5rem)] font-bold leading-[1.05] text-ink"
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { letterSpacing: "-0.03em", opacity: 0 },
                    animate: { letterSpacing: "0em", opacity: 1 },
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                  })}
            >
              Some things take
              <br />
              forty million years
              <br />
              to become what they are.
            </motion.h1>

            {/* Brand statement — Cardo italic */}
            <motion.p
              className="font-display text-[clamp(1rem,1.4vw,1.2rem)] italic leading-relaxed text-ink/60"
              {...(prefersReducedMotion
                ? {}
                : {
                    ...fadeUp,
                    transition: { duration: 0.48, delay: 0.3, ease: "easeOut" },
                  })}
            >
              We find them at origin. We bring them to those
              <br className="hidden md:block" />
              who understand what they hold.
            </motion.p>

            {/* Ghost CTA */}
            <motion.div
              {...(prefersReducedMotion
                ? {}
                : {
                    ...fadeUp,
                    transition: { duration: 0.48, delay: 0.5, ease: "easeOut" },
                  })}
            >
              <Button href="/collections" variant="secondary">
                Enter the Collection
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-ui text-[9px] uppercase tracking-widest text-ink/35">
              Scroll
            </span>
            <div className="h-7 w-px bg-gradient-to-b from-ink/25 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default Hero;
