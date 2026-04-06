"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { H2, H3, Body, Caption, Label } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { TREASURE_DOMAINS } from "@/lib/constants";

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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TREASURE_DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.title}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 24 },
                    animate: isInView ? { opacity: 1, y: 0 } : {},
                    transition: {
                      delay: 0.1 + i * 0.12,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  })}
            >
              <Link
                href={domain.href}
                className="border-royal-navy/8 group block h-full overflow-hidden border bg-[#F0EEE9] transition-all duration-500 hover:border-royal-navy/20"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* Primary image */}
                  <Image
                    src={domain.image}
                    alt={domain.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                  />
                  {/* Hover detail image — crossfades in on hover */}
                  <Image
                    src={domain.hoverImage}
                    alt={domain.hoverImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <Label className="text-royal-navy/50 transition-colors duration-300 group-hover:text-royal-navy">
                    {String(i + 1).padStart(2, "0")}
                  </Label>
                  <H3 className="mt-3 text-royal-navy transition-colors duration-300 group-hover:text-royal-navy/70">
                    {domain.title}
                  </H3>
                  <Body className="mt-3 text-royal-navy/60 transition-colors duration-300 group-hover:text-royal-navy/80">
                    {domain.description}
                  </Body>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CollectionGrid;
