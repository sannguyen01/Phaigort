"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-platinum text-royal-navy gap-8 px-6">
      <h2 className="font-heading text-3xl">Something interrupted the voyage.</h2>
      <button onClick={reset} className="text-sm underline underline-offset-4">Try again</button>
    </main>
  );
}
