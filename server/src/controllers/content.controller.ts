import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { ContentType } from '@prisma/client';

// @desc    Get all content (Public, with optional type filter)
// @route   GET /api/content
// @access  Public
export const getContent = async (req: Request, res: Response) => {
  const { type } = req.query;

  try {
    const whereClause = type ? { type: type as ContentType, published: true } : { published: true };
    const content = await prisma.content.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
    res.json(content);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all content (Admin, includes unpublished)
// @route   GET /api/content/admin
// @access  Private/Admin
export const getAllContentAdmin = async (req: Request, res: Response) => {
  try {
    const content = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(content);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new content
// @route   POST /api/content
// @access  Private/Admin
export const createContent = async (req: Request, res: Response) => {
  const { title, body, type, imageUrl, published } = req.body;

  try {
    const content = await prisma.content.create({
      data: {
        title,
        body,
        type: type as ContentType,
        imageUrl,
        published: published ?? true,
      },
    });
    res.status(201).json(content);
  } catch (_error) {
    console.error(_error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private/Admin
export const updateContent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body, type, imageUrl, published } = req.body;

  try {
    const content = await prisma.content.update({
      where: { id },
      data: {
        title,
        body,
        type: type as ContentType,
        imageUrl,
        published,
      },
    });
    res.json(content);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private/Admin
export const deleteContent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.content.delete({
      where: { id },
    });
    res.json({ message: 'Content removed' });
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};
