import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authData = await authService.loginUser(email, password);
  
  // Set HttpOnly Cookie
  res.cookie('jwt', authData.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure in prod
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  const { ...userData } = authData;
  res.json(userData);
};

// @desc    Register a new admin (For initial setup mostly)
// @route   POST /api/auth/register-admin
// @access  Public (Should be protected or removed in prod)
export const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userData = await authService.registerAdmin({ name, email, password });
  res.status(201).json(userData);
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }
  
  const user = await authService.getUserById(req.user.id);
  res.json(user);
};

// @desc    Log user out / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
