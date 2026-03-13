import { createMetadata } from "@/lib/metadata";
import { ContactContent } from "@/components/sections/ContactContent";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Begin a conversation with Phaigort — inquiries about collections, consultations, and visits.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
