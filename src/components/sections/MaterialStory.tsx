"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { H2, H4, Body, Caption, Label } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

const pillars = [
  {
    number: "01",
    title: "Formed Under Pressure",
    description:
      "A sapphire's colour is not pigment — it is iron and titanium locked in corundum crystal under temperatures that would vaporise everything familiar. A spinel forms where marble meets magnesium deep inside ancient mountain roots. These are geological events you can hold in your hand.",
  },
  {
    number: "02",
    title: "Found by Those Who Know",
    description:
      "Great stones do not reveal themselves easily. They surface from river gravels in Sri Lanka, metamorphic corridors in Madagascar, marble seams in Vietnam. Finding them demands geological intuition, market fluency across continents, and the instinct to recognise beauty before the lapidary's wheel has turned.",
  },
  {
    number: "03",
    title: "Made to Outlast Everything",
    description:
      "Every piece is held to one question: will it matter more in twenty years? The cutting must honour the stone's natural optics. The metalwork must be worthy of the material. The provenance must be documented — not claimed. This is the discipline of creating things built to be passed down.",
  },
];

export function OurStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="story" ref={ref} className="py-10 md:py-16 bg-warm-ivory text-royal-navy">
      <Container>
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 32 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              })}
          className="max-w-3xl"
        >
          <Caption className="text-royal-navy/50">Our Story</Caption>
          <H2 className="mt-4 text-royal-navy">
            Some materials take forty million years to become beautiful.
          </H2>
          <Body className="mt-5 text-royal-navy/65">
            Phaigort is built around a single conviction: the Earth&apos;s most
            extraordinary materials carry a depth of meaning no jeweler can
            manufacture. We find them at the source, understand them with
            scientific rigour, and bring them to collectors who know the
            difference between something decorative and something true.
          </Body>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-royal-navy/10">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 24 },
                    animate: isInView ? { opacity: 1, y: 0 } : {},
                    transition: {
                      delay: 0.2 + i * 0.15,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  })}
              className="py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 space-y-3"
            >
              <Label className="text-coral/70">
                {pillar.number}
              </Label>
              <H4 className="text-royal-navy">{pillar.title}</H4>
              <Body className="text-royal-navy/60">{pillar.description}</Body>
            </motion.div>
          ))}
        </div>

        <Divider className="mt-16 mb-0 border-royal-navy/10" />
      </Container>
    </section>
  );
}

export default OurStory;
