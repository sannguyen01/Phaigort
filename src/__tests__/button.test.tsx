import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);

vi.mock("next/link", () => ({
  default: ({ children, href, ...p }: any) => (
    <a href={href} {...p}>
      {children}
    </a>
  ),
}));

// Import after mocks are registered
import { Button } from "@/components/ui/Button";

describe("Button component", () => {
  it("renders as an anchor when href is provided", () => {
    render(<Button href="/collections">Shop</Button>);
    const el = screen.getByRole("link", { name: "Shop" });
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/collections");
  });

  it("renders as a button element when no href is provided", () => {
    render(<Button>Click me</Button>);
    const el = screen.getByRole("button", { name: "Click me" });
    expect(el.tagName).toBe("BUTTON");
  });

  it("has font-ui class (not font-body or font-brand)", () => {
    render(<Button>Label</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("font-ui");
    expect(el.className).not.toContain("font-body");
    expect(el.className).not.toContain("font-brand");
  });

  it("has bg-transparent class (no fill)", () => {
    render(<Button>Label</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("bg-transparent");
  });

  it("has ghost border class", () => {
    render(<Button>Label</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("border-[rgba(250,250,250,0.25)]");
  });

  it("has uppercase and tracking-[0.18em] classes", () => {
    render(<Button>Label</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("uppercase");
    expect(el.className).toContain("tracking-[0.18em]");
  });

  it("defaults to md size (has px-10)", () => {
    render(<Button>Label</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("px-10");
  });

  it("renders sm size correctly (has px-7, not px-10)", () => {
    render(<Button size="sm">Small</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("px-7");
    expect(el.className).not.toContain("px-10");
  });

  it("applies disabled:opacity-40 class when disabled prop is passed", () => {
    render(<Button disabled>Disabled</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("disabled:opacity-40");
    expect(el).toBeDisabled();
  });
});
