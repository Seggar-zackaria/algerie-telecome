import express from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { uploadFile } from '../controllers/upload.controller.js';

const router = express.Router();

import { protect, admin } from '../middleware/auth.middleware.js';

router.post('/', protect, admin, upload.single('image'), uploadFile);

export default router;
