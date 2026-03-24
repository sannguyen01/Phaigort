import type { Metadata } from "next";
import { H1, H2, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Phaigort exists at the intersection of geological science and human artistry. Discover the story behind our pursuit of Earth's most extraordinary materials.",
};

export default function OurStoryPage() {
  return (
    <>
      <DarkFieldStage intensity="full" className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <Caption>Our Story</Caption>
          <H1 className="mt-5 text-platinum">
            The Earth as artist.
            <br />
            The expedition as practice.
          </H1>
          <Body className="mt-6 text-platinum/70">
            Some things take time to be understood. A great sapphire spends forty million years
            becoming what it is — its colour a record of iron and titanium bonded under temperatures
            far beyond anything above ground. Phaigort exists because of a conviction that these
            materials deserve to be known, not just owned.
          </Body>
        </Container>
      </DarkFieldStage>

      <section className="bg-platinum py-10 text-royal-navy md:py-16">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <Caption className="text-silver">The Earth as Artist</Caption>
                <H2 className="mt-4">
                  Colour, light, pressure — forces no craftsperson can replicate
                </H2>
              </div>
              <div className="space-y-5">
                <Body>
                  A ruby&apos;s red comes from chromium — the same element that colours emeralds
                  green, depending on the mineral host. An alexandrite shifts from teal to raspberry
                  because its absorption spectrum sits precisely on the boundary between daylight
                  and incandescent light. These are not accidents of beauty. They are chemistry
                  operating under conditions that Earth alone creates.
                </Body>
                <Body>
                  We select materials that carry this geological intelligence visibly. Every stone
                  in a Phaigort collection is chosen because its beauty is inseparable from its
                  science — and both are documented, not assumed.
                </Body>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-royal-navy py-10 text-platinum md:py-16">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <Caption>The Expedition Mind</Caption>
                <H2 className="mt-4">
                  We go where the stones are, before the market decides their value
                </H2>
              </div>
              <div className="space-y-5">
                <Body className="text-platinum/70">
                  Great gemstones do not announce themselves. They surface in river gravels outside
                  Ratnapura in Sri Lanka, in metamorphic corridors across the Malagasy highlands, in
                  marble seams running through the mountains of northern Vietnam. Finding them
                  before they are processed — rough, ungraded, unvalued — requires geological
                  intuition developed over years in the field.
                </Body>
                <Body className="text-platinum/70">
                  This expedition instinct is how Phaigort accesses material that never reaches open
                  markets. It is also how we maintain direct knowledge of provenance — not
                  certificates issued after the fact, but relationships built at the source itself.
                </Body>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-platinum py-10 text-royal-navy md:py-16">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <Caption className="text-silver">The Standard</Caption>
                <H2 className="mt-4">
                  Every piece asks one question: will it matter more in twenty years?
                </H2>
              </div>
              <div className="space-y-5">
                <Body>
                  A stone cut to maximise weight is not the same as a stone cut to maximise beauty.
                  Metal chosen for margin is not the same as metal chosen for how it wears over
                  decades. Phaigort pieces are evaluated by craftspeople with deep material
                  knowledge — not by production schedules or seasonal targets.
                </Body>
                <Body>
                  The result is a collection where every object is intended to outlast its purchase
                  occasion — pieces worth explaining to someone who finds them in fifty years,
                  carrying their story visibly in the material itself.
                </Body>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <DarkFieldStage intensity="full" className="py-12 md:py-16">
        <Container className="text-center">
          <ScrollReveal>
            <H2 className="mx-auto max-w-xl text-platinum">
              Discover what the Earth made possible.
            </H2>
            <Body className="mx-auto mt-4 text-platinum/70">
              Every collection begins with a geological event. Browse what we have found.
            </Body>
            <div className="mt-8">
              <Button href="/collections">Explore Our Collection</Button>
            </div>
          </ScrollReveal>
        </Container>
      </DarkFieldStage>
    </>
  );
}
