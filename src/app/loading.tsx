import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container className="flex flex-col items-center gap-6">
        <div className="h-px w-16 animate-pulse bg-gold/40" />
        <p className="font-body text-xs uppercase tracking-widest text-ivory/30 animate-pulse">
          Curating
        </p>
      </Container>
    </div>
  );
}
