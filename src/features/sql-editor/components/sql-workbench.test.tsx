import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ChangeEvent } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SqlWorkbench } from "@/features/sql-editor/components/sql-workbench";
import { POSTGRESQL_EXAMPLE } from "@/features/sql-editor/model/example-query";
import { QUERY_STORAGE_KEY } from "@/lib/storage/query-storage";

vi.mock("@/features/sql-editor/components/sql-editor-panel", () => ({
  SqlEditorPanel: ({
    query,
    onChange,
  }: {
    query: string;
    onChange: (query: string) => void;
  }) => (
    <textarea
      aria-label="SQL editor"
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        onChange(event.target.value)
      }
      value={query}
    />
  ),
}));

describe("SqlWorkbench", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("loads the tested PostgreSQL example and exposes the current limitation", async () => {
    const user = userEvent.setup();
    render(<SqlWorkbench />);

    const editor = await screen.findByRole("textbox", { name: "SQL editor" });
    expect(editor).toHaveValue(POSTGRESQL_EXAMPLE.sql);
    expect(screen.getByLabelText("Dialect")).toHaveValue("postgresql");
    expect(
      screen.getByText("SQL is not parsed, visualized, or sent to a database"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(editor).toHaveValue("");
    expect(screen.getByText("Start with a query")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Load example" }));
    expect(editor).toHaveValue(POSTGRESQL_EXAMPLE.sql);
  });

  it("restores a locally saved query", async () => {
    window.localStorage.setItem(QUERY_STORAGE_KEY, "select id from students;");
    render(<SqlWorkbench />);

    expect(
      await screen.findByRole("textbox", { name: "SQL editor" }),
    ).toHaveValue("select id from students;");
  });

  it("formats SQL through the button and keyboard shortcut", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      QUERY_STORAGE_KEY,
      "select id,name from students where active=true;",
    );
    render(<SqlWorkbench />);

    const editor = await screen.findByRole("textbox", { name: "SQL editor" });
    await user.click(screen.getByRole("button", { name: "Format" }));

    await waitFor(() => {
      expect((editor as HTMLTextAreaElement).value).toContain("SELECT");
      expect((editor as HTMLTextAreaElement).value).toContain(
        "FROM\n  students",
      );
    });
    expect(screen.getByText("Query formatted locally.")).toBeInTheDocument();

    await user.clear(editor);
    await user.type(editor, "select name from students;");
    fireEvent.keyDown(window, {
      key: "F",
      ctrlKey: true,
      shiftKey: true,
    });

    await waitFor(() => {
      expect((editor as HTMLTextAreaElement).value).toContain("SELECT");
    });
  });

  it("switches between light and dark themes with an accessible control", async () => {
    const user = userEvent.setup();
    render(<SqlWorkbench />);

    const themeButton = screen.getByRole("button", {
      name: "Switch to dark theme",
    });
    await user.click(themeButton);

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toBeInTheDocument();
  });
});
