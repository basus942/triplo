import { GoogleGenAI } from "@google/genai";
import { jsonrepair } from "jsonrepair";
import { NextRequest } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });
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
		// const prompt = buildPrompt(await req.json());
		// const response = await ai.models.generateContent({
		// 	model: "gemini-2.0-flash",
		// 	contents: prompt,
		// 	config: {
		// 		// maxOutputTokens: 200,
		// 		temperature: 0.7, // Adjust for creativity (0.0 is deterministic, 1.0 is highly creative)
		// 		topP: 1, // Adjust for diversity
		// 	},
		// });
		// const data = response.text;

		// const parsed = data ? formatData(data) : null;

		return new Response(
			JSON.stringify({
				data: {
					tripName:
						"Tokyo Cultural Immersion: A 1233-Day Odyssey (March)",
					destination: "Tokyo, Japan",
					duration: "1233 Days",
					groupSize: 23,
					perPersonBudget: 12222,
					totalBudget: 281106,
					month: "March",
					theme: "Cultural Immersion",
					overallTone: "Energetic and Respectful",
					itinerary: [
						{
							day: 1,
							theme: "Arrival & Shinjuku Exploration",
							morning: {
								activity:
									"Arrive at Narita (NRT) or Haneda (HND) Airport. Take the Narita Express or Limousine Bus to Shinjuku.",
								timing: "8:00 AM - 12:00 PM",
								notes:
									"Purchase a Japan Rail Pass if planning extensive travel outside Tokyo. Consider a Suica or Pasmo card for local transport.",
								budget: "Transportation: ₹1500/person",
								food: {
									breakfast:
										"Convenience store (konbini) breakfast: Onigiri (rice balls), miso soup.",
									lunch:
										"Ichiran Ramen in Shinjuku (customize your ramen!).",
								},
							},
							afternoon: {
								activity:
									"Explore Shinjuku Gyoen National Garden (beautiful in March!).",
								timing: "1:00 PM - 4:00 PM",
								notes:
									"Entrance fee applies. Check for cherry blossom bloom status.",
								budget: "Entrance Fee: ₹300/person",
								photography:
									"Traditional Japanese garden scenery, cherry blossoms (if in bloom).",
								food: {
									dinner:
										"Omoide Yokocho (Memory Lane) for yakitori and beer (budget-friendly!).",
								},
							},
							evening: {
								activity:
									"Tokyo Metropolitan Government Building observation decks (free panoramic views).",
								timing: "6:00 PM - 9:00 PM",
								notes:
									"Check closing times. Possible long queues.",
								budget: "Free",
								photography: "Night skyline of Tokyo.",
								offbeat:
									"Explore Golden Gai after for tiny, unique bars.",
							},
						},
						{
							day: 2,
							theme: "Ancient Asakusa & Ueno Park",
							morning: {
								activity:
									"Visit Senso-ji Temple in Asakusa (Tokyo's oldest temple).",
								timing: "9:00 AM - 12:00 PM",
								notes:
									"Dress respectfully (cover shoulders). Try your luck with Omikuji (fortune paper).",
								budget: "Free (small donation optional).",
								photography:
									"Kaminarimon Gate, Nakamise-dori street, Senso-ji Temple.",
								food: {
									breakfast:
										"Traditional Japanese breakfast at a local restaurant near Asakusa.",
								},
							},
							afternoon: {
								activity:
									"Explore Nakamise-dori street (souvenir shopping).",
								timing: "12:00 PM - 2:00 PM",
								notes:
									"Bargain respectfully (it's not common, but polite inquiries are appreciated).",
								budget: "Souvenirs: Variable.",
								food: {
									lunch:
										"Tempura at Daikokuya Tempura (famous Asakusa restaurant).",
									dinner:
										"Monjayaki in Tsukishima (ferry or subway from Asakusa)",
								},
							},
							evening: {
								activity:
									"Ueno Park: Museums (Tokyo National Museum, Tokyo Metropolitan Art Museum) or simply relax.",
								timing: "3:00 PM - 6:00 PM (museums)",
								notes:
									"Museum entrance fees apply. Check museum schedules.",
								budget:
									"Museum entrance fees: ₹800-₹1200/person",
								offbeat: "Ueno Zoo (if interested).",
								photography:
									"Ueno Park scenery, museum interiors (if allowed).",
								food: {
									dinner:
										"Dinner at Ameya Yokocho (Ueno's vibrant market street).",
								},
							},
						},
						{
							day: 3,
							theme: "Shibuya Crossing & Harajuku Fashion",
							morning: {
								activity:
									"Experience Shibuya Crossing (world's busiest intersection).",
								timing: "10:00 AM - 11:00 AM",
								notes:
									"Best viewed from Starbucks or L'Occitane Cafe for a higher perspective.",
								budget:
									"Cost of a drink at Starbucks/L'Occitane.",
								photography: "Shibuya Crossing from above.",
								food: {
									breakfast: "Cafe hopping in Shibuya.",
								},
							},
							afternoon: {
								activity:
									"Explore Harajuku: Takeshita Street (kawaii fashion), Meiji Jingu Shrine (peaceful oasis).",
								timing: "11:00 AM - 4:00 PM",
								notes:
									"Takeshita Street is very crowded. Meiji Jingu Shrine offers a tranquil escape.",
								budget:
									"Small snacks/souvenirs on Takeshita Street. Donation at Meiji Jingu Shrine.",
								photography:
									"Takeshita Street fashion, Meiji Jingu Shrine architecture and gardens.",
								offbeat:
									"Cat Street (more sophisticated fashion).",
								food: {
									lunch:
										"Crepes on Takeshita Street (Harajuku specialty).",
									dinner:
										"Robot Restaurant Show in Shinjuku (expensive but unique experience - book in advance!).",
								},
							},
							evening: {
								activity:
									"Shibuya nightlife (optional): Bars, clubs, or live music venues.",
								timing: "7:00 PM onwards",
								notes:
									"Cover charges may apply. Be aware of your surroundings.",
								budget: "Variable.",
								food: {},
							},
						},
						{
							day: 4,
							theme:
								"Day Trip to Hakone (Mountain Scenery)",
							morning: {
								activity:
									"Day trip to Hakone (mountain resort town). Take the Odakyu Romancecar from Shinjuku.",
								timing:
									"8:00 AM - 12:00 PM (travel time included)",
								notes:
									"Purchase a Hakone Free Pass for discounted transportation.",
								budget: "Hakone Free Pass: ₹4000/person",
								food: {
									breakfast: "Bento box on the Romancecar.",
								},
							},
							afternoon: {
								activity:
									"Cruise on Lake Ashi (views of Mt. Fuji), visit Hakone Open-Air Museum.",
								timing: "12:00 PM - 5:00 PM",
								notes:
									"Mt. Fuji visibility depends on weather conditions. Museum entrance fee applies.",
								budget: "Museum entrance fee: ₹1500/person",
								photography:
									"Lake Ashi with Mt. Fuji (if visible), Hakone Open-Air Museum sculptures.",
								offbeat: "Hakone Venetian Glass Museum.",
								food: {
									lunch:
										"Soba noodles with a view in Hakone.",
								},
							},
							evening: {
								activity: "Return to Tokyo.",
								timing: "5:00 PM - 8:00 PM",
								food: {
									dinner:
										"Dinner near your accommodation in Tokyo.",
								},
							},
						},
						{
							day: 5,
							theme:
								"Tsukiji Outer Market & Ginza Elegance",
							morning: {
								activity:
									"Explore Tsukiji Outer Market (fresh seafood, local produce).",
								timing: "9:00 AM - 12:00 PM",
								notes:
									"Arrive early for the best selection. Sample various foods.",
								budget:
									"Variable (depending on how much you eat!).",
								photography:
									"Vibrant market scenes, fresh seafood.",
								food: {
									breakfast:
										"Sushi breakfast at Tsukiji Outer Market.",
								},
							},
							afternoon: {
								activity:
									"Ginza: Upscale shopping, Kabuki-za Theatre (traditional Japanese theatre).",
								timing: "12:00 PM - 4:00 PM",
								notes:
									"Kabuki-za tickets can be expensive. Check show schedules and book in advance.",
								budget:
									"Shopping: Variable. Kabuki-za tickets: ₹5000+/person",
								food: {
									lunch:
										"Ramen in Ginza (many high-end ramen shops).",
									dinner:
										"Izakaya hopping in Shimbashi (salaryman district near Ginza).",
								},
							},
							evening: {
								activity:
									"Imperial Palace East Garden (former site of Edo Castle).",
								timing: "4:00 PM - 6:00 PM",
								notes:
									"Free admission. Check closing times.",
								budget: "Free",
								photography: "Imperial Palace grounds.",
								food: {},
							},
						},
						{
							day: 1233,
							theme: "Departure",
							morning: {
								activity:
									"Last-minute souvenir shopping. Depart from Narita (NRT) or Haneda (HND) Airport.",
								timing: "Flexible.",
								notes:
									"Allow ample time for travel to the airport.",
								budget:
									"Transportation to airport: ₹1500/person.",
							},
						},
					],
					budgetBreakdown: {
						accommodation:
							"₹80000 (for the entire duration, prioritizing cost-effective options like hostels, guesthouses, or group discounts at hotels outside central Tokyo)",
						food: "₹100000 (focusing on local eateries, street food, and affordable restaurants)",
						travel:
							"₹50000 (JR Pass for some, Suica/Pasmo card for others, local trains/buses)",
						activities:
							"₹51106 (museum entrance fees, day trips, Robot Restaurant (optional))",
					},
					costConsciousTips: [
						"Utilize Japan Rail Pass effectively for long-distance travel.",
						"Embrace convenience store meals (konbini) for breakfast and snacks.",
						"Explore free attractions like parks, temples, and government buildings.",
						"Take advantage of free walking tours.",
						"Eat at local eateries (izakayas, ramen shops) instead of touristy restaurants.",
						"Consider staying in hostels or guesthouses for affordable accommodation.",
						"Purchase a Suica or Pasmo card for easy and discounted travel on public transport.",
					],
					importantNotes: [
						"March can be a popular time to visit Tokyo due to cherry blossom season (sakura). Book accommodation and transportation in advance.",
						"Learn basic Japanese phrases (greetings, thank you, excuse me).",
						"Carry a pocket Wi-Fi device or purchase a local SIM card for internet access.",
						"Be aware of local etiquette (e.g., no talking loudly on trains, avoid eating while walking).",
						"Dress modestly when visiting temples and shrines.",
						"Carry cash (many smaller establishments do not accept credit cards).",
						"Be prepared for crowds, especially during peak season.",
					],
					summary:
						"Experience the best of Tokyo with this itinerary! Don't miss the iconic Shibuya Crossing, the serene Meiji Jingu Shrine, the historical Senso-ji Temple, and a scenic day trip to Hakone. Explore the vibrant Tsukiji Outer Market for a taste of local flavors and delve into the cultural richness of Ginza. Enjoy!",
				},
			}),
			{
				headers: { "Content-Type": "application/json" },
				status: 200,
			}
		);
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

	👉 At the end, **always include a short summary paragraph** highlighting the top must-visit places by name (e.g., "Don’t miss the Matrimandir, Auroville Beach, and Villa Shanti!").`;
};

const formatData = (data: string) => {
	const cleaned = data
		.replace(/^```json/, "")
		.replace(/```$/, "")
		.trim();

	const repaired = jsonrepair(cleaned);
	return JSON.parse(repaired);
};
