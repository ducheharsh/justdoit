import { z } from "zod";

// Base schemas for shared fields
const baseEntitySchema = z.object({
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

type TaskPriority = 1 | 2 | 3;

export const taskPriorityEnum = {
    options: [1, 2, 3] as TaskPriority[],
    getPriorityLabel: (priority: TaskPriority) => {
        const labels = {
            1: "High",
            2: "Medium",
            3: "Low"
        };
        return labels[priority];
    }
};


// Auth Schemas
export const signInCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const signUpCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(3).max(50)
});

export const authResponseSchema = z.object({
    token: z.string(),
    user: z.object({
        id: z.number().int().positive(),
        email: z.string().email(),
        username: z.string(),
        password: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional()
    })
});

export type SignInCredentials = z.infer<typeof signInCredentialsSchema>;
export type SignUpCredentials = z.infer<typeof signUpCredentialsSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;

// User Schemas
export const userCreateSchema = baseEntitySchema.extend({
  username: z.string().min(3).max(50),
  email: z.string().email().max(100),
  password: z.string().min(8).max(100),
});

export const userUpdateSchema = userCreateSchema.partial().omit({ 
  createdAt: true,
  updatedAt: true 
});

export const userSchema = baseEntitySchema.extend({
  id: z.number().int().positive(),
  username: z.string().min(3).max(50),
  email: z.string().email().max(100),
  password: z.string().min(8).max(100),
});

// Project Schemas
export const projectCreateSchema = baseEntitySchema.extend({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  userId: z.number().int().positive().optional(),
});

export const projectUpdateSchema = projectCreateSchema.partial().omit({ 
  createdAt: true,
  updatedAt: true,
  userId: true 
});

export const projectSchema = baseEntitySchema.extend({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  userId: z.number().int().positive(),
});

// Category Schemas
export const categoryCreateSchema = baseEntitySchema.extend({
  name: z.string().min(1).max(50),
  userId: z.number().int().positive().optional(),
});

export const categoryUpdateSchema = categoryCreateSchema.partial().omit({ 
  createdAt: true,
  updatedAt: true,
  userId: true 
});

export const categorySchema = baseEntitySchema.extend({
  id: z.number().int().positive(),
  name: z.string().min(1).max(50),
  userId: z.number().int().positive(),
});

export const taskCreateSchema = baseEntitySchema.extend({
  title: z.string().min(1).max(100),
  description: z.string().optional().default(''),
  dueDate: z.date().optional().or(z.string().optional()),
  priority:z.number().int().min(1).max(3),
  isCompleted: z.boolean().default(false),
  userId: z.number().int().positive().optional(),
  projectId: z.number().int().positive().optional().or(z.string().optional()),
  categoryId: z.number().int().positive().optional().or(z.string().optional()).nullable(),
});

export const taskUpdateSchema = taskCreateSchema.partial().omit({ 
  createdAt: true,
  updatedAt: true,
  userId: true 
});

export const taskSchema = baseEntitySchema.extend({
  id: z.number().int().positive(),
  title: z.string().min(1).max(100),
  description: z.string().optional().nullable(),
  dueDate: z.date().optional().or(z.string().optional().nullable()),
  priority: z.number().int().min(1).max(3),
  isCompleted: z.boolean(),
  userId: z.number().int().positive(),
  projectId: z.number().int().positive().optional().or(z.string().optional()),
  categoryId: z.number().int().positive().optional().or(z.string().optional()).nullable(),
});

export const fetchProjectTasksSchema = z.object({
    projectId: z.number().int().positive(),
    projectName: z.string(),
    tasks: z.array(taskSchema),
})

// TypeScript Types
export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

export type Project = z.infer<typeof projectSchema>;
export type ProjectCreate = z.infer<typeof projectCreateSchema>;
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>;
export type ProjectTasks = z.infer<typeof fetchProjectTasksSchema>;

export type Category = z.infer<typeof categorySchema>;
export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>;

export type Task = z.infer<typeof taskSchema>;
export type TaskCreate = z.infer<typeof taskCreateSchema>;
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;

// Query parameter schemas for fetch operations
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});



export const userQuerySchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
}).extend(paginationSchema.shape);

export const projectQuerySchema = z.object({
  name: z.string().optional(),
  userId: z.number().int().positive().optional(),
}).extend(paginationSchema.shape);

export const categoryQuerySchema = z.object({
  name: z.string().optional(),
  userId: z.number().int().positive().optional(),
}).extend(paginationSchema.shape);

export const taskQuerySchema = z.object({
  title: z.string().optional(),
  isCompleted: z.boolean().optional(),
  priority: z.number().int().min(1).max(3).optional(),
  userId: z.number().int().positive().optional(),
  projectId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
  dueDateFrom: z.date().optional(),
  dueDateTo: z.date().optional(),
}).extend(paginationSchema.shape);

// Delete operation schemas
export const deleteSchema = z.object({
  id: z.number().int().positive(),
});

export type PaginationQuery = z.infer<typeof paginationSchema>;
export type UserQuery = z.infer<typeof userQuerySchema>;
export type ProjectQuery = z.infer<typeof projectQuerySchema>;
export type CategoryQuery = z.infer<typeof categoryQuerySchema>;
export type TaskQuery = z.infer<typeof taskQuerySchema>;
export type DeleteParams = z.infer<typeof deleteSchema>;