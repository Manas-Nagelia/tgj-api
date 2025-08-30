import { Router } from 'express';
import ai from './ai.routes';

const router = Router();
router.use('/ai', ai);

export default router;