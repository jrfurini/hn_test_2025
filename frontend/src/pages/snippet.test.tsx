import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SnippetQueryPage from "./snippet";

// Mock do fetch global
beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

describe("SnippetQueryPage", () => {
  it("renders title and input", () => {
    render(<SnippetQueryPage />);
    expect(
      screen.getByRole("heading", { name: /query snippet by id/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter snippet id/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("displays error if snippet is not found", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 404,
      ok: false,
      json: async () => ({}),
    });
    render(<SnippetQueryPage />);
    fireEvent.change(screen.getByPlaceholderText(/enter snippet id/i), {
      target: { value: "abc123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText(/snippet not found/i)).toBeInTheDocument();
    });
  });

  it("displays snippet when found", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        text: "Example text",
        summary: "Summary",
        _id: "abc123",
      }),
    });
    render(<SnippetQueryPage />);
    fireEvent.change(screen.getByPlaceholderText(/enter snippet id/i), {
      target: { value: "abc123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText("Example text")).toBeInTheDocument();
      expect(screen.getByText("Summary")).toBeInTheDocument();
    });
  });
});
