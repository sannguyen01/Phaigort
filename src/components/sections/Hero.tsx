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
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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

  // Mouse-reactive coral/sapphire radial glow
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
    <section
      ref={heroRef}
      className="-mt-[72px] relative min-h-screen overflow-hidden bg-[#0A0F1D]"
      onMouseMove={handleMouseMove}
    >
      {/* Full-bleed gemstone photography with parallax */}
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
          className="object-cover object-[center_35%] opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1D]/65 via-[#0A0F1D]/20 to-[#0A0F1D]/90" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,82,186,0.5)_0%,_transparent_70%)]"
          style={prefersReducedMotion ? { opacity: 0.08 } : { opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Cursor-reactive glow */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: glowBg }}
        />
      )}

      {/* Main content — centred, cleared of header */}
      <div className="relative z-10 flex min-h-screen items-center">
        <motion.div
          className="w-full"
          style={prefersReducedMotion ? {} : { y: contentY }}
        >
          <Container className="flex flex-col items-center pt-[72px] text-center">
            <motion.div
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 24 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  })}
              className="max-w-4xl space-y-7"
            >
              {/* Eyebrow — Garet */}
              <p className="font-ui text-[10px] uppercase tracking-[0.18em] text-platinum/45">
                Rare Gemstones · Precious Metals · Material Culture
              </p>

              {/* Headline — Cardo with letter-spacing entry animation */}
              <motion.h1
                className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold leading-[1.05] text-platinum"
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { letterSpacing: "-0.03em", opacity: 0 },
                      animate: { letterSpacing: "0em", opacity: 1 },
                      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    })}
              >
                Some things take million
                <br />
                to billion years to become
                <br />
                extraordinary.
              </motion.h1>

              {/* Brand statement — Cardo italic */}
              <motion.p
                className="mx-auto max-w-2xl font-display text-[clamp(0.95rem,1.4vw,1.15rem)] italic leading-relaxed text-platinum/60"
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.6, delay: 0.35, ease: "easeOut" },
                    })}
              >
                We find them at the source.
                <br />
                We bring them to those who understand what they hold.
              </motion.p>
            </motion.div>

            {/* CTA */}
            <motion.div
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.65, duration: 0.7 },
                  })}
              className="mt-12"
            >
              <Button href="/collections" variant="secondary" onDark>
                Enter the Collection
              </Button>
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
            <span className="font-ui text-[9px] uppercase tracking-widest text-platinum/40">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-platinum/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default Hero;
