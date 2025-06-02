import { useState } from "react";

export default function SnippetsPage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary("");
    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error creating snippet");
      }
      const data = await res.json();
      setSummary(data.summary);
      setId(data._id);
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
      <h1>Create Snippet</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          style={{ width: "100%", marginBottom: 12 }}
          placeholder="Enter your text here..."
          required
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          style={{ width: "100%" }}
        >
          {loading ? "Creating..." : "Create Snippet"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      {summary && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 6,
          }}
        >
          <strong>Summary:</strong>
          <div>{summary}</div>
          <br />
          <strong>ID:</strong>
          <div>{id}</div>
        </div>
      )}
    </div>
  );
}
