import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import { DeepMockProxy } from 'vitest-mock-extended';
import { Role } from '@prisma/client';


import app from '../../app.js';
import { prisma } from '../../prisma.js';

const prismaMock = prisma as unknown as DeepMockProxy<typeof prisma>;

vi.mock('bcrypt', () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
    genSalt: vi.fn(),
  },
}));

describe('Integration: Auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 and a token when credentials are valid', async () => {
      const mockUser = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: Role.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.email).toBe('test@example.com');
      
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
    });

    it('should return 401 when user does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'notfound@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    });

    it('should return 401 when password is incorrect', async () => {
        const mockUser = {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          password: 'hashedpassword',
          role: Role.ADMIN,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
  
        prismaMock.user.findUnique.mockResolvedValue(mockUser);
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
  
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword',
          });
  
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid email or password');
      });

      it('should return 400 when Validation Fails (Zod)', async () => {
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'invalid-email',
            password: '12',
          });
  
        expect(res.status).toBe(400);
      });
  });
});
