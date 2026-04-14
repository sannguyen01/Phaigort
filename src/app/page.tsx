import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/MaterialStory";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { PrivateArchive } from "@/components/sections/PrivateArchive";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurStory />
      <CollectionGrid />
      <PrivateArchive />
    </>
  );
}
