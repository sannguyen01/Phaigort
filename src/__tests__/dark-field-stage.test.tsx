import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DarkFieldStage } from "@/components/ui/DarkFieldStage";

describe("DarkFieldStage", () => {
  it("renders full intensity with bg-t02 (Abyssal Carbon)", () => {
    const { container } = render(<DarkFieldStage>Content</DarkFieldStage>);
    const section = container.querySelector("section");
    expect(section).toBeTruthy();
    expect(section!.className).toContain("bg-t02");
  });

  it("renders deep intensity with bg-ground (Void Obsidian)", () => {
    const { container } = render(<DarkFieldStage intensity="deep">Deep</DarkFieldStage>);
    const section = container.querySelector("section");
    expect(section!.className).toContain("bg-ground");
  });

  it("renders medium intensity with bg-stone (Void Ink)", () => {
    const { container } = render(<DarkFieldStage intensity="medium">Medium</DarkFieldStage>);
    const section = container.querySelector("section");
    expect(section!.className).toContain("bg-stone");
  });

  it("renders as a section element", () => {
    const { container } = render(<DarkFieldStage>Stage</DarkFieldStage>);
    expect(container.querySelector("section")).toBeTruthy();
  });

  it("merges className prop", () => {
    const { container } = render(<DarkFieldStage className="py-32">Stage</DarkFieldStage>);
    expect(container.querySelector("section")!.className).toContain("py-32");
  });
});
