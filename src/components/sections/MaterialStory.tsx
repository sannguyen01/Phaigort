"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { H2, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export function MaterialStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-deep-navy">
      <Container>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <Caption>The Philosophy</Caption>
          <H2 className="mt-6">Material Consciousness is the recognition that treasures derive value from three converging sources</H2>
        </motion.div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {[
            { title: "Natural Creation", description: "Deep geological time — gemstones formed under planetary forces across millions of years, precious metals concentrated through hydrothermal processes." },
            { title: "Cultural Heritage", description: "Human craft mastery — traditions perfected across generations through meditative dedication, from Portuguese filigree to Japanese metalwork." },
            { title: "Technical Mastery", description: "Contemporary innovation — materials requiring years of development and irreplaceable expertise, demonstrating human ingenuity at its finest." },
          ].map((pillar, i) => (
            <motion.div key={pillar.title} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="space-y-4">
              <span className="font-body text-xs uppercase tracking-widest text-coral/70">0{i + 1}</span>
              <h3 className="font-heading text-xl text-platinum">{pillar.title}</h3>
              <Body className="text-silver">{pillar.description}</Body>
            </motion.div>
          ))}
        </div>
        <Divider className="mt-24 mb-0" />
      </Container>
    </section>
  );
}

export default MaterialStory;
