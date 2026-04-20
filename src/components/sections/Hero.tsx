"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ── Hero ──────────────────────────────────────────────────────────────────────
// Layout: 100dvh dark void with editorial image composition.
//   · Background: pure geological void — T-01 #0A0A0A
//   · Necklace: centred hero anchor image with slow parallax descent
//   · Pattern brooch: decorative overlay, right-edge, fades on scroll
//   · Content: left-aligned eyebrow + H1 + body + ghost CTA
//   · All motion: slow, deliberate, 600–900ms ease-out (brand rule)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Content drifts up slowly as user scrolls — depth sensation
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  // Necklace has deeper parallax — it appears to recede into the void
  const necklaceY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const necklaceScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const necklaceOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  // Pattern brooch drifts and fades faster — foreground decoration
  const patternY = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const patternOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="grain-field relative -mt-[80px] min-h-[100dvh] overflow-hidden md:-mt-[88px]"
      style={{ background: "var(--color-bg)" }}
      aria-label="Hero"
    >
      {/* ── NECKLACE — centred hero focal point, deep parallax ──────── */}
      {prefersReducedMotion ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <NecklaceImage />
        </div>
      ) : (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ y: necklaceY, scale: necklaceScale, opacity: necklaceOpacity }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <NecklaceImage />
        </motion.div>
      )}

      {/* ── PATTERN BROOCH — decorative overlay, right edge ─────────── */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-4vw] top-[8vh] w-[30vw] max-w-[340px] md:right-[2vw] md:w-[22vw]"
          style={{ y: patternY, opacity: patternOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/hero/pattern.webp"
            alt=""
            width={340}
            height={520}
            priority
            className="h-auto w-full object-contain"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>
      )}

      {/* ── RADIAL GLOW — soft luminance behind necklace ─────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 52%, rgba(250,250,250,0.028) 0%, transparent 70%)",
        }}
      />

      {/* ── TOP FADE — void absorbs header boundary ──────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-36"
        style={{
          background: "linear-gradient(to bottom, var(--color-bg) 0%, transparent 100%)",
        }}
      />

      {/* ── BOTTOM FADE — section dissolves into next section ──────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-44"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)",
        }}
      />

      {/* ── TEXT CONTENT — left-aligned, upper portion ──────────────── */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-[100dvh] flex-col items-start justify-start px-6 pt-[clamp(120px,18vh,180px)] md:px-10 lg:px-14"
        style={{
          maxWidth: "var(--content-wide)",
          ...(prefersReducedMotion ? {} : { y: contentY }),
        }}
      >
        {/* On narrow mobile the centred necklace can overlap left text.
            A subtle left-side radial gradient sits behind the text block to
            ensure legibility. pointer-events-none so it never blocks taps. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[70%] sm:hidden"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.45) 55%, transparent 100%)",
          }}
        />
        <div className="max-w-[min(600px,55vw)] pb-[38%] sm:pb-0">
          {/* Eyebrow */}
          <motion.p
            className="font-ui uppercase tracking-[0.22em]"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
            {...(!prefersReducedMotion && {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1, delay: 0.15 },
            })}
          >
            Rare Gemstone · Precious Metals · Material Culture · High Jewellery
          </motion.p>

          {/* H1 */}
          <motion.h1
            className="mt-7 font-display font-normal leading-[1.06] tracking-[0.01em]"
            style={{ fontSize: "var(--text-hero)", color: "var(--color-text)" }}
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
            })}
          >
            Some things take million
            <br />
            to billion years to become
            <br />
            extraordinary.
          </motion.h1>

          {/* T-09 ornamental rule */}
          <motion.div
            className="mt-9 origin-left"
            style={{ height: "1px", width: "40px", background: "rgba(200,200,200,0.2)" }}
            {...(!prefersReducedMotion && {
              initial: { scaleX: 0 },
              animate: { scaleX: 1 },
              transition: { duration: 0.7, delay: 0.58 },
            })}
          />

          {/* Body copy */}
          <motion.p
            className="mt-7 max-w-[min(520px,48vw)] font-display italic leading-[1.75]"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-body)",
              opacity: 0.6,
            }}
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 0.6, y: 0 },
              transition: { duration: 0.9, delay: 0.44, ease: "easeOut" },
            })}
          >
            We find them at the source.
            <br />
            We bring them to those who understand what they hold.
          </motion.p>

          {/* Ghost CTA */}
          <motion.div
            className="mt-11"
            {...(!prefersReducedMotion && {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.72, duration: 0.7 },
            })}
          >
            <Button href="/collections">Enter the Collection</Button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="font-ui uppercase tracking-widest"
              style={{ fontSize: "9px", color: "rgba(200,200,200,0.25)" }}
            >
              Scroll
            </span>
            <div
              className="h-8 w-px"
              style={{
                background: "linear-gradient(to bottom, rgba(200,200,200,0.18), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

// ── Sub-component: necklace image ──────────────────────────────────────────────
// Mask shifts the radial center rightward (65% X) so the left edge fades to
// transparent — preventing the image from bleeding into the left text column.
// Animation is handled unconditionally by the parent motion div on mount.
function NecklaceImage() {
  return (
    <div
      className="relative w-full max-w-[min(640px,80vw)] px-4 md:max-w-[min(720px,55vw)]"
      style={{
        maskImage: "radial-gradient(ellipse 70% 88% at 62% 50%, black 20%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 88% at 62% 50%, black 20%, transparent 72%)",
      }}
    >
      <Image
        src="/hero/necklace.webp"
        alt="An extraordinary diamond necklace — geological formation over millions of years"
        width={720}
        height={900}
        priority
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRrYAAABXRUJQVlA4WAoAAAAQAAAABwAACQAAQUxQSE8AAAABcFvbtmmtZ1sFfKS2zSJ+xiqs6LcfEYFRb5dbPmI/hWwlpEMkiUEWjBAlWoly6UDv4kqH6+/32IulafHzb29yWLtKf6SISMxmSCAQRQgAAFZQOCBAAAAAEAIAnQEqCAAKAAVAfCWUAsOxFKUHCjnwAAD+WBsRDlit1ocF7oZRhwoeOZRrDDCcDn95+p4wYDZxavOV9gAAAA=="
        sizes="(max-width: 768px) 80vw, 55vw"
        className="h-auto w-full object-contain"
        style={{ opacity: 0.9 }}
      />
    </div>
  );
}

export default Hero;
