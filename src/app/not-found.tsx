import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0A0F1D] px-6 text-platinum">
      <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-platinum/35">404</p>
      <h1 className="font-display text-4xl text-platinum">This voyage has no destination.</h1>
      <Link href="/" className="font-ui text-sm uppercase tracking-widest text-platinum/50 underline underline-offset-4 transition-colors hover:text-platinum">
        Return to the Wonderhouse
      </Link>
    </main>
  );
}
