import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import type { User } from '@/types/auth.types';

export const useCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: ['currentUser'],
    queryFn: AuthService.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
