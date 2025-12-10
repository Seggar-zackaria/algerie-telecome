import express from 'express';
import {
  getContent,
  getAllContentAdmin,
  createContent,
  updateContent,
  deleteContent,
} from '../controllers/content.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getContent);
router.get('/admin', protect, admin, getAllContentAdmin);
router.post('/', protect, admin, createContent);
router.put('/:id', protect, admin, updateContent);
router.delete('/:id', protect, admin, deleteContent);

export default router;
