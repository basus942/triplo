import { PromptInput } from "@/types/generate";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";
import dbConnect from "@/config/db";
import PromptModel from "@/models/prompt";
import { generateTrip } from "@/service/generativeAiService";
import { jsonrepair } from "jsonrepair";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const formatData = (data: string) => {
	console.log(data, typeof data);
	const cleaned = data
		.replace(/^```json/, "")
		.replace(/```$/, "")
		.trim();

	const repaired = jsonrepair(cleaned);
	return JSON.parse(repaired);
};
export const buildPrompt = async ({
	tripType,
	days,
	place,
	month,

	descriptionLevel,
	budget,
	peopleCount,
}: PromptInput): Promise<Record<string, string>> => {
	const formatType = "json";
	console.log({
		tripType,
		days,
		place,
		month,

		descriptionLevel,
		budget,
		peopleCount,
	});
	const prompt = `
  You are a smart and creative AI travel planner. Generate a personalized, ${descriptionLevel} itinerary for a ${tripType} ${days}-day trip to ${place} in ${month}. 
  The trip is for a group of ${peopleCount} people, with a per-person budget of ₹${budget} (total budget ₹${
		budget * peopleCount
	}).
  
  The response must be in **${formatType}** format and include:
  - Top attractions, cultural/local experiences, and hidden gems  
  - Breakfast, lunch, and dinner recommendations (local cuisine preferred)  
  - Suggested timings, tips for each activity, and best time of day to visit  
  - Offbeat & scenic photography spots (e.g., vibrant alleys, hidden beaches, rooftop cafés, local markets)  
  - Important notes (e.g., closures, booking tips, dress codes, local etiquette)  
  - Budget breakdown and cost-conscious recommendations (stay, food, travel, activities)  
  
  Use a **${tripType}-appropriate** tone (e.g., romantic, energetic, calming). Be clear, friendly, and useful.
  
  👉 At the end, **always include a short summary paragraph** highlighting the top must-visit places by name 
  (e.g., "Don’t miss the Matrimandir, Auroville Beach, and Villa Shanti!").
  
  The response must always be returned in valid and consistent JSON format, structured exactly as described below:
  
  {
    "tripTitle": "string",
    "travelers": number,
    "budgetPerPerson": number,
    "totalBudget": number,
    "duration": number,
    "currency": "₹ (Indian Rupees)",
    "theme": "string",
    "itinerary": [
      {
        "day": number,
        "theme": "string",
        "morning": {
          "activity": "string",
          "time": "string",
          "description": "string",
          "tip": "string",
          "cost": "string",
          "food": {
            "breakfast": "string",
            "lunch": "string (if applicable)"
          },
          "photographySpot": "string"
        },
        "afternoon": {
          "activity": "string",
          "time": "string",
          "description": "string",
          "tip": "string",
          "cost": "string",
          "food": {
            "dinner": "string (if applicable)"
          },
          "photographySpot": "string"
        },
        "evening": {
          "activity": "string",
          "time": "string",
          "description": "string",
          "tip": "string",
          "cost": "string",
          "photographySpot": "string"
        }
      }
    ],
    "importantNotes": {
      "closures": "string",
      "bookingTips": "string",
      "dressCodes": "string",
      "localEtiquette": "string",
      "transportation": "string",
      "safety": "string"
    },
    "budgetBreakdown": {
      "accommodation": "string",
      "food": "string",
      "travel": "string",
      "activities": "string",
      "miscellaneous": "string"
    },
    "costConsciousRecommendations": {
      "stay": "string",
      "food": "string",
      "travel": "string",
      "activities": "string"
    },
    "summary": "string"
  }
  `;

	const promptId = nanoid();

	await dbConnect();
	await PromptModel.create({
		promptId: promptId,
		promptText: prompt,
	});
	// const result = await PromptModel.findOne({
	// 	promptId: "RCyryijAWladR9wSBh_y4",
	// });
	// console.log(result);
	generateTrip({ prompt, promptId });

	return { promptId };
};
