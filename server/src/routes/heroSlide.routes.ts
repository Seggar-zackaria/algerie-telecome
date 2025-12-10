import express from 'express';
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '../controllers/heroSlide.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getHeroSlides);
router.post('/', protect, admin, createHeroSlide);
router.put('/:id', protect, admin, updateHeroSlide);
router.delete('/:id', protect, admin, deleteHeroSlide);

export default router;
