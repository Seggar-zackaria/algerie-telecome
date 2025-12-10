import api from '@/lib/api';
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth.types';

export const AuthService = {
  login: async (data: LoginPayload) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterPayload) => {
    const response = await api.post<AuthResponse>('/auth/register-admin', data);
    return response.data;
  },
};
