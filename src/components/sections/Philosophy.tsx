"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { H2, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="py-10 md:py-16 bg-royal-navy text-platinum">
      <Container className="max-w-3xl text-center">
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 32 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              })}
        >
          <Caption>Our Promise</Caption>
          <H2 className="mt-4">This is where curiosity meets substance</H2>
          <Body className="mt-5 text-platinum/70">
            Where you build collections worth explaining, worth keeping, worth
            passing down. Where materials become more meaningful over time
            through understanding and connection. Every piece comes with its
            true story. Every collector joins a community of material
            enthusiasts.
          </Body>
          <div className="mt-8">
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
