import { Router } from 'express';
import issuessRoutes from './issues.js';
const router = Router();

router.use('/issues', issuessRoutes);

export default router;
