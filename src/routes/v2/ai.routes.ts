import { Router } from 'express';
import { analyzeArticleController } from '../../controllers/v2/ai.controller';

const router = Router();

router.post('/analyze-article', analyzeArticleController);

export default router;