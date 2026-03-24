import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/MaterialStory";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { PrivateAccessCTA } from "@/components/sections/PrivateAccessCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurStory />
      <CollectionGrid />
      <PrivateAccessCTA />
    </>
  );
}
