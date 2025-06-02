import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const backendUrl =
      process.env.BACKEND_URL ||
      `http://localhost:3000/snippets/${encodeURIComponent(id)}`;
    const backendRes = await fetch(backendUrl, {
      method: "GET",
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
