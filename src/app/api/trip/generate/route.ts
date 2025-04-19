import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey!);
const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});
type PromptInput = {
	tripType: string;
	days: number;
	place: string;
	month: string;
	descriptionLevel: "concise" | "detailed";
	budget: number;
	peopleCount: number;
};
export async function POST(req: NextRequest) {
	try {
		const prompt = buildPrompt(await req.json());
		const response = await model.generateContentStream([
			prompt,
		]);

		// console.dir({ response }, { depth: null });
		const encoder = new TextEncoder();

		const stream = new ReadableStream({
			async start(controller) {
				for await (const chunk of response.stream) {
					const text = chunk.text();
					controller.enqueue(encoder.encode(text));
				}
				controller.close();
			},
		});

		return new NextResponse(stream, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Cache-Control": "no-cache",
			},
		});
	} catch (error) {
		console.dir(error);
		return new Response(JSON.stringify(error), {
			status: 500,
		});
	}
}

const buildPrompt = ({
	tripType,
	days,
	place,
	month,

	descriptionLevel,
	budget,
	peopleCount,
}: PromptInput): string => {
	const formatType = "json";
	return `You are a smart and creative AI travel planner. Generate a personalized, ${descriptionLevel} itinerary for a ${tripType} ${days}-day trip to ${place} in ${month}. The trip is for a group of ${peopleCount} people, with a per-person budget of ₹${budget} (total budget ₹${
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

	👉 At the end, **always include a short summary paragraph** highlighting the top must-visit places by name (e.g., "Don’t miss the Matrimandir, Auroville Beach, and Villa Shanti!").
	The response must always be returned in valid and consistent JSON format, structured exactly as described below.
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
};
