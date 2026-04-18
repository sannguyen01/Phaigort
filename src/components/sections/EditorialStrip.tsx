// src/components/sections/EditorialStrip.tsx
// A full-bleed dark section with a single extreme material close-up and a parallax one-line caption
// Sits between Hero and OurStory to break the navy-on-navy continuity

"use client";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface EditorialStripProps {
  image: string;
  imageAlt: string;
  caption: string; // max 12 words
}

export function EditorialStrip({ image, imageAlt, caption }: EditorialStripProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax the background image slightly
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Subtle scale effect as user scrolls past
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  return (
    <section ref={ref} className="relative h-[60vh] overflow-hidden bg-ground md:h-[80vh]">
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y, scale: prefersReducedMotion ? 1 : scale }}
        className="absolute -inset-y-12 inset-x-0"
      >
        <Image src={image} alt={imageAlt} fill className="object-cover opacity-[0.65]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50" />
      <motion.div
        {...(!prefersReducedMotion && {
          initial: { opacity: 0, y: 16 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] },
        })}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <p className="max-w-4xl text-center font-heading text-3xl italic leading-[1.1] tracking-[-0.01em] text-platinum drop-shadow-2xl md:text-[3.25rem] lg:text-[4rem]">
          {caption}
        </p>
      </motion.div>
    </section>
  );
}
