import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis;

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres123@localhost:5435/codearena",
});

// Create the PostgreSQL adapter
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with the adapter for Prisma v7+
export const db = globalForPrisma.prisma || new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;