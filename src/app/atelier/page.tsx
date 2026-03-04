import { createMetadata } from "@/lib/metadata";
import { H1, H2, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export const metadata = createMetadata({ title: "Atelier", description: "Custom acquisition and consultation — patient discovery, guided exploration, and collaborative conversation.", path: "/atelier" });

const APPROACHES = [
  { title: "Quick Discovery", duration: "15–20 minutes", description: "Drop in anytime. See what is new. Get the story. Use the microscopes. No appointment needed." },
  { title: "Guided Exploration", duration: "60–90 minutes", description: "Curators facilitate discovery through questions rather than lectures. Focus on building your independent judgment." },
  { title: "Contemplative Time", duration: "Unhurried", description: "Private examination without curator presence. No pressure, no urgency. Materials that took millions of years to form deserve patient consideration." },
  { title: "Collaborative Conversation", duration: "By request", description: "Detailed discussions answering questions, exploring considerations, discussing collection philosophies." },
] as const;

export default function AtelierPage() {
  return (
    <div className="pt-16 md:pt-20">
      <Container className="max-w-3xl">
        <Caption>The Wonderhouse Experience</Caption>
        <H1 className="mt-6">Atelier</H1>
        <Body className="mt-8 text-silver">Entering a Wonderhouse feels like stepping into the generative depths where treasures form — an immersive environment from which materials emerge like geological revelations. We celebrate extended contemplation and explicitly give permission for unlimited deliberation.</Body>
      </Container>
      <Divider />
      <Container>
        <H2 className="mb-12">Discovery Approaches</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {APPROACHES.map((a) => (
            <div key={a.title} className="p-8 md:p-10 bg-deep-navy border border-subtle space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-xl text-platinum">{a.title}</h3>
                <span className="font-body text-xs text-coral/70 whitespace-nowrap">{a.duration}</span>
              </div>
              <Body className="text-silver">{a.description}</Body>
            </div>
          ))}
        </div>
      </Container>
      <Divider />
      <Container className="max-w-3xl text-center">
        <H2>Begin Your Voyage</H2>
        <Body className="mt-6 text-silver">Whether you are a first-time visitor curious about geological wonders or a seasoned collector seeking specific treasures, the Wonderhouse welcomes your presence. No purchase requirements, no wealth qualifications — only genuine curiosity.</Body>
        <div className="mt-10"><Button href="/contact">Schedule a Visit</Button></div>
      </Container>
    </div>
  );
}
