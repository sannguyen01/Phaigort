export const NAV_LINKS = [
  { label: "The Collection", href: "/collections" },
  { label: "Our Story", href: "/our-story" },
  { label: "Atelier", href: "/atelier" },
  { label: "Contact", href: "/contact" },
] as const;

export const BRAND = {
  name: "Phaigort",
  tagline: "The House of Geological Rarity",
  description:
    "Phaigort curates rare gemstones, precious metals, and historical material culture — sourced directly from origin, documented with scientific rigour, and presented to those who recognise the difference between something beautiful and something true.",
  promise: "Some things take forty million years to become what they are. We find them.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://phaigort.com",
} as const;

export const SOCIAL = {
  instagram: "https://instagram.com/phaigort",
  linkedin: "https://linkedin.com/company/phaigort",
} as const;

export const TREASURE_DOMAINS = [
  {
    title: "Geological Rarities",
    description:
      "Coloured gemstones of exceptional origin — Kashmir sapphires of violet-blue saturation, Burmese spinels with chromium fluorescence, alexandrites whose absorption spectrum bridges daylight and incandescent light. Each stone is selected for the geological event it represents, not the market category it occupies.",
    href: "/collections#geological-rarities",
    image: "/collections/geological-rarities.jpg",
    imageAlt: "An unheated Kashmir sapphire, oval cut, displaying deep cornflower-blue saturation",
    hoverImage: "/collections/geological-rarities-detail.jpg",
    hoverImageAlt:
      "Macro detail of Kashmir sapphire showing silk inclusion pattern and natural colour zoning under darkfield illumination",
  },
  {
    title: "Precious Metals",
    description:
      "Native gold specimens from alluvial deposits, platinum in its elemental state, silver of dendritic formation — materials that are simultaneously geological documents and stores of enduring value. The finest specimens are indistinguishable from sculpture.",
    href: "/collections#precious-metals",
    image: "/collections/precious-metals.jpg",
    imageAlt: "Native gold specimen on matrix, alluvial formation",
    hoverImage: "/collections/precious-metals-detail.jpg",
    hoverImageAlt:
      "Close-up of crystalline gold formation showing dendritic branching structure on quartz matrix",
  },
  {
    title: "Historical Artifacts",
    description:
      "Objects carrying the accumulated intelligence of craft traditions across centuries — Portuguese filigree of the sixteenth century, Spanish colonial goldwork, Asian export pieces whose trade routes are inscribed in their materials. Provenance is documented, not asserted.",
    href: "/collections#historical-artifacts",
    image: "/collections/historical-artifacts.jpg",
    imageAlt: "Portuguese filigree pendant, sixteenth century, white gold wirework",
    hoverImage: "/collections/historical-artifacts-detail.jpg",
    hoverImageAlt:
      "Detail of sixteenth-century Portuguese filigree wirework showing twisted gold threads and granulation technique",
  },
  {
    title: "Contemporary Innovations",
    description:
      "Materials at the boundary of what science currently permits — metamorphic composites, aerospace-grade alloys applied beyond their industrial context, proprietary surface treatments that require years to develop and cannot be replicated at scale. The category is defined by irreproducibility.",
    href: "/collections#contemporary-innovations",
    image: "/collections/contemporary-innovations.jpg",
    imageAlt: "Experimental composite panel with iridescent surface treatment",
    hoverImage: "/collections/contemporary-innovations-detail.jpg",
    hoverImageAlt:
      "Macro surface detail of iridescent composite material showing structural colour interference patterns",
  },
] as const;
