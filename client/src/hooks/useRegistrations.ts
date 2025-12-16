import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  type: string;
  center?: string;
  spaceType?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message?: string;
  createdAt: string;
}

export const useRegistrationsQuery = () => {
  return useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const { data } = await api.get<Registration[]>("/registrations");
      return data;
    },
  });
};

export const useUpdateRegistrationStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'APPROVED' | 'REJECTED' }) => {
      const { data } = await api.patch<Registration>(`/registrations/${id}`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
};
