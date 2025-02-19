import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksAPI } from '@/lib/api';
import type {
  TaskCreate, TaskUpdate, TaskQuery
} from '@/types';


export const useTasks = (query?: TaskQuery) => {
  return useQuery({
    queryKey: ['tasks', query],
    queryFn: () => TasksAPI.getAll(),
  });
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => TasksAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newTask: TaskCreate) => TasksAPI.create(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskUpdate }) => 
      TasksAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['tasks', variables.data.projectId] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: TasksAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useTasksByProjectId = (projectId: number) => {
    return useQuery({
        queryKey: ['tasks', projectId],
        queryFn: () => TasksAPI.getTasksByProjectId(projectId),
        enabled: !!projectId,
    });
}