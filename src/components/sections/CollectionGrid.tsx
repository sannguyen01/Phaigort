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
    <section id="collections" ref={ref} className="py-10 md:py-16 bg-platinum text-royal-navy">
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
          <Caption>Explore</Caption>
          <H2 className="mt-4">Our Collection</H2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                className="group block h-full bg-royal-navy border border-royal-navy/10 hover:border-coral/30 transition-all duration-500 overflow-hidden"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={domain.image}
                    alt={domain.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <Label className="text-coral/80 group-hover:text-coral transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </Label>
                  <H3 className="mt-3 text-platinum group-hover:text-coral transition-colors duration-500">
                    {domain.title}
                  </H3>
                  <Body className="mt-3 text-platinum/70 group-hover:text-platinum/90 transition-colors duration-500">
                    {domain.description}
                  </Body>
                  <Label className="mt-5 inline-flex items-center gap-2 text-coral/80 group-hover:text-coral transition-colors duration-300">
                    Explore{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Label>
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
