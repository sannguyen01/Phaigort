"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { H2, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { Section } from "@/components/ui/Section";
import { TREASURE_DOMAINS } from "@/lib/constants";

export function CollectionGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <DarkFieldStage intensity="full" as="div">
      <Section>
        <div ref={ref}>
          <Container>
            <motion.div {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 32 }, animate: isInView ? { opacity: 1, y: 0 } : {}, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } })} className="text-center mb-20">
              <Caption className="text-silver">Four Treasure Domains</Caption>
              <H2 className="mt-6 text-platinum">Curated Without Hierarchy</H2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TREASURE_DOMAINS.map((domain, i) => (
                <motion.div key={domain.title} {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 24 }, animate: isInView ? { opacity: 1, y: 0 } : {}, transition: { delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] } })}>
                  <Link href={domain.href} className="group block p-8 md:p-12 bg-deep-navy border border-platinum/10 hover:border-coral/30 transition-all duration-500">
                    <span className="font-body text-xs uppercase tracking-widest text-coral/80 group-hover:text-coral transition-colors duration-300">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 font-heading text-2xl md:text-3xl text-platinum group-hover:text-coral transition-colors duration-500">{domain.title}</h3>
                    <Body className="mt-4 text-silver/70 group-hover:text-silver transition-colors duration-500">{domain.description}</Body>
                    <span className="mt-8 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-coral/80 group-hover:text-coral transition-colors duration-300">
                      Explore <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </div>
      </Section>
    </DarkFieldStage>
  );
}

export default CollectionGrid;
