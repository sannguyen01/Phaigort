"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { H3, Body, Caption, Label } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { TREASURE_DOMAINS } from "@/lib/constants";

// ── Types ────────────────────────────────────────────────────────────────────

type DomainTitle = (typeof TREASURE_DOMAINS)[number]["title"];
type FilterValue = "all" | DomainTitle;

interface DomainDetail {
  paragraphs: readonly [string, string];
}

// ── Domain editorial copy (mirrors order in TREASURE_DOMAINS) ────────────────

const DOMAIN_DETAILS: Record<DomainTitle, DomainDetail> = {
  "Precious Metals": {
    paragraphs: [
      "Gold, in its native state, is a geological event frozen in time. Alluvial gold formed within ancient river systems; crystalline gold grew in hydrothermal veins over millions of years; wire gold developed in fracture zones of metamorphic rock through processes still not entirely understood. These specimens are not bullion. They are the visible record of Earth's electrochemical processes.",
      "Phaigort presents precious metal specimens — native gold, platinum group metals, silver dendrites, and electrum — as objects with geological identities. The weight is recorded, but the weight is not the point.",
    ],
  },
  "Geological Rarities": {
    paragraphs: [
      "The rarest coloured gemstones are not rare because they are old — they are rare because the geological conditions required for their formation were themselves rare events. A Kashmir sapphire requires not only the correct mineral chemistry (corundum with trace iron and titanium) but the specific pressure and temperature regime of the Kashmir orogenic belt, which produced gem-quality crystals during a narrow window approximately 65 million years ago. The deposits were substantially exhausted within decades of discovery. What remains in circulation today is what was found then.",
      "Phaigort selects coloured gemstones — sapphires, spinels, alexandrites, tourmalines, and related species — on the basis of geological narrative as much as visual quality. A stone that cannot be placed within a specific geological context is, to us, a stone that has lost half its meaning.",
    ],
  },
  "Historical Artifacts": {
    paragraphs: [
      "The history of jewellery is the history of trade, empire, and craft evolution. A Spanish colonial gold piece carries within it the metallurgy of Andean mines, the hands of indigenous goldsmiths, and the commercial logic of the Manila Galleon trade. Portuguese filigree represents one of the most demanding wire-working traditions in European craft — a technique refined over three centuries that cannot be industrially reproduced.",
      "All historical pieces in the Phaigort collection are accompanied by provenance documentation appropriate to their age, origin, and legal status. Objects of significant historical sensitivity are not acquired without thorough due diligence across recognised registries.",
    ],
  },
  "Contemporary Innovations": {
    paragraphs: [
      "Material science does not stand still. The past three decades have produced metamorphic composites, reactive surface treatments, and alloy structures that achieve properties previously considered mutually exclusive — materials that are simultaneously hard and ductile, thermally stable and visually dynamic, structurally precise and aesthetically indeterminate.",
      "Phaigort presents contemporary material innovations as a fourth domain of rarity — not as applied engineering, but as objects whose value derives from the irreproducibility of their material specification. Many require years of development and cannot be sourced once a production run concludes.",
    ],
  },
};

// ── Filter tab configuration ─────────────────────────────────────────────────

const FILTER_TABS: Array<{ label: string; value: FilterValue }> = [
  { label: "All", value: "all" },
  { label: "Geological Rarities", value: "Geological Rarities" },
  { label: "Precious Metals", value: "Precious Metals" },
  { label: "Historical Artifacts", value: "Historical Artifacts" },
  { label: "Contemporary Innovations", value: "Contemporary Innovations" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterTabBar({
  active,
  onSelect,
}: {
  active: FilterValue;
  onSelect: (v: FilterValue) => void;
}) {
  return (
    <div
      className="relative mb-16 flex gap-8 overflow-x-auto"
      style={{ borderBottom: "1px solid rgba(200,200,200,0.12)" }}
    >
      {FILTER_TABS.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onSelect(tab.value)}
            className="relative shrink-0 cursor-pointer pb-4 font-ui text-xs uppercase tracking-[0.14em] transition-opacity duration-200"
            style={{
              color: "var(--color-rule)" /* text-platinum #C8C8C8 */,
              opacity: isActive ? 1 : 0.5,
              background: "transparent",
              border: "none",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.opacity = "0.5";
            }}
          >
            {tab.label}

            {/* Sliding active indicator */}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: "1px",
                  background: "var(--color-rule)" /* #C8C8C8 */,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function DomainSection({
  domain,
  index,
  showBorder,
}: {
  domain: (typeof TREASURE_DOMAINS)[number];
  index: number;
  showBorder: boolean;
}) {
  const detail = DOMAIN_DETAILS[domain.title];

  return (
    <motion.section
      key={domain.title}
      id={domain.href.split("#")[1]}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        opacity: { duration: index === 0 ? 0.5 : 0.5, ease: "easeOut" },
        y: { duration: index === 0 ? 0.5 : 0.5, ease: "easeOut" },
      }}
      className={`scroll-mt-24 py-16 md:py-20 ${showBorder ? "border-t border-platinum/[0.06]" : ""}`}
    >
      <ScrollReveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          {/* Left: label + title */}
          <div>
            <Label className="text-platinum/35">Domain {String(index + 1).padStart(2, "0")}</Label>
            <H3 className="mt-4 text-platinum">{domain.title}</H3>
          </div>

          {/* Right: body text + image */}
          <div>
            <div className="space-y-4">
              {detail.paragraphs.map((para, j) => (
                <Body key={j} className="text-platinum/65">
                  {para}
                </Body>
              ))}
            </div>
            <ImageReveal delay={0.15} className="mt-8">
              <div className="arch-mask group relative aspect-[16/10] overflow-hidden border border-platinum/[0.07] bg-platinum/[0.03]">
                <Image
                  src={domain.image}
                  alt={domain.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </ScrollReveal>
    </motion.section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function CollectionFilter() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const visibleDomains =
    activeFilter === "all"
      ? TREASURE_DOMAINS
      : TREASURE_DOMAINS.filter((d) => d.title === activeFilter);

  return (
    <section className="pb-10 text-platinum md:pb-20" style={{ background: "var(--color-bg)" }}>
      <Container>
        <FilterTabBar active={activeFilter} onSelect={setActiveFilter} />

        <div className="space-y-0">
          <AnimatePresence mode="popLayout">
            {visibleDomains.map((domain, i) => (
              <DomainSection
                key={domain.title}
                domain={domain}
                index={i}
                showBorder={i > 0}
              />
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

export default CollectionFilter;
