import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-8 px-6"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <p
        className="font-ui text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--color-text-muted)" }}
      >
        404
      </p>
      <h1 className="font-display text-4xl" style={{ color: "var(--color-text)" }}>
        This voyage has no destination.
      </h1>
      <Link
        href="/"
        className="font-ui text-sm uppercase tracking-widest underline underline-offset-4 transition-colors"
        style={{ color: "var(--color-text-muted)" }}
      >
        Return to the Wonderhouse
      </Link>
    </main>
  );
}
