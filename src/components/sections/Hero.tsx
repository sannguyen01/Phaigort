"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ── Hero ──────────────────────────────────────────────────────────────────────
// Layout: 100dvh dark void — NO photography per CLAUDE.md design rule.
//   · Background: botanical SVG motif at 8% opacity (Garcia de Orta tradition)
//   · Radial rings: pure achromatic, left + right edges
//   · Content: eyebrow + H1 + body copy + ghost CTA, centered upper portion
//   · Scroll indicator at bottom

// ── Botanical SVG — inline, aria-hidden ──────────────────────────────────────
// Inspired by 16th-century Iberian natural-history illustration (de Orta, 1563).
// Concentric ellipses (geological strata) + symmetric leaf-branch forms +
// diamond ornaments at stem nodes. Pure stroke, achromatic.
function BotanicalMotif() {
  const S = "rgba(250,250,250,0.055)";
  const SFaint = "rgba(250,250,250,0.03)";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ── Concentric ellipses — geological cross-section strata ─── */}
      <ellipse cx="600" cy="450" rx="560" ry="420" stroke={SFaint} strokeWidth="0.6" />
      <ellipse cx="600" cy="450" rx="440" ry="335" stroke={SFaint} strokeWidth="0.6" />
      <ellipse cx="600" cy="450" rx="320" ry="250" stroke={S} strokeWidth="0.5" />
      <ellipse cx="600" cy="450" rx="200" ry="160" stroke={S} strokeWidth="0.5" />
      <ellipse cx="600" cy="450" rx="100" ry="82" stroke={S} strokeWidth="0.5" />

      {/* ── Cardinal axes (botanical cross) ───────────────────────── */}
      <line x1="600" y1="0" x2="600" y2="900" stroke={SFaint} strokeWidth="0.5" />
      <line x1="0" y1="450" x2="1200" y2="450" stroke={SFaint} strokeWidth="0.5" />

      {/* ── Top stem + leaf pair ───────────────────────────────────── */}
      <line x1="600" y1="265" x2="600" y2="30" stroke={S} strokeWidth="0.7" />
      {/* Left leaf */}
      <path
        d="M600,200 C575,185 558,162 568,138 C578,114 600,120 600,160 Z"
        stroke={S}
        strokeWidth="0.6"
      />
      {/* Right leaf */}
      <path
        d="M600,200 C625,185 642,162 632,138 C622,114 600,120 600,160 Z"
        stroke={S}
        strokeWidth="0.6"
      />
      {/* Leaf veins */}
      <line x1="600" y1="200" x2="572" y2="155" stroke={SFaint} strokeWidth="0.4" />
      <line x1="600" y1="200" x2="628" y2="155" stroke={SFaint} strokeWidth="0.4" />

      {/* ── Bottom stem + leaf pair ────────────────────────────────── */}
      <line x1="600" y1="635" x2="600" y2="870" stroke={S} strokeWidth="0.7" />
      <path
        d="M600,700 C575,715 558,738 568,762 C578,786 600,780 600,740 Z"
        stroke={S}
        strokeWidth="0.6"
      />
      <path
        d="M600,700 C625,715 642,738 632,762 C622,786 600,780 600,740 Z"
        stroke={S}
        strokeWidth="0.6"
      />
      <line x1="600" y1="700" x2="572" y2="745" stroke={SFaint} strokeWidth="0.4" />
      <line x1="600" y1="700" x2="628" y2="745" stroke={SFaint} strokeWidth="0.4" />

      {/* ── Left branch + leaf pair ────────────────────────────────── */}
      <line x1="400" y1="450" x2="40" y2="450" stroke={S} strokeWidth="0.7" />
      <path
        d="M330,450 C315,425 292,408 268,418 C244,428 250,450 290,450 Z"
        stroke={S}
        strokeWidth="0.6"
      />
      <path
        d="M330,450 C315,475 292,492 268,482 C244,472 250,450 290,450 Z"
        stroke={S}
        strokeWidth="0.6"
      />
      <line x1="330" y1="450" x2="275" y2="422" stroke={SFaint} strokeWidth="0.4" />
      <line x1="330" y1="450" x2="275" y2="478" stroke={SFaint} strokeWidth="0.4" />

      {/* ── Right branch + leaf pair ───────────────────────────────── */}
      <line x1="800" y1="450" x2="1160" y2="450" stroke={S} strokeWidth="0.7" />
      <path
        d="M870,450 C885,425 908,408 932,418 C956,428 950,450 910,450 Z"
        stroke={S}
        strokeWidth="0.6"
      />
      <path
        d="M870,450 C885,475 908,492 932,482 C956,472 950,450 910,450 Z"
        stroke={S}
        strokeWidth="0.6"
      />
      <line x1="870" y1="450" x2="925" y2="422" stroke={SFaint} strokeWidth="0.4" />
      <line x1="870" y1="450" x2="925" y2="478" stroke={SFaint} strokeWidth="0.4" />

      {/* ── Diamond ornaments — brand motif at stem nodes ─────────── */}
      {/* Centre diamond */}
      <path d="M600,440 L610,450 L600,460 L590,450 Z" stroke={S} strokeWidth="0.7" />
      {/* Top stem diamond */}
      <path d="M600,218 L607,225 L600,232 L593,225 Z" stroke={S} strokeWidth="0.5" />
      {/* Bottom stem diamond */}
      <path d="M600,668 L607,675 L600,682 L593,675 Z" stroke={S} strokeWidth="0.5" />
      {/* Left branch diamond */}
      <path d="M348,443 L355,450 L348,457 L341,450 Z" stroke={S} strokeWidth="0.5" />
      {/* Right branch diamond */}
      <path d="M845,443 L852,450 L845,457 L838,450 Z" stroke={S} strokeWidth="0.5" />

      {/* ── Secondary leaf clusters — diagonal axes ────────────────── */}
      {/* NW quadrant tendril */}
      <path
        d="M520,370 C505,348 495,320 510,305 C525,290 545,308 540,330 C535,352 520,370 520,370 Z"
        stroke={SFaint}
        strokeWidth="0.5"
      />
      {/* NE quadrant tendril */}
      <path
        d="M680,370 C695,348 705,320 690,305 C675,290 655,308 660,330 C665,352 680,370 680,370 Z"
        stroke={SFaint}
        strokeWidth="0.5"
      />
      {/* SW quadrant tendril */}
      <path
        d="M520,530 C505,552 495,580 510,595 C525,610 545,592 540,570 C535,548 520,530 520,530 Z"
        stroke={SFaint}
        strokeWidth="0.5"
      />
      {/* SE quadrant tendril */}
      <path
        d="M680,530 C695,552 705,580 690,595 C675,610 655,592 660,570 C665,548 680,530 680,530 Z"
        stroke={SFaint}
        strokeWidth="0.5"
      />

      {/* ── Fine connecting arcs between leaf nodes ────────────────── */}
      <path d="M600,265 Q650,350 680,370" stroke={SFaint} strokeWidth="0.4" />
      <path d="M600,265 Q550,350 520,370" stroke={SFaint} strokeWidth="0.4" />
      <path d="M600,635 Q650,550 680,530" stroke={SFaint} strokeWidth="0.4" />
      <path d="M600,635 Q550,550 520,530" stroke={SFaint} strokeWidth="0.4" />
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={heroRef}
      className="grain-field relative -mt-[80px] min-h-[100dvh] overflow-hidden md:-mt-[88px]"
      style={{ background: "var(--color-bg)" }}
      aria-label="Hero"
    >
      {/* ── Botanical motif — achromatic Iberian botanical illustration ── */}
      <BotanicalMotif />

      {/* ── Radial rings — pure achromatic, left edge ───────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[20vw] top-[6vh] h-[72vw] w-[72vw] rounded-full"
        style={{ border: "1px solid rgba(250,250,250,0.035)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[30vw] top-[0vh] h-[92vw] w-[92vw] rounded-full"
        style={{ border: "1px solid rgba(250,250,250,0.02)" }}
      />

      {/* ── Radial rings — right edge ────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[22vw] bottom-[4vh] h-[64vw] w-[64vw] rounded-full"
        style={{ border: "1px solid rgba(250,250,250,0.025)" }}
      />

      {/* ── Top fade — hero into header ─────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, var(--color-bg) 0%, transparent 100%)",
        }}
      />

      {/* ── Bottom fade — hero dissolves into void ───────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-32"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)",
        }}
      />

      {/* ── TEXT CONTENT — centred upper portion ────────────────────── */}
      <motion.div
        className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-start pt-[clamp(110px,15vh,170px)] text-center"
        style={prefersReducedMotion ? {} : { y: contentY }}
      >
        {/* Eyebrow */}
        <motion.p
          className="font-ui uppercase tracking-[0.22em]"
          style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
          {...(!prefersReducedMotion && {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 1, delay: 0.1 },
          })}
        >
          Rare Gemstone · Precious Metals · Material Culture · High Jewellery
        </motion.p>

        {/* H1 */}
        <motion.h1
          className="mx-auto mt-7 max-w-[820px] px-6 font-display font-normal leading-[1.06] tracking-[0.01em]"
          style={{ fontSize: "var(--text-hero)", color: "var(--color-text)" }}
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 22 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
          })}
        >
          Some things take million
          <br />
          to billion years to become
          <br />
          extraordinary.
        </motion.h1>

        {/* T-09 rule */}
        <motion.div
          className="mt-9"
          style={{ height: "1px", width: "40px", background: "rgba(200,200,200,0.2)" }}
          {...(!prefersReducedMotion && {
            initial: { scaleX: 0 },
            animate: { scaleX: 1 },
            transition: { duration: 0.7, delay: 0.55 },
          })}
        />

        {/* Body */}
        <motion.p
          className="mx-auto mt-7 max-w-[480px] px-6 font-display italic leading-[1.75]"
          style={{ fontSize: "var(--text-base)", color: "var(--color-text-body)", opacity: 0.6 }}
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 0.6, y: 0 },
            transition: { duration: 0.9, delay: 0.42, ease: "easeOut" },
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
            transition: { delay: 0.68, duration: 0.7 },
          })}
        >
          <Button href="/collections">Enter the Collection</Button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
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

export default Hero;
