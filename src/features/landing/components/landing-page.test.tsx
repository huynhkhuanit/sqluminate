import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LandingPage } from "@/features/landing/components/landing-page";

describe("LandingPage", () => {
  it("communicates the current milestone and links to the workspace", () => {
    render(<LandingPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Visualize SQL. Understand every query.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("customer-orders.sql")).toBeInTheDocument();
    expect(
      screen.getAllByText("PostgreSQL", { exact: true }).length,
    ).toBeGreaterThanOrEqual(2);

    const editorLink = screen.getByRole("link", { name: "Open editor" });
    expect(editorLink).toHaveAttribute("href", "/workspace");
    expect(screen.getByRole("link", { name: "View roadmap" })).toHaveAttribute(
      "href",
      "#capabilities",
    );
  });

  it("shows honest trust signals and capability statuses", () => {
    render(<LandingPage />);

    expect(screen.getByText("Processed locally")).toBeInTheDocument();
    expect(screen.getByText("SQL is never executed")).toBeInTheDocument();
    expect(screen.getByText("No account required")).toBeInTheDocument();
    expect(screen.getByText("MIT licensed")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What works today" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Available").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("In progress").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Planned").length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByText(/The current milestone formats and edits SQL/),
    ).toBeInTheDocument();
  });

  it("keeps the mobile navigation keyboard-friendly through native details", async () => {
    const user = userEvent.setup();
    render(<LandingPage />);

    const menu = screen.getByText("Menu");
    const details = menu.closest("details");

    expect(details).not.toHaveAttribute("open");
    await user.click(menu);
    expect(details).toHaveAttribute("open");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await user.click(menu);
    expect(details).not.toHaveAttribute("open");
  });
});
