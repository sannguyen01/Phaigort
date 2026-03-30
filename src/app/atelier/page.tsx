import { createMetadata } from "@/lib/metadata";
import { H1, H2, H4, Body, Caption, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = createMetadata({
  title: "The Atelier — Private Consultation & Gemstone Discovery",
  description:
    "The Phaigort Atelier offers private consultations for collectors and first-time visitors seeking rare gemstones, precious metals, and authenticated historical pieces. No appointment required for an initial visit.",
  path: "/atelier",
});

const APPROACHES = [
  {
    number: "01",
    title: "First Look",
    description:
      "There is no prepared presentation. The cases contain what they contain. The microscopes are always available, and the curators have been asked to let the material do its own work — speaking only when the visitor has a question worth answering.",
  },
  {
    number: "02",
    title: "Guided Exploration",
    description:
      "A conversation structured by your curiosity rather than our inventory. We begin with what interests you — a period, a material, a question — and follow where the collection leads. There is no predetermined sequence. Hesitation is as informative as certainty.",
  },
  {
    number: "03",
    title: "Unhurried Time",
    description:
      "The private viewing room is available without time constraint. A Kashmir sapphire that spent sixty-five million years in metamorphic rock does not need to be decided upon quickly. Reserve it for an afternoon. We will be available, but not present unless asked.",
  },
  {
    number: "04",
    title: "Private Consultation",
    description:
      "For collectors with a specific intention — a commission, an acquisition target, a question about treatment status or origin correlation that requires more than a case note can answer. We make no recommendation that we would not stand behind in writing. These conversations are built around the material, the collector, and the truth of what we know.",
  },
] as const;

export default function AtelierPage() {
  return (
    <>
      {/* Hero */}
      <DarkFieldStage intensity="full" className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <Caption>Private Discovery</Caption>
          <H1 className="mt-5 text-platinum">The Atelier</H1>
          <Body className="mt-6 text-platinum/70">
            The Atelier is not a showroom. It is a place designed for the kind of attention that
            rare materials deserve — unhurried, curious, and informed by the knowledge of people
            who have spent years in the field. We do not believe that a stone formed over forty
            million years should be evaluated in four minutes.
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
            <H2 className="text-platinum">
              The Atelier receives visitors by inclination, not by appointment.
            </H2>
            <Body className="mt-4 mx-auto text-platinum/70">
              First-time visitors are as welcome as established collectors. The only qualification
              is genuine curiosity about what the Earth was capable of making, and what human craft
              traditions built around that capability. When you are ready to take the next step — a
              private consultation, a commission conversation, a question about a specific piece —
              we are here.
            </Body>
            <div className="mt-8">
              <Button href="/contact">Arrange a Consultation</Button>
            </div>
          </ScrollReveal>
        </Container>
      </DarkFieldStage>
    </>
  );
}
