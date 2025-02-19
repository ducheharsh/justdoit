import { pgTable, serial, text, timestamp, varchar, integer, boolean, date, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  userId: integer('user_id').references(() => users.id).notNull(), // Foreign key to users
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});