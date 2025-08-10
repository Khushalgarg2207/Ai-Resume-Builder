import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error("Missing Gemini API key in VITE_GOOGLE_AI_API_KEY");
}

const ai = new GoogleGenerativeAI(apiKey);

export async function sendToGemini(userMessage) {
  if (!userMessage?.trim()) {
    throw new Error("User message cannot be empty.");
  }
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userMessage);

    const text = result?.response?.text();
    if (!text) throw new Error("Empty response from Gemini");
    return text;
  } catch (err) {
    console.error("Error in Gemini chat:", err);
    throw err;
  }
}

export function resetChatHistory() {}
export function getChatHistory() { return []; }