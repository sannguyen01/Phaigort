"use client";

// src/components/sections/MaterialStory.tsx
// Two-column institutional section: editorial copy left · arch-masked stone image right.
// T-02 Abyssal Carbon ground. Cardo + Garet. No pillars — those live in Statement.
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function MaterialStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: "var(--color-dark)" }}
    >
      <div
        className="mx-auto grid grid-cols-1 items-center gap-16 px-[clamp(24px,4vw,64px)] md:grid-cols-2 md:gap-20 lg:gap-32"
        style={{ maxWidth: "var(--content-wide)" }}
      >
        {/* ── Left — editorial copy ─────────────────────────────────── */}
        <motion.div
          className="flex flex-col justify-center"
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
          })}
        >
          <p
            className="font-ui uppercase tracking-[0.18em]"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
          >
            Our Story
          </p>

          <h2
            className="mt-5 font-display font-bold leading-[1.15]"
            style={{ fontSize: "var(--text-2xl)", color: "var(--color-text)" }}
          >
            Some materials take forty million years to become beautiful.
          </h2>

          <p
            className="mt-6 font-ui leading-[1.85]"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-body)",
              opacity: 0.68,
            }}
          >
            Phaigort is built around a single conviction: the Earth&apos;s most extraordinary
            materials carry a depth of meaning no jeweler can manufacture. We find them at the
            source, understand them with scientific rigour, and bring them to collectors who know
            the difference between something decorative and something true.
          </p>

          {/* T-09 Platinum Mist hairline */}
          <div
            className="mt-10"
            style={{ height: "1px", width: "40px", background: "rgba(200,200,200,0.2)" }}
          />

          <a
            href="/our-story"
            className="mt-8 inline-flex items-center gap-3 font-ui uppercase tracking-[0.16em] transition-opacity duration-200 hover:opacity-100"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              opacity: 0.7,
            }}
          >
            Read Our Story
            <span
              className="inline-block h-px w-7 transition-all duration-300"
              style={{ background: "var(--color-text-muted)" }}
            />
          </a>
        </motion.div>

        {/* ── Right — arch-masked geological specimen ───────────────── */}
        <motion.div
          className="arch-mask relative overflow-hidden"
          style={{ aspectRatio: "3 / 4" }}
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, x: 24 },
            animate: isInView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
          })}
        >
          <Image
            src="/story/rough-stone.png"
            alt="Rough diamond specimen — natural geological formation"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            style={{ mixBlendMode: "screen", opacity: 0.78 }}
            loading="lazy"
          />
          {/* Base vignette — dissolves stone into dark field */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{
              background: "linear-gradient(to top, var(--color-dark) 0%, transparent 100%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export { MaterialStory as OurStory };
export default MaterialStory;
