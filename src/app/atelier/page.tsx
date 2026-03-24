import { createMetadata } from "@/lib/metadata";
import { H1, H2, H4, Body, Caption, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = createMetadata({ title: "Atelier", description: "Custom acquisition and consultation — patient discovery, guided exploration, and collaborative conversation.", path: "/atelier" });

const APPROACHES = [
  {
    number: "01",
    title: "First Look",
    description: "Walk in. See what is here. The microscopes are always available. Our curators know when to speak and when to let a stone speak for itself.",
  },
  {
    number: "02",
    title: "Guided Exploration",
    description: "A conversation shaped by what interests you — your questions, your instincts, your hesitations. We do not lecture. We look together, and find what is worth looking at.",
  },
  {
    number: "03",
    title: "Unhurried Time",
    description: "A stone that formed over forty million years deserves more than two minutes of consideration. Reserve the room. Take your time. We will be nearby if you need us.",
  },
  {
    number: "04",
    title: "Private Consultation",
    description: "For collectors with specific intentions — a piece in mind, a commission to consider, a question that requires more than a visit. These conversations are built around you, not around inventory.",
  },
] as const;

export default function AtelierPage() {
  return (
    <>
      {/* Hero */}
      <DarkFieldStage intensity="full" className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <Caption>The Wonderhouse Experience</Caption>
          <H1 className="mt-5 text-platinum">Atelier</H1>
          <Body className="mt-6 text-platinum/70">
            Entering a Wonderhouse feels like stepping into the generative
            depths where treasures form — an immersive environment from which
            materials emerge like geological revelations. We celebrate extended
            contemplation and explicitly give permission for unlimited
            deliberation.
          </Body>
        </Container>
      </DarkFieldStage>

      {/* Discovery Approaches */}
      <section className="py-10 md:py-16 bg-platinum text-royal-navy">
        <Container>
          <ScrollReveal>
            <Caption className="text-silver">How We Work</Caption>
            <H2 className="mt-4 mb-10">Discovery Approaches</H2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APPROACHES.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 0.1}>
                <div className="h-full p-8 md:p-10 bg-royal-navy border border-royal-navy/10 space-y-4 text-platinum">
                  <Label className="text-coral/70">
                    {a.number}
                  </Label>
                  <H4 className="text-platinum">{a.title}</H4>
                  <Body className="text-platinum/70">{a.description}</Body>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <DarkFieldStage intensity="full" className="py-12 md:py-16">
        <Container className="max-w-3xl text-center">
          <ScrollReveal>
            <H2 className="text-platinum">Begin Your Voyage</H2>
            <Body className="mt-4 mx-auto text-platinum/70">
              Whether you are a first-time visitor curious about geological
              wonders or a seasoned collector seeking specific treasures, the
              Wonderhouse welcomes your presence. No purchase requirements, no
              wealth qualifications — only genuine curiosity.
            </Body>
            <div className="mt-8">
              <Button href="/contact">Schedule a Visit</Button>
            </div>
          </ScrollReveal>
        </Container>
      </DarkFieldStage>
    </>
  );
}
