import { createMetadata } from "@/lib/metadata";
import { H1, Body, Caption, Label } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";

export const metadata = createMetadata({ title: "Contact", description: "Begin a conversation with Phaigort — inquiries about collections, consultations, and visits.", path: "/contact" });

export default function ContactPage() {
  return (
    <div>
      {/* Hero Banner */}
      <DarkFieldStage className="py-16 md:py-24 text-center">
        <Container className="max-w-3xl">
          <Caption className="text-platinum/60">Direct Inquiry</Caption>
          <H1 className="mt-5 text-platinum">Contact</H1>
          <Body className="mt-6 mx-auto text-platinum/70">
            Every relationship begins with curiosity. Whether you seek a specific treasure,
            wish to visit the Wonderhouse, or simply want to learn more about Material
            Consciousness — we welcome your inquiry.
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
                  Visit
                </Label>
                <Body>
                  The Wonderhouse<br />
                  By appointment only
                </Body>
              </div>

              <div>
                <Label className="text-royal-navy/50 mb-3 block">
                  Response Time
                </Label>
                <Body>
                  Within 48 hours
                </Body>
              </div>

              <div>
                <Label className="text-royal-navy/50 mb-3 block">
                  Areas of Expertise
                </Label>
                <ul className="font-body text-[15px] leading-relaxed text-royal-navy space-y-1.5">
                  <li>Geological Rarities</li>
                  <li>Precious Metals</li>
                  <li>Historical Artifacts</li>
                  <li>Contemporary Innovations</li>
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
