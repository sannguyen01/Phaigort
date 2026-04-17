"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TREASURE_DOMAINS } from "@/lib/constants";

export function DomainsGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="bg-stone py-20 md:py-32">
      <div className="mx-auto max-w-content px-[clamp(24px,4vw,64px)]">
        {/* Section heading */}
        <motion.div
          className="mb-12 md:mb-16"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.48, ease: "easeOut" },
              })}
        >
          <p className="font-ui text-[11px] uppercase tracking-[0.15em] text-muted">
            The Four Domains
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight text-ink">
            What we source
          </h2>
        </motion.div>

        {/* Equal four-column grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {TREASURE_DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.href}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 16 },
                    animate: isInView ? { opacity: 1, y: 0 } : {},
                    transition: { duration: 0.48, delay: i * 0.08, ease: "easeOut" },
                  })}
            >
              <Link href={domain.href} className="group block overflow-hidden bg-ground">
                {/* Image */}
                <div className="relative h-[280px] w-full overflow-hidden md:h-[340px]">
                  <Image
                    src={domain.image}
                    alt={domain.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 md:p-6">
                  <p className="font-ui text-[10px] uppercase tracking-[0.12em] text-muted">
                    {domain.title}
                  </p>
                  <p className="mt-2 line-clamp-3 font-display text-[0.875rem] italic leading-snug text-ink/70">
                    {domain.description.split("—")[0].trim()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DomainsGrid;
