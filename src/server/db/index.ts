import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

// Get the connection string from environment variables
const connectionString = process.env.DATABASE_URL;

// Check if the environment variable is set
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });