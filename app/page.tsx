"use client";
import { useEffect, useState } from "react";

interface GreetingData {
  greeting: string;
  country: string;
  city: string;
  timezone: string;
}

const testParamsDict: Record<string, string> = {
  france: "?testCountry=FR&testCity=Paris&testTimezone=Europe/Paris",
  usa: "?testCountry=US&testCity=New%20York&testTimezone=America/New_York",
  india: "?testCountry=IN&testCity=Mumbai&testTimezone=Asia/Kolkata",
  japan: "?testCountry=JP&testCity=Tokyo&testTimezone=Asia/Tokyo",
  brazil: "?testCountry=BR&testCity=Sao%20Paulo&testTimezone=America/Sao_Paulo",
  australia: "?testCountry=AU&testCity=Sydney&testTimezone=Australia/Sydney",
};

export default function Home() {
  const [data, setData] = useState<GreetingData | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const api = "http://localhost:8787";
    const locationKey = "japan"; // change this to test another country
    const testParams = testParamsDict[locationKey];

    async function fetchGreeting() {
      try {
        const res = await fetch(`${api}/get-greetings${testParams}`);
        if (!res.ok) throw new Error("Failed to fetch greeting");
        const data = await res.json();
        setData(data);

        // Animate text
        setAnimate(true);

        // Determine dark/light mode based on timezone
        if (data?.timezone) {
          const now = new Date().toLocaleString("en-US", {
            timeZone: data.timezone,
          });
          const hour = new Date(now).getHours();
          // Night if before 6AM or after 6PM
          setDarkMode(hour < 6 || hour >= 18);
        }
      } catch (err) {
        console.error("Error fetching greeting:", err);
      }
    }

    fetchGreeting();
  }, []);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-zinc-50 text-black"
      } flex min-h-screen items-center justify-center font-sans transition-colors duration-500`}
    >
      {data ? (
        <p
          className={`text-4xl transition-all duration-700 ease-out ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {data.greeting}
        </p>
      ) : (
        <p className="text-xl animate-pulse">Loading...</p>
      )}
    </div>
  );
}
