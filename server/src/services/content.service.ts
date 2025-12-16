import { prisma } from '../prisma.js';
import { ContentType, Prisma } from '@prisma/client';

export const getContent = async (type?: string) => {
  const whereClause = type
    ? { type: type as ContentType, published: true }
    : { published: true };

  return await prisma.content.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });
};

export const getAllContentAdmin = async () => {
  return await prisma.content.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getContentById = async (id: string) => {
  return await prisma.content.findUnique({
    where: { id },
  });
};

export const createContent = async (data: {
  title: Prisma.InputJsonValue;
  body: Prisma.InputJsonValue;
  type: ContentType;
  imageUrl?: string;
  published: boolean;
}) => {
  return await prisma.content.create({
    data,
  });
};

export const updateContent = async (
  id: string,
  data: {
    title?: Prisma.InputJsonValue;
    body?: Prisma.InputJsonValue;
    type?: ContentType;
    imageUrl?: string;
    published?: boolean;
  }
) => {
  return await prisma.content.update({
    where: { id },
    data,
  });
};

export const deleteContent = async (id: string) => {
  return await prisma.content.delete({
    where: { id },
  });
};
