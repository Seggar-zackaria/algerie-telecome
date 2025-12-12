import { prisma } from '../prisma.js';

export const getAllHeroSlides = async () => {
  return await prisma.heroSlide.findMany({
    orderBy: { order: 'asc' },
  });
};

export const createHeroSlide = async (data: {
  title: string;
  subtitle?: string;
  description?: string;
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
    title?: string;
    subtitle?: string;
    description?: string;
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
