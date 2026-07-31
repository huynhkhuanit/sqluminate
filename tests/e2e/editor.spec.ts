import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/workspace");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test("opens the workspace from the landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "See the query behind the query." }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Interactive SQL node field" }),
  ).toBeVisible();
  await page
    .getByRole("region", { name: "See the query behind the query." })
    .getByRole("link", { name: "Open workspace" })
    .click();

  await expect(page).toHaveURL(/\/workspace$/);
  await expect(page.getByRole("heading", { name: "SQL editor" })).toBeVisible();
});

test("keeps the Three.js scene static when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const scene = page.getByRole("img", {
    name: "Interactive SQL node field",
  });
  await expect(scene).toHaveAttribute("data-motion", "reduced");
  await expect(scene).toHaveAttribute("aria-busy", "false");

  const supportingScenes = page.locator("[data-three-scene]");
  await expect(supportingScenes).toHaveCount(4);

  for (let index = 0; index < 4; index += 1) {
    await expect(supportingScenes.nth(index)).toHaveAttribute(
      "data-motion",
      "reduced",
    );
  }
});

test("loads supporting 3D scenes only as they enter the viewport", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Features" }).first().click();

  for (const variant of ["relationships", "flow", "structure"]) {
    await expect(
      page.locator(`[data-three-scene="${variant}"]`),
    ).toHaveAttribute("aria-busy", "false");
  }

  const beacon = page.locator('[data-three-scene="beacon"]');
  await beacon.scrollIntoViewIfNeeded();
  await expect(beacon).toHaveAttribute("aria-busy", "false");
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
