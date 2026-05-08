# Next.js 16 + Supabase Professional Starter Kit

A clean, reusable starter kit for future SaaS, dashboard, CRM, booking, invoice, AI, and admin projects.

## Stack

- Next.js 16 App Router
- Supabase Auth
- Supabase PostgreSQL
- Supabase Row Level Security
- TypeScript
- Tailwind CSS
- Zod
- React Hook Form
- Server Actions
- Responsive dashboard UI

## Official conventions used

- Next.js 16 uses `proxy.ts` instead of old `middleware.ts`
- Supabase SSR uses `@supabase/ssr` and cookie-based session handling
- React Hook Form uses `@hookform/resolvers/zod` for Zod validation

## Structure

```txt
src/
  app/
    (auth)/
      login/
      register/
      forgot-password/

    (dashboard)/
      dashboard/
      projects/
        page.tsx
        create/
          page.tsx
        [projectId]/
          page.tsx
          edit/
            page.tsx

      tasks/
      settings/
      profile/

    api/
    auth/callback/route.ts
    layout.tsx
    page.tsx

  actions/
    auth.actions.ts
    project.actions.ts
    task.actions.ts

  components/
    auth/
    dashboard/
    forms/
    tables/
    modals/
    ui/

  lib/
    supabase/
    validations/
    utils.ts

  hooks/
  config/
  constants/
  types/
  proxy.ts
```

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"

NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-or-publishable-key"

SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## Supabase setup

Run this file in Supabase SQL Editor:

```txt
supabase/schema.sql
```

It creates:

```txt
profiles
projects
tasks
RLS policies
updated_at triggers
auto profile creation trigger
```

## Supabase Auth URL settings

In Supabase Dashboard:

```txt
Authentication → URL Configuration
```

Site URL:

```txt
http://localhost:3000
```

Redirect URL:

```txt
http://localhost:3000/auth/callback
```

Production:

```txt
https://yourdomain.com/auth/callback
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Type check

```bash
npm run typecheck
```

## Git guide

Read:

```txt
GIT_WORKFLOW.md
```
