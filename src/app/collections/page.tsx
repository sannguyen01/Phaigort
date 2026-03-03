import { createMetadata } from "@/lib/metadata";
import { H1, H3, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { TREASURE_DOMAINS } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Collections",
  description:
    "Explore four treasure domains curated without hierarchy — geological rarities, precious metals, historical artifacts, and contemporary innovations.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <Container>
        <Caption>The Four Domains</Caption>
        <H1 className="mt-6 max-w-4xl">
          Comprehensive Material Curation
        </H1>
        <Body className="mt-8 max-w-2xl text-ivory/70">
          Phaigort curates across four treasure domains without hierarchy.
          A gemstone formed over millions of years receives the same
          curatorial reverence as an artisan&apos;s masterwork perfected
          across generations.
        </Body>
      </Container>

      <Divider />

      <Container>
        <div className="space-y-24 md:space-y-32">
          {TREASURE_DOMAINS.map((domain, i) => (
            <section
              key={domain.title}
              id={domain.href.split("#")[1]}
              className="scroll-mt-24"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div>
                  <span className="font-body text-xs uppercase tracking-widest text-gold/70">
                    Domain {String(i + 1).padStart(2, "0")}
                  </span>
                  <H3 className="mt-4">{domain.title}</H3>
                </div>
                <div>
                  <Body className="text-ivory/70">{domain.description}</Body>
                  <div className="mt-8 aspect-[16/9] bg-charcoal border border-slate-stone/20 flex items-center justify-center">
                    <Caption>Collection imagery forthcoming</Caption>
                  </div>
                </div>
              </div>
              {i < TREASURE_DOMAINS.length - 1 && <Divider />}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
