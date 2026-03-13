"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { H2, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { TREASURE_DOMAINS } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CollectionGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersRM = useReducedMotion();

  return (
    <section ref={ref} className="py-14 md:py-20 bg-platinum text-royal-navy">
      <Container>

        {/* Header */}
        <motion.div
          {...(prefersRM ? {} : {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1, ease: EASE },
          })}
          className="mb-10"
        >
          <Caption>Explore</Caption>
          <H2 className="mt-4">Our Collection</H2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TREASURE_DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.title}
              {...(prefersRM ? {} : {
                initial: { opacity: 0, y: 24 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { delay: 0.1 + i * 0.12, duration: 0.8, ease: EASE },
              })}
            >
              <Link
                href={domain.href}
                className="group block bg-royal-navy border border-royal-navy/10 hover:border-coral/30 transition-all duration-500 overflow-hidden"
              >
                {/* Image with overlay */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={domain.image}
                    alt={domain.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay slides up on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/75 via-transparent to-transparent translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <span className="font-brand text-[10px] uppercase tracking-widest text-coral/80 transition-colors duration-300 group-hover:text-coral">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-heading text-xl md:text-2xl text-platinum transition-colors duration-500 group-hover:text-coral">
                    {domain.title}
                  </h3>
                  <Body className="mt-3 text-platinum/60 transition-colors duration-500 group-hover:text-platinum/80">
                    {domain.description}
                  </Body>

                  {/* Explore link — underline draws on hover */}
                  <span className="mt-5 inline-flex items-center gap-2 font-brand text-[10px] uppercase tracking-widest text-coral/80 transition-colors duration-300 group-hover:text-coral">
                    <span className="relative">
                      Explore
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-px w-0 bg-coral transition-all duration-300 ease-out group-hover:w-full"
                      />
                    </span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
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
