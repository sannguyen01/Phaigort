import { Container } from "@/components/ui/Container";

export default function CollectionsLoading() {
  return (
    <div className="bg-ground pt-16 md:pt-20">
      <Container>
        <div className="animate-pulse space-y-6">
          <div className="h-3 w-24 rounded bg-platinum/[0.06]" />
          <div className="h-10 w-80 rounded bg-platinum/[0.06]" />
          <div className="h-5 w-96 rounded bg-platinum/[0.04]" />
        </div>
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse border border-platinum/[0.06] bg-platinum/[0.03]"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
