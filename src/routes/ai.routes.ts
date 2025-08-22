import { Router } from 'express';
import { analyzeArticleController } from '../controllers/ai.controller';

const router = Router();

router.post('/analyze-article', analyzeArticleController);

export default router;