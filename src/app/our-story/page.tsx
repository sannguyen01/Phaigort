import { createMetadata } from "@/lib/metadata";
import { H1, H2, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { SectionBridge } from "@/components/ui/SectionBridge";

export const metadata = createMetadata({
  title: "Our Story — The Origin of Phaigort",
  description:
    "Phaigort was founded on a single conviction: rare gemstones and precious materials carry meaning no jeweller can manufacture. Discover how we source, authenticate, and present the Earth's rarest geological formations.",
  path: "/our-story",
});

export default function OurStoryPage() {
  return (
    <>
      {/* royal-navy */}
      <DarkFieldStage intensity="full" className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <Caption>Our Story</Caption>
          <H1 className="mt-5 text-platinum">
            The Earth spent forty million years
            <br />
            making this. We went to find it.
          </H1>
          <Body className="mt-6 text-platinum/70">
            A Kashmir sapphire&apos;s colour is not pigment — it is iron and titanium compressed
            under temperatures that would vaporise everything familiar, then cooled over geological
            time into a crystal of exact violet-blue saturation. Phaigort was founded on the
            conviction that objects formed under these conditions deserve to be understood, not
            merely acquired.
          </Body>
        </Container>
      </DarkFieldStage>

      {/* royal-navy → platinum */}
      <SectionBridge transition="navy-to-platinum" />

      {/* platinum */}
      <section className="bg-platinum py-10 text-royal-navy md:py-16">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <Caption className="text-silver">The Earth as Artist</Caption>
                <H2 className="mt-4">Colour is chemistry. Chemistry is provenance.</H2>
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
                <Body>
                  This is why origin matters in ways that go beyond geography. A Sri Lankan sapphire
                  and a Burmese sapphire of identical colour have different geological biographies —
                  different host rocks, different trace element concentrations, different pressure
                  histories. We select for biography as much as beauty.
                </Body>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* platinum → royal-navy */}
      <SectionBridge transition="platinum-to-navy" />

      {/* royal-navy */}
      <section className="bg-royal-navy py-10 text-platinum md:py-16">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <Caption>The Expedition Mind</Caption>
                <H2 className="mt-4">We go to the source before the market arrives.</H2>
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
                  certificates issued after the fact, but field documentation — geological
                  assessments, origin correlation studies, and in many cases, direct knowledge of
                  the mining locality. In an era when provenance is frequently claimed and rarely
                  verified, we treat it as the foundation of the object&apos;s value, not its
                  footnote.
                </Body>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* royal-navy → platinum */}
      <SectionBridge transition="navy-to-platinum" />

      {/* platinum */}
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
                <Body>
                  Phaigort does not issue condition reports against future uncertainty. We issue
                  them because we believe a collector deserves to understand exactly what they hold
                  — the mineral species, the treatment status (heated or unheated, clarity-enhanced
                  or natural), the geographic origin, and the chain of custody from mine to hand.
                  These are not marketing claims. They are the permanent record of the material.
                </Body>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* platinum → royal-navy */}
      <SectionBridge transition="platinum-to-navy" />

      {/* royal-navy */}
      <DarkFieldStage intensity="full" className="py-12 md:py-16">
        <Container className="text-center">
          <ScrollReveal>
            <H2 className="mx-auto max-w-xl text-platinum">
              Every collection begins with a geological event.
            </H2>
            <Body className="mx-auto mt-4 text-platinum/70">
              Browse the four domains of rarity that Phaigort has assembled — coloured gemstones of
              documented origin, precious metals in their natural state, historical artifacts of
              verified provenance, and contemporary materials of irreproducible specification.
            </Body>
            <div className="mt-8">
              <Button href="/collections">Enter the Collection</Button>
            </div>
          </ScrollReveal>
        </Container>
      </DarkFieldStage>
    </>
  );
}
