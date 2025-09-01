import z from "zod";

export const BiasRatingSchema = z.object({
  bias_rating: z.number().min(-1).max(1),
  explanation: z.string().max(700),
});