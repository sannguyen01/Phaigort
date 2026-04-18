"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-8 px-6"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <h2 className="font-display text-3xl" style={{ color: "var(--color-text)" }}>
        Something interrupted the voyage.
      </h2>
      <button
        onClick={reset}
        className="font-ui text-sm uppercase tracking-widest underline underline-offset-4 transition-colors"
        style={{ color: "var(--color-text-muted)" }}
      >
        Try again
      </button>
    </main>
  );
}
