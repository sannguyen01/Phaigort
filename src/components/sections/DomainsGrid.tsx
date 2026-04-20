"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TREASURE_DOMAINS } from "@/lib/constants";

// Domain-specific tone mapping — CLAUDE.md §Domain Tone Mapping
// Each domain feels like a distinct room in the same house.
const DOMAIN_TONES: Record<string, { ground: string; headline: string; headlineHover: string }> = {
  "Geological Rarities": { ground: "#141414", headline: "#FAFAFA", headlineHover: "#FAFAFA" }, // T-02 / T-12 (already max)
  "Historical Artifacts": { ground: "#2E2E2E", headline: "#DEDEDE", headlineHover: "#FAFAFA" }, // T-04 / T-10 → T-12
  "Precious Metals": { ground: "#1C1C1C", headline: "#C8C8C8", headlineHover: "#FAFAFA" }, // T-03 / T-09 → T-12
  "Contemporary Innovations": { ground: "#3D3D3D", headline: "#F2F2F2", headlineHover: "#FAFAFA" }, // T-05 / T-11 → T-12
};

const DEFAULT_TONE = { ground: "#141414", headline: "#FAFAFA", headlineHover: "#FAFAFA" };

// DomainCard — isolated hover state so each card tracks independently
function DomainCard({
  domain,
  tone,
  index,
  animate,
  isInView,
}: {
  domain: (typeof TREASURE_DOMAINS)[number];
  tone: { ground: string; headline: string; headlineHover: string };
  index: number;
  animate: boolean;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    background: tone.ground,
    // Scale + facet-catch border — both skipped when reduced motion preferred (animate=false)
    transform: animate && hovered ? "scale(1.015)" : "scale(1)",
    transition: animate
      ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 600ms cubic-bezier(0.22, 1, 0.36, 1), border-color 600ms cubic-bezier(0.22, 1, 0.36, 1)"
      : undefined,
    border: "1px solid",
    borderColor: animate && hovered ? "rgba(250,250,250,0.12)" : "rgba(250,250,250,0)",
  };

  return (
    <motion.article
      key={domain.href}
      {...(animate && {
        initial: { opacity: 0, y: 24 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: {
          duration: 0.75,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        },
      })}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={domain.href} className="group block" aria-label={domain.title}>
        {/* Arch-masked image container */}
        <div className="arch-mask relative w-full overflow-hidden" style={{ aspectRatio: "3 / 2" }}>
          <Image
            src={domain.image}
            alt={domain.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading={index < 2 ? "eager" : "lazy"}
          />
          {/* Domain tone vignette at arch base */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{
              background: `linear-gradient(to top, ${tone.ground} 0%, transparent 100%)`,
            }}
          />
        </div>

        {/* Card body */}
        <div className="p-4 md:p-5">
          <p
            className="font-ui uppercase tracking-[0.2em]"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            {domain.title}
          </p>
          {/* Slide-underline — grows left→right on card hover */}
          <span
            className="mt-1 block h-px"
            style={{
              width: animate && hovered ? "28px" : "0px",
              background: tone.headline,
              opacity: 0.35,
              transition: animate ? "width 500ms cubic-bezier(0.22, 1, 0.36, 1)" : undefined,
            }}
          />

          <p
            className="mt-3 font-display italic leading-[1.65]"
            style={{
              fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
              color: animate && hovered ? tone.headlineHover : tone.headline,
              opacity: 0.75,
              transition: animate ? "color 600ms cubic-bezier(0.22, 1, 0.36, 1)" : undefined,
            }}
          >
            {domain.description.split("—")[0].trim()}
          </p>

          {/* Ghost inline CTA */}
          <span
            className="mt-4 inline-flex items-center gap-3 font-ui uppercase tracking-[0.14em] transition-opacity duration-200 group-hover:opacity-80"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              opacity: 0.5,
            }}
          >
            Explore
            <span
              className="inline-block h-px transition-all duration-300 group-hover:w-10"
              style={{ width: "28px", background: "currentColor" }}
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function DomainsGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const animate = !prefersReducedMotion;

  return (
    <section ref={ref} className="py-16 md:py-24" style={{ background: "var(--color-bg)" }}>
      <div
        className="mx-auto px-[clamp(24px,4vw,64px)]"
        style={{ maxWidth: "var(--content-wide)" }}
      >
        {/* Section heading */}
        <motion.div
          className="mb-10 md:mb-14"
          {...(animate && {
            initial: { opacity: 0, y: 16 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          })}
        >
          <p
            className="font-ui uppercase tracking-[0.18em]"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
          >
            The Collection
          </p>
          <h2
            className="mt-4 font-display font-bold leading-[1.15]"
            style={{ fontSize: "var(--text-2xl)", color: "var(--color-text)" }}
          >
            Four Domains of Rarity
          </h2>
        </motion.div>

        {/* 2 × 2 domain grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {TREASURE_DOMAINS.map((domain, i) => {
            const tone = DOMAIN_TONES[domain.title] ?? DEFAULT_TONE;
            return (
              <DomainCard
                key={domain.href}
                domain={domain}
                tone={tone}
                index={i}
                animate={animate}
                isInView={isInView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DomainsGrid;
