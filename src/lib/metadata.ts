import type { Metadata } from "next";
import { BRAND } from "./constants";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
}

export function createMetadata({
  title,
  description,
  path = "",
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} — ${BRAND.name}`
    : `${BRAND.name} — ${BRAND.tagline}`;
  const pageDescription = description ?? BRAND.description;
  const url = `${BRAND.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: BRAND.name,
      type: "website",
      images: [
        {
          url: `${BRAND.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${BRAND.name} — ${BRAND.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}
