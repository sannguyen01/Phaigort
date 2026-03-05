import type { Metadata } from "next";
import { Bodoni_Moda, EB_Garamond } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BRAND, SOCIAL } from "@/lib/constants";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s — ${BRAND.name}`,
  },
  description: BRAND.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    url: BRAND.url,
    siteName: BRAND.name,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — ${BRAND.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@phaigort",
    creator: "@phaigort",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${ebGaramond.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="48x48" type="image/png" />
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
      <body className={`${bodoniModa.variable} ${ebGaramond.variable} bg-platinum text-royal-navy antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-coral focus:text-platinum focus:font-body focus:text-sm focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
