import type { Metadata } from "next";
import { BRAND } from "./constants";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

export function createMetadata({
  title,
  description,
  path = "",
  ogImage = "/og-image.jpg",
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} — ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
  const pageDescription = description ?? BRAND.description;
  const url = `${BRAND.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: BRAND.name,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@phaigort",
      creator: "@phaigort",
      title: pageTitle,
      description: pageDescription,
    },
  };
}
