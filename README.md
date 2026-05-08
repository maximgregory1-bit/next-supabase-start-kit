# Next.js 16 + Supabase Starter Kit

Production-style starter for future projects.

## Stack

- Next.js 16 App Router
- Supabase Auth + PostgreSQL + RLS
- TypeScript
- Tailwind CSS
- Zod
- React Hook Form
- Server Actions
- Protected dashboard routes
- Projects CRUD
- Tasks CRUD

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase SQL

Run `supabase/schema.sql` in Supabase SQL Editor.

## Auth Redirect URL

In Supabase Dashboard:

Authentication → URL Configuration

Site URL:

```txt
http://localhost:3000
```

Redirect URLs:

```txt
http://localhost:3000/auth/callback
```

For production:

```txt
https://yourdomain.com/auth/callback
```
