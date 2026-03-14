"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const Tag = motion[as];

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      {...(prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, y: 24 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: {
              delay,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          })}
    >
      {children}
    </Tag>
  );
}

export default ScrollReveal;
