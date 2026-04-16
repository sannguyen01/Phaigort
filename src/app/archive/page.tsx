import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { H1, H3, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = createMetadata({
  title: "The Archive — Historical Artifacts & Provenance Records",
  description:
    "Iberian goldwork, Asian trade objects, European Renaissance pieces, and contemporary provenance documentation. Every artifact in the Phaigort Archive carries a documented chain of custody.",
  path: "/archive",
});

const ARCHIVE_CATEGORIES = [
  {
    title: "Iberian Goldwork",
    period: "15th – 18th Century",
    description:
      "Spanish colonial jewelry blending European techniques with indigenous traditions. Portuguese filigree representing five centuries of craft transmission — a wire-working discipline so demanding it cannot be industrially reproduced.",
    image: "/collections/historical-artifacts.jpg",
    imageAlt: "Historical goldwork jewelry — Phaigort Archive",
  },
  {
    title: "Asian Trade Objects",
    period: "16th – 19th Century",
    description:
      "Objects connecting civilizations along maritime trade routes — ceramic masterworks, metalwork demonstrating cross-cultural technique exchange, and material culture shaped by the Silk Road's final centuries of activity.",
    image: "/collections/precious-metals.jpg",
    imageAlt: "Precious metals and Asian trade metalwork — Phaigort Archive",
  },
  {
    title: "European Renaissance",
    period: "14th – 17th Century",
    description:
      "Goldwork and gem-set pieces from the era when scientific inquiry and artistic ambition converged. Objects from workshops where the same mind that studied mineralogy also set stones.",
    image: "/collections/geological-rarities.jpg",
    imageAlt: "European Renaissance gem-set jewelry — Phaigort Archive",
  },
  {
    title: "Provenance Records",
    period: "Ongoing Documentation",
    description:
      "Every historical acquisition undergoes professional assessment evaluating preservation state, structural stability, and documented chain of custody. Objects of significant historical sensitivity are not acquired without thorough due diligence across recognised registries.",
    image: "/collections/geological-rarities-detail.jpg",
    imageAlt: "Gemstone documentation and provenance — Phaigort Archive",
  },
] as const;

export default function ArchivePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <DarkFieldStage intensity="full" className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <ScrollReveal>
            <Caption className="text-platinum/45">Historical Treasures</Caption>
            <H1 className="mt-5 text-platinum">The Archive</H1>
            <Body className="mt-6 text-platinum/65">
              Cultural pieces with documented stories — objects embodying human
              civilisation&apos;s creative achievements across centuries and continents.
              Provenance is the foundation here, not the footnote.
            </Body>
          </ScrollReveal>
        </Container>
      </DarkFieldStage>

      {/* ── Divider rule ──────────────────────────────────────────────────── */}
      <div className="bg-[#08090D]">
        <Container>
          <div className="flex items-center gap-4 py-8">
            <div className="h-px flex-1 bg-platinum/[0.07]" />
            <div className="h-2.5 w-2.5 rotate-45 border border-coral/50" />
            <div className="h-px flex-1 bg-platinum/[0.07]" />
          </div>
        </Container>
      </div>

      {/* ── Category cards ────────────────────────────────────────────────── */}
      <section className="bg-[#08090D] pb-20 text-platinum md:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {ARCHIVE_CATEGORIES.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.1}>
                <article className="group overflow-hidden bg-[#0A1240] transition-colors duration-500 hover:bg-[#0F1A4A]">
                  {/* Image — scales subtly on hover */}
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    <Image
                      src={cat.image}
                      alt={cat.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                    {/* Bottom fade — grounds image into card body */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A1240] to-transparent transition-colors duration-500 group-hover:from-[#0F1A4A]"
                    />
                  </div>

                  {/* Card caption */}
                  <div className="px-7 pb-8 pt-5">
                    <Caption className="text-platinum/38">{cat.period}</Caption>
                    <H3 className="mt-3 text-platinum">{cat.title}</H3>
                    <Body className="mt-3 text-platinum/60 leading-relaxed">
                      {cat.description}
                    </Body>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Closing note ─────────────────────────────────────────────────── */}
      <section className="bg-[#0A0F1D] py-14 text-center text-platinum md:py-20">
        <Container className="max-w-xl">
          <ScrollReveal>
            <div className="flex justify-center">
              <svg viewBox="0 0 40 40" width="16" height="16" fill="none" aria-hidden="true">
                <polygon
                  points="20,2 38,20 20,38 2,20"
                  fill="none"
                  stroke="rgba(255,107,74,0.50)"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <p className="mt-6 font-display text-[1.05rem] italic leading-relaxed text-platinum/50">
              Every object in the Phaigort Archive was acquired on the condition that its story
              could be fully told — not claimed.
            </p>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
