import { Request, Response, NextFunction } from "express";
import { fetchArticle } from "../../services/article.service";
import { getBiasRating } from "../../services/v1/bias.service";

export async function analyzeArticleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Missing url in request body" });
    }

    const article = await fetchArticle(url);

    if (!article)
      return res.status(404).json({ error: "Could not extract article" });

    const bias_rating = await getBiasRating(article);

    if (!bias_rating)
      return res.status(500).json({ error: "AI response is empty" });

    console.log(bias_rating.explanation)
    res.json({ bias_rating });
  } catch (error) {
    next(error);
  }
}
