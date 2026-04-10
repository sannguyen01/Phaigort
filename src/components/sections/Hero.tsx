"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

  // Mouse-reactive glow — coral/sapphire radial follows cursor
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const springX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const glowBg = useMotionTemplate`radial-gradient(circle at ${springX}% ${springY}%, rgba(255,107,74,0.07) 0%, rgba(15,82,186,0.05) 40%, transparent 65%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - left) / width) * 100);
    rawY.set(((e.clientY - top) / height) * 100);
  }

  return (
    <DarkFieldStage ref={heroRef} className="-mt-16 overflow-hidden py-0 md:-mt-20">
      {/* Full-bleed background gemstone image */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={prefersReducedMotion ? {} : { y: overlayY }}
      >
        <Image
          src="/hero/hero-gemstone.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-[0.38]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1D]/70 via-[#0A0F1D]/25 to-[#0A0F1D]/85" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,82,186,0.6)_0%,_transparent_70%)]"
          style={prefersReducedMotion ? { opacity: 0.08 } : { opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Right-panel diamond — absolutely positioned, right-anchored, desktop only.
          Half-shaped-Diamond-2.jpg with screen blend mode dissolves into the dark
          field — the bright facets float, the background drops to transparency. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 hidden w-[48%] md:block"
        style={{ height: "110%" }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/hero/hero-diamond.jpg"
            alt=""
            fill
            priority
            sizes="48vw"
            className="object-contain object-bottom"
            style={{ mixBlendMode: "screen", opacity: 0.82 }}
          />
        </div>
      </div>

      {/* Cursor-reactive glow overlay */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: glowBg }}
        />
      )}

      {/* Centred main content */}
      <div
        className="relative z-10 flex min-h-[80vh] items-center md:min-h-[85vh]"
        onMouseMove={handleMouseMove}
      >
        <motion.div className="w-full" style={prefersReducedMotion ? {} : { y: contentY }}>
          <Container className="flex flex-col items-center text-center">
            <motion.div
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 24 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  })}
              className="max-w-4xl space-y-8"
            >
              <Caption>Rare Gemstones · Precious Metals · Material Culture</Caption>
              <Display className="text-platinum">
                Some things take forty million years
                <br />
                to become extraordinary.
              </Display>
              <Body className="mx-auto max-w-2xl text-platinum/70">
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
      </div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
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
