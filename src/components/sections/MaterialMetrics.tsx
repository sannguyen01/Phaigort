"use client";

import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Caption } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { STITCH_EASE, STITCH_DURATION } from "@/lib/stitch";

interface Metric {
  prefix?: string;
  value:   number;
  suffix:  string;
  label:   string;
  detail:  string;
}

const metrics: Metric[] = [
  {
    value:  40,
    suffix: "M+",
    label:  "Years in formation",
    detail: "The minimum geological age of our oldest specimens",
  },
  {
    value:  5,
    suffix: " centuries",
    label:  "Of documented provenance",
    detail: "Historical artifacts spanning from the 15th century onward",
  },
  {
    value:  4,
    suffix: " domains",
    label:  "Of material knowledge",
    detail: "Geological, metallic, historical, and contemporary",
  },
  {
    value:  100,
    suffix: "%",
    label:  "Provenance verified",
    detail: "Every piece carries a documented, verifiable material story",
  },
];

function AnimatedCounter({
  value,
  suffix,
  prefix,
  active,
}: {
  value:   number;
  suffix:  string;
  prefix?: string;
  active:  boolean;
}) {
  const [display, setDisplay]   = useState(0);
  const prefersRM               = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (prefersRM) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease:     STITCH_EASE as [number, number, number, number],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [active, value, prefersRM]);

  return (
    <span className="font-heading text-5xl md:text-6xl tabular-nums text-platinum">
      {prefix}{display}{suffix}
    </span>
  );
}

export function MaterialMetrics() {
  const ref       = useRef<HTMLElement>(null);
  const isInView  = useInView(ref, { once: true, margin: "-80px" });
  const prefersRM = useReducedMotion();

  return (
    <section ref={ref} className="py-14 md:py-20 bg-royal-navy">
      <Container>

        <motion.div
          initial={prefersRM ? undefined : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: STITCH_DURATION.standard, ease: STITCH_EASE }}
          className="mb-12"
        >
          <Caption>Material Intelligence</Caption>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-platinum/10">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={prefersRM ? undefined : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                delay:    0.08 + i * 0.10,
                duration: STITCH_DURATION.long,
                ease:     STITCH_EASE,
              }}
              className="py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 space-y-3"
            >
              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                active={isInView}
              />
              <p className="font-brand text-[10px] uppercase tracking-widest text-coral/80">
                {metric.label}
              </p>
              <p className="font-body text-sm leading-relaxed text-platinum/55">
                {metric.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <Divider className="mt-14 mb-0" />
      </Container>
    </section>
  );
}

export default MaterialMetrics;
