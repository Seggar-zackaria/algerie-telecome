import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { LocalizedContent } from '@/lib/i18n-utils';

export type ContentType = 'NEWS' | 'EVENT' | 'TESTIMONIAL' | 'ABOUT_SECTION';

export interface Content {
  id: string;
  title: LocalizedContent;
  body: LocalizedContent;
  type: ContentType;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateContentInput = Omit<Content, 'id' | 'createdAt' | 'updatedAt' | 'published'> & {
    published?: boolean;
};

export const useContentQuery = (type?: ContentType) => {
  return useQuery({
    queryKey: ['content', type],
    queryFn: async () => {
      const params = type ? { type } : {};
      const { data } = await api.get<Content[]>('/content', { params });
      return data;
    },
  });
};

export const useAllContentAdminQuery = () => {
  return useQuery({
    queryKey: ['content', 'admin'],
    queryFn: async () => {
      const { data } = await api.get<Content[]>('/content/admin');
      return data;
    },
  });
};

export const useCreateContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContent: CreateContentInput) => {
      const { data } = await api.post<Content>('/content', newContent);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
    },
  });
};

export const useUpdateContentMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ id, ...data }: Partial<Content> & { id: string }) => {
        const response = await api.put<Content>(`/content/${id}`, data);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['content'] });
      },
    });
  };

export const useDeleteContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/content/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
    },
  });
};
