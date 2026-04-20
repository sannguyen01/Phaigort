import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { H1, H2, H4, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { Divider } from "@/components/ui/Divider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MaterialTimeline } from "@/components/sections/MaterialTimeline";

export const metadata = createMetadata({
  title: "Material Consciousness",
  description:
    "The profound understanding that exceptional materials spanning geological time, cultural heritage, and human innovation deserve equal reverence.",
  path: "/material-consciousness",
});

export default function MaterialConsciousnessPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <DarkFieldStage intensity="full" className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <ScrollReveal>
            <Caption className="text-platinum/45">The Philosophy</Caption>
            <H1 className="mt-5 text-platinum">Material Consciousness</H1>
            <Body className="mt-6 text-platinum/65">
              The profound understanding that exceptional materials spanning geological time,
              cultural heritage, and human innovation deserve equal reverence. Not a marketing
              concept — an empirical worldview connecting visible beauty to invisible forces.
            </Body>
          </ScrollReveal>
        </Container>
      </DarkFieldStage>

      {/* ── Philosophy sections ───────────────────────────────────────────── */}
      <section className="pb-0 text-platinum" style={{ background: "var(--color-bg)" }}>
        <Container className="max-w-3xl py-16 md:py-20">
          <div className="space-y-16">
            {/* Etymology */}
            <ScrollReveal>
              <div>
                <Caption className="text-platinum/40">Etymology</Caption>
                <H2 className="mt-4 text-platinum">The Name Phaigort</H2>
                <Body className="mt-6 text-platinum/65">
                  Phaigort fuses Greek <em className="not-italic text-platinum/85">phainomenon</em>{" "}
                  — that which reveals itself through observation — and Portuguese{" "}
                  <em className="not-italic text-platinum/85">fazer</em> — to make, to create.
                  Honouring García de Orta, the Portuguese physician who wrote the first scientific
                  gemstone treatise in everyday language{" "}
                  <em className="text-platinum/55">
                    &ldquo;so that traders and other locals could make use of it&rdquo;
                  </em>{" "}
                  — sharing knowledge rather than keeping it exclusive.
                </Body>
                <Body className="mt-4 text-platinum/65">
                  Our name captures our mission: reveal what Earth creates, celebrate what humans
                  make, and share the knowledge generously.
                </Body>
              </div>
            </ScrollReveal>

            <Divider className="my-0" />

            {/* Heritage */}
            <ScrollReveal>
              <div>
                <Caption className="text-platinum/40">Heritage</Caption>
                <H2 className="mt-4 text-platinum">The Iberian Voyage</H2>
                <Body className="mt-6 text-platinum/65">
                  Drawing lineage from 16th-century Portuguese and Spanish trading vessels where
                  materials from four continents converged in markets valuing knowledge over
                  pedigree. These <em className="not-italic text-platinum/75">nau</em> ships were
                  not instruments of conquest but vehicles of discovery — carrying materials,
                  knowledge, and people across uncharted waters.
                </Body>
                <Body className="mt-4 text-platinum/65">
                  We inherit this spirit: the intellectual rigour and geometric clarity, the voyage
                  romance and artisan reverence. Where great luxury houses built fortresses, we
                  build harbours. Where they gatekeep, we welcome. Where they whisper &ldquo;for the
                  chosen few,&rdquo; we declare &ldquo;for the genuinely curious.&rdquo;
                </Body>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* ── Full-bleed image break — geological deep time ─────────────────── */}
      <div
        className="relative h-[45vh] max-h-[480px] min-h-[300px] overflow-hidden"
        style={{ background: "var(--color-bg)" }}
      >
        <Image
          src="/story/timeline-earth.jpg"
          alt="Geological timeline — Earth's deep time layers"
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
        />
        {/* Gradient top → transparent → gradient bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-bg) 0%, transparent 30%, transparent 70%, var(--color-bg) 100%)",
          }}
        />
        {/* Centred pull-quote */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <ScrollReveal>
            <blockquote className="max-w-2xl font-display text-[clamp(1.1rem,2.2vw,1.9rem)] italic leading-relaxed text-platinum/65">
              Some things take forty million years to become extraordinary.
              <br />
              <span className="text-[0.65em] uppercase not-italic tracking-[0.12em] text-platinum/35">
                — Phaigort
              </span>
            </blockquote>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Three Convergences ────────────────────────────────────────────── */}
      <section className="pb-20 text-platinum md:pb-28" style={{ background: "var(--color-bg)" }}>
        <Container className="max-w-3xl pt-16 md:pt-20">
          <ScrollReveal>
            <div>
              <Caption className="text-platinum/40">Three Convergences</Caption>
              <H2 className="mt-4 text-platinum">Sources of Material Value</H2>
              <div className="mt-10 space-y-8">
                {[
                  {
                    label: "Natural Creation",
                    text: "Deep geological time — gemstones formed under planetary forces across millions of years, precious metals concentrated through hydrothermal processes, crystalline formations revealing Earth's 4.6-billion-year narrative.",
                  },
                  {
                    label: "Cultural Heritage",
                    text: "Human craft mastery refined across generations — Portuguese filigree requiring 65 meditative steps, Japanese mokume-gane fusion techniques, gem cutting traditions translating mathematical precision into visible brilliance.",
                  },
                  {
                    label: "Technical Mastery",
                    text: "Contemporary innovation — aerospace alloys, proprietary surface finishes, experimental composites requiring years of research and irreplaceable expertise to develop.",
                  },
                ].map((item, i) => (
                  <ScrollReveal key={item.label} delay={i * 0.12}>
                    <div className="border-l-2 border-platinum/20 pl-6 transition-all duration-300 hover:border-platinum/40">
                      <H4 className="text-platinum">{item.label}</H4>
                      <Body className="mt-2 text-platinum/60">{item.text}</Body>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ── Parallax material story ─────────────────────────────────── */}
      <MaterialTimeline />
    </>
  );
}
