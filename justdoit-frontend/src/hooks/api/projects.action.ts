import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectsAPI } from '@/lib/api';
import type {
  ProjectCreate, ProjectUpdate
} from '@/types';
import { useEffect } from 'react';
import { useProjectsStore } from '../store/projectStore';


export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsAPI.getAll(),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
return useMutation({
    mutationKey: ['createProject'],
    mutationFn: (newProject: ProjectCreate) => ProjectsAPI.create(newProject),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });

    },
});
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProjectUpdate }) =>
      ProjectsAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', variables.id] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ProjectsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export const useTaskByProjectName = (name: string) => {
    return useQuery({
        queryKey: ['tasks', name],
        queryFn: () => ProjectsAPI.getProjectTasksByName(name),
        enabled: !!name,
    });
}

export const useProjectsWithCache = () => {
  const { data, isLoading, refetch } = useProjects()
  const { projects, setProjects } = useProjectsStore()
  
  useEffect(() => {
    if (data) {
      setProjects(data)
    }
  }, [data, setProjects])

  // Return cached projects immediately if available
  return {
    data: projects.length > 0 ? projects : data,
    isLoading: projects.length === 0 && isLoading,
    refetch
  }
}