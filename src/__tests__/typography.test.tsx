import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Display, H1, H2, Body, Caption } from "@/components/ui/Typography";

describe("Typography", () => {
  it("Display uses font-heading", () => {
    render(<Display>Test Heading</Display>);
    const el = screen.getByText("Test Heading");
    expect(el.className).toContain("font-heading");
  });

  it("Body includes max-w-prose for line length control", () => {
    render(<Body>Body text content</Body>);
    const el = screen.getByText("Body text content");
    expect(el.className).toContain("max-w-prose");
    expect(el.className).toContain("font-body");
  });

  it("H1 uses font-heading with tracking-tight", () => {
    render(<H1>Heading One</H1>);
    const el = screen.getByText("Heading One");
    expect(el.className).toContain("font-heading");
    expect(el.className).toContain("tracking-tight");
  });

  it("H2 uses font-heading", () => {
    render(<H2>Heading Two</H2>);
    const el = screen.getByText("Heading Two");
    expect(el.className).toContain("font-heading");
  });

  it("Caption uses uppercase tracking", () => {
    render(<Caption>Label Text</Caption>);
    const el = screen.getByText("Label Text");
    expect(el.className).toContain("uppercase");
    expect(el.className).toContain("tracking-");
  });

  it("allows className override", () => {
    render(<Body className="text-platinum">Custom</Body>);
    const el = screen.getByText("Custom");
    expect(el.className).toContain("text-platinum");
  });
});
