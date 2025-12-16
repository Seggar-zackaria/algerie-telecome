import { z } from 'zod';

// Define enums locally to avoid importing massive @prisma/client in frontend
export const ContentType = {
  NEWS: 'NEWS',
  EVENT: 'EVENT',
  TESTIMONIAL: 'TESTIMONIAL',
  ABOUT_SECTION: 'ABOUT_SECTION',
} as const;

export const RegistrationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;


// --- Shared Schemas ---
const localizedStringSchema = z.object({
  en: z.string().min(1, 'English text is required'),
  fr: z.string().min(1, 'French text is required'),
  ar: z.string().min(1, 'Arabic text is required'),
});

// --- Auth Schemas ---
export const loginBodySchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  body: loginBodySchema,
});

export const registerAdminBodySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerAdminSchema = z.object({
  body: registerAdminBodySchema,
});

// --- Hero Slide Schemas ---
// Reusable schema for the form data itself
export const heroSlideBodySchema = z.object({
  title: localizedStringSchema,
  subtitle: z.string().optional(),
  description: localizedStringSchema.optional(),
  imageUrl: z.string().min(1, 'Image is required'),
  // Coerce order because form data might be strings, but usage in code desires numbers
  order: z.union([z.string(), z.number()]).pipe(z.coerce.number()).default(0),
  isActive: z.boolean().optional().default(true),
});

export const createHeroSlideSchema = z.object({
  body: heroSlideBodySchema,
});

export const updateHeroSlideSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
  body: heroSlideBodySchema.partial(),
});

// --- Content Schemas ---
export const contentFormSchema = z.object({
  title: localizedStringSchema,
  body: localizedStringSchema,
  type: z.nativeEnum(ContentType),
  imageUrl: z.string().optional(),
  published: z.boolean().optional().default(true),
});

export const createContentSchema = z.object({
  body: contentFormSchema,
});

export const updateContentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
  body: contentFormSchema.partial(),
});

// --- Registration Schemas ---
export const registrationBodySchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number must be at least 9 digits'),
  type: z.string().min(1, 'Type is required'),
  center: z.string().min(1, 'Center is required'),
  spaceType: z.string().min(1, 'Space type is required'),
  message: z.string().min(1, 'Message is required'),
});

export const createRegistrationSchema = z.object({
  body: registrationBodySchema,
});

export const updateRegistrationStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
  body: z.object({
    status: z.nativeEnum(RegistrationStatus),
  }),
});
