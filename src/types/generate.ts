export type PromptInput = {
	tripType: string;
	days: number;
	place: string;
	month: string;
	descriptionLevel: "concise" | "detailed";
	budget: number;
	peopleCount: number;
};
export type generateType = {
	prompt: string;
	promptId: string;
};
export interface ItineraryItem {
	day: number;
	theme: string;
	morning?: {
		activity?: string;
		time?: string;
		description?: string;
		tip?: string;
		cost?: string;
		food?: {
			breakfast?: string;
			lunch?: string;
		};
		photographySpot?: string;
	};
	afternoon?: {
		activity?: string;
		time?: string;
		description?: string;
		tip?: string;
		cost?: string;
		food?: {
			lunch?: string;
			dinner?: string;
		};
		photographySpot?: string;
	};
	evening?: {
		activity?: string;
		time?: string;
		description?: string;
		tip?: string;
		cost?: string;
		food?: {
			dinner?: string;
		};
		photographySpot?: string;
	};
}

export interface TripData {
	tripTitle: string;
	travelers: number;
	budgetPerPerson: number;
	totalBudget: number;
	duration: number;
	currency: string;
	theme: string;
	itinerary: ItineraryItem[];
	importantNotes: {
		closures?: string;
		bookingTips?: string;
		dressCodes?: string;
		localEtiquette?: string;
		transportation?: string;
		safety?: string;
	};
	budgetBreakdown: {
		accommodation: string;
		food: string;
		travel: string;
		activities: string;
		miscellaneous: string;
	};
	costConsciousRecommendations: {
		stay?: string;
		food?: string;
		travel?: string;
		activities?: string;
	};
	summary: string;
}
