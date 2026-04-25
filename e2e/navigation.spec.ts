import { test, expect } from "@playwright/test";

test.describe("Navigation — Desktop mega-menu", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header is fixed at top of page", async ({ page }) => {
    const header = page.locator("header").first();
    await expect(header).toBeVisible();
    const pos = await header.evaluate((el) => getComputedStyle(el).position);
    expect(pos).toBe("fixed");
  });

  test("logo links to homepage", async ({ page }) => {
    const logo = page.getByRole("link", { name: /Phaigort/i }).first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("mega-menu opens on The Collection hover", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /The Collection/i });
    await trigger.hover();
    const menu = page.getByRole("region", { name: "Collection categories" });
    await expect(menu).toBeVisible();
  });

  test("mega-menu lists all four domains", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /The Collection/i });
    await trigger.hover();
    await expect(page.getByText("Precious Metals").first()).toBeVisible();
    await expect(page.getByText("Geological Rarities").first()).toBeVisible();
    await expect(page.getByText("Historical Artifacts").first()).toBeVisible();
    await expect(page.getByText("Contemporary Innovations").first()).toBeVisible();
  });

  test("mega-menu has image panel on right", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /The Collection/i });
    await trigger.hover();
    const menu = page.getByRole("region", { name: "Collection categories" });
    const img = menu.locator("img").first();
    await expect(img).toBeVisible();
  });

  test("mega-menu uses bg-ground (no warm bg color)", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /The Collection/i });
    await trigger.hover();
    const menu = page.getByRole("region", { name: "Collection categories" });
    await expect(menu).toBeVisible();
    // Check that the panel background is not a warm tone
    const bgColor = await menu.evaluate((el) => getComputedStyle(el).backgroundColor);
    // Should be dark — not warm amber/tan (rgb values should be nearly equal R≈G≈B)
    const match = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      // Warm tone: R > B by more than 15 → violation
      expect(r - b).toBeLessThan(15);
    }
  });

  test("mega-menu closes after mouse leaves", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /The Collection/i });
    await trigger.hover();
    const menu = page.getByRole("region", { name: "Collection categories" });
    await expect(menu).toBeVisible();
    // Move mouse away
    await page.mouse.move(640, 400);
    await page.waitForTimeout(200);
    await expect(menu).not.toBeVisible();
  });

  test("mega-menu closes on Escape key", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /The Collection/i });
    await trigger.hover();
    await expect(page.getByRole("region", { name: "Collection categories" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("region", { name: "Collection categories" })).not.toBeVisible();
  });

  test("right nav links are visible on desktop", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Atelier/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Private Enquiry/i })).toBeVisible();
  });

  test("ghost buttons have no background fill", async ({ page }) => {
    const cta = page.getByRole("link", { name: /Enter the Collection/i });
    const bg = await cta.evaluate((el) => getComputedStyle(el).backgroundColor);
    // Should be transparent or rgba(0,0,0,0)
    expect(bg).toMatch(/rgba\(0,\s*0,\s*0,\s*0\)|transparent/);
  });
});

test.describe("Navigation — Mobile drawer", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hamburger button is visible on mobile", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: /Open navigation/i });
    await expect(hamburger).toBeVisible();
  });

  test("mobile drawer opens on hamburger tap", async ({ page }) => {
    await page.getByRole("button", { name: /Open navigation/i }).tap();
    const drawer = page.getByRole("dialog", { name: "Site navigation" });
    await expect(drawer).toBeVisible();
  });

  test("mobile drawer shows all nav links", async ({ page }) => {
    await page.getByRole("button", { name: /Open navigation/i }).tap();
    const drawer = page.getByRole("dialog", { name: "Site navigation" });
    await expect(drawer.getByRole("link", { name: /The Collection/i })).toBeVisible();
    await expect(drawer.getByRole("link", { name: /Our Story/i })).toBeVisible();
    await expect(drawer.getByRole("link", { name: /Atelier/i })).toBeVisible();
    await expect(drawer.getByRole("link", { name: /Private Enquiry/i })).toBeVisible();
  });

  test("mobile drawer closes on close button tap", async ({ page }) => {
    await page.getByRole("button", { name: /Open navigation/i }).tap();
    const drawer = page.getByRole("dialog", { name: "Site navigation" });
    await expect(drawer).toBeVisible();
    await page.getByRole("button", { name: /Close navigation/i }).last().tap();
    await expect(drawer).not.toBeVisible();
  });

  test("mobile drawer closes on Escape key", async ({ page }) => {
    await page.getByRole("button", { name: /Open navigation/i }).tap();
    await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Site navigation" })).not.toBeVisible();
  });

  test("mobile drawer closes when a nav link is tapped", async ({ page }) => {
    await page.getByRole("button", { name: /Open navigation/i }).tap();
    const drawer = page.getByRole("dialog", { name: "Site navigation" });
    await drawer.getByRole("link", { name: /Atelier/i }).tap();
    // After navigation, drawer should be gone
    await expect(drawer).not.toBeVisible();
  });
});
