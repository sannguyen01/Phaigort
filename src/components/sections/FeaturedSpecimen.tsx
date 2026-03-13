"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { H2, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { STITCH_EASE, STITCH_DURATION } from "@/lib/stitch";

const specimen = {
  name: "Kashmir Blue Sapphire",
  origin: "Padder Valley, Kashmir",
  formation: "~50 million years",
  hardness: "9.0 Mohs",
  classification: "Corundum — Al₂O₃",
  description:
    "Formed when the Indian subcontinent collided with Asia, creating metamorphic conditions that trapped iron and titanium in corundum crystal under pressures no surface process could replicate. Kashmir sapphires ceased commercial production in the 1930s. What remains is geological history you can hold.",
  provenance: "GIA-certified origin · Documented chain of custody",
  href: "/collections#geological-rarities",
} as const;

const dataPoints = [
  { label: "Formation", value: specimen.formation },
  { label: "Hardness", value: specimen.hardness },
  { label: "Origin",    value: specimen.origin },
  { label: "Class",     value: specimen.classification },
] as const;

export function FeaturedSpecimen() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView    = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersRM   = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-24 bg-deep-navy overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Image column ─────────────────────────────────────────── */}
          <motion.div
            style={prefersRM ? undefined : { y: imageY }}
            className="relative aspect-square overflow-hidden"
          >
            {/* Sapphire radial glow */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,82,186,0.18)_0%,transparent_70%)]" />

            <Image
              src="/collections/geological-rarities.jpg"
              alt="Kashmir Blue Sapphire — a deep, velvety blue corundum specimen"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />

            {/* Data overlay card — Stitch-style state surface */}
            <motion.div
              initial={prefersRM ? undefined : { opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.55, duration: STITCH_DURATION.long, ease: STITCH_EASE }}
              className="absolute bottom-6 right-6 z-20 border border-silver/10 bg-deep-navy/88 p-5 backdrop-blur-sm"
            >
              <dl className="space-y-2.5">
                {dataPoints.map(({ label, value }) => (
                  <div key={label} className="flex gap-5">
                    <dt className="w-20 shrink-0 pt-px font-brand text-[9px] uppercase tracking-[0.35em] text-silver/55">
                      {label}
                    </dt>
                    <dd className="font-body text-[13px] leading-snug text-platinum/88">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>

          {/* ── Editorial column ──────────────────────────────────────── */}
          <motion.div
            initial={prefersRM ? undefined : { opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: STITCH_DURATION.extraLong, ease: STITCH_EASE }}
            className="space-y-6"
          >
            <Caption className="text-silver/70">Featured Specimen</Caption>

            <H2 className="text-platinum">{specimen.name}</H2>

            <Body className="text-platinum/68">{specimen.description}</Body>

            {/* Provenance trust signal */}
            <div className="flex items-center gap-3 pt-1">
              <span className="h-1 w-1 rounded-full bg-emerald" />
              <span className="font-brand text-[10px] uppercase tracking-widest text-emerald/80">
                {specimen.provenance}
              </span>
            </div>

            <div className="pt-4">
              <Button href={specimen.href} variant="primary">
                View Collection
              </Button>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

export default FeaturedSpecimen;
