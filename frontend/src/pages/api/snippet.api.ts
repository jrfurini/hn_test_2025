import { Snippet } from "../../../types/snippet";

export const snippetApi = {
  getSnippet: async (id: string): Promise<Snippet> => {
    const backendUrl =
      process.env.BACKEND_URL ||
      `http://localhost:3000/snippets/${encodeURIComponent(id)}`;
    const response = await fetch(backendUrl, {
      method: "GET",
    });
    if (response.status === 404) {
      throw new Error("Snippet not found.");
    }
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Error fetching snippet");
    }
    const data = await response.json();
    return data;
  },
  createSnippet: async (text: string): Promise<Snippet> => {
    const backendUrl =
      process.env.BACKEND_URL || "http://localhost:3000/snippets";

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Failed to create snippet");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating snippet", error);
      throw error;
    }
  },
};

// export default async function getSnippet(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
//   const { id } = req.query;
//   if (!id || typeof id !== "string") {
//     return res.status(400).json({ message: "ID is required" });
//   }
//   try {
//     const backendUrl =
//       process.env.BACKEND_URL ||
//       `http://localhost:3000/snippets/${encodeURIComponent(id)}`;
//     const backendRes = await fetch(backendUrl, {
//       method: "GET",
//     });
//     const data = await backendRes.json();
//     if (!backendRes.ok) {
//       return res
//         .status(backendRes.status)
//         .json({ message: data.message || "Backend error" });
//     }
//     return res.status(200).json(data);
//   } catch (err: unknown) {
//     return res.status(500).json({
//       message: err instanceof Error ? err.message : "Internal error",
//     });
//   }
// }

// export default async function createSnippet(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
//   const { text } = req.body;
//   if (!text || typeof text !== "string") {
//     return res.status(400).json({ message: "Text is required" });
//   }
//   try {
//     const backendUrl =
//       process.env.BACKEND_URL || "http://localhost:3000/snippets";
//     const backendRes = await fetch(backendUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text }),
//     });
//     const data = await backendRes.json();
//     if (!backendRes.ok) {
//       return res
//         .status(backendRes.status)
//         .json({ message: data.message || "Backend error" });
//     }
//     return res.status(200).json(data);
//   } catch (err: unknown) {
//     return res.status(500).json({
//       message: err instanceof Error ? err.message : "Internal error",
//     });
//   }
// }
