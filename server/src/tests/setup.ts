import { vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';

vi.mock('../prisma.js', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));
process.env.JWT_SECRET = 'test-secret';
process.env.BASE_URL = 'http://localhost:5173';

