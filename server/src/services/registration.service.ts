import { prisma } from '../prisma.js';
import { RegistrationStatus } from '@prisma/client';

export const createRegistration = async (data: {
  fullName: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}) => {
  return await prisma.registration.create({
    data,
  });
};

export const getRegistrations = async () => {
  return await prisma.registration.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const updateRegistrationStatus = async (id: string, status: RegistrationStatus) => {
  return await prisma.registration.update({
    where: { id },
    data: {
      status,
    },
  });
};
