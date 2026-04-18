import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { MaterialStory } from "@/components/sections/MaterialStory";
import { Statement } from "@/components/sections/Statement";
import { ManifestoMarquee } from "@/components/sections/ManifestoMarquee";
import { BrandPremise } from "@/components/sections/BrandPremise";
import { DomainsGrid } from "@/components/sections/DomainsGrid";
import { PrivateAccessCTA } from "@/components/sections/PrivateAccessCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <MaterialStory />
      <Statement />
      <ManifestoMarquee />
      <BrandPremise />
      <DomainsGrid />
      <PrivateAccessCTA />
    </>
  );
}
