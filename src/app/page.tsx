import { Hero }              from "@/components/sections/Hero";
import { OurStory }          from "@/components/sections/MaterialStory";
import { FeaturedSpecimen }  from "@/components/sections/FeaturedSpecimen";
import { CollectionGrid }    from "@/components/sections/CollectionGrid";
import { MaterialMetrics }   from "@/components/sections/MaterialMetrics";
import { MaterialDiscovery } from "@/components/sections/MaterialDiscovery";
import { Philosophy }        from "@/components/sections/Philosophy";

export default function HomePage() {
  return (
    <>
      {/* Entry — Wonderhouse identity statement */}
      <Hero />

      {/* Brand story — geological philosophy + 3 pillars */}
      <OurStory />

      {/* Featured specimen — deep-navy parallax spotlight */}
      <FeaturedSpecimen />

      {/* Collection domains — 2-column domain grid */}
      <CollectionGrid />

      {/* Material intelligence — scroll-triggered animated statistics */}
      <MaterialMetrics />

      {/* Knowledge domains — Stitch-style interactive tab section */}
      <MaterialDiscovery />

      {/* CTA — curiosity meets substance */}
      <Philosophy />
    </>
  );
}
