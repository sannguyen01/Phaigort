import { Hero }             from "@/components/sections/Hero";
import { Statement }        from "@/components/sections/Statement";
import { Philosophy }       from "@/components/sections/Philosophy";
import { OurStory }         from "@/components/sections/MaterialStory";
import { MaterialTimeline } from "@/components/sections/MaterialTimeline";
import { DomainsGrid }      from "@/components/sections/DomainsGrid";
import { CollectionGrid }   from "@/components/sections/CollectionGrid";
import { EditorialStrip }   from "@/components/sections/EditorialStrip";
import { ManifestoMarquee } from "@/components/sections/ManifestoMarquee";
import { PrivateArchive }   from "@/components/sections/PrivateArchive";
import { PrivateAccessCTA } from "@/components/sections/PrivateAccessCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Philosophy />
      <OurStory />
      <MaterialTimeline />
      <DomainsGrid />
      <CollectionGrid />
      <EditorialStrip
        image="/story/expedition-rough.jpg"
        imageAlt="Rough gemstone material from expedition sources — Phaigort"
        caption="Some things take forty million years to become what they are."
      />
      <ManifestoMarquee />
      <PrivateArchive />
      <PrivateAccessCTA />
    </>
  );
}
