import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { H1, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CollectionFilter } from "@/components/sections/CollectionFilter";

export const metadata = createMetadata({
  title: "Rare Gemstones & Precious Materials — The Phaigort Collection",
  description:
    "Phaigort presents four domains of material rarity: coloured gemstones of geological origin, precious metal specimens, authenticated historical artifacts, and contemporary material innovations. Each piece is documented from source to acquisition.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="pb-0 pt-16 text-platinum md:pt-24"
        style={{ background: "var(--color-bg)" }}
      >
        <Container>
          <ScrollReveal>
            <Caption className="text-platinum/45">The Collection</Caption>
            <H1 className="mt-5 max-w-4xl text-platinum">
              Four domains of rarity.
              <br />
              One standard of documentation.
            </H1>
            <Body className="mt-6 max-w-2xl text-platinum/65">
              Phaigort assembles rare gemstones, precious metal specimens, historical artifacts, and
              contemporary material innovations under a single framework: every piece must carry its
              own evidence. Geological origin, treatment status, provenance chain, and material
              specification are documented as a condition of presentation — not offered as a
              premium.
            </Body>
          </ScrollReveal>
        </Container>

        {/* Divider rule beneath hero text */}
        <div className="mt-14 flex items-center px-[clamp(24px,4vw,64px)] pb-0">
          <div className="h-px flex-1 bg-platinum/[0.07]" />
          <div className="mx-5 h-2.5 w-2.5 rotate-45 border border-platinum/15" />
          <div className="h-px flex-1 bg-platinum/[0.07]" />
        </div>
      </section>

      {/* ── Full-bleed editorial break ────────────────────────────────────── */}
      <div
        className="relative h-[42vh] max-h-[460px] min-h-[260px] overflow-hidden"
        style={{ background: "var(--color-bg)" }}
      >
        <Image
          src="/editorial/hero-break.jpg"
          alt="Phaigort material collection — editorial"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark vignette top + bottom to blend with flanking sections */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-bg) 0%, transparent 28%, transparent 72%, var(--color-bg) 100%)",
          }}
        />
      </div>

      {/* ── Domains with interactive filter ──────────────────────────────── */}
      <CollectionFilter />
    </div>
  );
}
