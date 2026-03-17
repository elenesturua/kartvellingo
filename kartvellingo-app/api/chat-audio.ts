import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, MODEL } from "./_shared.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server API key not configured" });
  }

  try {
    const { audio, mimeType, history } = req.body;
    if (!audio) {
      return res.status(400).json({ error: "Audio data is required" });
    }

    const ai = new GoogleGenAI({ apiKey });

    const historyContext = (history || [])
      .slice(-6)
      .map((m: { role: string; text: string }) =>
        `${m.role === "user" ? "User" : "Tutor"}: ${m.text}`
      )
      .join("\n");

    const promptText = historyContext
      ? `Here is our recent conversation:\n${historyContext}\n\nThe user sent a voice recording. Listen to their pronunciation and give feedback. If they're attempting a Georgian word or phrase, identify what they said, evaluate their pronunciation, and suggest improvements. Be specific and encouraging.`
      : `The user sent a voice recording for pronunciation practice. Listen to their pronunciation and give feedback. If they're attempting a Georgian word or phrase, identify what they said, evaluate their pronunciation, and suggest improvements. Be specific and encouraging.`;

    const response = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction: SYSTEM_PROMPT },
      contents: [
        {
          role: "user",
          parts: [
            { text: promptText },
            { inlineData: { mimeType: mimeType || "audio/webm", data: audio } },
          ],
        },
      ],
    });

    return res.json({ text: response.text ?? "I couldn't analyze the audio. Please try again." });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to process audio";
    return res.status(500).json({ error: message });
  }
}
