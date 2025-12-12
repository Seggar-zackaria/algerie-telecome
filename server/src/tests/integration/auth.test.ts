import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import { DeepMockProxy } from 'vitest-mock-extended';
import { Role } from '@prisma/client';

// We must import app after mocks if we were mocking modules used at import time, 
// but here we mock runtime dependencies.
import app from '../../app.js';
import { prisma } from '../../prisma.js';

// Get access to the mocked prisma instance
const prismaMock = prisma as unknown as DeepMockProxy<typeof prisma>;

// Mock bcrypt
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
      // Arrange
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

      // Act
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.email).toBe('test@example.com');
      
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
    });

    it('should return 401 when user does not exist', async () => {
      // Arrange
      prismaMock.user.findUnique.mockResolvedValue(null);

      // Act
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'notfound@example.com',
          password: 'password123',
        });

      // Assert
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    });

    it('should return 401 when password is incorrect', async () => {
        // Arrange
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
  
        // Act
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword',
          });
  
        // Assert
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid email or password');
      });

      it('should return 400 when Validation Fails (Zod)', async () => {
        // Act
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'invalid-email', // Bad email
            password: '12', // Too short
          });
  
        // Assert
        expect(res.status).toBe(400); // 400 from Zod middleware? Wait, default handle is 500 in my error handler? 
        // No, update process_zod validation middleware to send 400? 
        // Let's check validate.middleware.ts, it calls next() or res.status(400).
      });
  });
});
