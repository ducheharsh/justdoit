import { z } from "zod";

// Base schemas for shared fields
const baseEntitySchema = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

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

// Task Schemas
export const taskPriorityEnum = z.enum(['1', '2', '3']);

export const taskCreateSchema = baseEntitySchema.extend({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.number().min(1).max(3).default(1),
  isCompleted: z.boolean().default(false),
  userId: z.number().int().positive().optional(),
  projectId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
});

export const taskUpdateSchema = taskCreateSchema.partial().omit({ 
  createdAt: true,
  updatedAt: true,
  userId: true 
});

export const taskSchema = baseEntitySchema.extend({
  id: z.number().int().positive(),
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: taskPriorityEnum,
  isCompleted: z.boolean(),
  userId: z.number().int().positive(),
  projectId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
});

// TypeScript Types
export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

export type Project = z.infer<typeof projectSchema>;
export type ProjectCreate = z.infer<typeof projectCreateSchema>;
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>;

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
  priority: taskPriorityEnum.optional(),
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