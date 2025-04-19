import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey!);
export const aiModel = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});
