import { Router } from 'express';
import apiRoutes from './api/index.js';
const router = Router();
router.use('/api', apiRoutes);
// fallback 404
router.use('/api', (req, res) => res.status(404).json('No route for this path'));

export default router;
