import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoriesAPI } from '@/lib/api';
import type {
  CategoryCreate, CategoryUpdate, CategoryQuery
} from '@/types';


// Categories Hooks
export const useCategories = (query?: CategoryQuery) => {
  return useQuery({
    queryKey: ['categories', query],
    queryFn: () => CategoriesAPI.getAll(),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newCategory: CategoryCreate) => CategoriesAPI.create(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdate }) =>
      CategoriesAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] });
    },
  });
};

