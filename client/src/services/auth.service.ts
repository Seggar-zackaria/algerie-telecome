import api from '@/lib/api';
import type { LoginPayload, AuthResponse, User } from '@/types/auth.types';

export const AuthService = {
  login: async (data: LoginPayload) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};
