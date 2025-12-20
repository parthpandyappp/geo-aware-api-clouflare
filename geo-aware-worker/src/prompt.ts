export function greetingPrompt(geo: { country?: string; city?: string; continent?: string }) {
	return `
  You are a polite assistant.
  
  Based on the following location:
  Country: ${geo.country}
  Continent: ${geo.continent}
  
  Generate a short, warm greeting
  in the most commonly spoken local language.
  
  for example the country is India then greeting should be "नमस्ते India"
  Rules:
  - Max 5 words
  - No emojis
  - No punctuation
  - No explanations
  - Only the greeting text
  `;
}
