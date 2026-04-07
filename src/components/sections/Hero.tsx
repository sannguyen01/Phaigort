"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Display, Body, Caption } from "@/components/ui/Typography";
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
    <DarkFieldStage
      ref={heroRef}
      className="-mt-16 overflow-hidden py-0 md:-mt-20"
    >
      {/* Background overlay — covers full width on mobile, left panel only on desktop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:right-[45%]"
        style={prefersReducedMotion ? {} : { y: overlayY }}
      >
        <Image
          src="/hero/hero-gemstone.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover object-[center_35%] opacity-[0.38]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1D]/70 via-[#0A0F1D]/25 to-[#0A0F1D]/85" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,82,186,0.6)_0%,_transparent_70%)]"
          style={prefersReducedMotion ? { opacity: 0.08 } : { opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Split layout — single column mobile, two-column desktop */}
      <div className="relative flex min-h-[80vh] flex-col md:min-h-[85vh] md:flex-row">

        {/* Left panel — dark text side */}
        <motion.div
          className="relative z-10 flex flex-1 items-center py-20 md:py-24"
          style={prefersReducedMotion ? {} : { y: contentY }}
        >
          <Container className="flex flex-col items-center text-center md:items-start md:pr-12 md:text-left">
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
              <Caption>Rare Gemstones · Precious Metals · Material Culture</Caption>
              <Display className="text-platinum">
                Some things take forty million years
                <br />
                to become beautiful.
              </Display>
              <Body className="mx-auto max-w-2xl text-platinum/70 md:mx-0">
                We find them at the source. We bring them to those who understand what they hold.
              </Body>
            </motion.div>
            <motion.div
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.6, duration: 0.8 },
                  })}
              className="mt-12"
            >
              <Button href="/collections">Enter the Collection</Button>
            </motion.div>
          </Container>
        </motion.div>

        {/* Right panel — diamond specimen, desktop only */}
        <motion.div
          className="relative hidden overflow-hidden bg-white md:block md:w-[45%]"
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, x: 40 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
          })}
        >
          <Image
            src="/hero/hero-diamond.jpg"
            alt="Extreme close-up of a brilliant-cut diamond's upper facets — Phaigort"
            fill
            priority
            sizes="45vw"
            className="object-cover object-bottom"
          />
          {/* Left-edge shadow — softens the dark/light panel boundary */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0A0F1D]/25 to-transparent" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-[27.5%]"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] uppercase tracking-widest text-platinum/50">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-platinum/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </DarkFieldStage>
  );
}

export default Hero;
