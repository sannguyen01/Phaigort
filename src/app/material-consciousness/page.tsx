import { createMetadata } from "@/lib/metadata";
import { H1, H2, Body, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export const metadata = createMetadata({ title: "Material Consciousness", description: "The profound understanding that exceptional materials spanning geological time, cultural heritage, and human innovation deserve equal reverence.", path: "/material-consciousness" });

export default function MaterialConsciousnessPage() {
  return (
    <div>
      <Container className="max-w-3xl">
        <Caption>The Philosophy</Caption>
        <H1 className="mt-6">Material Consciousness</H1>
        <Body className="mt-8 text-royal-navy/70">The profound understanding that exceptional materials spanning geological time, cultural heritage, and human innovation deserve equal reverence. Not a marketing concept but an empirical worldview connecting visible beauty to invisible forces.</Body>
      </Container>
      <Divider />
      <Container className="max-w-3xl">
        <section className="space-y-16">
          <div>
            <Caption className="text-coral">Etymology</Caption>
            <H2 className="mt-6">The Name Phaigort</H2>
            <Body className="mt-6 text-royal-navy/70">Phaigort fuses Greek phainomenon — that which reveals itself through observation — and Portuguese fazer — to make, to create. Honoring Garcia de Orta, the Portuguese physician who wrote the first scientific gemstone book in everyday language &ldquo;so that traders and other locals could make use of it&rdquo; instead of keeping knowledge exclusive.</Body>
            <Body className="mt-4 text-royal-navy/70">Our name captures our mission: reveal what Earth creates, celebrate what humans make, and share the knowledge generously.</Body>
          </div>
          <Divider className="my-0" />
          <div>
            <Caption className="text-coral">Heritage</Caption>
            <H2 className="mt-6">The Iberian Voyage</H2>
            <Body className="mt-6 text-royal-navy/70">Drawing DNA from 16th-century Portuguese and Spanish trading vessels where materials from four continents converged in markets valuing knowledge over pedigree. These nau ships were not instruments of conquest but vehicles of discovery — carrying materials, knowledge, and people across uncharted waters.</Body>
            <Body className="mt-4 text-royal-navy/70">We inherit this spirit: the intellectual rigor and geometric clarity, the voyage romance and artisan reverence. Where great luxury houses built fortresses, we build harbors. Where they gatekeep, we welcome. Where they whisper &ldquo;for the chosen few,&rdquo; we declare &ldquo;for the genuinely curious.&rdquo;</Body>
          </div>
          <Divider className="my-0" />
          <div>
            <Caption className="text-coral">Three Convergences</Caption>
            <H2 className="mt-6">Sources of Material Value</H2>
            <div className="mt-8 space-y-8">
              {[
                { label: "Natural Creation", text: "Deep geological time — gemstones formed under planetary forces across millions of years, precious metals concentrated through hydrothermal processes, crystalline formations revealing Earth's 4.6-billion-year narrative." },
                { label: "Cultural Heritage", text: "Human craft mastery refined across generations — Portuguese filigree requiring 65 meditative steps, Japanese mokume-gane fusion techniques, gem cutting traditions translating mathematical precision into visible brilliance." },
                { label: "Technical Mastery", text: "Contemporary innovation — aerospace alloys, proprietary surface finishes, experimental composites requiring years of research and irreplaceable expertise to develop." },
              ].map((item) => (
                <div key={item.label} className="pl-6 border-l border-coral/30">
                  <h3 className="font-heading text-xl">{item.label}</h3>
                  <Body className="mt-2 text-royal-navy/70">{item.text}</Body>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
