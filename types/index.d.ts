export type LocationKey =
  // Core
  | "france"
  | "usa"
  | "india"
  | "japan"
  | "brazil"
  | "australia"

  // Europe
  | "uk"
  | "germany"
  | "italy"
  | "spain"
  | "netherlands"

  // Asia
  | "china"
  | "singapore"
  | "uae"
  | "thailand"
  | "southKorea"

  // Americas
  | "canada"
  | "mexico"
  | "argentina"

  // Africa
  | "southAfrica"
  | "kenya";

export interface GreetingData {
  regionalGreeting: string;
  standardGreeting: string;
  country: string;
  city: string;
  timezone: string;
}
