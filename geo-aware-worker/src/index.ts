import { generateGreeting } from './replicate';
import { greetingPrompt } from './prompt';

const worker = {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// -------------------------------
		// Resolve Replicate token
		// -------------------------------
		const replicateToken = env.REPLICATE_API_TOKEN;

		// -------------------------------
		// Cloudflare Geo Metadata
		// -------------------------------
		const cf = request.cf || {};
		const qp = url.searchParams;
		const metadata = {
			country: qp.get('testCountry') ?? cf.country ?? null,
			city: qp.get('testCity') ?? cf.city ?? null,
			continent: qp.get('testContinent') ?? cf.continent ?? null,
			region: qp.get('testRegion') ?? cf.region ?? null,
			timezone: qp.get('testTimezone') ?? cf.timezone ?? null,
			latitude: cf.latitude ?? null,
			longitude: cf.longitude ?? null,
		};

		// -------------------------------
		// /get-metadata
		// -------------------------------
		if (url.pathname === '/get-metadata') {
			return new Response(JSON.stringify(metadata), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
		}

		// -------------------------------
		// /get-greetings
		// -------------------------------
		if (url.pathname === '/get-greetings') {
			if (!replicateToken) {
				return new Response(JSON.stringify({ error: 'REPLICATE_API_TOKEN is missing' }), {
					status: 500,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				});
			}

			const prompt = greetingPrompt(metadata);

			let greetingData = {
				regionalGreeting: 'Hello',
				standardGreeting: 'Hello',
			};

			try {
				const raw = await generateGreeting(prompt, replicateToken);

				// Safely parse JSON from model output
				const parsed = JSON.parse(raw);

				if (parsed?.regionalGreeting && parsed?.standardGreeting) {
					greetingData = parsed;
				}
			} catch (err) {
				console.error('Replicate / JSON parse error:', err);
			}

			return new Response(
				JSON.stringify({
					...greetingData,
					country: metadata.country,
					city: metadata.city,
					timezone: metadata.timezone,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Cache-Control': 'public, max-age=3600',
					},
				}
			);
		}

		// -------------------------------
		// 404
		// -------------------------------
		return new Response('Not Found', {
			status: 404,
		});
	},
};

export default worker;
