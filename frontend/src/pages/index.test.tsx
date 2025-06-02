import { render, screen } from "@testing-library/react";
import Home from "./index";

describe("Home", () => {
  it("renders main text", () => {
    render(<Home />);
    expect(screen.getByText(/get started by editing/i)).toBeInTheDocument();
  });

  it("renders Next.js logo", () => {
    render(<Home />);
    expect(screen.getByAltText(/next\.js logo/i)).toBeInTheDocument();
  });

  it("renders main links", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /deploy now/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /read our docs/i })
    ).toBeInTheDocument();
  });
});
