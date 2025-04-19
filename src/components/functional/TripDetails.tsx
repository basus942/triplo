import { ItineraryItem, TripData } from "@/types/generate";
import { useQuery } from "@tanstack/react-query";
import { Loader, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const isValid = (value: unknown) =>
	value !== undefined && value !== null && value !== "";

export const TripDetails = () => {
	const searchParams = useSearchParams();
	const promptId = searchParams.get("promptId");

	const fetchTripData = async () => {
		if (promptId) {
			const response = await fetch(
				`/api/trip?promptId=${promptId}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch trip data");
			}
			const resJson = await response.json();
			return resJson.data.response || null; // Return the value you want in `data`
		} else {
			throw new Error("promptId is required");
		}
	};
	const { status, data, error, isLoading } = useQuery({
		queryKey: ["tripDetails", promptId],
		queryFn: () => fetchTripData(),
		refetchInterval: (queryData) => {
			if (queryData.state.error) return false;
			if (!queryData.state.data) return 1000;
		},
	});
	console.log({ status, data, error });
	if (error) {
		toast("Something Went Wrong");
	}
	if (!data)
		return (
			<div className="text-center p-6 text-gray-500">
				<div className="min-h-100">
					<Loader className="animate-spin " color="white" />
				</div>
			</div>
		);
	return (
		<div className="trip-data bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
			{/* Header */}
			<header className="mb-6">
				<h1 className="text-3xl font-bold text-gray-800">
					{data.tripTitle}
				</h1>
				<p className="text-gray-600">
					Travelers: {data.travelers} | Duration:{" "}
					{data.duration} days
				</p>
				<p className="text-gray-600">
					Budget Per Person: {data.currency}{" "}
					{data.budgetPerPerson} | Total Budget:{" "}
					{data.currency} {data.totalBudget}
				</p>
				<p className="text-gray-600">Theme: {data.theme}</p>
			</header>

			{/* Itinerary */}
			<div className="itinerary space-y-6">
				{data.itinerary.map((item: ItineraryItem) => (
					<div
						key={item.day}
						className="day border-l-4 border-cyan-500 pl-4"
					>
						<h2 className="text-xl font-semibold text-gray-800">
							Day {item.day}: {item.theme}
						</h2>

						{/* Morning */}
						{isValid(item.morning) && (
							<div className="mt-4">
								<h3 className="text-lg font-medium text-gray-700">
									Morning
								</h3>
								{isValid(item.morning?.activity) && (
									<p>{item.morning?.activity}</p>
								)}
								{isValid(item.morning?.time) && (
									<p>
										<strong>Time:</strong>{" "}
										{item.morning?.time}
									</p>
								)}
								{isValid(item.morning?.description) && (
									<p>
										<strong>Description:</strong>{" "}
										{item.morning?.description}
									</p>
								)}
								{isValid(item.morning?.tip) && (
									<p>
										<strong>Tip:</strong>{" "}
										{item.morning?.tip}
									</p>
								)}
								{isValid(item.morning?.cost) && (
									<p>
										<strong>Cost:</strong>{" "}
										{item.morning?.cost}
									</p>
								)}
								{isValid(item.morning?.food?.breakfast) && (
									<p>
										<strong>Breakfast:</strong>{" "}
										{item.morning?.food?.breakfast}
									</p>
								)}
								{isValid(item.morning?.food?.lunch) && (
									<p>
										<strong>Lunch:</strong>{" "}
										{item.morning?.food?.lunch}
									</p>
								)}
								{isValid(item.morning?.photographySpot) && (
									<p>
										<strong>Photography Spot:</strong>{" "}
										{item.morning?.photographySpot}
									</p>
								)}
							</div>
						)}

						{/* Afternoon */}
						{isValid(item.afternoon) && (
							<div className="mt-4">
								<h3 className="text-lg font-medium text-gray-700">
									Afternoon
								</h3>
								{isValid(item.afternoon?.activity) && (
									<p>{item.afternoon?.activity}</p>
								)}
								{isValid(item.afternoon?.time) && (
									<p>
										<strong>Time:</strong>{" "}
										{item.afternoon?.time}
									</p>
								)}
								{isValid(item.afternoon?.description) && (
									<p>
										<strong>Description:</strong>{" "}
										{item.afternoon?.description}
									</p>
								)}
								{isValid(item.afternoon?.tip) && (
									<p>
										<strong>Tip:</strong>{" "}
										{item.afternoon?.tip}
									</p>
								)}
								{isValid(item.afternoon?.cost) && (
									<p>
										<strong>Cost:</strong>{" "}
										{item.afternoon?.cost}
									</p>
								)}
								{isValid(item.afternoon?.food?.lunch) && (
									<p>
										<strong>Lunch:</strong>{" "}
										{item.afternoon?.food?.lunch}
									</p>
								)}
								{isValid(item.afternoon?.food?.dinner) && (
									<p>
										<strong>Dinner:</strong>{" "}
										{item.afternoon?.food?.dinner}
									</p>
								)}
								{isValid(
									item.afternoon?.photographySpot
								) && (
									<p>
										<strong>Photography Spot:</strong>{" "}
										{item.afternoon?.photographySpot}
									</p>
								)}
							</div>
						)}

						{/* Evening */}
						{isValid(item.evening) && (
							<div className="mt-4">
								<h3 className="text-lg font-medium text-gray-700">
									Evening
								</h3>
								{isValid(item.evening?.activity) && (
									<p>{item.evening?.activity}</p>
								)}
								{isValid(item.evening?.time) && (
									<p>
										<strong>Time:</strong>{" "}
										{item.evening?.time}
									</p>
								)}
								{isValid(item.evening?.description) && (
									<p>
										<strong>Description:</strong>{" "}
										{item.evening?.description}
									</p>
								)}
								{isValid(item.evening?.tip) && (
									<p>
										<strong>Tip:</strong>{" "}
										{item.evening?.tip}
									</p>
								)}
								{isValid(item.evening?.cost) && (
									<p>
										<strong>Cost:</strong>{" "}
										{item.evening?.cost}
									</p>
								)}
								{isValid(item.evening?.food?.dinner) && (
									<p>
										<strong>Dinner:</strong>{" "}
										{item.evening?.food?.dinner}
									</p>
								)}
								{isValid(item.evening?.photographySpot) && (
									<p>
										<strong>Photography Spot:</strong>{" "}
										{item.evening?.photographySpot}
									</p>
								)}
							</div>
						)}
					</div>
				))}
			</div>

			{/* Important Notes */}
			<section className="mt-8">
				<h2 className="text-2xl font-bold text-gray-800">
					Important Notes
				</h2>
				<ul className="list-disc list-inside mt-4">
					{isValid(data.importantNotes?.closures) && (
						<li>
							<strong>Closures:</strong>{" "}
							{data.importantNotes?.closures}
						</li>
					)}
					{isValid(data.importantNotes?.bookingTips) && (
						<li>
							<strong>Booking Tips:</strong>{" "}
							{data.importantNotes?.bookingTips}
						</li>
					)}
					{isValid(data.importantNotes?.dressCodes) && (
						<li>
							<strong>Dress Codes:</strong>{" "}
							{data.importantNotes?.dressCodes}
						</li>
					)}
					{isValid(data.importantNotes?.localEtiquette) && (
						<li>
							<strong>Local Etiquette:</strong>{" "}
							{data.importantNotes?.localEtiquette}
						</li>
					)}
					{isValid(data.importantNotes?.transportation) && (
						<li>
							<strong>Transportation:</strong>{" "}
							{data.importantNotes?.transportation}
						</li>
					)}
					{isValid(data.importantNotes?.safety) && (
						<li>
							<strong>Safety:</strong>{" "}
							{data.importantNotes?.safety}
						</li>
					)}
				</ul>
			</section>

			{/* Budget Breakdown */}
			<footer className="mt-8">
				<h2 className="text-2xl font-bold text-gray-800">
					Budget Breakdown
				</h2>
				<div className="space-y-2 mt-4">
					{isValid(data.budgetBreakdown?.accommodation) && (
						<p>
							<strong>Accommodation:</strong>{" "}
							{data.budgetBreakdown?.accommodation}
						</p>
					)}
					{isValid(data.budgetBreakdown?.food) && (
						<p>
							<strong>Food:</strong>{" "}
							{data.budgetBreakdown?.food}
						</p>
					)}
					{isValid(data.budgetBreakdown?.travel) && (
						<p>
							<strong>Travel:</strong>{" "}
							{data.budgetBreakdown?.travel}
						</p>
					)}
					{isValid(data.budgetBreakdown?.activities) && (
						<p>
							<strong>Activities:</strong>{" "}
							{data.budgetBreakdown?.activities}
						</p>
					)}
					{isValid(data.budgetBreakdown?.miscellaneous) && (
						<p>
							<strong>Miscellaneous:</strong>{" "}
							{data.budgetBreakdown?.miscellaneous}
						</p>
					)}
				</div>
			</footer>

			{/* Cost-Conscious Recommendations */}
			<section className="mt-8">
				<h2 className="text-2xl font-bold text-gray-800">
					Cost-Conscious Recommendations
				</h2>
				<ul className="list-disc list-inside mt-4">
					{isValid(
						data.costConsciousRecommendations?.stay
					) && (
						<li>
							<strong>Stay:</strong>{" "}
							{data.costConsciousRecommendations?.stay}
						</li>
					)}
					{isValid(
						data.costConsciousRecommendations?.food
					) && (
						<li>
							<strong>Food:</strong>{" "}
							{data.costConsciousRecommendations?.food}
						</li>
					)}
					{isValid(
						data.costConsciousRecommendations?.travel
					) && (
						<li>
							<strong>Travel:</strong>{" "}
							{data.costConsciousRecommendations?.travel}
						</li>
					)}
					{isValid(
						data.costConsciousRecommendations?.activities
					) && (
						<li>
							<strong>Activities:</strong>{" "}
							{
								data.costConsciousRecommendations
									?.activities
							}
						</li>
					)}
				</ul>
			</section>

			{/* Summary */}
			{isValid(data.summary) && (
				<section className="mt-8">
					<h2 className="text-2xl font-bold text-gray-800">
						Summary
					</h2>
					<p className="text-gray-700">{data.summary}</p>
				</section>
			)}
		</div>
	);
};
