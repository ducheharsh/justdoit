
import { pgTable, serial, text, timestamp, varchar, integer, boolean, date, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { projects } from './projects.schema';
import { categories } from './categories.schema';


// Tasks Table
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  dueDate: date('due_date'),
  priority: integer('priority').default(1), // 1 = Low, 2 = Medium, 3 = High
  isCompleted: boolean('is_completed').default(false),
  userId: integer('user_id').references(() => users.id).notNull(), // Foreign key to users
  projectId: integer('project_id').references(() => projects.id), // Foreign key to projects
  categoryId: integer('category_id').references(() => categories.id), // Foreign key to categories
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});