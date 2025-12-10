import { Request, Response } from 'express';

export const uploadFile = (req: Request, res: Response) => {
  if (req.file) {
    res.send({
        message: 'File uploaded',
        filePath: `/${req.file.path.replace(/\\/g, '/')}`, 
    });
  } else {
    res.status(400).send({ message: 'No file uploaded' });
  }
};
