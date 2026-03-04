import { Container } from "@/components/ui/Container";

export default function ArchiveLoading() {
  return (
    <div className="pt-16 md:pt-20">
      <Container>
        <div className="space-y-6 animate-pulse">
          <div className="h-3 w-32 bg-coral/20 rounded" />
          <div className="h-10 w-64 bg-platinum/5 rounded" />
          <div className="h-5 w-80 bg-platinum/5 rounded" />
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (<div key={i} className="h-52 bg-deep-navy border border-subtle animate-pulse" />))}
        </div>
      </Container>
    </div>
  );
}
