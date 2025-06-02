import { useState } from "react";

interface Snippet {
  text: string;
  summary: string;
  _id: string;
}

export default function SnippetQueryPage() {
  const [id, setId] = useState("");
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSnippet(null);
    try {
      const res = await fetch(`/api/snippet?id=${encodeURIComponent(id)}`);
      if (res.status === 404) {
        setError("Snippet not found.");
        setSnippet(null);
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error fetching snippet");
      }
      const data = await res.json();
      setSnippet(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <h1>Query Snippet by ID</h1>
      <form onSubmit={handleFetch} style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter snippet ID..."
          style={{ width: "100%", marginBottom: 12 }}
          required
        />
        <button
          type="submit"
          disabled={loading || !id.trim()}
          style={{ width: "100%" }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && (
        <div
          style={{
            color: error === "Snippet not found." ? "#b8860b" : "red",
            marginTop: 12,
          }}
        >
          {error}
        </div>
      )}
      {snippet && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 6,
          }}
        >
          <strong>Text:</strong>
          <div>{snippet.text}</div>
          <br />
          <strong>Summary:</strong>
          <div>{snippet.summary}</div>
        </div>
      )}
    </div>
  );
}
