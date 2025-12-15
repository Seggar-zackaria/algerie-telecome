import { prisma } from '../prisma.js';
import { Prisma } from '@prisma/client';

export const getAllHeroSlides = async () => {
  return await prisma.heroSlide.findMany({
    orderBy: { order: 'asc' },
  });
};

export const createHeroSlide = async (data: {
  title: Prisma.InputJsonValue;
  subtitle?: string;
  description?: Prisma.InputJsonValue;
  imageUrl: string;
  order: number;
  isActive: boolean;
}) => {
  return await prisma.heroSlide.create({
    data,
  });
};

export const updateHeroSlide = async (
  id: string,
  data: {
    title?: Prisma.InputJsonValue;
    subtitle?: string;
    description?: Prisma.InputJsonValue;
    imageUrl?: string;
    order?: number;
    isActive?: boolean;
  }
) => {
  return await prisma.heroSlide.update({
    where: { id },
    data,
  });
};

export const deleteHeroSlide = async (id: string) => {
  return await prisma.heroSlide.delete({
    where: { id },
  });
};
