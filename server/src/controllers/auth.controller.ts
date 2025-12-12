import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authData = await authService.loginUser(email, password);
  res.json(authData);
};

// @desc    Register a new admin (For initial setup mostly)
// @route   POST /api/auth/register-admin
// @access  Public (Should be protected or removed in prod)
export const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userData = await authService.registerAdmin({ name, email, password });
  res.status(201).json(userData);
};


