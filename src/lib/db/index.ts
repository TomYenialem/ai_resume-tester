import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error(" database not found");
}

const database = neon(process.env.DATABASE_URL);

export const db = drizzle(database);
