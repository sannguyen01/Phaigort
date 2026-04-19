"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TREASURE_DOMAINS } from "@/lib/constants";

// Domain-specific tone mapping — CLAUDE.md §Domain Tone Mapping
// Each domain feels like a distinct room in the same house.
const DOMAIN_TONES: Record<string, { ground: string; headline: string }> = {
  "Geological Rarities": { ground: "#141414", headline: "#FAFAFA" }, // T-02 / T-12
  "Historical Artifacts": { ground: "#2E2E2E", headline: "#DEDEDE" }, // T-04 / T-10
  "Precious Metals": { ground: "#1C1C1C", headline: "#C8C8C8" }, // T-03 / T-09
  "Contemporary Innovations": { ground: "#3D3D3D", headline: "#F2F2F2" }, // T-05 / T-11
};

const DEFAULT_TONE = { ground: "#141414", headline: "#FAFAFA" };

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
            className="mt-4 font-display font-normal leading-[1.15]"
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
              <motion.article
                key={domain.href}
                {...(animate && {
                  initial: { opacity: 0, y: 24 },
                  animate: isInView ? { opacity: 1, y: 0 } : {},
                  transition: {
                    duration: 0.75,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                })}
                style={{ background: tone.ground }}
              >
                <Link href={domain.href} className="group block" aria-label={domain.title}>
                  {/* Arch-masked image container */}
                  <div
                    className="arch-mask relative w-full overflow-hidden"
                    style={{ aspectRatio: "3 / 2" }}
                  >
                    <Image
                      src={domain.image}
                      alt={domain.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading={i < 2 ? "eager" : "lazy"}
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

                    <p
                      className="mt-3 font-display italic leading-[1.65]"
                      style={{
                        fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                        color: tone.headline,
                        opacity: 0.75,
                      }}
                    >
                      {domain.description.split("—")[0].trim()}
                    </p>

                    {/* Ghost inline CTA */}
                    <span
                      className="mt-4 inline-flex items-center gap-3 font-ui uppercase tracking-[0.14em] opacity-50 transition-opacity duration-200 group-hover:opacity-100"
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
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
          })}
        </div>
      </div>
    </section>
  );
}

export default DomainsGrid;
