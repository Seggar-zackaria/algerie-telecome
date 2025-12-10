import express from 'express';
import {
  createRegistration,
  getRegistrations,
  updateRegistrationStatus,
} from '../controllers/registration.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', createRegistration);
router.get('/', protect, admin, getRegistrations);
router.patch('/:id', protect, admin, updateRegistrationStatus);

export default router;
