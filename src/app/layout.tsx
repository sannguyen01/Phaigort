import type { Metadata } from "next";
import { Jost, Cormorant, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { DiamondCursor } from "@/components/ui/DiamondCursor";
import { BRAND, SOCIAL } from "@/lib/constants";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: "Phaigort — Rare Gemstones & Precious Materials",
    template: "%s | Phaigort",
  },
  description: BRAND.description,
  keywords: [
    "rare gemstones",
    "coloured gemstones",
    "Kashmir sapphire",
    "Burmese spinel",
    "precious metals",
    "gemstone collection",
    "investment gemstones",
    "natural unheated sapphire",
    "gemstone provenance",
    "fine jewellery",
    "historical artifacts",
    "Phaigort",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Phaigort — Rare Gemstones & Precious Materials",
    description: BRAND.description,
    url: BRAND.url,
    siteName: BRAND.name,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Phaigort — Rare Gemstones & Precious Materials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@phaigort",
    creator: "@phaigort",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* favicon: resolved by src/app/icon.svg — Next.js App Router auto-generates <link rel="icon"> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: BRAND.name,
              url: BRAND.url,
              description: BRAND.description,
              sameAs: [SOCIAL.instagram, SOCIAL.linkedin],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-platinum font-body text-royal-navy antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-royal-navy focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-platinum"
        >
          Skip to content
        </a>
        <DiamondCursor />
        <Header />
        <ScrollProgress />
        <main id="main-content" className="pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
