import z from "zod";

export const BiasRatingSchema = z.object({
  bias_rating: z.number().min(-1).max(1),
  explanation: z.string().max(300),
  claims: z.array(z.string().min(1)).min(0).max(5), // 0–5 claims
});