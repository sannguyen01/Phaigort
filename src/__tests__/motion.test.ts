import { describe, it, expect } from "vitest";
import { fadeUp, stagger, fade, ease } from "@/lib/motion";

describe("motion helpers", () => {
  it("fadeUp has hidden and visible states", () => {
    expect(fadeUp.hidden).toEqual({ opacity: 0, y: 24 });
    expect(fadeUp.visible).toBeDefined();
  });

  it("fade has no Y movement", () => {
    expect(fade.hidden).toEqual({ opacity: 0 });
    expect(fade.visible).toBeDefined();
  });

  it("stagger returns variants with staggerChildren", () => {
    const variants = stagger(0.15);
    expect(variants.visible).toBeDefined();
    const visible = variants.visible as { transition: { staggerChildren: number } };
    expect(visible.transition.staggerChildren).toBe(0.15);
  });

  it("ease curve is correct cubic-bezier", () => {
    expect(ease).toEqual([0.22, 1, 0.36, 1]);
  });
});
