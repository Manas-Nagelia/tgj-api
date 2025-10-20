import { Router } from 'express';
import { analyzeArticleController } from '../../controllers/v1/ai.controller';

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "AI API is working" });
});
router.post('/analyze-article', analyzeArticleController);

export default router;