import { Hero } from "@/components/sections/Hero";
import { MaterialStory } from "@/components/sections/MaterialStory";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { Philosophy } from "@/components/sections/Philosophy";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MaterialStory />
      <CollectionGrid />
      <Philosophy />
    </>
  );
}
