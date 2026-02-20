import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI("AIzaSyA3BwjQcvPHxrPVelnwV8cCkKDVlr2UiCE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runChat() {
  const prompt = "Write a tagline for a bakery.";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

runChat();