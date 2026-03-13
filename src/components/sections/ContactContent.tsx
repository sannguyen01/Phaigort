"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { H1, Body, Caption } from "@/components/ui/Typography";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const INFO_BLOCKS = [
  {
    label: "Visit",
    content: ["The Wonderhouse", "By appointment only"],
  },
  {
    label: "Response Time",
    content: ["Within 48 hours"],
  },
] as const;

const EXPERTISE = [
  "Geological Rarities",
  "Precious Metals",
  "Historical Artifacts",
  "Contemporary Innovations",
] as const;

export function ContactContent() {
  const infoRef = useRef<HTMLElement>(null);
  const isInfoInView = useInView(infoRef, { once: true, margin: "-60px" });
  const rm = useReducedMotion();

  return (
    <div>
      {/* Hero banner — H1 line-by-line reveal */}
      <DarkFieldStage className="py-20 md:py-28 text-center">
        <Container className="max-w-3xl">
          <motion.span
            {...(rm ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE } })}
            className="inline-block"
          >
            <Caption className="text-platinum/60">Direct Inquiry</Caption>
          </motion.span>

          <H1 className="mt-6 text-platinum">
            <motion.span
              {...(rm ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.22, duration: 0.9, ease: EASE } })}
              className="block"
            >
              Contact
            </motion.span>
          </H1>

          <motion.div
            {...(rm ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5, duration: 0.8 } })}
            className="mt-6"
          >
            <Body className="mx-auto text-platinum/70">
              Every relationship begins with curiosity. Whether you seek a specific treasure,
              wish to visit the Wonderhouse, or simply want to learn more about Material
              Consciousness — we welcome your inquiry.
            </Body>
          </motion.div>
        </Container>
      </DarkFieldStage>

      {/* Two-column layout */}
      <Container className="max-w-5xl py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">

          {/* Info sidebar — staggered blocks */}
          <aside ref={infoRef} className="lg:col-span-2 space-y-10">
            {INFO_BLOCKS.map((block, i) => (
              <motion.div
                key={block.label}
                {...(rm ? {} : {
                  initial: { opacity: 0, y: 20 },
                  animate: isInfoInView ? { opacity: 1, y: 0 } : {},
                  transition: { delay: i * 0.12, duration: 0.8, ease: EASE },
                })}
              >
                <h3 className="font-brand text-xs uppercase tracking-widest text-royal-navy/50 mb-3">
                  {block.label}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-royal-navy">
                  {block.content.map((line, j) => (
                    <span key={j} className="block">{line}</span>
                  ))}
                </p>
              </motion.div>
            ))}

            {/* Areas of Expertise — staggered list items */}
            <motion.div
              {...(rm ? {} : {
                initial: { opacity: 0, y: 20 },
                animate: isInfoInView ? { opacity: 1, y: 0 } : {},
                transition: { delay: 0.24, duration: 0.8, ease: EASE },
              })}
            >
              <h3 className="font-brand text-xs uppercase tracking-widest text-royal-navy/50 mb-3">
                Areas of Expertise
              </h3>
              <ul className="space-y-2">
                {EXPERTISE.map((item, i) => (
                  <motion.li
                    key={item}
                    {...(rm ? {} : {
                      initial: { opacity: 0, x: -12 },
                      animate: isInfoInView ? { opacity: 1, x: 0 } : {},
                      transition: { delay: 0.34 + i * 0.08, duration: 0.6, ease: EASE },
                    })}
                    className="flex items-center gap-3"
                  >
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-coral/60" />
                    <span className="font-body text-[15px] leading-relaxed text-royal-navy">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

        </div>
      </Container>
    </div>
  );
}

export default ContactContent;
