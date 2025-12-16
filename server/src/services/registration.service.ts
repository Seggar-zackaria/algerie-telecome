import { prisma } from '../prisma.js';
import { RegistrationStatus } from '@prisma/client';
import { sendApprovalEmail } from './email.service.js';

export const createRegistration = async (data: {
  fullName: string;
  email: string;
  phone: string;
  type: string;
  center: string;
  spaceType: string;
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
  const updatedRegistration = await prisma.registration.update({
    where: { id },
    data: {
      status,
    },
  });

  if (status === 'APPROVED') {
    await sendApprovalEmail(updatedRegistration.email, updatedRegistration.fullName);
  }

  return updatedRegistration;
};
