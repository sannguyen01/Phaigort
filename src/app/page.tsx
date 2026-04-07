import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/MaterialStory";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { PrivateAccessCTA } from "@/components/sections/PrivateAccessCTA";
import { SectionBridge } from "@/components/ui/SectionBridge";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Hero and OurStory share the same dark navy field — no bridge needed */}
      <OurStory />
      {/* dark navy → platinum: theatrical dissolve into the collection */}
      <SectionBridge transition="navy-to-platinum" />
      <CollectionGrid />
      {/* platinum → royal-navy: direct transition into the CTA */}
      <SectionBridge transition="platinum-to-navy" />
      <PrivateAccessCTA />
    </>
  );
}
