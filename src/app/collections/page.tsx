import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { H1, H3, Body, Caption, Label } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { TREASURE_DOMAINS } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Rare Gemstones & Precious Materials — The Phaigort Collection",
  description:
    "Phaigort presents four domains of material rarity: coloured gemstones of geological origin, precious metal specimens, authenticated historical artifacts, and contemporary material innovations. Each piece is documented from source to acquisition.",
  path: "/collections",
});

const DOMAIN_DETAILS = [
  {
    paragraphs: [
      "The rarest coloured gemstones are not rare because they are old — they are rare because the geological conditions required for their formation were themselves rare events. A Kashmir sapphire requires not only the correct mineral chemistry (corundum with trace iron and titanium) but the specific pressure and temperature regime of the Kashmir orogenic belt, which produced gem-quality crystals during a narrow window approximately 65 million years ago. The deposits were substantially exhausted within decades of discovery. What remains in circulation today is what was found then.",
      "Phaigort selects coloured gemstones — sapphires, spinels, alexandrites, tourmalines, and related species — on the basis of geological narrative as much as visual quality. A stone that cannot be placed within a specific geological context is, to us, a stone that has lost half its meaning.",
    ],
  },
  {
    paragraphs: [
      "Gold, in its native state, is a geological event frozen in time. Alluvial gold formed within ancient river systems; crystalline gold grew in hydrothermal veins over millions of years; wire gold developed in fracture zones of metamorphic rock through processes still not entirely understood. These specimens are not bullion. They are the visible record of Earth's electrochemical processes.",
      "Phaigort presents precious metal specimens — native gold, platinum group metals, silver dendrites, and electrum — as objects with geological identities. The weight is recorded, but the weight is not the point.",
    ],
  },
  {
    paragraphs: [
      "The history of jewellery is the history of trade, empire, and craft evolution. A Spanish colonial gold piece carries within it the metallurgy of Andean mines, the hands of indigenous goldsmiths, and the commercial logic of the Manila Galleon trade. Portuguese filigree represents one of the most demanding wire-working traditions in European craft — a technique refined over three centuries that cannot be industrially reproduced.",
      "All historical pieces in the Phaigort collection are accompanied by provenance documentation appropriate to their age, origin, and legal status. Objects of significant historical sensitivity are not acquired without thorough due diligence across recognised registries.",
    ],
  },
  {
    paragraphs: [
      "Material science does not stand still. The past three decades have produced metamorphic composites, reactive surface treatments, and alloy structures that achieve properties previously considered mutually exclusive — materials that are simultaneously hard and ductile, thermally stable and visually dynamic, structurally precise and aesthetically indeterminate.",
      "Phaigort presents contemporary material innovations as a fourth domain of rarity — not as applied engineering, but as objects whose value derives from the irreproducibility of their material specification. Many require years of development and cannot be sourced once a production run concludes.",
    ],
  },
] as const;

export default function CollectionsPage() {
  return (
    <div>
      <section className="pt-10 md:pt-16 bg-platinum text-royal-navy">
        <Container>
          <ScrollReveal>
            <Caption>The Collection</Caption>
            <H1 className="mt-5 max-w-4xl">
              Four domains of rarity. One standard of documentation.
            </H1>
            <Body className="mt-6 max-w-2xl text-royal-navy/70">
              Phaigort assembles rare gemstones, precious metal specimens, historical artifacts,
              and contemporary material innovations under a single framework: every piece must
              carry its own evidence. Geological origin, treatment status, provenance chain, and
              material specification are documented as a condition of presentation — not offered
              as a premium.
            </Body>
          </ScrollReveal>
        </Container>
      </section>
      <Divider />
      <section className="pb-10 md:pb-16 bg-platinum text-royal-navy">
        <Container>
          <div className="space-y-16 md:space-y-20">
            {TREASURE_DOMAINS.map((domain, i) => (
              <section key={domain.title} id={domain.href.split("#")[1]} className="scroll-mt-24">
                <ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                    <div>
                      <Label className="text-coral/70">Domain {String(i + 1).padStart(2, "0")}</Label>
                      <H3 className="mt-4">{domain.title}</H3>
                    </div>
                    <div>
                      <div className="space-y-4">
                        {DOMAIN_DETAILS[i].paragraphs.map((para, j) => (
                          <Body key={j} className="text-royal-navy/70">{para}</Body>
                        ))}
                      </div>
                      <ImageReveal delay={0.15} className="mt-8">
                        <div className="relative aspect-[16/9] overflow-hidden bg-royal-navy/5 border border-royal-navy/10">
                          <Image
                            src={domain.image}
                            alt={domain.imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 66vw"
                            className="object-cover"
                          />
                        </div>
                      </ImageReveal>
                    </div>
                  </div>
                </ScrollReveal>
                {i < TREASURE_DOMAINS.length - 1 && <Divider />}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
