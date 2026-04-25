import { test, expect } from "@playwright/test";

test.describe("Collections page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/collections");
  });

  test("page loads with 200 status", async ({ page }) => {
    const response = await page.request.get("/collections");
    expect(response.status()).toBe(200);
  });

  test("page title references Collection", async ({ page }) => {
    await expect(page).toHaveTitle(/Collection|Phaigort/i);
  });

  test("collections page has a heading", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });

  test("domain section anchors exist", async ({ page }) => {
    // Anchor sections from TREASURE_DOMAINS hrefs
    await page.goto("/collections#precious-metals");
    await expect(page.getByText(/Precious Metals/i).first()).toBeVisible();
  });
});
