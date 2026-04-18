"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-platinum text-stone antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
          <h2 className="font-heading text-3xl">Something interrupted the voyage.</h2>
          <button onClick={reset} className="text-sm underline underline-offset-4">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
