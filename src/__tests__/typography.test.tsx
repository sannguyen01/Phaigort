import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Display, H1, H2, Body, Caption } from "@/components/ui/Typography";

describe("Typography", () => {
  it("Display uses font-display", () => {
    render(<Display>Test Heading</Display>);
    const el = screen.getByText("Test Heading");
    expect(el.className).toContain("font-display");
  });

  it("Body includes max-w-prose and font-ui", () => {
    render(<Body>Body text content</Body>);
    const el = screen.getByText("Body text content");
    expect(el.className).toContain("max-w-prose");
    expect(el.className).toContain("font-ui");
  });

  it("H1 uses font-display", () => {
    render(<H1>Heading One</H1>);
    const el = screen.getByText("Heading One");
    expect(el.className).toContain("font-display");
  });

  it("H2 uses font-display", () => {
    render(<H2>Heading Two</H2>);
    const el = screen.getByText("Heading Two");
    expect(el.className).toContain("font-display");
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
