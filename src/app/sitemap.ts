import type { MetadataRoute } from "next";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: BRAND.url, lastModified, changeFrequency: "weekly", priority: 1.0 },
    ...NAV_LINKS.map((link) => ({
      url: `${BRAND.url}${link.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
