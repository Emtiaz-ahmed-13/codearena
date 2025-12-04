FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy app files
COPY . .

# Generate Prisma Client (dummy DATABASE_URL for build - prisma generate doesn't need real DB)
ENV DATABASE_URL="postgresql://codearena:codearena@codearena:5432/codearena"
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
