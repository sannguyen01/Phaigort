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
    <section ref={ref} className="py-32 md:py-48 bg-deep-navy">
      <Container className="max-w-3xl text-center">
        <motion.div {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 32 }, animate: isInView ? { opacity: 1, y: 0 } : {}, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } })} className="space-y-8">
          <Caption>Our Promise</Caption>
          <H2>This is where curiosity meets substance</H2>
          <Body className="text-silver">
            Where you build collections worth explaining, worth keeping, worth passing down. Where materials become more meaningful over time through understanding and connection. Every piece comes with its true story. Every collector joins a community of material enthusiasts. Every visit offers discovery.
          </Body>
          <div className="pt-8">
            <Button href="/material-consciousness" variant="secondary">Discover Our Philosophy</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Philosophy;
