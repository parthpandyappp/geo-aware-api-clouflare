import { LocationKey } from "@/types";

/**
 * @description
 * below test params are used to test the service for mocking different countries
 */
export const TEST_PARAMS: Record<LocationKey, string> = {
  france: "?testCountry=FR&testCity=Paris&testTimezone=Europe/Paris",
  usa: "?testCountry=US&testCity=New%20York&testTimezone=America/New_York",
  india: "?testCountry=IN&testCity=Mumbai&testTimezone=Asia/Kolkata",
  japan: "?testCountry=JP&testCity=Tokyo&testTimezone=Asia/Tokyo",
  brazil: "?testCountry=BR&testCity=Sao%20Paulo&testTimezone=America/Sao_Paulo",
  australia: "?testCountry=AU&testCity=Sydney&testTimezone=Australia/Sydney",

  uk: "?testCountry=GB&testCity=London&testTimezone=Europe/London",
  germany: "?testCountry=DE&testCity=Berlin&testTimezone=Europe/Berlin",
  italy: "?testCountry=IT&testCity=Rome&testTimezone=Europe/Rome",
  spain: "?testCountry=ES&testCity=Madrid&testTimezone=Europe/Madrid",
  netherlands:
    "?testCountry=NL&testCity=Amsterdam&testTimezone=Europe/Amsterdam",

  // 🌏 Asia
  china: "?testCountry=CN&testCity=Shanghai&testTimezone=Asia/Shanghai",
  singapore: "?testCountry=SG&testCity=Singapore&testTimezone=Asia/Singapore",
  uae: "?testCountry=AE&testCity=Dubai&testTimezone=Asia/Dubai",
  thailand: "?testCountry=TH&testCity=Bangkok&testTimezone=Asia/Bangkok",
  southKorea: "?testCountry=KR&testCity=Seoul&testTimezone=Asia/Seoul",

  // 🌎 Americas
  canada: "?testCountry=CA&testCity=Toronto&testTimezone=America/Toronto",
  mexico:
    "?testCountry=MX&testCity=Mexico%20City&testTimezone=America/Mexico_City",
  argentina:
    "?testCountry=AR&testCity=Buenos%20Aires&testTimezone=America/Argentina/Buenos_Aires",

  // 🌍 Africa
  southAfrica:
    "?testCountry=ZA&testCity=Johannesburg&testTimezone=Africa/Johannesburg",
  kenya: "?testCountry=KE&testCity=Nairobi&testTimezone=Africa/Nairobi",
};
