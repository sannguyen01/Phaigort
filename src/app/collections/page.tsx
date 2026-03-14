import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { H1, H3, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { TREASURE_DOMAINS } from "@/lib/constants";

export const metadata = createMetadata({ title: "Collections", description: "Explore four treasure domains curated without hierarchy — geological rarities, precious metals, historical artifacts, and contemporary innovations.", path: "/collections" });

export default function CollectionsPage() {
  return (
    <div>
      <Container>
        <ScrollReveal>
          <Caption>The Four Domains</Caption>
          <H1 className="mt-6 max-w-4xl">Comprehensive Material Curation</H1>
          <Body className="mt-8 max-w-2xl text-royal-navy/70">Phaigort curates across four treasure domains without hierarchy. A gemstone formed over millions of years receives the same curatorial reverence as an artisan&apos;s masterwork perfected across generations.</Body>
        </ScrollReveal>
      </Container>
      <Divider />
      <Container>
        <div className="space-y-16 md:space-y-20">
          {TREASURE_DOMAINS.map((domain, i) => (
            <section key={domain.title} id={domain.href.split("#")[1]} className="scroll-mt-24">
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                  <div>
                    <span className="font-body text-xs uppercase tracking-widest text-coral/70">Domain {String(i + 1).padStart(2, "0")}</span>
                    <H3 className="mt-4">{domain.title}</H3>
                  </div>
                  <div>
                    <Body className="text-royal-navy/70">{domain.description}</Body>
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
    </div>
  );
}
