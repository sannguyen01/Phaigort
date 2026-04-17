"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ── Hero ──────────────────────────────────────────────────────────────────────
// Layout: full-viewport dark field
//   · Top: eyebrow + H1 + body copy + CTA, centered
//   · Bottom: diamond necklace (vongco) large, centered, with vignette mask
//   · Floating: rough diamond crystal (kimcuongtho) lower-right, screen blend
//   · Decorative: dark botanical radial rings, left/right edges

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax — necklace drifts slightly slower than scroll
  const necklaceY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 32]);

  return (
    <section
      ref={heroRef}
      className="relative -mt-[80px] min-h-screen overflow-hidden bg-[#08090D] pb-32 md:-mt-[88px]"
      aria-label="Hero"
    >
      {/* ── Dark botanical radial rings (decorative, left edge) ─────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[18vw] top-[8vh] h-[70vw] w-[70vw] rounded-full"
        style={{
          border: "1px solid rgba(248,249,251,0.04)",
          boxShadow: [
            "0 0 0 1px rgba(248,249,251,0.025)",
            "inset 0 0 80px rgba(248,249,251,0.015)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[28vw] top-[1vh] h-[90vw] w-[90vw] rounded-full"
        style={{ border: "1px solid rgba(248,249,251,0.025)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[36vw] -top-[5vh] h-[110vw] w-[110vw] rounded-full"
        style={{ border: "1px solid rgba(248,249,251,0.015)" }}
      />

      {/* ── Dark botanical radial rings (decorative, right edge) ────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20vw] bottom-[5vh] h-[60vw] w-[60vw] rounded-full"
        style={{ border: "1px solid rgba(248,249,251,0.03)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[2vh] -right-[30vw] h-[80vw] w-[80vw] rounded-full"
        style={{ border: "1px solid rgba(248,249,251,0.018)" }}
      />

      {/* ── Radial ambient glow — centre ────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 68%, rgba(180,170,150,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── NECKLACE IMAGE — large, centred, vignette-masked ────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
        style={prefersReducedMotion ? {} : { y: necklaceY }}
      >
        {/* The vignette mask fades the light background of the PNG into the dark field */}
        <div
          className="relative w-[min(640px,90vw)] md:w-[min(700px,75vw)] lg:w-[min(760px,60vw)]"
          style={{
            aspectRatio: "3/4",
            WebkitMaskImage:
              "radial-gradient(ellipse 88% 90% at 50% 48%, black 28%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 88% 90% at 50% 48%, black 28%, transparent 100%)",
          }}
        >
          <Image
            src="/hero/necklace.png"
            alt="Antique diamond drop necklace — Phaigort Material Collection"
            fill
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 75vw, 760px"
            className="object-contain object-top"
          />
        </div>
      </motion.div>

      {/* ── Top gradient — fades hero into header ───────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, rgba(8,9,13,0.85) 0%, transparent 100%)",
        }}
      />

      {/* ── Bottom gradient — grounds the necklace ──────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          background: "linear-gradient(to top, rgba(8,9,13,1) 0%, transparent 100%)",
        }}
      />

      {/* ── TEXT CONTENT — centred upper portion ────────────────────────── */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-[clamp(100px,14vh,160px)] text-center"
        style={prefersReducedMotion ? {} : { y: contentY }}
      >
        {/* Eyebrow */}
        <motion.p
          className="font-ui text-[10px] uppercase tracking-[0.22em] text-platinum/40"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 1, delay: 0.1 },
              })}
        >
          Rare Gemstone · Precious Metals · Material Culture · High Jewellery
        </motion.p>

        {/* H1 */}
        <motion.h1
          className="mx-auto mt-6 max-w-[800px] px-6 font-display text-[clamp(2.2rem,5vw,4.8rem)] font-bold leading-[1.06] text-platinum"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
              })}
        >
          Some things take million
          <br />
          to billion years to become
          <br />
          extraordinary.
        </motion.h1>

        {/* Body copy */}
        <motion.p
          className="mx-auto mt-6 max-w-[520px] px-6 font-display text-[clamp(0.9rem,1.3vw,1.05rem)] italic leading-relaxed text-platinum/55"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.38, ease: "easeOut" },
              })}
        >
          We find them at the source.
          <br />
          We bring them to those who understand what they hold.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.62, duration: 0.7 },
              })}
        >
          <Button href="/collections" variant="secondary" onDark>
            Enter the Collection
          </Button>
        </motion.div>

        {/* ── Our Story — merged into Hero ──────────────────────────────── */}
        <motion.div
          className="mx-auto mt-24 max-w-[600px] border-t px-6 pt-16 text-center"
          style={{ borderColor: "rgba(200,200,200,0.1)" }}
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] },
              })}
        >
          <p
            className="font-ui uppercase tracking-[0.18em] text-platinum/40"
            style={{ fontSize: "var(--text-xs)" }}
          >
            Our Story
          </p>
          <p
            className="mt-6 font-display italic leading-[1.8] text-platinum/55"
            style={{ fontSize: "clamp(0.95rem,1.3vw,1.08rem)" }}
          >
            Where you build collections worth explaining, worth keeping, worth passing down. Every
            piece carries its true story. Every collector joins a community of material
            consciousness.
          </p>
          <a
            href="/material-consciousness"
            className="mt-8 inline-flex items-center gap-3 font-ui text-[11px] uppercase tracking-[0.16em] text-platinum/40 transition-colors duration-200 hover:text-platinum/70"
          >
            Discover the Origin
            <span className="inline-block h-px w-7" style={{ background: "currentColor" }} />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-ui text-[9px] uppercase tracking-widest text-platinum/30">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-platinum/20 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default Hero;
