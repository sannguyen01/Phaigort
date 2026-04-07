"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { H2, Caption } from "@/components/ui/Typography";
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
                {/* Arch-masked image — portrait proportions with cathedral arch top */}
                <div
                  className="arch-mask relative w-full overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* Primary image — fades and scales out on hover */}
                  <Image
                    src={domain.image}
                    alt={domain.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />
                  {/* Detail image — crossfades in on hover */}
                  <Image
                    src={domain.hoverImage}
                    alt={domain.hoverImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="scale-105 object-cover object-center opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                    loading="lazy"
                  />
                </div>
                {/* Museum vitrine caption — title only, no description */}
                <div className="px-6 pb-8 pt-5 text-center md:px-8">
                  <p className="font-brand text-xs uppercase tracking-[0.35em] text-royal-navy/60 transition-colors duration-300 group-hover:text-royal-navy/90">
                    {domain.title}
                  </p>
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
