import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/MaterialStory";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { PrivateAccessCTA } from "@/components/sections/PrivateAccessCTA";
import { SectionBridge } from "@/components/ui/SectionBridge";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Thin landmark separates the two dark-field sections so the scroll
          journey has a perceptible boundary without disrupting the dark field. */}
      <div aria-hidden="true" className="flex items-center justify-center bg-[#0A0F1D] py-3">
        <div className="h-px w-14 bg-platinum/10" />
        <div className="mx-3 h-[6px] w-[6px] rotate-45 border border-coral/35" />
        <div className="h-px w-14 bg-platinum/10" />
      </div>
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
