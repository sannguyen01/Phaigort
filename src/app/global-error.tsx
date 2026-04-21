"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-ground text-platinum antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
          <h2 className="font-display text-3xl">Something interrupted the voyage.</h2>
          <button
            onClick={reset}
            className="font-ui text-sm uppercase tracking-widest underline underline-offset-4 transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
