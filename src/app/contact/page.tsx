import { createMetadata } from "@/lib/metadata";
import { H1, Body, Caption, Label } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";

export const metadata = createMetadata({
  title: "Contact Phaigort — Gemstone Inquiries & Private Consultations",
  description:
    "Reach the Phaigort team for inquiries about rare gemstones, precious metal specimens, historical artifacts, and private consultations. We respond within 48 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div>
      {/* Hero Banner */}
      <DarkFieldStage className="py-16 md:py-24 text-center">
        <Container className="max-w-3xl">
          <Caption className="text-platinum/60">Open a Dialogue</Caption>
          <H1 className="mt-5 text-platinum">A conversation is where it begins.</H1>
          <Body className="mt-6 mx-auto text-platinum/70">
            Whether you have identified a specific piece you wish to discuss, hold a question about
            provenance or treatment status that requires a direct answer, or are visiting Phaigort
            for the first time without a particular intention — we respond to all inquiries with the
            same attention. We reply within 48 hours.
          </Body>
        </Container>
      </DarkFieldStage>

      {/* Two-Column Layout: Info + Form */}
      <section className="py-16 md:py-24 bg-platinum text-royal-navy">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            {/* Left Column — Contact Info */}
            <aside className="lg:col-span-2 space-y-10">
              <div>
                <Label className="text-royal-navy/50 mb-3 block">
                  The Atelier
                </Label>
                <Body>
                  Open for visits without prior appointment.<br />
                  Private consultations by arrangement.
                </Body>
              </div>

              <div>
                <Label className="text-royal-navy/50 mb-3 block">
                  Response
                </Label>
                <Body>
                  All inquiries receive a response within 48 hours.<br />
                  For urgent matters concerning a specific piece, note &apos;Priority&apos; in
                  your subject.
                </Body>
              </div>

              <div>
                <Label className="text-royal-navy/50 mb-3 block">
                  Areas of Expertise
                </Label>
                <ul className="font-body text-[15px] leading-relaxed text-royal-navy space-y-1.5">
                  <li>— Coloured gemstones: sapphires, spinels, alexandrites, tourmalines</li>
                  <li>— Precious metal specimens and native formations</li>
                  <li>— Historical jewelry: Portuguese, Spanish colonial, Asian trade objects</li>
                  <li>— Contemporary material innovations and experimental composites</li>
                </ul>
              </div>
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
