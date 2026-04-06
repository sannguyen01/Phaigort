import { Hero }             from "@/components/sections/Hero";
import { EditorialStrip }   from "@/components/sections/EditorialStrip";
import { OurStory }         from "@/components/sections/MaterialStory";
import { CollectionGrid }   from "@/components/sections/CollectionGrid";
import { TrustSignalStrip } from "@/components/sections/TrustSignalStrip";
import { PrivateAccessCTA } from "@/components/sections/PrivateAccessCTA";
import { SectionBridge }    from "@/components/ui/SectionBridge";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Full-bleed gemstone editorial break — bg-[#0D0D0D] matches Hero's dark field */}
      <EditorialStrip
        image="/editorial/hero-break.jpg"
        imageAlt="Garcia de Orta — the Portuguese physician who authored the first scientific treatise on gemstones"
        caption="Forty million years of pressure. One moment of clarity."
      />
      {/* dark → warm-ivory: 96px theatrical dissolve */}
      <SectionBridge transition="navy-to-ivory" />
      <OurStory />
      {/* warm-ivory → platinum: 40px near-invisible temperature shift */}
      <SectionBridge transition="ivory-to-platinum" className="bridge-blur" />
      <CollectionGrid />
      {/* platinum → warm-ivory: TrustSignal sits on warm-ivory bg */}
      <SectionBridge transition="ivory-to-platinum" className="bridge-blur" />
      <TrustSignalStrip />
      {/* warm-ivory → royal-navy: 96px caesura before the dark CTA */}
      <SectionBridge transition="ivory-to-navy" />
      <PrivateAccessCTA />
    </>
  );
}
