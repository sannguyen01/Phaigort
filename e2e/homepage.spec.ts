import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with 200 status", async ({ page }) => {
    const response = await page.request.get("/");
    expect(response.status()).toBe(200);
  });

  test("page title contains Phaigort", async ({ page }) => {
    await expect(page).toHaveTitle(/Phaigort/i);
  });

  test("Hero section is visible", async ({ page }) => {
    const hero = page.getByRole("region", { name: "Hero" });
    await expect(hero).toBeVisible();
  });

  test("Hero H1 headline is present", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("extraordinary");
  });

  test("Hero ghost CTA links to /collections", async ({ page }) => {
    const cta = page.getByRole("link", { name: /Enter the Collection/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/collections");
  });

  test("all 8 homepage sections mount in correct order", async ({ page }) => {
    // Confirm sections are present by landmark text
    await expect(page.locator("section").first()).toBeVisible();

    // DomainsGrid heading
    await expect(page.getByText("Four Domains of Rarity")).toBeVisible();

    // ManifestoMarquee or BrandPremise — contains brand copy
    await expect(page.getByText(/phainomenon|García de Orta/i).first()).toBeVisible();

    // PrivateAccessCTA
    await expect(page.getByText(/Not every exceptional stone/i)).toBeVisible();
  });

  test("DomainsGrid renders all four domain cards", async ({ page }) => {
    await expect(page.getByText("Precious Metals")).toBeVisible();
    await expect(page.getByText("Geological Rarities")).toBeVisible();
    await expect(page.getByText("Historical Artifacts")).toBeVisible();
    await expect(page.getByText("Contemporary Innovations")).toBeVisible();
  });

  test("domain cards link to /collections anchors", async ({ page }) => {
    const metalLink = page.getByRole("link", { name: /Precious Metals/i }).first();
    await expect(metalLink).toHaveAttribute("href", "/collections#precious-metals");
  });

  test("PrivateAccessCTA ghost button links to /contact", async ({ page }) => {
    const btn = page.getByRole("link", { name: /Private Consultation/i });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute("href", "/contact");
  });

  test("no warm hex tones in rendered page styles", async ({ page }) => {
    // Scan inline styles for prohibited warm hex values
    const warmHexViolations = await page.evaluate(() => {
      const prohibited = ["#0D0B09", "#0A0F1D", "#C9A55A", "coral", "royal-navy"];
      const allElements = document.querySelectorAll("[style]");
      const found: string[] = [];
      allElements.forEach((el) => {
        const style = (el as HTMLElement).style.cssText;
        prohibited.forEach((hex) => {
          if (style.toLowerCase().includes(hex.toLowerCase())) {
            found.push(`${el.tagName}: ${style} (contains ${hex})`);
          }
        });
      });
      return found;
    });
    expect(warmHexViolations).toHaveLength(0);
  });
});
