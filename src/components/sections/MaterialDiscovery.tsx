"use client";

import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState } from "react";
import { H3, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { STITCH_EASE, STITCH_DURATION } from "@/lib/stitch";

interface Domain {
  id:       string;
  label:    string;
  headline: string;
  body:     string;
  points:   readonly string[];
}

const domains: Domain[] = [
  {
    id:       "earth",
    label:    "Earth Science",
    headline: "Geological formation over millions of years",
    body:     "Our geological rarities are selected not for appearance alone but for the scientific story each stone carries. A Kashmir sapphire's blue is not pigment — it is iron and titanium locked in corundum crystal, formed under the metamorphic pressures of continental collision at depths unreachable by any other process.",
    points: [
      "Formation depth: 20–90 km below the Earth's surface",
      "Crystallisation temperature: 500–800°C",
      "Specimen age: 10–50 million years, typical range",
    ],
  },
  {
    id:       "craft",
    label:    "Human Craft",
    headline: "Five centuries of documented craftsmanship",
    body:     "Historical artifacts in our collection span the Iberian trading age through the Dutch East India Company period into the Qing Dynasty. Each piece is selected for documented provenance — not claimed heritage, but verified material biography traceable across multiple ownership records.",
    points: [
      "Portuguese filigree: 15th–17th century Iberian workshops",
      "Spanish colonial metalwork: 16th–18th century New World",
      "Asian trade objects: Ming through Qing dynasty",
    ],
  },
  {
    id:       "future",
    label:    "Material Future",
    headline: "Contemporary innovations requiring years to develop",
    body:     "The most compelling contemporary materials represent genuine technical achievement — aerospace alloys engineered for specific performance envelopes, experimental composites developed in university research programmes, proprietary finishes requiring multi-stage process development that cannot be compressed.",
    points: [
      "Aerospace-grade titanium and nickel superalloys",
      "CVD diamond and synthetic corundum substrates",
      "Experimental metallic glass and amorphous composites",
    ],
  },
];

export function MaterialDiscovery() {
  const [active, setActive] = useState<string>(domains[0].id);
  const ref                 = useRef<HTMLElement>(null);
  const isInView            = useInView(ref, { once: true, margin: "-80px" });
  const prefersRM           = useReducedMotion();

  const activeTab = domains.find((d) => d.id === active) ?? domains[0];

  return (
    <section ref={ref} className="py-14 md:py-24 bg-platinum">
      <Container>

        <motion.div
          initial={prefersRM ? undefined : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: STITCH_DURATION.standard, ease: STITCH_EASE }}
          className="mb-10"
        >
          <Caption>Knowledge Domains</Caption>
        </motion.div>

        {/* ── Tab navigation (Stitch-style indicator) ─────────────── */}
        <motion.div
          initial={prefersRM ? undefined : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.15, duration: STITCH_DURATION.medium, ease: STITCH_EASE }}
          className="flex border-b border-royal-navy/10 mb-12"
          role="tablist"
          aria-label="Material knowledge domains"
        >
          {domains.map((domain) => {
            const isCurrent = active === domain.id;
            return (
              <button
                key={domain.id}
                role="tab"
                aria-selected={isCurrent}
                aria-controls={`panel-${domain.id}`}
                id={`tab-${domain.id}`}
                onClick={() => setActive(domain.id)}
                className={[
                  "relative py-4 px-5 md:px-8 font-brand text-[10px] uppercase tracking-widest",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2",
                  isCurrent ? "text-royal-navy" : "text-silver hover:text-royal-navy",
                ].join(" ")}
              >
                {domain.label}
                {/* Stitch animated tab indicator */}
                {isCurrent && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral"
                    transition={{ duration: STITCH_DURATION.short, ease: STITCH_EASE }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ── Tab panel ────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            initial={prefersRM ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersRM ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: STITCH_DURATION.medium, ease: STITCH_EASE }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20"
          >
            {/* Left: editorial */}
            <div className="space-y-5">
              <H3 className="text-royal-navy">{activeTab.headline}</H3>
              <Body className="text-royal-navy/68">{activeTab.body}</Body>
            </div>

            {/* Right: key facts */}
            <ul className="space-y-4" aria-label="Key facts">
              {activeTab.points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={prefersRM ? undefined : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay:    i * 0.08,
                    duration: STITCH_DURATION.medium,
                    ease:     STITCH_EASE,
                  }}
                  className="flex items-start gap-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
                  />
                  <span className="font-body text-[15px] leading-relaxed text-royal-navy/78">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

      </Container>
    </section>
  );
}

export default MaterialDiscovery;
