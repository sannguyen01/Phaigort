import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/MaterialStory";
import { ManifestoMarquee } from "@/components/sections/ManifestoMarquee";
import { BrandPremise } from "@/components/sections/BrandPremise";
import { DomainsGrid } from "@/components/sections/DomainsGrid";
import { PrivateAccessCTA } from "@/components/sections/PrivateAccessCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurStory />
      <ManifestoMarquee />
      <BrandPremise />
      <DomainsGrid />
      <PrivateAccessCTA />
    </>
  );
}
