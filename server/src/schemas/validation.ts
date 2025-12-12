import { z } from 'zod';
import { ContentType, RegistrationStatus } from '@prisma/client';

// --- Auth Schemas ---
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const registerAdminSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

// --- Hero Slide Schemas ---
export const createHeroSlideSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    // Coerce order to number because faulty frontend might send strings
    order: z.coerce.number().default(0),
    isActive: z.boolean().optional().default(true),
  }),
});

export const updateHeroSlideSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
  body: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    order: z.coerce.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

// --- Content Schemas ---
export const createContentSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    body: z.string().min(1, 'Body is required'),
    type: z.nativeEnum(ContentType),
    imageUrl: z.string().optional(),
    published: z.boolean().optional().default(true),
  }),
});

export const updateContentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
  body: z.object({
    title: z.string().optional(),
    body: z.string().optional(),
    type: z.nativeEnum(ContentType).optional(),
    imageUrl: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

// --- Registration Schemas ---
export const createRegistrationSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(9, 'Phone number must be at least 9 digits'),
    type: z.string().min(1, 'Type is required'),
    message: z.string().min(1, 'Message is required'),
  }),
});

export const updateRegistrationStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
  body: z.object({
    status: z.nativeEnum(RegistrationStatus),
  }),
});
