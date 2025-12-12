import express from 'express';
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '../controllers/heroSlide.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createHeroSlideSchema, updateHeroSlideSchema } from '../schemas/validation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: HeroSlides
 *   description: Hero Slider Management
 */

/**
 * @swagger
 * /api/hero-slides:
 *   get:
 *     summary: Get all hero slides
 *     tags: [HeroSlides]
 *     responses:
 *       200:
 *         description: List of hero slides
 */
router.get('/', getHeroSlides);

/**
 * @swagger
 * /api/hero-slides:
 *   post:
 *     summary: Create new hero slide
 *     tags: [HeroSlides]
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
 *               - description
 *               - imageUrl
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hero slide created
 */
router.post('/', protect, admin, validate(createHeroSlideSchema), createHeroSlide);

/**
 * @swagger
 * /api/hero-slides/{id}:
 *   put:
 *     summary: Update hero slide
 *     tags: [HeroSlides]
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
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               link:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Hero slide updated
 */
router.put('/:id', protect, admin, validate(updateHeroSlideSchema), updateHeroSlide);

/**
 * @swagger
 * /api/hero-slides/{id}:
 *   delete:
 *     summary: Delete hero slide
 *     tags: [HeroSlides]
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
 *         description: Hero slide deleted
 */
router.delete('/:id', protect, admin, deleteHeroSlide);

export default router;
