import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);

// Mock constants with correct shape: title/href/image/imageAlt/description
vi.mock("@/lib/constants", () => ({
  TREASURE_DOMAINS: [
    {
      title: "Geological Rarities",
      href: "/collections#geological-rarities",
      description: "Test desc — secondary text",
      image: "/test-geo.jpg",
      imageAlt: "Geological rarities test image",
      hoverImage: "/test-geo-hover.jpg",
      hoverImageAlt: "Geological rarities hover",
    },
    {
      title: "Historical Artifacts",
      href: "/collections#historical-artifacts",
      description: "Test desc — secondary text",
      image: "/test-hist.jpg",
      imageAlt: "Historical artifacts test image",
      hoverImage: "/test-hist-hover.jpg",
      hoverImageAlt: "Historical artifacts hover",
    },
    {
      title: "Precious Metals",
      href: "/collections#precious-metals",
      description: "Test desc — secondary text",
      image: "/test-metals.jpg",
      imageAlt: "Precious metals test image",
      hoverImage: "/test-metals-hover.jpg",
      hoverImageAlt: "Precious metals hover",
    },
    {
      title: "Contemporary Innovations",
      href: "/collections#contemporary-innovations",
      description: "Test desc — secondary text",
      image: "/test-contemp.jpg",
      imageAlt: "Contemporary innovations test image",
      hoverImage: "/test-contemp-hover.jpg",
      hoverImageAlt: "Contemporary innovations hover",
    },
  ],
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, style }: any) => (
      <div className={className} style={style}>
        {children}
      </div>
    ),
    article: ({ children, className, style, ...rest }: any) => (
      <article className={className} style={style}>
        {children}
      </article>
    ),
    section: ({ children, className, style }: any) => (
      <section className={className} style={style}>
        {children}
      </section>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => true,
  useInView: () => true,
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...p }: any) => (
    <a href={href} {...p}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...p }: any) => <img src={src} alt={alt} {...p} />,
}));

import { DomainsGrid } from "@/components/sections/DomainsGrid";

describe("DomainsGrid section", () => {
  it("renders all 4 domain titles", () => {
    render(<DomainsGrid />);
    expect(screen.getByText("Geological Rarities")).toBeTruthy();
    expect(screen.getByText("Historical Artifacts")).toBeTruthy();
    expect(screen.getByText("Precious Metals")).toBeTruthy();
    expect(screen.getByText("Contemporary Innovations")).toBeTruthy();
  });

  it("section background uses var(--color-bg)", () => {
    render(<DomainsGrid />);
    // The outermost section carries the background token
    const section = document.querySelector("section");
    expect(section).toBeTruthy();
    expect(section!.style.background).toContain("var(--color-bg)");
  });

  it("at least one card has a dark background style (not a light/warm color)", () => {
    render(<DomainsGrid />);
    // DOMAIN_TONES maps to dark hex values (#141414, #2E2E2E, #1C1C1C, #3D3D3D)
    // jsdom normalises hex to rgb(), e.g. #141414 → rgb(20, 20, 20)
    // All four tones are dark (low RGB values ≤ 61). None are light/warm.
    const articles = document.querySelectorAll("article");
    expect(articles.length).toBeGreaterThan(0);
    const hasDarkCard = Array.from(articles).some((article) => {
      const bg = article.style.background || article.style.backgroundColor;
      if (!bg) return false;
      // rgb(r, g, b) — all dark tones have r,g,b ≤ 61
      const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [, r, g, b] = match.map(Number);
        return r <= 61 && g <= 61 && b <= 61;
      }
      return false;
    });
    expect(hasDarkCard).toBe(true);
  });

  it("has a section heading (h2) for the domains section", () => {
    render(<DomainsGrid />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain("Four Domains of Rarity");
  });

  it("each domain card has an arch-mask container", () => {
    render(<DomainsGrid />);
    const archMasks = document.querySelectorAll(".arch-mask");
    // One arch-mask per domain card
    expect(archMasks.length).toBe(4);
  });
});
