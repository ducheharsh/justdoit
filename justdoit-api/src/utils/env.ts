import { z } from 'zod';

export const env = z.object({
    PORT: z.string().default('3000'),
    DATABASE_URL: z.string().default('postgres://postgres:password@localhost:5432/db'),
    NODE_ENV: z.string().default('development'),
    JWT_SECRET: z.string().default('chillguy'),
});

export type Env = z.infer<typeof env>;

/**
 * Get parsed the environment variables
 */
export const config = env.parse(process.env);
