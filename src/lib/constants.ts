export const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Material Consciousness", href: "/material-consciousness" },
  { label: "Archive", href: "/archive" },
  { label: "Atelier", href: "/atelier" },
  { label: "Contact", href: "/contact" },
] as const;

export const BRAND = {
  name: "Phaigort",
  tagline: "Wonderhouse of Material Consciousness",
  description:
    "Where Earth's geological creativity, humanity's craft traditions, precious metals, and contemporary innovations converge into vessels of personal meaning.",
  promise:
    "Phaigort connects you with materials that matter.",
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
      "Gemstones curated for compelling formation stories — sapphires revealing how iron and titanium created blue over millions of years, spinels demonstrating cobalt concentrations in ancient marble.",
    href: "/collections#geological-rarities",
    image: "/collections/geological-rarities.jpg",
    imageAlt: "A brilliant blue sapphire resting on natural rock formation",
  },
  {
    title: "Precious Metals",
    description:
      "Gold, platinum, silver, and palladium — both wealth preservation and geological wonder. Native metal specimens showcasing Earth's chemistry creating elemental purity.",
    href: "/collections#precious-metals",
    image: "/collections/precious-metals.jpg",
    imageAlt: "Collection of deep blue sapphires arranged in a display tray",
  },
  {
    title: "Historical Artifacts",
    description:
      "Cultural pieces with documented stories — Spanish colonial jewelry, Portuguese filigree representing five centuries of craft transmission, Asian trade objects connecting civilizations.",
    href: "/collections#historical-artifacts",
    image: "/collections/historical-artifacts.jpg",
    imageAlt: "A cabochon-cut emerald displaying rich green translucency",
  },
  {
    title: "Contemporary Innovations",
    description:
      "Advanced materials demonstrating genuine technical achievement — aerospace alloys, proprietary finishes, experimental composites requiring years to develop.",
    href: "/collections#contemporary-innovations",
    image: "/collections/contemporary-innovations.jpg",
    imageAlt: "Assorted tourmaline gemstones in green and pink hues",
  },
] as const;
