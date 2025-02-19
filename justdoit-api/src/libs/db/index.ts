import { config } from '../../utils/env';
import { drizzle } from 'drizzle-orm/neon-http'; // Use neon-http for serverless
import { neon } from '@neondatabase/serverless';
import * as schema from '../../schema';    

const sql = neon(config.DATABASE_URL); // Use Neon-compatible DB connection
export const db = drizzle(sql, { schema });

