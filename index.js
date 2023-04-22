import { OpenAIClient } from "openai-fetch";
import { config } from "dotenv";

config();

{
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
  process.stdout.write("\n\n\n");
}

{
  const client = new OpenAIClient(process.env.OPENAI_API_KEY);
  const stream = await client.streamChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello!" }],
  });

  for await (const chunk of stream) {
    if (!chunk.message.content) continue;
    process.stdout.write(chunk.message.content);
  }
  process.stdout.write("\n\n\n");
}
