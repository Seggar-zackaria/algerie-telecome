import { vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';

// Mock the prisma singleton
vi.mock('../prisma.js', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

// Set Env for testing
process.env.JWT_SECRET = 'test-secret';
process.env.BASE_URL = 'http://localhost:5173';

