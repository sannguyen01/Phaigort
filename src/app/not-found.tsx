import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-platinum text-royal-navy gap-8 px-6">
      <p className="font-body text-sm uppercase tracking-widest text-royal-navy/50">404</p>
      <h1 className="font-heading text-4xl">This voyage has no destination.</h1>
      <Link href="/" className="text-sm underline underline-offset-4">Return to the Wonderhouse</Link>
    </main>
  );
}
