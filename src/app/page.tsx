import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/MaterialStory";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { Philosophy } from "@/components/sections/Philosophy";
import { SectionBridge } from "@/components/ui/SectionBridge";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurStory />
      <SectionBridge direction="navy-to-platinum" />
      <CollectionGrid />
      <SectionBridge direction="platinum-to-navy" />
      <Philosophy />
    </>
  );
}
