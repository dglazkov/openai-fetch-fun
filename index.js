import { OpenAIClient } from "openai-fetch";
import { config } from "dotenv";

config();

const client = new OpenAIClient(process.env.OPENAI_API_KEY);
const stream = await client.streamCompletion({
  model: "text-davinci-003",
  prompt: "Give me some lyrics, make it up.",
  max_tokens: 256,
  temperature: 0,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.completion);
}
