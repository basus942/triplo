"use client";

import TripPlannerForm from "../components/functional/trip-planner-form";
import { TripDetails } from "@/components/functional/TripDetails";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useSearchParams } from "next/navigation";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

export default function Home() {
	const searchParams = useSearchParams();
	const promptId = searchParams.get("promptId");
	const queryClient = new QueryClient({});
	return (
		<QueryClientProvider client={queryClient}>
			<main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-r from-sky-300 to-cyan-600">
				<SpeedInsights />
				<div className="mb-8 text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
						Triplo Trip Planner
					</h1>
					<p className="mt-3 text-lg text-gray-200">
						Plan your perfect getaway in just a few clicks
					</p>
				</div>
				{!promptId ? <TripPlannerForm /> : <TripDetails />}
			</main>{" "}
		</QueryClientProvider>
	);
}
