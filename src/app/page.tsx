import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/MaterialStory";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { TrustSignalStrip } from "@/components/sections/TrustSignalStrip";
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
      {/* platinum → warm-ivory: TrustSignal sits on warm-ivory bg */}
      <SectionBridge transition="platinum-to-ivory" className="bridge-blur" />
      <TrustSignalStrip />
      {/* warm-ivory → royal-navy: 96px caesura before the dark CTA */}
      <SectionBridge transition="ivory-to-navy" />
      <PrivateAccessCTA />
    </>
  );
}
