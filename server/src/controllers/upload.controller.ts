import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const uploadFile = async (req: Request, res: Response) => {
  if (req.file) {
    try {
      const filename = `image-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
      const outputPath = path.resolve('uploads', filename);

      // Ensure uploads directory exists
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }

      await sharp(req.file.buffer)
        .resize({ width: 1920, withoutEnlargement: true }) // Resize to max width 1920px
        .toFormat('jpeg', { quality: 80 }) // Compress to JPEG with 80% quality
        .toFile(outputPath);

      res.send({
        message: 'File uploaded',
        filePath: `/uploads/${filename}`,
      });
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).send({ message: 'Error processing image' });
    }
  } else {
    res.status(400).send({ message: 'No file uploaded' });
  }
};
