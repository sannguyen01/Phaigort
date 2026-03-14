"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...(prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, clipPath: "inset(8% 0 8% 0)" },
            animate: isInView
              ? { opacity: 1, clipPath: "inset(0% 0 0% 0)" }
              : {},
            transition: {
              delay,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            },
          })}
    >
      {children}
    </motion.div>
  );
}

export default ImageReveal;
