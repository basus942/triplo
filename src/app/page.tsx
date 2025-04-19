"use client";
import { useState } from "react";
import TripPlannerForm from "./lib/trip-planner-form";
import { TripDetails } from "./trip/page";

export default function Home() {
  const [data, setData] = useState(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-r from-sky-300 to-cyan-600">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">Triplo Trip Planner</h1>
        <p className="mt-3 text-lg text-gray-200">Plan your perfect getaway in just a few clicks</p>
      </div>
      {!data ? (
        <TripPlannerForm setData={setData} />
      ) : (
        <TripDetails data={data} />
      )}
    </main>
  );
}