import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { H1, H2, Body, Caption, Label } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";

export const metadata = createMetadata({
  title: "Contact Phaigort — Gemstone Inquiries & Private Consultations",
  description:
    "Reach the Phaigort team for inquiries about rare gemstones, precious metal specimens, historical artifacts, and private consultations. We respond within 48 hours.",
  path: "/contact",
  ogImage: "/hero/hero-diamond.jpg",
});

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <DarkFieldStage intensity="deep" className="py-24 md:py-36">
        <Image
          src="/hero/hero-diamond.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
          style={{ opacity: 0.09, filter: "grayscale(100%)" }}
          aria-hidden
        />
        <Container className="relative z-10 max-w-3xl">
          <Caption className="text-platinum/50">Open a Dialogue</Caption>
          <H1 className="mt-5 text-platinum">A conversation is where it begins.</H1>
          <Body className="mt-6 text-platinum/70">
            Whether you have identified a specific piece you wish to discuss, hold a question about
            provenance or treatment status that requires a direct answer, or are visiting Phaigort
            for the first time without a particular intention — we respond to all inquiries with the
            same attention. We reply within 48 hours.
          </Body>
        </Container>
      </DarkFieldStage>

      {/* Form section */}
      <section className="py-16 text-platinum md:py-24" style={{ background: "var(--color-bg)" }}>
        <Container className="max-w-5xl">
          <ScrollReveal>
            <Caption className="text-platinum/40">Private Enquiry</Caption>
            <H2 className="mb-10 mt-4 text-platinum">Begin a private conversation.</H2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left Column — Contact Info */}
            <aside className="space-y-10 lg:col-span-2">
              <div>
                <Label className="mb-3 block text-platinum/45">The Atelier</Label>
                <Body className="text-platinum/70">
                  Open for visits without prior appointment.
                  <br />
                  Private consultations by arrangement.
                </Body>
              </div>

              <div>
                <Label className="mb-3 block text-platinum/45">Response</Label>
                <Body className="text-platinum/70">
                  All inquiries receive a response within 48 hours.
                  <br />
                  For urgent matters concerning a specific piece, note &apos;Priority&apos; in your
                  subject.
                </Body>
              </div>

              <div>
                <Label className="mb-3 block text-platinum/45">Areas of Expertise</Label>
                <ul className="space-y-1.5 font-ui text-[15px] leading-relaxed text-platinum/65">
                  <li>— Coloured gemstones: sapphires, spinels, alexandrites, tourmalines</li>
                  <li>— Precious metal specimens and native formations</li>
                  <li>— Historical jewelry: Portuguese, Spanish colonial, Asian trade objects</li>
                  <li>— Contemporary material innovations and experimental composites</li>
                </ul>
              </div>

              {/* T-09 Platinum rule */}
              <div className="h-px w-16 bg-platinum/10" />
            </aside>

            {/* Right Column — Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
