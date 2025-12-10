import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HeroSlideService, type HeroSlide, type CreateHeroSlideData, type UpdateHeroSlideData } from "../services/heroSlide.service";
import { AxiosError } from "axios";

export const useHeroSlides = () => {
  return useQuery({
    queryKey: ["hero-slides"],
    queryFn: HeroSlideService.getAll,
  });
};

export const useCreateHeroSlideMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<HeroSlide, AxiosError<{ message: string }>, CreateHeroSlideData>({
    mutationFn: HeroSlideService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
    },
  });
};

export const useUpdateHeroSlideMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<HeroSlide, AxiosError<{ message: string }>, { id: string; data: UpdateHeroSlideData }>({
    mutationFn: ({ id, data }) => HeroSlideService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
    },
  });
};

export const useDeleteHeroSlideMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, AxiosError<{ message: string }>, string>({
    mutationFn: HeroSlideService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
    },
  });
};
