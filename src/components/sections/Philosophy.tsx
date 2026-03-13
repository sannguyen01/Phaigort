"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { H2, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersRM = useReducedMotion();

  return (
    <section ref={ref} className="py-14 md:py-20 bg-royal-navy text-platinum">
      <Container className="max-w-3xl text-center">
        <motion.div
          {...(prefersRM ? {} : {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1, ease: EASE },
          })}
          className="relative space-y-6 px-8 py-10"
        >
          {/* Corner marks — archive / museum label aesthetic */}
          {(["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"] as const).map((pos) => (
            <motion.span
              key={pos}
              aria-hidden="true"
              {...(prefersRM ? {} : {
                initial: { opacity: 0, scale: 0.6 },
                animate: isInView ? { opacity: 1, scale: 1 } : {},
                transition: { delay: 0.5, duration: 0.6, ease: EASE },
              })}
              className={`pointer-events-none absolute h-5 w-5 border-platinum/20 ${pos}`}
            />
          ))}

          <Caption>Our Promise</Caption>

          {/* Decorative line — grows from centre */}
          <motion.div
            {...(prefersRM ? {} : {
              initial: { scaleX: 0, opacity: 0 },
              animate: isInView ? { scaleX: 1, opacity: 1 } : {},
              transition: { delay: 0.2, duration: 0.9, ease: EASE },
            })}
            style={{ originX: "50%" }}
            className="mx-auto h-px w-12 bg-gradient-to-r from-transparent via-platinum/25 to-transparent"
          />

          <H2>This is where curiosity meets substance</H2>

          <Body className="text-platinum/70">
            Where you build collections worth explaining, worth keeping, worth
            passing down. Where materials become more meaningful over time
            through understanding and connection. Every piece comes with its
            true story. Every collector joins a community of material
            enthusiasts.
          </Body>

          <div className="pt-2">
            <Button href="/our-story" variant="secondary">
              Discover Our Story
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Philosophy;
