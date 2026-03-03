import { H1, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Container className="max-w-2xl text-center">
        <Caption className="text-gold">404</Caption>
        <H1 className="mt-6">This path leads nowhere yet</H1>
        <Body className="mt-6 text-ivory/60">
          The material you seek has not been curated into this collection.
          Perhaps it awaits discovery elsewhere in the Wonderhouse.
        </Body>
        <div className="mt-10">
          <Button href="/">Return to the Wonderhouse</Button>
        </div>
      </Container>
    </div>
  );
}
