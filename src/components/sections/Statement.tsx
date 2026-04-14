"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="bg-ground py-24 md:py-36">
      <div className="mx-auto max-w-2xl px-[clamp(24px,4vw,64px)] text-center">
        <motion.p
          className="font-display text-[clamp(1.15rem,2vw,1.45rem)] italic leading-[1.75] text-ink/75"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.48, ease: "easeOut" },
              })}
        >
          Phaigort is not a store. It is a{" "}
          <span className="not-italic text-ink">Wonderhouse of Material Consciousness</span>{" "}
          — a record of what the earth has made, and what people have done with it across
          centuries. We source directly. We document with scientific rigour. We present to
          the genuinely curious.
        </motion.p>
      </div>
    </section>
  );
}

export default Statement;
