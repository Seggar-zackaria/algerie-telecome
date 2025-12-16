import React from "react";
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from '@/hooks/useAuth';
import api from "@/lib/api";
import type { User } from "@/types/auth.types";
import { AuthContext } from "./auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data: user, isLoading: loading, isSuccess } = useCurrentUser();

  const isAuthenticated = isSuccess && !!user;

  const login = (_token: string, userData: User) => {
    queryClient.setQueryData(['currentUser'], userData);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    }
    queryClient.setQueryData(['currentUser'], null);
  };

  return (
    <AuthContext.Provider value={{ user: user || null, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
