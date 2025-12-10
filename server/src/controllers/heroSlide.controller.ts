import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc    Get all hero slides
// @route   GET /api/hero-slides
// @access  Public
export const getHeroSlides = async (req: Request, res: Response) => {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    });
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
    const slide = await prisma.heroSlide.create({
      data: {
        title,
        subtitle,
        description,
        imageUrl,
        order: order ? parseInt(order) : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });
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
    
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        title,
        subtitle,
        description,
        imageUrl,
        order: order !== undefined ? parseInt(order) : undefined,
        isActive,
      },
    });
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
    await prisma.heroSlide.delete({
      where: { id },
    });
    res.json({ message: 'Slide removed' });
  } catch (_error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
