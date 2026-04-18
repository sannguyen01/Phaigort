import { Container } from "@/components/ui/Container";

export default function ArchiveLoading() {
  return (
    <div className="bg-ground pt-16 md:pt-20">
      <Container>
        <div className="animate-pulse space-y-6">
          <div className="h-3 w-32 rounded bg-platinum/[0.06]" />
          <div className="h-10 w-64 rounded bg-platinum/[0.06]" />
          <div className="h-5 w-80 rounded bg-platinum/[0.04]" />
        </div>
        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-52 animate-pulse border border-platinum/[0.06] bg-platinum/[0.03]"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
