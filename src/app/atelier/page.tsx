import { createMetadata } from "@/lib/metadata";
import { AtelierContent } from "@/components/sections/AtelierContent";

export const metadata = createMetadata({
  title: "Atelier",
  description:
    "Custom acquisition and consultation — patient discovery, guided exploration, and collaborative conversation.",
  path: "/atelier",
});

export default function AtelierPage() {
  return <AtelierContent />;
}
