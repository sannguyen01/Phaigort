import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";

describe("DarkFieldStage", () => {
  it("renders with full intensity by default", () => {
    const { container } = render(<DarkFieldStage>Content</DarkFieldStage>);
    const section = container.querySelector("section");
    expect(section).toBeTruthy();
    expect(section!.className).toContain("bg-royal-navy");
    expect(section!.className).toContain("text-platinum");
  });

  it("renders deep intensity variant", () => {
    const { container } = render(<DarkFieldStage intensity="deep">Deep</DarkFieldStage>);
    const section = container.querySelector("section");
    expect(section!.className).toContain("bg-deep-navy");
  });

  it("renders medium intensity variant", () => {
    const { container } = render(<DarkFieldStage intensity="medium">Medium</DarkFieldStage>);
    const section = container.querySelector("section");
    expect(section!.className).toContain("bg-royal-navy/90");
  });

  it("renders as section", () => {
    const { container } = render(<DarkFieldStage>Stage</DarkFieldStage>);
    expect(container.querySelector("section")).toBeTruthy();
  });
});
