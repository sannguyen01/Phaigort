import { createMetadata } from "@/lib/metadata";
import { H1, H2, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { SectionBridge } from "@/components/ui/SectionBridge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = createMetadata({ title: "Atelier", description: "Custom acquisition and consultation — patient discovery, guided exploration, and collaborative conversation.", path: "/atelier" });

const APPROACHES = [
  { number: "01", title: "Quick Discovery", duration: "15–20 minutes", description: "Drop in anytime. See what is new. Get the story. Use the microscopes. No appointment needed." },
  { number: "02", title: "Guided Exploration", duration: "60–90 minutes", description: "Curators facilitate discovery through questions rather than lectures. Focus on building your independent judgment." },
  { number: "03", title: "Contemplative Time", duration: "Unhurried", description: "Private examination without curator presence. No pressure, no urgency. Materials that took millions of years to form deserve patient consideration." },
  { number: "04", title: "Collaborative Conversation", duration: "By request", description: "Detailed discussions answering questions, exploring considerations, discussing collection philosophies." },
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

      <SectionBridge direction="navy-to-platinum" />

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
                  <span className="font-brand text-[10px] uppercase tracking-[0.35em] text-coral/70">
                    {a.number}
                  </span>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-xl text-platinum">{a.title}</h3>
                    <span className="font-body text-xs text-coral/70 whitespace-nowrap">{a.duration}</span>
                  </div>
                  <Body className="text-platinum/65">{a.description}</Body>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <SectionBridge direction="platinum-to-navy" />

      {/* CTA */}
      <DarkFieldStage intensity="full" className="py-12 md:py-16">
        <Container className="max-w-3xl text-center">
          <ScrollReveal>
            <H2 className="text-platinum">Begin Your Voyage</H2>
            <Body className="mt-4 text-platinum/70">
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
