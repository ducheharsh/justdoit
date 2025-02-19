import { pgTable, serial, text, timestamp, varchar, integer, boolean, date, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

// Categories Table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(), // Foreign key to users
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});