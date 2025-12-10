import api from "@/lib/api";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHeroSlideData {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  order?: number;
  isActive?: boolean;
}

export type UpdateHeroSlideData = Partial<CreateHeroSlideData>;

export const HeroSlideService = {
  getAll: async () => {
    const response = await api.get<HeroSlide[]>("/hero-slides");
    return response.data;
  },

  create: async (data: CreateHeroSlideData) => {
    const response = await api.post<HeroSlide>("/hero-slides", data);
    return response.data;
  },

  update: async (id: string, data: UpdateHeroSlideData) => {
    const response = await api.put<HeroSlide>(`/hero-slides/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ message: string }>(`/hero-slides/${id}`);
    return response.data;
  },
};
