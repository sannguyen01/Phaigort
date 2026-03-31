import { Hero }             from "@/components/sections/Hero";
import { OurStory }         from "@/components/sections/MaterialStory";
import { CollectionGrid }   from "@/components/sections/CollectionGrid";
import { PrivateAccessCTA } from "@/components/sections/PrivateAccessCTA";
import { SectionBridge }    from "@/components/ui/SectionBridge";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* royal-navy → warm-ivory: 96px theatrical dissolve */}
      <SectionBridge transition="navy-to-ivory" />
      <OurStory />
      {/* warm-ivory → platinum: 40px near-invisible temperature shift */}
      <SectionBridge transition="ivory-to-platinum" className="bridge-blur" />
      <CollectionGrid />
      {/* platinum → royal-navy: 96px caesura before the dark CTA */}
      <SectionBridge transition="platinum-to-navy" />
      <PrivateAccessCTA />
    </>
  );
}
