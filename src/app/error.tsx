"use client";

import { useEffect } from "react";
import { H1, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Phaigort error boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Container className="max-w-2xl text-center">
        <Caption className="text-garnet">Something went wrong</Caption>
        <H1 className="mt-6">An unexpected fracture</H1>
        <Body className="mt-6 text-ivory/60">
          Even the most carefully curated systems encounter geological
          instability. We are aware of the disruption and working to
          restore clarity.
        </Body>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button onClick={reset} variant="secondary">
            Try again
          </Button>
          <Button href="/">Return home</Button>
        </div>
      </Container>
    </div>
  );
}
