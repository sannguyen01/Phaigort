import { createMetadata } from "@/lib/metadata";
import { CollectionsContent } from "@/components/sections/CollectionsContent";

export const metadata = createMetadata({
  title: "Collections",
  description:
    "Explore four treasure domains curated without hierarchy — geological rarities, precious metals, historical artifacts, and contemporary innovations.",
  path: "/collections",
});

export default function CollectionsPage() {
  return <CollectionsContent />;
}
