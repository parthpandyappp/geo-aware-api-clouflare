import Replicate from 'replicate';

export async function generateGreeting(prompt: string, token: string) {
	const replicate = new Replicate({ auth: token });

	const input = {
		prompt,
		max_new_tokens: 128,
		prompt_template:
			'<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n',
	};

	// Non-streaming call
	const output = await replicate.run('meta/meta-llama-3-8b-instruct', {
		input,
	});

	console.log({ output });

	// The output can be string or array
	return Array.isArray(output) ? output.join('').trim() : String(output).trim();
}
