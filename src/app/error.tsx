"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0A0F1D] px-6 text-platinum">
      <h2 className="font-display text-3xl text-platinum">Something interrupted the voyage.</h2>
      <button onClick={reset} className="font-ui text-sm uppercase tracking-widest text-platinum/50 underline underline-offset-4 transition-colors hover:text-platinum">
        Try again
      </button>
    </main>
  );
}
