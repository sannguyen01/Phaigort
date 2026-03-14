import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";

describe("DarkFieldStage", () => {
  it("renders with full intensity by default", () => {
    render(<DarkFieldStage>Content</DarkFieldStage>);
    const el = screen.getByText("Content");
    expect(el.className).toContain("bg-royal-navy");
    expect(el.className).toContain("text-platinum");
  });

  it("renders deep intensity variant", () => {
    render(<DarkFieldStage intensity="deep">Deep</DarkFieldStage>);
    const el = screen.getByText("Deep");
    expect(el.className).toContain("bg-deep-navy");
  });

  it("renders medium intensity variant", () => {
    render(<DarkFieldStage intensity="medium">Medium</DarkFieldStage>);
    const el = screen.getByText("Medium");
    expect(el.className).toContain("bg-royal-navy/90");
  });

  it("renders as section", () => {
    const { container } = render(<DarkFieldStage>Stage</DarkFieldStage>);
    expect(container.querySelector("section")).toBeTruthy();
  });
});
