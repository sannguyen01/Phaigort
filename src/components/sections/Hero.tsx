"use client";

import { motion } from "framer-motion";
import { Display, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative -mt-16 md:-mt-20 flex min-h-screen items-center justify-center overflow-hidden bg-obsidian">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,108,0.04)_0%,_transparent_70%)]" />

      <Container className="relative z-10 flex flex-col items-center text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <span className="inline-block font-body text-xs uppercase tracking-[0.3em] text-gold">
            Est. MMXXVI
          </span>

          <Display>
            Wonderhouse of
            <br />
            Material Consciousness
          </Display>

          <Body className="mx-auto max-w-2xl text-ivory/70">
            Where Earth&apos;s geological creativity, humanity&apos;s craft traditions,
            precious metals, and contemporary innovations converge into vessels
            of personal meaning.
          </Body>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
          <Button href="/collections">Explore Collections</Button>
        </motion.div>

        {/* Scroll indicator */}
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
            <span className="font-body text-[10px] uppercase tracking-widest text-ivory/30">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-gold/40 to-transparent" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
