import Image from "next/image";
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
  ogImage: "/editorial/gemstone-bg.jpg",
});

const APPROACHES = [
  {
    number: "01",
    title: "First Look",
    image: "/story/rough-stone.png",
    imageAlt: "Rough stone specimen — Phaigort Atelier",
    description:
      "There is no prepared presentation. The cases contain what they contain. The microscopes are always available, and the curators have been asked to let the material do its own work — speaking only when the visitor has a question worth answering.",
  },
  {
    number: "02",
    title: "Guided Exploration",
    image: null,
    imageAlt: null,
    description:
      "A conversation structured by your curiosity rather than our inventory. We begin with what interests you — a period, a material, a question — and follow where the collection leads. There is no predetermined sequence. Hesitation is as informative as certainty.",
  },
  {
    number: "03",
    title: "Unhurried Time",
    image: "/story/expedition-rough.jpg",
    imageAlt: "Field expedition rough geological specimen — Phaigort Atelier",
    description:
      "The private viewing room is available without time constraint. A Kashmir sapphire that spent sixty-five million years in metamorphic rock does not need to be decided upon quickly. Reserve it for an afternoon. We will be available, but not present unless asked.",
  },
  {
    number: "04",
    title: "Private Consultation",
    image: null,
    imageAlt: null,
    description:
      "For collectors with a specific intention — a commission, an acquisition target, a question about treatment status or origin correlation that requires more than a case note can answer. We make no recommendation that we would not stand behind in writing. These conversations are built around the material, the collector, and the truth of what we know.",
  },
] as const;

export default function AtelierPage() {
  return (
    <>
      {/* Hero */}
      <DarkFieldStage intensity="deep" className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <Caption className="mb-3 block text-platinum/50">Private Discovery</Caption>
          <H1 className="mt-4 text-platinum">The Atelier</H1>
          <Body className="mt-6 text-platinum/70">
            The Atelier is not a showroom. It is a place designed for the kind of attention that
            rare materials deserve — unhurried, curious, and informed by the knowledge of people who
            have spent years in the field. We do not believe that a stone formed over forty million
            years should be evaluated in four minutes.
          </Body>
        </Container>
      </DarkFieldStage>

      {/* Editorial break — crystalline specimen */}
      <ScrollReveal>
        <div className="relative max-h-[440px] min-h-[260px] overflow-hidden" style={{ height: "40vh" }}>
          <Image
            src="/story/full-diamond.png"
            alt="Diamond crystal specimen — Phaigort Atelier"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{ background: "linear-gradient(to bottom, var(--color-bg), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{ background: "linear-gradient(to top, var(--color-bg), transparent)" }}
          />
        </div>
      </ScrollReveal>

      {/* Discovery Approaches */}
      <section className="py-16 text-platinum md:py-20" style={{ background: "var(--color-bg)" }}>
        <Container>
          <ScrollReveal>
            <Caption className="text-platinum/40">How We Work</Caption>
            <H2 className="mb-10 mt-4 text-platinum">Discovery Approaches</H2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {APPROACHES.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 0.08}>
                <div className="group h-full overflow-hidden border border-platinum/[0.08] bg-t04 text-platinum transition-colors duration-300 hover:bg-t05">
                  {a.image !== null && (
                    <div className="arch-mask relative h-[160px] overflow-hidden">
                      <Image
                        src={a.image}
                        alt={a.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                        loading="lazy"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-t04 to-transparent transition-colors duration-300 group-hover:from-t05"
                      />
                    </div>
                  )}
                  <div className="space-y-4 p-8 md:p-10">
                    <Label className="text-platinum/40">{a.number}</Label>
                    <H4 className="text-platinum">{a.title}</H4>
                    <Body className="text-platinum/65">{a.description}</Body>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Subtle editorial texture — gemstone-bg at 12% opacity */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--color-bg)", height: "120px" }}
        aria-hidden
      >
        <Image
          src="/editorial/gemstone-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 0.12 }}
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-bg) 0%, transparent 40%, transparent 60%, var(--color-bg) 100%)",
          }}
        />
      </div>

      {/* Closing CTA */}
      <DarkFieldStage intensity="medium" className="py-16 md:py-24">
        <Container className="max-w-3xl text-center">
          <ScrollReveal>
            <H2 className="mx-auto max-w-2xl text-platinum">
              The Atelier receives visitors by inclination, not by appointment.
            </H2>
            <Body className="mx-auto mt-4 text-platinum/70">
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
