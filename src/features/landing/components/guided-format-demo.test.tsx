import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GuidedFormatDemo } from "@/features/landing/components/guided-format-demo";

describe("GuidedFormatDemo", () => {
  it("formats the tested sample locally and announces the result", async () => {
    const user = userEvent.setup();
    render(<GuidedFormatDemo />);

    expect(screen.getByText("Ready to format locally.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Formatted" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Format example" }));

    await waitFor(() => {
      expect(screen.getByText("Formatted locally.")).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", { name: "Formatted" }),
    ).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Formatted" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByLabelText("PostgreSQL example preview"),
    ).toHaveTextContent("SELECT");
  });
});
