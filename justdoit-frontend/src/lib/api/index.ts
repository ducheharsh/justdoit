import { api } from '@/lib/utils/api-client';
import {
  type Task, type TaskCreate, type TaskUpdate,
  type Project, type ProjectCreate, type ProjectUpdate,
  type Category, type CategoryCreate, type CategoryUpdate, projectSchema,
  SignInCredentials,
  AuthResponse,
  SignUpCredentials,
  authResponseSchema,
  fetchProjectTasksSchema,
  ProjectTasks,
  taskSchema
} from '@/types';

export class TasksAPI {
  static async getAll(): Promise<Task[]> {
    const { data } = await api.get('/tasks');
    return data.message;
  }

  static async getById(id: number): Promise<Task> {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  }

  static async create(task: TaskCreate): Promise<Task> {
    const { data } = await api.post('/tasks', task);
    return data;
  }

  static async update(id: number, task: TaskUpdate): Promise<Task> {
    const { data } = await api.patch(`/tasks/${id}`, task);
    return data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }

  static async getTasksByProjectId(projectId: number): Promise<Task[]> {
    const { data } = await api.get(`/tasks/project/${projectId}`);
    return taskSchema.array().parse(data.message)
  }
}

export class ProjectsAPI {
  static async getAll(): Promise<Project[]> {
    const { data } = await api.get('/projects');
    return projectSchema.array().parse(data.message) ;
  }

  static async create(project: ProjectCreate): Promise<Project> {
    const { data } = await api.post('/projects', project);
    return projectSchema.parse(data.message);
  }

  static async update(id: number, project: ProjectUpdate): Promise<Project> {
    const { data } = await api.patch(`/projects/${id}`, project);
    return data;
  }

  static async delete(id: number): Promise<void> {
    const {data} = await api.delete(`/projects/${ id }`);
    return data.message
  }

  static async getProjectTasksByName(name: string): Promise<ProjectTasks> {
    const { data } = await api.get(`/projects/${name}/tasks`);
    return fetchProjectTasksSchema.parse(data.message) ;
  }
}

export class CategoriesAPI {
  static async getAll(): Promise<Category[]> {
    const { data } = await api.get('/categories/all');
    return data.message;
  }

  static async create(category: CategoryCreate): Promise<Category> {
    const { data } = await api.post('/categories/create', category);
    return data;
  }

  static async update(id: number, category: CategoryUpdate): Promise<Category> {
    const { data } = await api.patch(`/categories/${id}`, category);
    return data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/categories/${id}`);
  
  }
}

export class AuthAPI {
  static async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const { data } = await api.post('/user/signin', credentials);
    const res = authResponseSchema.parse(data.message);
    // Store the JWT token
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    // Update Authorization header for future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${data.message.token}`;
    return res;
  }

  static async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    const { data } = await api.post('/user/create', credentials);
    const res = authResponseSchema.parse(data.message);
    // Store the JWT token if the API returns one upon signup
    if (data.message.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      api.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;
    }
    return res
  }

  static async signOut(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('projects-storage');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization']
  }

  static async checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }else{
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const { data } = await api.get('/auth/me')
    return data
  }

  static initializeAuth(): void {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  static getUser():{
    id: number;
    email: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }{
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}