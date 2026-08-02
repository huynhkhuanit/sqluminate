import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/workspace");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test("opens the workspace from the landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Visualize SQL. Understand every query.",
    }),
  ).toBeVisible();
  await expect(page.getByText("customer-orders.sql")).toBeVisible();
  await page.getByRole("link", { name: "Open editor" }).click();

  await expect(page).toHaveURL(/\/workspace$/);
  await expect(page.getByRole("heading", { name: "SQL editor" })).toBeVisible();
});

test("formats the guided PostgreSQL example on the landing page", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Formatted" })).toBeDisabled();
  await page.getByRole("button", { name: "Format example" }).click();

  await expect(
    page.getByText("Formatted locally.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Formatted" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("switches the site language across landing and workspace", async ({
  page,
}) => {
  await page.goto("/");

  const language = page.getByRole("banner").getByLabel("Language").first();
  await expect(language).toHaveValue("en");
  await expect(language.locator("option")).toContainText([
    "🇬🇧 English",
    "🇻🇳 Tiếng Việt",
    "🇨🇳 中文",
  ]);

  await language.selectOption("vi");
  await expect(
    page.getByRole("heading", {
      name: "Trực quan hóa SQL. Hiểu mọi truy vấn.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Mở trình soạn thảo" }),
  ).toBeVisible();

  await page.goto("/workspace");
  await expect(
    page.getByRole("heading", { name: "Trình soạn thảo SQL" }),
  ).toBeVisible();
  await expect(page.getByLabel("Ngôn ngữ")).toHaveValue("vi");
});

test("switches the landing code block across SQL dialects with highlighting", async ({
  page,
}) => {
  await page.goto("/");

  const dialect = page.getByLabel("Dialect");
  await dialect.selectOption("mysql");

  const codeBlock = page.locator('[data-sql-dialect="mysql"]');
  await expect(codeBlock).toBeVisible();
  await expect(codeBlock).toContainText("select");
  await expect(codeBlock.locator('[class*="tokenKeyword"]')).not.toHaveCount(0);
  await expect(dialect).toHaveValue("mysql");

  await page.getByRole("button", { name: "Format example" }).click();
  await expect(
    page.getByText("Formatted locally.", { exact: true }),
  ).toBeVisible();
});

test("supports the mobile menu and avoids horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);

  const menu = page.locator("summary", { hasText: "Menu" });
  await menu.click();
  await expect(page.locator("details")).toHaveAttribute("open", "");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await menu.click();
  await expect(page.locator("details")).not.toHaveAttribute("open");
});

test("links to the public project documents", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: "Read contributing guide" }),
  ).toHaveAttribute("href", /CONTRIBUTING\.md$/);
  await expect(
    page.getByRole("link", { name: "MIT License" }).last(),
  ).toHaveAttribute("href", /LICENSE$/);
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
