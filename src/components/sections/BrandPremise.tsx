// src/components/sections/BrandPremise.tsx
// Two-column institutional statement: etymological copy left · calligraphic signature right.
// T-01 ground. T-12 text. T-09 ruled ornament. No warm tones.
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function BrandPremise() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const animate = !prefersReducedMotion;

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="mx-auto grid grid-cols-1 gap-16 px-[clamp(16px,3vw,48px)] md:grid-cols-[1.3fr_1fr] md:gap-16 lg:gap-24"
        style={{ maxWidth: "var(--content-wide)" }}
      >
        {/* Left — editorial copy */}
        <motion.div
          className="flex flex-col justify-center"
          {...(animate && {
            initial: { opacity: 0, y: 28 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
          })}
        >
          {/* Eyebrow */}
          <p
            className="font-ui uppercase tracking-[0.18em]"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
          >
            The Name
          </p>

          {/* Pull headline — Cardo */}
          <h2
            className="mt-5 font-display font-normal leading-[1.2]"
            style={{ fontSize: "var(--text-2xl)", color: "var(--color-text)" }}
          >
            More than a jewellery house — the institution behind our Wonderhouse of material
            consciousness.
          </h2>

          {/* Etymology */}
          <p
            className="mt-7 font-ui leading-[1.85]"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-body)",
              opacity: 0.65,
            }}
          >
            The name synthesises the Greek <em style={{ opacity: 1 }}>phainomenon</em> — that which
            reveals itself through observation — and the Portuguese{" "}
            <em style={{ opacity: 1 }}>fazer</em> — to create. Two words for the same act: the
            moment something becomes knowable.
          </p>

          {/* García de Orta */}
          <p
            className="mt-5 font-ui leading-[1.85]"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-body)",
              opacity: 0.65,
            }}
          >
            We honour{" "}
            <strong style={{ color: "var(--color-text-body)", opacity: 1 }}>García de Orta</strong>,
            the pioneering Portuguese physician who in 1563 authored the first scientific treatise
            on gemstones in everyday language — choosing to share knowledge rather than keep it
            exclusive. He embodied the same spirit of accessibility and rigour that defines Phaigort
            today.
          </p>

          {/* T-09 hairline */}
          <div
            className="my-8 self-start"
            style={{
              height: "1px",
              width: "40px",
              background: "rgba(200,200,200,0.2)",
            }}
          />

          {/* Sanctuary quote — Cardo italic */}
          <p
            className="font-display italic leading-[1.65]"
            style={{
              fontSize: "clamp(1rem,1.4vw,1.1rem)",
              color: "var(--color-text-body)",
              opacity: 0.72,
            }}
          >
            A sanctuary for material fascination — an inclusive vessel, inviting curious minds on a
            voyage to uncover the world&apos;s geological wonders, the legacy of human
            craftsmanship, and the brilliance of contemporary innovation.
          </p>
        </motion.div>

        {/* Right — calligraphic Phaigort signature */}
        <motion.div
          className="flex flex-col items-center justify-center gap-10 md:items-end"
          {...(animate && {
            initial: { opacity: 0, x: 20 },
            animate: isInView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
          })}
        >
          {/* T-09 rule above */}
          <div
            className="hidden w-full md:block"
            style={{ height: "1px", background: "rgba(200,200,200,0.1)" }}
          />

          {/* Signature — real calligraphic PNG asset, slow float */}
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full"
            style={{ maxWidth: "480px", aspectRatio: "3/1" }}
          >
            <Image
              src="/brand/signature-v2.png"
              alt="Phaigort"
              fill
              sizes="380px"
              className="object-contain"
              style={{ opacity: 0.88 }}
              loading="lazy"
            />
          </motion.div>

          <p
            className="font-ui uppercase tracking-[0.35em]"
            style={{ fontSize: "0.6rem", color: "var(--color-text-faint)" }}
          >
            Est. Material Consciousness
          </p>

          {/* T-09 rule below */}
          <div
            className="hidden w-full md:block"
            style={{ height: "1px", background: "rgba(200,200,200,0.1)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default BrandPremise;
