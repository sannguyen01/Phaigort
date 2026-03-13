import type { Metadata } from "next";
import { OurStoryContent } from "@/components/sections/OurStoryContent";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Phaigort exists at the intersection of geological science and human artistry. Discover the story behind our pursuit of Earth's most extraordinary materials.",
};

export default function OurStoryPage() {
  return <OurStoryContent />;
}
