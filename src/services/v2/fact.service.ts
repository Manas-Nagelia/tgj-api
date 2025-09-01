import { zodTextFormat } from "openai/helpers/zod";
import { openai } from "../../clients/openai.client";
import { factSystemPrompt } from "../../prompts/v2/fact.prompt";
import { FactCheckResultSchema } from "../../schemas/fact.schemas";

export async function getFactCheck(article: string) {
  const ai_response = await openai.responses.parse({
    model: "gpt-5-mini",
    reasoning: { effort: "low" },
    tools: [{ type: "web_search_preview" }],
    input: [
      {
        role: "system",
        content: factSystemPrompt,
      },
      {
        role: "user",
        content: `Article text: ${article}`,
      },
    ],
    text: {
      format: zodTextFormat(FactCheckResultSchema, "fact_check"),
    },
  });

  const output = ai_response.output_parsed;
  
  return output;
}
