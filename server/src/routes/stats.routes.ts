import express from 'express';
import { getDashboardStats } from '../controllers/stats.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get('/', protect, getDashboardStats);

export default router;
