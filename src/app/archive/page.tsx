import { createMetadata } from "@/lib/metadata";
import { H1, H3, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export const metadata = createMetadata({
  title: "Archive",
  description:
    "Historical artifacts and cultural treasures with documented provenance — Spanish colonial jewelry, Portuguese filigree, Asian trade objects, and Renaissance goldwork.",
  path: "/archive",
});

const ARCHIVE_CATEGORIES = [
  {
    title: "Iberian Goldwork",
    period: "15th – 18th Century",
    description:
      "Spanish colonial jewelry blending European techniques with indigenous traditions. Portuguese filigree representing five centuries of craft transmission, each piece requiring dozens of meditative steps perfected across generations of artisan lineage.",
  },
  {
    title: "Asian Trade Objects",
    period: "16th – 19th Century",
    description:
      "Objects connecting civilizations along maritime trade routes — ceramic masterworks, metalwork demonstrating cross-cultural technique exchange, and precious material artifacts documenting the flow of knowledge across continents.",
  },
  {
    title: "European Renaissance",
    period: "14th – 17th Century",
    description:
      "Goldwork and gem-set pieces from the era when scientific inquiry and artistic ambition converged. Each artifact embodies the intellectual curiosity that would later drive the Age of Discovery.",
  },
  {
    title: "Provenance Records",
    period: "Ongoing Documentation",
    description:
      "Every historical acquisition undergoes professional assessment evaluating preservation state, structural stability, and documented chain of custody. Collectors receive complete provenance documentation ensuring transparency and authenticity.",
  },
] as const;

export default function ArchivePage() {
  return (
    <div className="pt-16 md:pt-20">
      <Container>
        <Caption>Historical Treasures</Caption>
        <H1 className="mt-6 max-w-4xl">
          The Archive
        </H1>
        <Body className="mt-8 max-w-2xl text-ivory/70">
          Cultural pieces with documented stories — objects embodying human
          civilization&apos;s creative achievements across centuries and
          continents. Each artifact enables meaningful storytelling connecting
          past mastery to present appreciation.
        </Body>
      </Container>

      <Divider />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARCHIVE_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="p-8 md:p-12 bg-charcoal border border-slate-stone/20"
            >
              <Caption className="text-gold/70">{category.period}</Caption>
              <H3 className="mt-4">{category.title}</H3>
              <Body className="mt-4 text-ivory/60">{category.description}</Body>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
