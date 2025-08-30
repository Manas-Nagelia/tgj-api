import { Request, Response, NextFunction } from "express";
import { fetchArticle } from "../../services/article.service";
import { getBiasRating } from "../../services/bias.service";
import { getFactCheck } from "../../services/fact.service";

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
    const fact_check = await getFactCheck(article);

    if (!bias_rating)
      return res.status(500).json({ error: "AI response is empty" });

    if (!fact_check)
        return res.status(500).json({ error: "AI response is empty" });

    res.json({ bias_rating, fact_check });
  } catch (error) {
    next(error);
  }
}
