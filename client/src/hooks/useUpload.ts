import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

interface UploadResponse {
  filePath: string;
}

export const useUploadMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post<UploadResponse>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return data;
    },
  });
};
