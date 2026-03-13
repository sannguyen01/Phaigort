"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = ["Wonderhouse of", "Material Consciousness"] as const;

export function Hero() {
  const prefersRM = useReducedMotion();

  return (
    <DarkFieldStage className="-mt-16 md:-mt-20 flex min-h-[80vh] md:min-h-[85vh] items-center justify-center overflow-hidden py-0">
      {/* Radial depth field */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,82,186,0.10)_0%,_transparent_68%)]" />

      <Container className="relative z-10 flex flex-col items-center text-center py-20 md:py-24">

        {/* Eyebrow */}
        <motion.span
          {...(prefersRM ? {} : {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: EASE },
          })}
          className="inline-block font-brand text-[10px] uppercase tracking-[0.4em] text-silver"
        >
          Material Consciousness
        </motion.span>

        {/* Decorative line — grows from centre after eyebrow */}
        <motion.div
          {...(prefersRM ? {} : {
            initial: { scaleX: 0, opacity: 0 },
            animate: { scaleX: 1, opacity: 1 },
            transition: { delay: 0.28, duration: 0.9, ease: EASE },
          })}
          style={{ originX: "50%" }}
          className="my-6 h-px w-16 bg-gradient-to-r from-transparent via-silver/40 to-transparent"
        />

        {/* Headline — one line at a time */}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-none text-platinum">
          {HEADLINE.map((line, i) => (
            <motion.span
              key={line}
              {...(prefersRM ? {} : {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.42 + i * 0.17, duration: 1.0, ease: EASE },
              })}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Body copy */}
        <motion.div
          {...(prefersRM ? {} : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.80, duration: 0.9 },
          })}
          className="mt-8"
        >
          <Body className="mx-auto max-w-2xl text-platinum/70">
            Where Earth&apos;s geological creativity, humanity&apos;s craft traditions,
            precious metals, and contemporary innovations converge into vessels of
            personal meaning.
          </Body>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...(prefersRM ? {} : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.04, duration: 0.8 },
          })}
          className="mt-12"
        >
          <Button href="/collections">Explore Collections</Button>
        </motion.div>

        {/* Scroll indicator */}
        {!prefersRM && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-brand text-[9px] uppercase tracking-widest text-platinum/40">
                Scroll
              </span>
              <div className="h-8 w-px bg-gradient-to-b from-platinum/30 to-transparent" />
            </motion.div>
          </motion.div>
        )}

      </Container>
    </DarkFieldStage>
  );
}

export default Hero;
