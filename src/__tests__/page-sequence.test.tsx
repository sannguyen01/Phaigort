import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Homepage section sequence", () => {
  const pageContent = fs.readFileSync(
    path.join(process.cwd(), "src/app/page.tsx"),
    "utf-8"
  );

  // ── Import presence ────────────────────────────────────────────────────────
  it('imports Hero', () => {
    expect(pageContent).toContain('from "@/components/sections/Hero"');
  });

  it('imports Philosophy', () => {
    expect(pageContent).toContain('from "@/components/sections/Philosophy"');
  });

  it('imports MaterialStory', () => {
    expect(pageContent).toContain('from "@/components/sections/MaterialStory"');
  });

  it('imports Statement', () => {
    expect(pageContent).toContain('from "@/components/sections/Statement"');
  });

  it('imports ManifestoMarquee', () => {
    expect(pageContent).toContain('from "@/components/sections/ManifestoMarquee"');
  });

  it('imports BrandPremise', () => {
    expect(pageContent).toContain('from "@/components/sections/BrandPremise"');
  });

  it('imports DomainsGrid', () => {
    expect(pageContent).toContain('from "@/components/sections/DomainsGrid"');
  });

  it('imports PrivateAccessCTA', () => {
    expect(pageContent).toContain('from "@/components/sections/PrivateAccessCTA"');
  });

  // ── JSX render order ───────────────────────────────────────────────────────
  it("Hero appears before Philosophy in JSX", () => {
    const heroPos = pageContent.indexOf("<Hero");
    const philPos = pageContent.indexOf("<Philosophy");
    expect(heroPos).toBeGreaterThan(-1);
    expect(philPos).toBeGreaterThan(-1);
    expect(heroPos).toBeLessThan(philPos);
  });

  it("Philosophy appears before MaterialStory in JSX", () => {
    const philPos = pageContent.indexOf("<Philosophy");
    const msPos = pageContent.indexOf("<MaterialStory");
    expect(philPos).toBeGreaterThan(-1);
    expect(msPos).toBeGreaterThan(-1);
    expect(philPos).toBeLessThan(msPos);
  });

  it("MaterialStory appears before Statement in JSX", () => {
    const msPos = pageContent.indexOf("<MaterialStory");
    const stPos = pageContent.indexOf("<Statement");
    expect(msPos).toBeGreaterThan(-1);
    expect(stPos).toBeGreaterThan(-1);
    expect(msPos).toBeLessThan(stPos);
  });

  it("Statement appears before ManifestoMarquee in JSX", () => {
    const stPos = pageContent.indexOf("<Statement");
    const mmPos = pageContent.indexOf("<ManifestoMarquee");
    expect(stPos).toBeGreaterThan(-1);
    expect(mmPos).toBeGreaterThan(-1);
    expect(stPos).toBeLessThan(mmPos);
  });

  it("ManifestoMarquee appears before BrandPremise in JSX", () => {
    const mmPos = pageContent.indexOf("<ManifestoMarquee");
    const bpPos = pageContent.indexOf("<BrandPremise");
    expect(mmPos).toBeGreaterThan(-1);
    expect(bpPos).toBeGreaterThan(-1);
    expect(mmPos).toBeLessThan(bpPos);
  });

  it("BrandPremise appears before DomainsGrid in JSX", () => {
    const bpPos = pageContent.indexOf("<BrandPremise");
    const dgPos = pageContent.indexOf("<DomainsGrid");
    expect(bpPos).toBeGreaterThan(-1);
    expect(dgPos).toBeGreaterThan(-1);
    expect(bpPos).toBeLessThan(dgPos);
  });

  it("DomainsGrid appears before PrivateAccessCTA in JSX", () => {
    const dgPos = pageContent.indexOf("<DomainsGrid");
    const ctaPos = pageContent.indexOf("<PrivateAccessCTA");
    expect(dgPos).toBeGreaterThan(-1);
    expect(ctaPos).toBeGreaterThan(-1);
    expect(dgPos).toBeLessThan(ctaPos);
  });
});
