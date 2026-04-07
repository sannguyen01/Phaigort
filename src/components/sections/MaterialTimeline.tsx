"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { H2, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

const TIMELINE_DATA = [
  {
    caption: "I. The Earth as Artist",
    title: "Colour, light, crystalline geometry — forces no craftsperson can replicate",
    body1:
      "A ruby's red comes from chromium — the same element that colours emeralds green, depending entirely on the mineral that hosts it. An alexandrite shifts from teal in daylight to deep raspberry under incandescent light because its absorption spectrum falls precisely on the boundary between two light sources. These are not accidents of beauty. They are chemistry operating under conditions that exist only deep within the Earth, only under specific geological circumstance, only once.",
    body2:
      "We choose materials where this geological intelligence is still visible in the object itself — not polished away, not set so the stone becomes decoration. Every piece in a Phaigort collection is selected because you cannot separate its beauty from its science. The two arrived together. They do not come apart.",
    image: "/collections/geological-rarities.jpg",
    imageAlt: "Cut gemstones representing the geological forces that create colour — Phaigort",
  },
  {
    caption: "II. The Expedition Mind",
    title: "We go where the stones are — before the market decides their value",
    body1:
      "Great gemstones do not announce themselves. They surface in river gravels outside Ratnapura at dawn, in the metamorphic corridors of the Malagasy highlands, in marble seams running through mountains that most maps do not bother naming. Finding them rough — ungraded, unvalued, still carrying the earth they came from — requires something closer to geological intuition than to commerce.",
    body2:
      "This is how Phaigort reaches material that never reaches open markets. Not through sourcing networks or supply chain partnerships — through relationships built over years at origin, with people who know which riverbank to stand on after the rains, and why. Provenance, here, is not a certificate issued after the fact. It is a conversation that began at the ground itself.",
    image: "/story/expedition-rough.jpg",
    imageAlt:
      "Rough multicolour corundum pebbles from alluvial mining — Phaigort The Expedition Mind",
  },
  {
    caption: "III. The Standard We Keep",
    title: "One question governs everything we allow to leave the atelier",
    body1:
      "A stone cut to maximise weight retention is not the same stone cut to reveal what the Earth intended. Metal chosen for production efficiency is not the same metal chosen for how it changes over decades of wear — the way gold develops patina that records the life lived alongside it. These distinctions are not aesthetic preferences. They are the difference between an object and an heirloom.",
    body2:
      "Every piece in the Phaigort collection is held to a single question before it leaves: will this matter more in twenty years? Not simply hold its value — matter. To someone who finds it in a drawer. To someone who receives it without context. To someone who has not yet been born. If the answer is uncertain, the piece does not leave.",
    image: "/story/garcia-de-orta.jpg",
    imageAlt:
      "García de Orta — Iberian naturalist and intellectual precursor to Phaigort's material philosophy",
  },
];

export function MaterialTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#0A0F1D] py-32 md:py-48">
      {/* Background Particles / Depth Feel */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,91,19,0.15)_0%,_transparent_70%)] opacity-20" />

      {/* Progress Track Line */}
      <div className="absolute bottom-0 left-6 top-0 w-px bg-platinum/10 md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        className="absolute bottom-0 left-6 top-0 w-px origin-top bg-coral shadow-[0_0_10px_rgba(236,91,19,0.5)] md:left-1/2 md:-translate-x-1/2"
        style={{ scaleY: scrollYProgress }}
      />

      <Container className="relative z-10 space-y-32 md:space-y-64">
        {TIMELINE_DATA.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}

        {/* García de Orta — lineage anchor after the three timeline items */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-platinum/10 pt-16 md:flex md:items-start md:gap-12"
        >
          {/* Portrait — screen blend dissolves the black bg into the dark section */}
          <div className="relative mx-auto mb-8 w-[160px] flex-shrink-0 overflow-hidden md:mx-0 md:mb-0 md:w-[200px]">
            <div className="relative" style={{ aspectRatio: "1/1.15" }}>
              <Image
                src="/story/garcia-de-orta.jpg"
                alt="García de Orta — 16th century Iberian naturalist and father of tropical pharmacology"
                fill
                sizes="200px"
                className="object-cover object-top"
                style={{ mixBlendMode: "screen" }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="font-brand text-[9px] uppercase tracking-[0.45em] text-platinum/30">
              The Lineage
            </p>
            <h3 className="mt-3 font-heading text-2xl text-platinum/90 md:text-3xl">
              García de Orta, 1563
            </h3>
            <p className="mt-4 max-w-prose font-body text-sm leading-relaxed text-platinum/55">
              The first European to document the gemstone trade routes of Goa, Hormuz, and Ceylon —
              recording colour, clarity, and origin with the rigour of a naturalist and the instinct
              of a merchant. Phaigort&apos;s discipline begins here.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function TimelineItem({ item, index }: { item: (typeof TIMELINE_DATA)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`relative flex flex-col items-center gap-12 md:flex-row md:gap-24 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Connector Dot */}
      <div className="absolute left-6 top-12 z-20 h-4 w-4 -translate-x-[7px] rounded-full border border-coral bg-[#0A0F1D] shadow-[0_0_15px_rgba(236,91,19,0.3)] transition-transform duration-700 hover:scale-150 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />

      {/* Content Block */}
      <div className="ml-16 flex flex-col justify-center md:ml-0 md:w-1/2">
        <Caption className="tracking-widest text-silver">{item.caption}</Caption>
        <H2 className="mt-8 text-balance leading-tight text-platinum">{item.title}</H2>
        <div className="mt-8 space-y-6">
          <Body className="text-balance text-lg leading-relaxed text-platinum/60">
            {item.body1}
          </Body>
          <Body className="text-balance text-lg leading-relaxed text-platinum/60">
            {item.body2}
          </Body>
        </div>
      </div>

      {/* Editorial photograph — actual gemstone/material imagery */}
      <motion.div
        className="group ml-16 md:ml-0 md:w-1/2"
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-[3/4] overflow-hidden border border-platinum/10 shadow-2xl md:aspect-[4/5]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover vignette — coral tint bleeds in on hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-coral/15 to-transparent opacity-0 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-100" />
          {/* Bottom caption strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0F1D]/70 to-transparent px-6 pb-5 pt-12">
            <span className="font-brand text-[10px] uppercase tracking-[0.3em] text-platinum/45">
              {item.caption}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
