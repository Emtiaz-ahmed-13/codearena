import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres123@localhost:5435/codearena",
  },
});
