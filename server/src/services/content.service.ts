import { prisma } from '../prisma.js';
import { ContentType } from '@prisma/client';

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

export const createContent = async (data: {
  title: string;
  body: string;
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
    title?: string;
    body?: string;
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
