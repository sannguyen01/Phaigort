"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { H1, H3, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { TREASURE_DOMAINS } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

type Domain = (typeof TREASURE_DOMAINS)[number];

function DomainEntry({
  domain,
  index,
  isLast,
}: {
  domain: Domain;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const rm = useReducedMotion();

  return (
    <>
      <section
        ref={ref}
        id={domain.href.split("#")[1]}
        className="scroll-mt-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
          {/* Left: domain label + title — slides from left */}
          <motion.div
            {...(rm ? {} : {
              initial: { opacity: 0, x: -20 },
              animate: isInView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.85, ease: EASE },
            })}
          >
            <span className="font-body text-xs uppercase tracking-widest text-coral/70">
              Domain {String(index + 1).padStart(2, "0")}
            </span>
            <H3 className="mt-4">{domain.title}</H3>
          </motion.div>

          {/* Right: description + image — slides from right */}
          <motion.div
            {...(rm ? {} : {
              initial: { opacity: 0, x: 20 },
              animate: isInView ? { opacity: 1, x: 0 } : {},
              transition: { delay: 0.14, duration: 0.85, ease: EASE },
            })}
          >
            <Body className="text-royal-navy/70">{domain.description}</Body>

            {/* Image: fades in with subtle scale reveal, hover scale */}
            <motion.div
              {...(rm ? {} : {
                initial: { opacity: 0, scale: 1.04 },
                animate: isInView ? { opacity: 1, scale: 1 } : {},
                transition: { delay: 0.24, duration: 1.1, ease: EASE },
              })}
              className="group mt-8 relative aspect-[16/9] overflow-hidden bg-royal-navy/5 border border-royal-navy/10"
            >
              <Image
                src={domain.image}
                alt={domain.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Subtle vignette deepens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-navy/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider between entries — fades in after section reveals */}
      {!isLast && (
        <motion.div
          {...(rm ? {} : {
            initial: { opacity: 0 },
            animate: isInView ? { opacity: 1 } : {},
            transition: { delay: 0.45, duration: 0.6 },
          })}
        >
          <Divider />
        </motion.div>
      )}
    </>
  );
}

export function CollectionsContent() {
  const rm = useReducedMotion();

  return (
    <div>
      {/* Page header — mount-time reveal */}
      <Container>
        <motion.div
          {...(rm ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE } })}
        >
          <Caption>The Four Domains</Caption>
        </motion.div>
        <motion.div
          {...(rm ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.14, duration: 0.85, ease: EASE } })}
        >
          <H1 className="mt-6 max-w-4xl">Comprehensive Material Curation</H1>
        </motion.div>
        <motion.div
          {...(rm ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.30, duration: 0.7 } })}
        >
          <Body className="mt-8 max-w-2xl text-royal-navy/70">
            Phaigort curates across four treasure domains without hierarchy. A gemstone formed over
            millions of years receives the same curatorial reverence as an artisan&apos;s masterwork
            perfected across generations.
          </Body>
        </motion.div>
      </Container>

      {/* Header divider — draws from left */}
      <motion.div
        {...(rm ? {} : { initial: { scaleX: 0, opacity: 0 }, animate: { scaleX: 1, opacity: 1 }, transition: { delay: 0.4, duration: 1.0, ease: EASE } })}
        style={{ originX: 0 }}
      >
        <Divider />
      </motion.div>

      {/* Domain sections */}
      <Container>
        <div className="space-y-24 md:space-y-32">
          {TREASURE_DOMAINS.map((domain, i) => (
            <DomainEntry
              key={domain.title}
              domain={domain}
              index={i}
              isLast={i === TREASURE_DOMAINS.length - 1}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default CollectionsContent;
