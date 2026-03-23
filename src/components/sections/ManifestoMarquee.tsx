// src/components/sections/ManifestoMarquee.tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";

const MANIFESTO = "Not everything precious is displayed. Some of it is discovered.";

export function ManifestoMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const repeated = Array(8).fill(MANIFESTO);

  if (prefersReducedMotion) {
    return (
      <section className="py-10 md:py-12 bg-[#F5F0EB] overflow-hidden">
        <p className="font-heading italic text-royal-navy text-2xl md:text-3xl text-center px-6">
          {MANIFESTO}
        </p>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12 bg-[#F5F0EB] overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap gap-16"
      >
        {repeated.map((text, i) => (
          <span key={i} className="font-heading italic text-royal-navy/60 text-2xl md:text-3xl shrink-0">
            {text} <span className="text-coral/50 mx-4">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
