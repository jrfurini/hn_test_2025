import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SnippetsPage from "./snippets";

describe("SnippetsPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders title and textarea", () => {
    render(<SnippetsPage />);
    expect(
      screen.getByRole("heading", { name: /create snippet/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your text here/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create snippet/i })
    ).toBeInTheDocument();
  });

  it("displays error when creating snippet fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Error creating snippet" }),
    });
    render(<SnippetsPage />);
    fireEvent.change(screen.getByPlaceholderText(/enter your text here/i), {
      target: { value: "Test" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create snippet/i }));
    await waitFor(() => {
      expect(screen.getByText(/error creating snippet/i)).toBeInTheDocument();
    });
  });

  it("displays summary and id when snippet is created successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ summary: "Generated summary", _id: "id123" }),
    });
    render(<SnippetsPage />);
    fireEvent.change(screen.getByPlaceholderText(/enter your text here/i), {
      target: { value: "Test" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create snippet/i }));
    await waitFor(() => {
      expect(screen.getByText("Generated summary")).toBeInTheDocument();
      expect(screen.getByText("id123")).toBeInTheDocument();
    });
  });
});
