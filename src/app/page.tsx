import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { DomainsGrid } from "@/components/sections/DomainsGrid";
import { PrivateArchive } from "@/components/sections/PrivateArchive";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <DomainsGrid />
      <PrivateArchive />
    </>
  );
}
