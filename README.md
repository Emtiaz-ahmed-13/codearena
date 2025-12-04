This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Option 1: Using Docker

1. Start database first:

```bash
docker compose up -d postgres
```

2. Build the app:

```bash
docker compose build app
```

3. Create database schema and migrations:

```bash
docker compose run --rm app npx prisma migrate dev --name init
```

4. Start the app:

```bash
docker compose up app
```

Or use the setup script:

```bash
chmod +x setup-db.sh
./setup-db.sh
docker compose up app
```

Open [http://localhost:3000](http://localhost:3000)

Stop: `docker compose down`

### Verify Everything is Working

**Check if containers are running:**

```bash
docker compose ps
```

**Check database connection:**

```bash
docker compose exec postgres psql -U postgresS -d codearena -c "\dt"
```

**Check Prisma migrations status:**

```bash
docker compose exec app npx prisma migrate status
```

**View app logs:**

```bash
docker compose logs app
```

**View database logs:**

```bash
docker compose logs postgres
```

**Open Prisma Studio (database GUI):**

```bash
docker compose exec app npx prisma studio
```

Then open http://localhost:5555

### Option 2: Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
