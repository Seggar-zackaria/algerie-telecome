import express from 'express';
import { loginUser, registerAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

import { protect, admin } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginLimiter } from '../middleware/rateLimit.middleware.js';
import { loginSchema, registerAdminSchema } from '../schemas/validation.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginLimiter, validate(loginSchema), loginUser);

/**
 * @swagger
 * /api/auth/register-admin:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered
 *       400:
 *         description: User already exists
 */
router.post('/register-admin', protect, admin, validate(registerAdminSchema), registerAdmin);

export default router;
