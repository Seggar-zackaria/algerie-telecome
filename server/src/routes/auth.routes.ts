import express from 'express';
import { loginUser, registerAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

import { protect, admin } from '../middleware/auth.middleware.js';

router.post('/login', loginUser);
router.post('/register-admin', protect, admin, registerAdmin);

export default router;
