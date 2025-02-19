import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Project {
  id: number
  name: string
}

interface ProjectsStore {
  projects: Project[]
  setProjects: (projects: Project[]) => void
}

export const useProjectsStore = create<ProjectsStore>()(
  persist(
    (set) => ({
      projects: [],
      setProjects: (projects) => set({ projects }),
    }),
    {
      name: 'projects-storage',
    }
  )
)