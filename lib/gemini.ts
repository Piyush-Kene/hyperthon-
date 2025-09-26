// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGemini() {
	console.log("hjdgsfdgjhf gdfgd gemini called")
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		console.error("❌ Missing GEMINI_API_KEY");
		return null;
	}
	const genAI = new GoogleGenerativeAI(apiKey);
	console.log(genAI);
	return genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

}
