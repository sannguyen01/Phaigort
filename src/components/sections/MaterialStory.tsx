"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { H2, H4, Body, Caption, Label } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

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
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden pb-20 pt-14 text-platinum"
      style={{ background: "var(--color-dark)" }}
    >
      {/* Rough diamond specimen — floats top-right, dissolves into the dark field */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 hidden w-[42%] md:block"
      >
        <div className="relative" style={{ aspectRatio: "1/1" }}>
          <Image
            src="/story/expedition-rough.jpg"
            alt=""
            fill
            sizes="42vw"
            className="object-contain object-top"
            style={{ mixBlendMode: "screen", opacity: 0.55 }}
            loading="lazy"
          />
        </div>
      </div>

      <Container className="relative z-10">
        {/* ── Intro block ───────────────────────────────────────────────────── */}
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 32 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              })}
          className="max-w-2xl md:max-w-[55%]"
        >
          <Caption className="text-platinum/50">Our Story</Caption>
          <H2 className="mt-4 text-platinum">
            Some materials take forty million years to become beautiful.
          </H2>
          <Body className="mt-5 text-platinum/65">
            Phaigort is built around a single conviction: the Earth&apos;s most extraordinary
            materials carry a depth of meaning no jeweler can manufacture. We find them at the
            source, understand them with scientific rigour, and bring them to collectors who know
            the difference between something decorative and something true.
          </Body>
        </motion.div>

        {/* ── Diamond divider ───────────────────────────────────────────────── */}
        <div className="my-10 flex items-center justify-center md:my-14">
          <div className="h-px w-24 bg-platinum/15" />
          <div className="mx-4 h-3 w-3 rotate-45 border border-platinum/20" />
          <div className="h-px w-24 bg-platinum/15" />
        </div>

        {/* ── Three pillars ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
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
              className="space-y-3 py-4 md:py-0"
            >
              <Label className="text-platinum/45">{pillar.number}</Label>
              <H4 className="text-platinum">{pillar.title}</H4>
              <Body className="text-platinum/60">{pillar.description}</Body>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default OurStory;
