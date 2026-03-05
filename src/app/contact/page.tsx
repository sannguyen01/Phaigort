import { createMetadata } from "@/lib/metadata";
import { H1, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = createMetadata({ title: "Contact", description: "Begin a conversation with Phaigort — inquiries about collections, consultations, and visits.", path: "/contact" });

export default function ContactPage() {
  return (
    <div>
      <Container className="max-w-3xl text-center">
        <Caption>Direct Inquiry</Caption>
        <H1 className="mt-6">Contact</H1>
        <Body className="mt-8 text-royal-navy/70">Every relationship begins with curiosity. Whether you seek a specific treasure, wish to visit the Wonderhouse, or simply want to learn more about Material Consciousness — we welcome your inquiry.</Body>
      </Container>
      <Divider />
      <ContactForm />
    </div>
  );
}
