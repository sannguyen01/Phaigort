"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { H2, Caption, Body } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { TREASURE_DOMAINS } from "@/lib/constants";

// ── TiltCard ─────────────────────────────────────────────────────────────────
// Each card tilts in 3D toward the cursor and shows a coral spotlight gradient.

interface TiltCardProps {
  domain: (typeof TREASURE_DOMAINS)[number];
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean | null;
}

function TiltCard({ domain, index, isInView, prefersReducedMotion }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const xRaw = useMotionValue(0.5);
  const yRaw = useMotionValue(0.5);
  const x = useSpring(xRaw, { stiffness: 350, damping: 28 });
  const y = useSpring(yRaw, { stiffness: 350, damping: 28 });

  const rotateX = useTransform(y, [0, 1], [4, -4]);
  const rotateY = useTransform(x, [0, 1], [-4, 4]);
  const spotX = useTransform(x, [0, 1], [0, 100]);
  const spotY = useTransform(y, [0, 1], [0, 100]);
  const spotBg = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,107,74,0.10) 0%, transparent 55%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || prefersReducedMotion) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    xRaw.set((e.clientX - left) / width);
    yRaw.set((e.clientY - top) / height);
  }

  function handleMouseLeave() {
    xRaw.set(0.5);
    yRaw.set(0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? {} : { rotateX, rotateY, transformPerspective: 900 }}
      {...(!prefersReducedMotion && {
        initial: { opacity: 0, y: 24 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: {
          delay: 0.1 + index * 0.12,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
      })}
    >
      <Link
        href={domain.href}
        className="group relative block h-full overflow-hidden bg-transparent"
      >
        {/* Arch-masked image with numbered badge */}
        <div className="arch-mask relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
          {/* Primary image — fades and scales out on hover */}
          <Image
            src={domain.image}
            alt={domain.imageAlt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          />
          {/* Detail image — crossfades in on hover */}
          <Image
            src={domain.hoverImage}
            alt={domain.hoverImageAlt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="scale-105 object-cover object-center opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
            loading="lazy"
          />
          {/* Circular numbered badge — bottom-centre */}
          <div className="absolute bottom-4 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-[#0A1240]">
            <span className="font-brand text-[11px] font-semibold text-platinum">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Card caption — title + body description */}
        <div className="bg-[#0A1240] px-4 pb-6 pt-4 text-center transition-colors duration-500 group-hover:bg-[#0F1A4A] md:px-5">
          <p className="font-brand text-xs uppercase tracking-[0.35em] text-platinum/90 transition-colors duration-300 group-hover:text-platinum">
            {domain.title}
          </p>
          <Body className="mt-2 line-clamp-3 text-xs leading-relaxed text-platinum/50">
            {domain.description}
          </Body>
        </div>

        {/* Cursor-following spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotBg }}
        />
      </Link>
    </motion.div>
  );
}

// ── CollectionGrid ────────────────────────────────────────────────────────────

export function CollectionGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="collections" ref={ref} className="bg-platinum py-10 text-royal-navy md:py-16">
      <Container>
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 32 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              })}
          className="mb-10"
        >
          <Caption className="text-royal-navy/45">The Collection</Caption>
          <H2 className="mt-4 text-royal-navy">Four domains of rarity</H2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {TREASURE_DOMAINS.map((domain, i) => (
            <TiltCard
              key={domain.title}
              domain={domain}
              index={i}
              isInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CollectionGrid;
