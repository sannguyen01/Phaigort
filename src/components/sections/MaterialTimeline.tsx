"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { H2, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

const TIMELINE_DATA = [
  {
    caption: "I. The Earth as Artist",
    title: "Colour, light, crystalline geometry — forces no craftsperson can replicate",
    body1: "A ruby's red comes from chromium — the same element that colours emeralds green, depending entirely on the mineral that hosts it. An alexandrite shifts from teal in daylight to deep raspberry under incandescent light because its absorption spectrum falls precisely on the boundary between two light sources. These are not accidents of beauty. They are chemistry operating under conditions that exist only deep within the Earth, only under specific geological circumstance, only once.",
    body2: "We choose materials where this geological intelligence is still visible in the object itself — not polished away, not set so the stone becomes decoration. Every piece in a Phaigort collection is selected because you cannot separate its beauty from its science. The two arrived together. They do not come apart."
  },
  {
    caption: "II. The Expedition Mind",
    title: "We go where the stones are — before the market decides their value",
    body1: "Great gemstones do not announce themselves. They surface in river gravels outside Ratnapura at dawn, in the metamorphic corridors of the Malagasy highlands, in marble seams running through mountains that most maps do not bother naming. Finding them rough — ungraded, unvalued, still carrying the earth they came from — requires something closer to geological intuition than to commerce.",
    body2: "This is how Phaigort reaches material that never reaches open markets. Not through sourcing networks or supply chain partnerships — through relationships built over years at origin, with people who know which riverbank to stand on after the rains, and why. Provenance, here, is not a certificate issued after the fact. It is a conversation that began at the ground itself."
  },
  {
    caption: "III. The Standard We Keep",
    title: "One question governs everything we allow to leave the atelier",
    body1: "A stone cut to maximise weight retention is not the same stone cut to reveal what the Earth intended. Metal chosen for production efficiency is not the same metal chosen for how it changes over decades of wear — the way gold develops patina that records the life lived alongside it. These distinctions are not aesthetic preferences. They are the difference between an object and an heirloom.",
    body2: "Every piece in the Phaigort collection is held to a single question before it leaves: will this matter more in twenty years? Not simply hold its value — matter. To someone who finds it in a drawer. To someone who receives it without context. To someone who has not yet been born. If the answer is uncertain, the piece does not leave."
  }
];

export function MaterialTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={containerRef} className="relative bg-[#0A0F1D] py-32 md:py-48 overflow-hidden">
      {/* Background Particles / Depth Feel */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_rgba(236,91,19,0.15)_0%,_transparent_70%)]" />

      {/* Progress Track Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-platinum/10 md:-translate-x-1/2" />
      <motion.div 
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-coral origin-top md:-translate-x-1/2 shadow-[0_0_10px_rgba(236,91,19,0.5)]" 
        style={{ scaleY: scrollYProgress }} 
      />

      <Container className="relative z-10 space-y-32 md:space-y-64">
        {TIMELINE_DATA.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </Container>
    </section>
  );
}

function TimelineItem({ item, index }: { item: any, index: number }) {
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
      className={`relative flex flex-col md:flex-row gap-12 md:gap-24 items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Connector Dot */}
      <div className="absolute left-6 md:left-1/2 top-12 md:top-1/2 w-4 h-4 rounded-full bg-[#0A0F1D] border border-coral -translate-x-[7px] md:-translate-x-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_15px_rgba(236,91,19,0.3)] transition-transform duration-700 hover:scale-150" />

      {/* Content Block */}
      <div className="ml-16 md:ml-0 md:w-1/2 flex flex-col justify-center">
        <Caption className="text-coral/80 tracking-widest">{item.caption}</Caption>
        <H2 className="mt-8 text-platinum text-balance leading-tight">{item.title}</H2>
        <div className="mt-8 space-y-6">
          <Body className="text-platinum/60 text-balance leading-relaxed text-lg">{item.body1}</Body>
          <Body className="text-platinum/60 text-balance leading-relaxed text-lg">{item.body2}</Body>
        </div>
      </div>

      {/* Abstract Graphic / Placeholder */}
      <div className="ml-16 md:ml-0 md:w-1/2 group cursor-crosshair">
        <div className="relative aspect-[3/4] md:aspect-[4/5] bg-platinum/5 border border-platinum/10 overflow-hidden transform transition-transform duration-[2s] group-hover:scale-[1.02] hover:border-platinum/30 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-coral/10 to-transparent opacity-0 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-100" />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-platinum/20 font-brand text-xs tracking-[0.4em] uppercase"
            whileHover={{ scale: 1.1, rotate: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Visual Artifact {String(index + 1).padStart(2, "0")}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
