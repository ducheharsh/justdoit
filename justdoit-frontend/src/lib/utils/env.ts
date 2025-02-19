import { z } from 'zod';

export const env = z.object({
    NEXT_PUBLIC_API_URL: z.string().default("https://justdoit-api-v1.ducheharsh.workers.dev"),
    NEXT_PUBLIC_API_URL_LOCAL: z.string().optional().default("http://localhost:3000"),
});

export type Env = z.infer<typeof env>;

/**
 * Get parsed the environment variables
 */
export const config = env.parse(process.env);