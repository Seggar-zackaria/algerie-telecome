import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface DashboardStats {
  registration: {
    total: number;
    pending: number;
  };
  content: {
    total: number;
  };
  heroSlides: {
    active: number;
  };
  recentActivity: Array<{
    id: string;
    fullName: string;
    email: string;
    status: string;
    createdAt: string;
  }>;
}

export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>('/stats');
      return data;
    },
  });
};
