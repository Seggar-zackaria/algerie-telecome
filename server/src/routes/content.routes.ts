import express from 'express';
import {
  getContent,
  getAllContentAdmin,
  createContent,
  updateContent,
  deleteContent,
} from '../controllers/content.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createContentSchema, updateContentSchema } from '../schemas/validation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Dynamic Content Management
 */

/**
 * @swagger
 * /api/content:
 *   get:
 *     summary: Get all public content
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: List of content
 */
router.get('/', getContent);

/**
 * @swagger
 * /api/content/admin:
 *   get:
 *     summary: Get all content (Admin)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all content
 */
router.get('/admin', protect, admin, getAllContentAdmin);

/**
 * @swagger
 * /api/content:
 *   post:
 *     summary: Create new content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [NEWS, ACTIVITE, OFFRE]
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Content created
 */
router.post('/', protect, admin, validate(createContentSchema), createContent);

/**
 * @swagger
 * /api/content/{id}:
 *   put:
 *     summary: Update content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Content updated
 */
router.put('/:id', protect, admin, validate(updateContentSchema), updateContent);

/**
 * @swagger
 * /api/content/{id}:
 *   delete:
 *     summary: Delete content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content deleted
 */
router.delete('/:id', protect, admin, deleteContent);

export default router;
