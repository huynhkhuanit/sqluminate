import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test("loads, clears, and restores the PostgreSQL example", async ({ page }) => {
  const editor = page.getByRole("textbox", { name: "SQL editor" });

  await expect(editor).toBeVisible();
  await expect(page.getByLabel("Dialect")).toHaveValue("postgresql");
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(page.getByText("Start with a query")).toBeVisible();

  await page.getByRole("button", { name: "Load example" }).click();
  await expect(page.getByText("Private by default")).toBeVisible();
  await expect(page.locator(".view-lines")).toContainText("customers");
});

test("formats and restores a locally saved query", async ({ page }) => {
  const editorContent = page.locator(".view-lines");

  await editorContent.click({ position: { x: 120, y: 40 } });
  await page.keyboard.press("Control+A");
  await page.keyboard.insertText(
    "select id,name from students where active=true order by name;",
  );
  await page.getByRole("button", { name: "Format" }).click();

  await expect(page.getByText("Query formatted locally.")).toBeVisible();
  await expect(page.locator(".view-lines")).toContainText("SELECT");
  await expect(page.getByText("Saved locally")).toBeVisible();

  await page.reload();
  await expect(page.locator(".view-lines")).toContainText("students");
  await expect(page.locator(".view-lines")).toContainText("ORDER BY");
});

test("keeps core controls usable on a small screen", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();

  await expect(page.getByRole("heading", { name: "SQL editor" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Format" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Load example" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Clear" })).toBeVisible();

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(horizontalOverflow).toBe(false);
});
