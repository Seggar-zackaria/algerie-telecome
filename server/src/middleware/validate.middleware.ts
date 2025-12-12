import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors,
      });
      return;
    }
    // Unknown error, pass to global handler or send failure
    res.status(400).json({ message: 'Validation failed' });
  }
};
