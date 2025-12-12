import express from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { uploadFile } from '../controllers/upload.controller.js';

const router = express.Router();

import { protect, admin } from '../middleware/auth.middleware.js';

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: File Upload Management
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: /uploads/image-123456789.jpg
 */
router.post('/', protect, admin, upload.single('image'), uploadFile);

export default router;
