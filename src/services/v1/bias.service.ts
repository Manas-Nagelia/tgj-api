import { zodTextFormat } from "openai/helpers/zod";
import { openai } from "../../clients/openai.client";
import { biasSystemPrompt } from "../../prompts/v1/bias.prompt";
import { BiasRatingSchema } from "../../schemas/v1/bias.schemas";

export async function getBiasRating(article: string) {
  const ai_response = await openai.responses.parse({
    model: "gpt-5-mini",
    reasoning: { effort: "low" },
    input: [
      {
        role: "system",
        content: biasSystemPrompt,
      },
      {
        role: "user",
        content: `Article text: ${article}`,
      },
    ],
    text: {
      format: zodTextFormat(BiasRatingSchema, "bias_rating"),
    },
  });

  const output = ai_response.output_parsed;

  return output;
}
