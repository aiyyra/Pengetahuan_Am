// src/db/index.ts

import { drizzle } from 'drizzle-orm/neon-http';

// Get the connection string from environment variables
const connectionString = process.env.DATABASE_URL;

// Check if the environment variable is set
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

// Export the Drizzle instance
export const  db = drizzle(connectionString);

