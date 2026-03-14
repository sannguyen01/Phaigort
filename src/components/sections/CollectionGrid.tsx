"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { H2, Body, Caption } from "@/components/ui/Typography";
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
                className="group block bg-royal-navy border border-royal-navy/10 hover:border-coral/30 transition-all duration-500 overflow-hidden"
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
                <div className="p-6 md:p-8">
                  <span className="font-brand text-[10px] uppercase tracking-widest text-coral/80 group-hover:text-coral transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-heading text-xl md:text-2xl text-platinum group-hover:text-coral transition-colors duration-500">
                    {domain.title}
                  </h3>
                  <Body className="mt-3 text-platinum/60 group-hover:text-platinum/80 transition-colors duration-500">
                    {domain.description}
                  </Body>
                  <span className="mt-5 inline-flex items-center gap-2 font-brand text-[10px] uppercase tracking-widest text-coral/80 group-hover:text-coral transition-colors duration-300">
                    Explore{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
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
