"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	CalendarIcon,
	MapPinIcon,
	WalletIcon,
	Clock3Icon,
	UsersIcon,
	CalendarDaysIcon,
	Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { toast, Toaster } from "sonner";

import React from "react";
import { useRouter } from "next/navigation";

// Update the form schema to include new fields
const formSchema = z.object({
	destination: z.string({
		required_error: "Please select a destination.",
	}),
	tripType: z.string({
		required_error: "Please select a trip type.",
	}),
	month: z.string({
		required_error: "Please select a month for your trip.",
	}),
	budget: z.coerce
		.number({
			required_error: "Please enter your budget.",
			invalid_type_error: "Budget must be a number.",
		})
		.positive("Budget must be a positive number."),
	duration: z.coerce
		.number({
			required_error: "Please enter trip duration.",
			invalid_type_error: "Duration must be a number.",
		})
		.int("Duration must be a whole number.")
		.positive("Duration must be a positive number."),
	peopleCount: z.coerce
		.number({
			required_error: "Please enter number of travelers.",
			invalid_type_error:
				"Number of travelers must be a number.",
		})
		.int("Number of travelers must be a whole number.")
		.positive(
			"Number of travelers must be a positive number."
		),
});

export default function TripPlannerForm() {
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			budget: 100000,
			duration: 5,
			peopleCount: 2,
			destination: "paris",
			month: "december",
			tripType: "solo",
		},
	});

	// Update the onSubmit function to use the API
	async function onSubmit(
		values: z.infer<typeof formSchema>
	) {
		const place =
			destinations.find(
				(d) => d.value === values.destination
			)?.label || values.destination;
		const monthName =
			months.find((m) => m.value === values.month)?.label ||
			values.month;

		toast("Generating your itinerary...");

		try {
			setLoading(true);
			const response = await fetch("/api/trip/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					tripType: values.tripType,
					place: place,
					month: monthName,
					days: values.duration,
					budget: values.budget,
					peopleCount: values.peopleCount,
				}),
			});

			if (!response.ok || !response.body) {
				throw new Error("Failed to generate trip");
			}
			const res = await response.json(); // Await the JSON response
			const promptId = res.data.promptId;

			router.push("/?promptId=" + promptId);
			setLoading(false);
		} catch (error) {
			console.log(error);
			toast(
				"Failed to generate your itinerary. Please try again."
			);
			setLoading(false);
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<Toaster />
			<CardHeader>
				<CardTitle className="text-2xl">
					Plan Your Trip
				</CardTitle>
				<CardDescription>
					Fill in the details to start planning your perfect
					getaway.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="destination"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<MapPinIcon className="h-4 w-4" />
										Destination
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a destination" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{destinations.map((destination) => (
												<SelectItem
													key={destination.value}
													value={destination.value}
												>
													{destination.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Choose from our popular destinations.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tripType"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<CalendarIcon className="h-4 w-4" />
										Trip Type
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a trip type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{tripTypes.map((tripType) => (
												<SelectItem
													key={tripType.value}
													value={tripType.value}
												>
													{tripType.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										What kind of experience are you looking
										for?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="month"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<CalendarDaysIcon className="h-4 w-4" />
										Travel Month
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a month" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{months.map((month) => (
												<SelectItem
													key={month.value}
													value={month.value}
												>
													{month.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										When are you planning to travel?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="budget"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<WalletIcon className="h-4 w-4" />
										Total Budget
									</FormLabel>
									<FormControl>
										<div className="relative">
											<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
												₹
											</span>
											<Input
												className="pl-7"
												placeholder="15000"
												{...field}
											/>
										</div>
									</FormControl>
									<FormDescription>
										Enter your total budget in INR.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="duration"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<Clock3Icon className="h-4 w-4" />
										Trip Duration
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Input placeholder="4" {...field} />
											<span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
												days
											</span>
										</div>
									</FormControl>
									<FormDescription>
										How many days do you plan to travel?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="peopleCount"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<UsersIcon className="h-4 w-4" />
										Number of Travelers
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Input placeholder="4" {...field} />
											<span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
												people
											</span>
										</div>
									</FormControl>
									<FormDescription>
										How many people are traveling?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader2 className="animate-spin" />{" "}
									Planning your trip....
								</>
							) : (
								"Plan My Trip"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

const destinations = [
	{ value: "kerala", label: "Kerala, India" },
	{ value: "kashmir", label: "Kashmir, India" },
	{ value: "rajasthan", label: "Rajasthan, India" },
	{ value: "goa", label: "Goa, India" },
	{ value: "kolkata", label: "Kolkata, India" },
	{ value: "andaman", label: "Andaman Islands, India" },
	{ value: "guwahati", label: "Guwahati, Assam" },
	{ value: "imphal", label: "Imphal, Manipur" },
	{ value: "shillong", label: "Shillong, Meghalaya" },
	{ value: "dimapur", label: "Dimapur, Nagaland" },
	{ value: "aizawl", label: "Aizawl, Mizoram" },
	{ value: "itagar", label: "Itanagar, Arunachal Pradesh" },
	{ value: "agartala", label: "Agartala, Tripura" },
	{ value: "delhi", label: "Delhi, India" },
	{ value: "mumbai", label: "Mumbai, India" },
	{ value: "jaipur", label: "Jaipur, India" },
	{ value: "varanasi", label: "Varanasi, India" },
	{ value: "bengaluru", label: "Bengaluru, India" },
	{ value: "agra", label: "Agra, India" },
	{ value: "paris", label: "Paris, France" },
	{ value: "tokyo", label: "Tokyo, Japan" },
	{ value: "bali", label: "Bali, Indonesia" },
	{ value: "new-york", label: "New York, USA" },
	{ value: "rome", label: "Rome, Italy" },
	{ value: "sydney", label: "Sydney, Australia" },
	{ value: "santorini", label: "Santorini, Greece" },
	{ value: "cape-town", label: "Cape Town, South Africa" },
	{ value: "dubai", label: "Dubai, UAE" },
	{ value: "iceland", label: "Iceland" },
	{ value: "machu-picchu", label: "Machu Picchu, Peru" },
	{ value: "maui", label: "Maui, Hawaii, USA" },
	{ value: "kyoto", label: "Kyoto, Japan" },
	{ value: "amalfi-coast", label: "Amalfi Coast, Italy" },
	{ value: "fjordland", label: "Fjordland, New Zealand" },
	{ value: "zanzibar", label: "Zanzibar, Tanzania" },
	{ value: "queenstown", label: "Queenstown, New Zealand" },
];

const tripTypes = [
	{ value: "adventure", label: "Adventure" },
	{ value: "relaxation", label: "Relaxation" },
	{ value: "cultural", label: "Cultural" },
	{ value: "family", label: "Family" },
	{ value: "romantic", label: "Romantic" },
	{ value: "solo", label: "Solo" },
	{ value: "business", label: "Business" },
];

// Add months array
const months = [
	{ value: "january", label: "January" },
	{ value: "february", label: "February" },
	{ value: "march", label: "March" },
	{ value: "april", label: "April" },
	{ value: "may", label: "May" },
	{ value: "june", label: "June" },
	{ value: "july", label: "July" },
	{ value: "august", label: "August" },
	{ value: "september", label: "September" },
	{ value: "october", label: "October" },
	{ value: "november", label: "November" },
	{ value: "december", label: "December" },
];
