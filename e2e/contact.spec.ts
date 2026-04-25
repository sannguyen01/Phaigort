import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("page loads with 200 status", async ({ page }) => {
    const response = await page.request.get("/contact");
    expect(response.status()).toBe(200);
  });

  test("page title references Enquiry or Contact", async ({ page }) => {
    await expect(page).toHaveTitle(/Enquiry|Contact|Phaigort/i);
  });

  test("contact form is present", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
  });

  test("form has Name, Email, and Message fields", async ({ page }) => {
    await expect(page.getByLabel(/Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Message/i)).toBeVisible();
  });

  test("form submit button is present and ghost-styled", async ({ page }) => {
    const submit = page.getByRole("button", { name: /Send|Submit|Enquire/i });
    await expect(submit).toBeVisible();
    const bg = await submit.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toMatch(/rgba\(0,\s*0,\s*0,\s*0\)|transparent/);
  });

  test("form shows error on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /Send|Submit|Enquire/i }).click();
    // HTML5 validation or inline error should appear
    const invalid = await page.evaluate(() => {
      const inputs = document.querySelectorAll("input[required], textarea[required]");
      return Array.from(inputs).some((el) => !(el as HTMLInputElement).validity.valid);
    });
    expect(invalid).toBe(true);
  });
});
