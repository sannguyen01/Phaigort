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
      style={{ scaleX, transformOrigin: "0%", background: "rgba(200,200,200,0.5)" }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px]"
    />
  );
}

export default ScrollProgress;
