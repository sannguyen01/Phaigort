"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { H1, H2, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

const EASE = [0.22, 1, 0.36, 1] as const;
const CORNERS = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
] as const;

const APPROACHES = [
  {
    title: "Quick Discovery",
    duration: "15–20 minutes",
    description: "Drop in anytime. See what is new. Get the story. Use the microscopes. No appointment needed.",
  },
  {
    title: "Guided Exploration",
    duration: "60–90 minutes",
    description: "Curators facilitate discovery through questions rather than lectures. Focus on building your independent judgment.",
  },
  {
    title: "Contemplative Time",
    duration: "Unhurried",
    description: "Private examination without curator presence. No pressure, no urgency. Materials that took millions of years to form deserve patient consideration.",
  },
  {
    title: "Collaborative Conversation",
    duration: "By request",
    description: "Detailed discussions answering questions, exploring considerations, discussing collection philosophies.",
  },
] as const;

export function AtelierContent() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-80px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-80px" });
  const rm = useReducedMotion();

  return (
    <div>
      {/* Page header — mount-time stagger */}
      <Container className="max-w-3xl">
        <motion.div
          {...(rm ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE } })}
        >
          <Caption>The Wonderhouse Experience</Caption>
        </motion.div>
        <motion.div
          {...(rm ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15, duration: 0.85, ease: EASE } })}
        >
          <H1 className="mt-6">Atelier</H1>
        </motion.div>
        <motion.div
          {...(rm ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.32, duration: 0.7 } })}
        >
          <Body className="mt-8 text-royal-navy/70">
            Entering a Wonderhouse feels like stepping into the generative depths where treasures
            form — an immersive environment from which materials emerge like geological revelations.
            We celebrate extended contemplation and explicitly give permission for unlimited
            deliberation.
          </Body>
        </motion.div>
      </Container>

      <Divider />

      {/* Approach cards */}
      <Container>
        <motion.div
          {...(rm ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE } })}
        >
          <H2 className="mb-12">Discovery Approaches</H2>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {APPROACHES.map((approach, i) => (
            <motion.div
              key={approach.title}
              {...(rm ? {} : {
                initial: { opacity: 0, y: 24 },
                animate: isCardsInView ? { opacity: 1, y: 0 } : {},
                transition: { delay: i * 0.10, duration: 0.8, ease: EASE },
              })}
              className="group relative p-8 md:p-10 bg-royal-navy/5 border border-royal-navy/10 space-y-4 cursor-default"
            >
              {/* Coral left-border reveals on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 bg-coral transition-transform duration-500 ease-out group-hover:scale-y-100"
              />

              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-xl transition-colors duration-300 group-hover:text-royal-navy">
                  {approach.title}
                </h3>
                <span className="font-body text-xs text-coral/70 whitespace-nowrap transition-colors duration-300 group-hover:text-coral">
                  {approach.duration}
                </span>
              </div>
              <Body className="text-royal-navy/70 transition-colors duration-500 group-hover:text-royal-navy/85">
                {approach.description}
              </Body>
            </motion.div>
          ))}
        </div>
      </Container>

      <Divider />

      {/* CTA with corner marks */}
      <Container className="max-w-3xl text-center">
        <div ref={ctaRef} className="relative inline-block px-10 py-8">
          {CORNERS.map((pos) => (
            <motion.span
              key={pos}
              aria-hidden="true"
              {...(rm ? {} : {
                initial: { opacity: 0, scale: 0.7 },
                animate: isCtaInView ? { opacity: 1, scale: 1 } : {},
                transition: { delay: 0.4, duration: 0.6, ease: EASE },
              })}
              className={`pointer-events-none absolute h-5 w-5 border-royal-navy/15 ${pos}`}
            />
          ))}
          <motion.div
            {...(rm ? {} : {
              initial: { opacity: 0, y: 24 },
              animate: isCtaInView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.9, ease: EASE },
            })}
            className="space-y-6"
          >
            <H2>Begin Your Voyage</H2>
            <Body className="text-royal-navy/70">
              Whether you are a first-time visitor curious about geological wonders or a seasoned
              collector seeking specific treasures, the Wonderhouse welcomes your presence. No
              purchase requirements, no wealth qualifications — only genuine curiosity.
            </Body>
            <div className="pt-4">
              <Button href="/contact">Schedule a Visit</Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

export default AtelierContent;
