import { createMetadata } from "@/lib/metadata";
import { H1, H3, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export const metadata = createMetadata({ title: "Archive", description: "Historical artifacts and cultural treasures with documented provenance.", path: "/archive" });

const ARCHIVE_CATEGORIES = [
  { title: "Iberian Goldwork", period: "15th – 18th Century", description: "Spanish colonial jewelry blending European techniques with indigenous traditions. Portuguese filigree representing five centuries of craft transmission." },
  { title: "Asian Trade Objects", period: "16th – 19th Century", description: "Objects connecting civilizations along maritime trade routes — ceramic masterworks, metalwork demonstrating cross-cultural technique exchange." },
  { title: "European Renaissance", period: "14th – 17th Century", description: "Goldwork and gem-set pieces from the era when scientific inquiry and artistic ambition converged." },
  { title: "Provenance Records", period: "Ongoing Documentation", description: "Every historical acquisition undergoes professional assessment evaluating preservation state, structural stability, and documented chain of custody." },
] as const;

export default function ArchivePage() {
  return (
    <div className="pt-16 md:pt-20">
      <Container>
        <Caption>Historical Treasures</Caption>
        <H1 className="mt-6 max-w-4xl">The Archive</H1>
        <Body className="mt-8 max-w-2xl text-silver">Cultural pieces with documented stories — objects embodying human civilization&apos;s creative achievements across centuries and continents.</Body>
      </Container>
      <Divider />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARCHIVE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="p-8 md:p-12 bg-deep-navy border border-silver/10">
              <Caption className="text-coral/70">{cat.period}</Caption>
              <H3 className="mt-4">{cat.title}</H3>
              <Body className="mt-4 text-silver">{cat.description}</Body>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
