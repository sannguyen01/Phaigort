"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { H1, H2, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const CORNERS = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
] as const;

interface BlockData {
  caption: string;
  heading: string;
  paragraphs: readonly string[];
  dark?: boolean;
}

const BLOCKS: BlockData[] = [
  {
    caption: "The Earth as Artist",
    heading: "Colour, light, pressure — forces no craftsperson can replicate",
    dark: false,
    paragraphs: [
      "A ruby's red comes from chromium — the same element that colours emeralds green, depending on the mineral host. An alexandrite shifts from teal to raspberry because its absorption spectrum sits precisely on the boundary between daylight and incandescent light. These are not accidents of beauty. They are chemistry operating under conditions that Earth alone creates.",
      "We select materials that carry this geological intelligence visibly. Every stone in a Phaigort collection is chosen because its beauty is inseparable from its science — and both are documented, not assumed.",
    ],
  },
  {
    caption: "The Expedition Mind",
    heading: "We go where the stones are, before the market decides their value",
    dark: true,
    paragraphs: [
      "Great gemstones do not announce themselves. They surface in river gravels outside Ratnapura in Sri Lanka, in metamorphic corridors across the Malagasy highlands, in marble seams running through the mountains of northern Vietnam. Finding them before they are processed — rough, ungraded, unvalued — requires geological intuition developed over years in the field.",
      "This expedition instinct is how Phaigort accesses material that never reaches open markets. It is also how we maintain direct knowledge of provenance — not certificates issued after the fact, but relationships built at the source itself.",
    ],
  },
  {
    caption: "The Standard",
    heading: "Every piece asks one question: will it matter more in twenty years?",
    dark: false,
    paragraphs: [
      "A stone cut to maximise weight is not the same as a stone cut to maximise beauty. Metal chosen for margin is not the same as metal chosen for how it wears over decades. Phaigort pieces are evaluated by craftspeople with deep material knowledge — not by production schedules or seasonal targets.",
      "The result is a collection where every object is intended to outlast its purchase occasion — pieces worth explaining to someone who finds them in fifty years, carrying their story visibly in the material itself.",
    ],
  },
];

function StoryBlock({ data }: { data: BlockData }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const rm = useReducedMotion();

  return (
    <section
      ref={ref}
      className={`py-14 md:py-20 ${data.dark ? "bg-royal-navy text-platinum" : "bg-platinum text-royal-navy"}`}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: caption + H2 — slides from left */}
          <motion.div
            {...(rm ? {} : {
              initial: { opacity: 0, x: -24 },
              animate: isInView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.9, ease: EASE },
            })}
          >
            <Caption className={data.dark ? "" : "text-silver"}>{data.caption}</Caption>
            <H2 className="mt-4">{data.heading}</H2>
          </motion.div>

          {/* Right: paragraphs — stagger from right */}
          <div className="space-y-5">
            {data.paragraphs.map((para, i) => (
              <motion.div
                key={i}
                {...(rm ? {} : {
                  initial: { opacity: 0, x: 24 },
                  animate: isInView ? { opacity: 1, x: 0 } : {},
                  transition: { delay: 0.12 + i * 0.14, duration: 0.9, ease: EASE },
                })}
              >
                <Body className={data.dark ? "text-platinum/75" : ""}>{para}</Body>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function OurStoryContent() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-80px" });
  const rm = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <DarkFieldStage intensity="full" className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <motion.span
            {...(rm ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE } })}
            className="inline-block"
          >
            <Caption>Our Story</Caption>
          </motion.span>

          <motion.div
            {...(rm ? {} : { initial: { scaleX: 0, opacity: 0 }, animate: { scaleX: 1, opacity: 1 }, transition: { delay: 0.22, duration: 0.8, ease: EASE } })}
            style={{ originX: 0 }}
            className="my-5 h-px w-12 bg-gradient-to-r from-silver/40 to-transparent"
          />

          <H1 className="text-platinum">
            {["The Earth as artist.", "The expedition as practice."].map((line, i) => (
              <motion.span
                key={line}
                {...(rm ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.32 + i * 0.15, duration: 0.9, ease: EASE } })}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </H1>

          <motion.div
            {...(rm ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.66, duration: 0.8 } })}
            className="mt-6"
          >
            <Body className="text-platinum/70">
              Some things take time to be understood. A great sapphire spends forty million years
              becoming what it is — its colour a record of iron and titanium bonded under temperatures
              far beyond anything above ground. Phaigort exists because of a conviction that these
              materials deserve to be known, not just owned.
            </Body>
          </motion.div>
        </Container>
      </DarkFieldStage>

      {/* 3 editorial sections */}
      {BLOCKS.map((block) => (
        <StoryBlock key={block.caption} data={block} />
      ))}

      {/* CTA */}
      <DarkFieldStage intensity="full" className="py-16 md:py-20">
        <Container className="text-center">
          <div ref={ctaRef} className="relative inline-block px-10 py-8">
            {CORNERS.map((pos) => (
              <motion.span
                key={pos}
                aria-hidden="true"
                {...(rm ? {} : { initial: { opacity: 0, scale: 0.7 }, animate: isCtaInView ? { opacity: 1, scale: 1 } : {}, transition: { delay: 0.4, duration: 0.6, ease: EASE } })}
                className={`pointer-events-none absolute h-5 w-5 border-platinum/20 ${pos}`}
              />
            ))}
            <motion.div
              {...(rm ? {} : { initial: { opacity: 0, y: 24 }, animate: isCtaInView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, ease: EASE } })}
              className="space-y-4"
            >
              <H2 className="text-platinum max-w-xl mx-auto">Discover what the Earth made possible.</H2>
              <Body className="text-platinum/70 mx-auto">Every collection begins with a geological event. Browse what we have found.</Body>
              <div className="pt-4">
                <Button href="/collections">Explore Our Collection</Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </DarkFieldStage>
    </>
  );
}

export default OurStoryContent;
