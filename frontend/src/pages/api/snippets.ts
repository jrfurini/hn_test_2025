import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ message: "Text is required" });
  }
  try {
    const backendUrl =
      process.env.BACKEND_URL || "http://localhost:3000/snippets";
    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
      return res
        .status(backendRes.status)
        .json({ message: data.message || "Backend error" });
    }
    return res.status(200).json(data);
  } catch (err: unknown) {
    return res.status(500).json({
      message: err instanceof Error ? err.message : "Internal error",
    });
  }
}
