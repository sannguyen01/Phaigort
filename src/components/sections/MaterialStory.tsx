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
      className="relative overflow-hidden bg-[#0A0F1D] pb-20 pt-14 text-platinum"
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
          <div className="mx-4 h-3 w-3 rotate-45 border border-coral/60" />
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

        {/* ── Brand Lineage ─────────────────────────────────────────────────── */}
        <div className="mt-20 border-t border-platinum/10 pt-16 md:mt-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr] md:gap-20">
            {/* Left — editorial text */}
            <motion.div
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 24 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-80px" },
                    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                  })}
              className="space-y-7"
            >
              <h3 className="font-display text-[1.65rem] font-bold leading-snug text-platinum md:text-[2.4rem]">
                Phaigort represents more than a jewellery house — it is the institution behind our
                Wonderhouse of material consciousness.
              </h3>

              <p className="font-ui text-base leading-relaxed text-platinum/60">
                The name synthesises the Greek{" "}
                <em className="font-semibold not-italic text-platinum/85">phainomenon</em> — that
                which reveals itself through observation — and the Portuguese{" "}
                <em className="font-semibold not-italic text-platinum/85">fazer</em> — to create.
                Two words for the same act: the moment something becomes knowable.
              </p>

              <p className="font-ui text-base leading-relaxed text-platinum/60">
                <strong className="font-semibold text-platinum/85">We honour García de Orta</strong>
                , the pioneering Portuguese physician who in 1563 authored the first scientific
                treatise on gemstones in everyday language. By choosing to share knowledge with
                merchants and locals rather than keeping it exclusive, he embodied the same spirit
                of accessibility and rigour that defines us today.
              </p>

              {/* Coral-bordered pull quote */}
              <div className="space-y-4">
                <p className="font-ui text-base leading-relaxed text-platinum/55">
                  Phaigort is a sanctuary for material fascination — an inclusive vessel, inviting
                  curious minds on a voyage to uncover the world&apos;s geological wonders, the
                  legacy of human craftsmanship, the allure of precious metals, and the brilliance
                  of contemporary innovation.
                </p>
                <p className="font-ui text-base leading-relaxed text-platinum/55">
                  Our philosophy draws from the 16th-century Portuguese and Spanish trade routes — a
                  time when seafaring vessels carried more than cargo; they carried the collective
                  knowledge of distant horizons. In that same spirit, we welcome all who seek a
                  deeper understanding of what truly makes a treasure meaningful. At Phaigort, the
                  beauty of the Earth and the mastery of the hand are no longer distant secrets, but
                  a shared journey of discovery.
                </p>
              </div>

              {/* Calligraphic Phaigort signature */}
              <motion.div
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 8 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, margin: "-60px" },
                      transition: { duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
                    })}
                className="pt-4"
              >
                <svg
                  viewBox="0 0 248 68"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-40 md:w-48"
                  aria-label="Phaigort"
                  role="img"
                >
                  {/* Signature text — italic Cardo, loaded on page via next/font */}
                  <text
                    x="4"
                    y="44"
                    fontFamily="'Cardo', Georgia, serif"
                    fontStyle="italic"
                    fontSize="40"
                    fill="rgba(248,249,251,0.72)"
                    letterSpacing="1.5"
                  >
                    Phaigort
                  </text>
                  {/* Flowing underline flourish — coral accent at ~5% composition */}
                  <path
                    d="M 2 54 Q 50 62 124 54 Q 180 48 244 57"
                    stroke="rgba(255,107,74,0.40)"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-platinum/28 mt-2 font-ui text-[9px] uppercase tracking-[0.32em]">
                  Material Consciousness
                </p>
              </motion.div>
            </motion.div>

            {/* Right — images: full diamond top, García de Orta portrait bottom */}
            <motion.div
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, x: 24 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true, margin: "-80px" },
                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
                  })}
              className="flex flex-col items-center gap-8 md:flex-col md:items-end md:gap-10"
            >
              {/* Full brilliant-cut diamond — slow float */}
              <motion.div
                className="relative w-64 max-w-[45vw] flex-shrink-0 md:w-[520px] md:max-w-none"
                animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src="/story/full-diamond.png"
                    alt="Full brilliant-cut diamond — Phaigort material intelligence"
                    fill
                    sizes="(max-width: 768px) 256px, 520px"
                    className="object-contain"
                    style={{ mixBlendMode: "screen" }}
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* García de Orta stipple portrait — offset float phase */}
              <motion.div
                className="relative w-56 max-w-[45vw] flex-shrink-0 md:w-[440px] md:max-w-none"
                animate={prefersReducedMotion ? {} : { y: [0, -7, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
              >
                <div className="relative" style={{ aspectRatio: "1/1.25" }}>
                  <Image
                    src="/story/garcia-de-orta.jpg"
                    alt="García de Orta — 16th century Iberian naturalist, father of gemstone science"
                    fill
                    sizes="(max-width: 768px) 224px, 440px"
                    className="object-cover object-top"
                    style={{ mixBlendMode: "screen" }}
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-right font-ui text-[9px] uppercase tracking-[0.35em] text-platinum/30">
                  García de Orta, 1563
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OurStory;
