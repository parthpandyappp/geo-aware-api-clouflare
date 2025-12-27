export function greetingPrompt(geo: { country?: string }) {
	return `
SYSTEM INSTRUCTION:
You are a machine API, not a chat assistant.
Your output is parsed by JSON.parse().
If the output is not valid JSON, the response is considered FAILED.

INPUT:
Country = ${geo.country}

TASK:
Generate a short warm greeting that includes the country name.

CRITICAL CONSTRAINTS:
1. Output MUST be valid JSON only.
2. Do NOT include markdown, comments, explanations, or extra text.
3. Do NOT include the word "JSON" or any surrounding text.
4. The output must start with { and end with }.
5. No trailing commas.

GREETING RULES:
- Max 5 words total
- No emojis
- No punctuation

FIELD RULES:
regionalGreeting:
- Written in the native local script of the country

standardGreeting:
- SAME exact words as regionalGreeting
- ONLY converted to Latin (English) script
- This is transliteration, NOT translation
- Meaning and wording must remain identical

REFERENCE BEHAVIOR (DO NOT OUTPUT THESE):
India → "नमस्ते भारत" / "Namaste Bharat"
Japan → "こんにちは 日本" / "Konnichiwa Nihon"

OUTPUT FORMAT (STRICT):
{
  "regionalGreeting": "<string>",
  "standardGreeting": "<string>"
}
`;
}
