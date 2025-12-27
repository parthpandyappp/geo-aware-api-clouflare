"use client";

import { isNightTime } from "@/helpers";
import { TEST_PARAMS } from "@/constants";
import { useEffect, useState } from "react";
import { GreetingData, LocationKey } from "@/types";

export default function Home() {
  const [data, setData] = useState<GreetingData | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const API_BASE = "http://localhost:8787";
    const locationKey: LocationKey = "italy";

    async function fetchGreeting() {
      try {
        console.log({
          v: `${API_BASE}/get-greetings${TEST_PARAMS[locationKey]}`,
        });
        const response = await fetch(
          `${API_BASE}/get-greetings${TEST_PARAMS[locationKey]}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch greeting");
        }

        const result: GreetingData = await response.json();

        setData(result);
        setAnimate(true);

        if (result.timezone) {
          setDarkMode(isNightTime(result.timezone));
        }
      } catch (error) {
        console.error("Greeting fetch error:", error);
      }
    }

    fetchGreeting();
  }, []);

  return (
    <div
      className={[
        "flex min-h-screen items-center justify-center font-sans",
        "transition-colors duration-500",
        darkMode ? "bg-black text-white" : "bg-zinc-50 text-black",
      ].join(" ")}
    >
      {!data ? (
        <p className="text-xl animate-pulse">Loading...</p>
      ) : (
        <div
          className={`text-center transition-all duration-700 ease-out ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-5xl font-semibold">{data.regionalGreeting}</p>
          <p className="mt-2 text-xl opacity-70">{data.standardGreeting}</p>
        </div>
      )}
    </div>
  );
}
