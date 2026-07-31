import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LandingPage } from "@/features/landing/components/landing-page";

vi.mock("@/features/landing/components/sql-node-field", () => ({
  SqlNodeField: () => (
    <div aria-label="Interactive SQL node field" role="img" />
  ),
}));

vi.mock("@/features/landing/components/three-scene-card", () => ({
  ThreeSceneCard: ({ label, variant }: { label: string; variant: string }) => (
    <div aria-label={label} data-three-scene={variant} role="img" />
  ),
}));

describe("LandingPage", () => {
  it("introduces SQLuminate and links to the working local workspace", () => {
    render(<LandingPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "See the query behind the query.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Interactive SQL node field" }),
    ).toBeInTheDocument();

    const workspaceLinks = screen.getAllByRole("link", {
      name: "Open workspace",
    });
    expect(workspaceLinks.length).toBeGreaterThanOrEqual(2);
    expect(
      workspaceLinks.every(
        (link) => link.getAttribute("href") === "/workspace",
      ),
    ).toBe(true);
  });

  it("provides working in-page navigation and privacy messaging", () => {
    const { container } = render(<LandingPage />);

    expect(
      screen.getByRole("heading", {
        name: "From raw SQL to a map you can read.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Your query stays yours." }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "How it works" })[0],
    ).toHaveAttribute("href", "#how-it-works");
    expect(container.textContent).not.toMatch(/[—–]/);
  });

  it("uses distinct 3D scenes to explain each visual model", () => {
    const { container } = render(<LandingPage />);

    expect(
      screen.getByRole("img", {
        name: "Interactive 3D JOIN relationship model",
      }),
    ).toHaveAttribute("data-three-scene", "relationships");
    expect(
      screen.getByRole("img", {
        name: "Interactive 3D logical query flow",
      }),
    ).toHaveAttribute("data-three-scene", "flow");
    expect(
      screen.getByRole("img", {
        name: "Interactive 3D query structure layers",
      }),
    ).toHaveAttribute("data-three-scene", "structure");
    expect(
      screen.getByRole("img", {
        name: "Interactive 3D SQLuminate beacon",
      }),
    ).toHaveAttribute("data-three-scene", "beacon");
    expect(container.querySelectorAll("[data-three-scene]")).toHaveLength(4);
  });
});
