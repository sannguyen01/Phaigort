import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, style }: any) => (
      <div className={className} style={style}>
        {children}
      </div>
    ),
    section: ({ children, className, style }: any) => (
      <section className={className} style={style}>
        {children}
      </section>
    ),
    svg: ({ children, ...p }: any) => <svg {...p}>{children}</svg>,
    span: ({ children, className }: any) => (
      <span className={className}>{children}</span>
    ),
    p: ({ children, className, style }: any) => (
      <p className={className} style={style}>
        {children}
      </p>
    ),
    h1: ({ children, className, style }: any) => (
      <h1 className={className} style={style}>
        {children}
      </h1>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => true,
  useInView: () => true,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
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

import { Hero } from "@/components/sections/Hero";

describe("Hero section", () => {
  it("contains a decorative SVG with aria-hidden", () => {
    render(<Hero />);
    const svgs = document.querySelectorAll('svg[aria-hidden="true"]');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("does NOT contain any img with src matching /necklace/i", () => {
    render(<Hero />);
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      expect(img.getAttribute("src") ?? "").not.toMatch(/necklace/i);
    });
  });

  it("does NOT contain any img with src matching /photo/i", () => {
    render(<Hero />);
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      expect(img.getAttribute("src") ?? "").not.toMatch(/photo/i);
    });
  });

  it("has a ghost CTA link pointing to /collections", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /enter the collection/i });
    expect(link).toHaveAttribute("href", "/collections");
  });

  it("main section uses var(--color-bg) as background (not a hardcoded warm hex)", () => {
    render(<Hero />);
    const section = screen.getByRole("region", { name: /hero/i });
    const bg = section.style.background;
    expect(bg).toContain("var(--color-bg)");
    // Must not be a warm hex like #C9A55A or similar amber/gold values
    expect(bg).not.toMatch(/#[Cc][89A-Fa-f][A-Fa-f0-9]{4}/);
  });

  it("contains the brand headline text about geological time", () => {
    render(<Hero />);
    // The H1 spans multiple lines — check for key phrase fragments
    expect(screen.getByText(/extraordinary/i)).toBeTruthy();
  });
});
