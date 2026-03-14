"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Display, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const overlayY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.08, 0.02]);

  return (
    <DarkFieldStage ref={heroRef} className="-mt-16 md:-mt-20 flex min-h-[80vh] md:min-h-[85vh] items-center justify-center overflow-hidden py-0">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={prefersReducedMotion ? {} : { y: overlayY }}
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,82,186,1)_0%,_transparent_70%)]"
          style={prefersReducedMotion ? { opacity: 0.08 } : { opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Outer: scroll-linked parallax shift */}
      <motion.div
        className="relative z-10 w-full"
        style={prefersReducedMotion ? {} : { y: contentY }}
      >
        {/* Inner: entry animation */}
        <Container className="flex flex-col items-center text-center py-20 md:py-24">
          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                })}
            className="space-y-8"
          >
            <span className="inline-block font-brand text-[10px] uppercase tracking-[0.4em] text-silver">Material Consciousness</span>
            <Display className="text-platinum">
              Wonderhouse of<br />Material Consciousness
            </Display>
            <Body className="mx-auto max-w-2xl text-platinum/70">
              Where Earth&apos;s geological creativity, humanity&apos;s craft traditions, precious metals, and contemporary innovations converge into vessels of personal meaning.
            </Body>
          </motion.div>
          <motion.div {...(prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6, duration: 0.8 } })} className="mt-12">
            <Button href="/collections">Explore Collections</Button>
          </motion.div>
        </Container>
      </motion.div>

      {!prefersReducedMotion && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
            <span className="font-body text-[10px] uppercase tracking-widest text-platinum/50">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-platinum/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </DarkFieldStage>
  );
}

export default Hero;
