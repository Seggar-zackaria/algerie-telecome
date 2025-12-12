import { Request, Response } from 'express';
import * as heroSlideService from '../services/heroSlide.service.js';

// @desc    Get all hero slides
// @route   GET /api/hero-slides
// @access  Public
export const getHeroSlides = async (req: Request, res: Response) => {
  try {
    const slides = await heroSlideService.getAllHeroSlides();
    res.json(slides);
  } catch (_error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a hero slide
// @route   POST /api/hero-slides
// @access  Private/Admin
export const createHeroSlide = async (req: Request, res: Response) => {
  try {
    const { title, subtitle, description, imageUrl, order, isActive } = req.body;
    
    // Basic validation / coercion could stay here or move to Zod later
    // For now we pass sanitized data to service
    const slideData = {
        title,
        subtitle,
        description,
        imageUrl,
        order: order ? parseInt(order) : 0,
        isActive: isActive !== undefined ? isActive : true,
    };

    const slide = await heroSlideService.createHeroSlide(slideData);
    res.status(201).json(slide);
  } catch (_error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a hero slide
// @route   PUT /api/hero-slides/:id
// @access  Private/Admin
export const updateHeroSlide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, imageUrl, order, isActive } = req.body;
    
    const updateData = {
        title,
        subtitle,
        description,
        imageUrl,
        order: order !== undefined ? parseInt(order) : undefined,
        isActive,
    };

    const slide = await heroSlideService.updateHeroSlide(id, updateData);
    res.json(slide);
  } catch (_error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a hero slide
// @route   DELETE /api/hero-slides/:id
// @access  Private/Admin
export const deleteHeroSlide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await heroSlideService.deleteHeroSlide(id);
    res.json({ message: 'Slide removed' });
  } catch (_error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
