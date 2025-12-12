import express from 'express';
import {
  createRegistration,
  getRegistrations,
  updateRegistrationStatus,
} from '../controllers/registration.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createRegistrationSchema, updateRegistrationStatusSchema } from '../schemas/validation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: Registration Management
 */

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Submit a new registration
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phoneNumber
 *               - type
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [FIBER, ADSL, 4G]
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration submitted successfully
 */
router.post('/', validate(createRegistrationSchema), createRegistration);

/**
 * @swagger
 * /api/registrations:
 *   get:
 *     summary: Get all registrations (Admin)
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all registrations
 */
router.get('/', protect, admin, getRegistrations);

/**
 * @swagger
 * /api/registrations/{id}:
 *   patch:
 *     summary: Update registration status
 *     tags: [Registrations]
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *     responses:
 *       200:
 *         description: Registration status updated
 */
router.patch('/:id', protect, admin, validate(updateRegistrationStatusSchema), updateRegistrationStatus);

export default router;
