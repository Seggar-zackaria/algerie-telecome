import { Request, Response } from 'express';
import { ContentType } from '@prisma/client';
import * as contentService from '../services/content.service.js';
import { deleteFile } from '../utils/file.utils.js';

// @desc    Get all content (Public, with optional type filter)
// @route   GET /api/content
// @access  Public
export const getContent = async (req: Request, res: Response) => {
  const { type } = req.query;

  try {
    const content = await contentService.getContent(type as string);
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
    const content = await contentService.getAllContentAdmin();
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
    // Basic validation/coercion could happen here or in schemas
    const contentData = {
        title,
        body,
        type: type as ContentType,
        imageUrl,
        published: published ?? true,
    };
    
    const content = await contentService.createContent(contentData);
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
    const updateData = {
        title,
        body,
        type: type as ContentType,
        imageUrl,
        published,
    };

    // Check if we need to delete old image
    if (imageUrl) {
      const existingContent = await contentService.getContentById(id);
      if (existingContent && existingContent.imageUrl && existingContent.imageUrl !== imageUrl) {
        deleteFile(existingContent.imageUrl);
      }
    }

    const content = await contentService.updateContent(id, updateData);
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
    const content = await contentService.getContentById(id);
    if (content && content.imageUrl) {
      deleteFile(content.imageUrl);
    }
    await contentService.deleteContent(id);
    res.json({ message: 'Content removed' });
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};
