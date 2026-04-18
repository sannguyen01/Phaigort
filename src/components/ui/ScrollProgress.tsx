"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0%", background: "var(--color-rule)" }}
      className="fixed inset-x-0 top-16 z-50 h-[1px] md:top-20"
    />
  );
}

export default ScrollProgress;
