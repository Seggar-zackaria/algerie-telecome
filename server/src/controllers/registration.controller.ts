import { Request, Response } from 'express';
import { RegistrationStatus } from '@prisma/client';
import * as registrationService from '../services/registration.service.js';

// @desc    Submit a new registration (Public)
// @route   POST /api/registrations
// @access  Public
export const createRegistration = async (req: Request, res: Response) => {
  const { fullName, email, phone, type, message } = req.body;

  try {
    const registration = await registrationService.createRegistration({
        fullName, email, phone, type, message
    });
    res.status(201).json(registration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Private/Admin
export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const registrations = await registrationService.getRegistrations();
    res.json(registrations);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update registration status
// @route   PATCH /api/registrations/:id
// @access  Private/Admin
export const updateRegistrationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const registration = await registrationService.updateRegistrationStatus(id, status as RegistrationStatus);
    res.json(registration);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};
