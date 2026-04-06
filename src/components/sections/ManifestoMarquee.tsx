// src/components/sections/ManifestoMarquee.tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";

const MANIFESTO = "Not everything precious is displayed. Some of it is discovered.";

export function ManifestoMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const repeated = Array(8).fill(MANIFESTO);

  if (prefersReducedMotion) {
    return (
      <section className="overflow-hidden bg-[#F5F0EB] py-10 md:py-12">
        <p className="px-6 text-center font-heading text-2xl italic text-royal-navy md:text-3xl">
          {MANIFESTO}
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-[#F5F0EB] py-10 md:py-12" aria-hidden="true">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="flex gap-16 whitespace-nowrap"
      >
        {repeated.map((text, i) => (
          <span
            key={i}
            className="shrink-0 font-heading text-2xl italic text-royal-navy/85 md:text-3xl"
          >
            {text} <span className="mx-4 text-coral">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
