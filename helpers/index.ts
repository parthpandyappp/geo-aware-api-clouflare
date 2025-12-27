export function isNightTime(timezone: string): boolean {
  const localTime = new Date().toLocaleString("en-US", { timeZone: timezone });
  const hour = new Date(localTime).getHours();
  return hour < 6 || hour >= 18;
}
