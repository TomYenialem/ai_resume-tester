import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // 
console.log(process.env.DATABASE_URL); // ✅ for debugging

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // 
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
