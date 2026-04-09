import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion — include all hooks used by Header
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    span: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    a: ({
      children,
      className,
      href,
    }: {
      children?: React.ReactNode;
      className?: string;
      href?: string;
    }) => (
      <a href={href} className={className}>
        {children}
      </a>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
}));

afterEach(cleanup);

describe("Header", () => {
  it("renders logo link", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /phaigort/i })).toBeTruthy();
  });

  it("renders main navigation links", () => {
    render(<Header />);
    expect(screen.getAllByText("The Collection").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Our Story").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Atelier").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Private Enquiry").length).toBeGreaterThanOrEqual(1);
  });

  it("has mobile menu toggle with aria-expanded", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: /open navigation/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("renders a header landmark", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeTruthy();
  });
});
