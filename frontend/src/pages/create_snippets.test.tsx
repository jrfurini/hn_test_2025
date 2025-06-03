import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateSnippetsPage from "./create_snippets";

describe("CreateSnippetsPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders title and textarea", () => {
    render(<CreateSnippetsPage />);
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
    render(<CreateSnippetsPage />);
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
    render(<CreateSnippetsPage />);
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
