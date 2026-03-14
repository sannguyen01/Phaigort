import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: { children?: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
    nav: ({ children, className }: { children?: React.ReactNode; className?: string }) => <nav className={className}>{children}</nav>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

afterEach(cleanup);

describe("Header", () => {
  it("renders brand name", () => {
    render(<Header />);
    expect(screen.getAllByText("Phaigort").length).toBeGreaterThanOrEqual(1);
  });

  it("renders main navigation with links", () => {
    render(<Header />);
    expect(screen.getAllByText("Our Collection").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Our Story").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Atelier").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });

  it("has mobile menu toggle with aria-expanded", () => {
    render(<Header />);
    const toggles = screen.getAllByRole("button", { name: /toggle navigation/i });
    const toggle = toggles[0];
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("uses royal-navy background", () => {
    render(<Header />);
    const headers = screen.getAllByRole("banner");
    const header = headers[0];
    expect(header.className).toContain("bg-royal-navy");
  });
});
