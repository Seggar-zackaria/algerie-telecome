
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { AxiosError } from 'axios';
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth.types';

export const useLoginMutation = () => {
  return useMutation<AuthResponse, AxiosError<{ message: string }>, LoginPayload>({
    mutationFn: AuthService.login,
  });
};

export const useRegisterMutation = () => {
  return useMutation<AuthResponse, AxiosError<{ message: string }>, RegisterPayload>({
    mutationFn: AuthService.register,
  });
};
