# Professional Git Workflow

## 1. Initialize Git

```bash
git init
```

## 2. Check status

```bash
git status
```

## 3. Create `.gitignore`

This starter already includes a recommended `.gitignore`.

## 4. First commit

```bash
git add .
git commit -m "chore: initialize Next.js Supabase starter"
```

## 5. Create GitHub repository

Create an empty GitHub repository, then connect it:

```bash
git remote add origin git@github.com:YOUR_USERNAME/next-supabase-starter.git
```

or HTTPS:

```bash
git remote add origin https://github.com/YOUR_USERNAME/next-supabase-starter.git
```

## 6. Rename branch to main

```bash
git branch -M main
```

## 7. Push first version

```bash
git push -u origin main
```

## 8. Recommended commit style

Use Conventional Commits:

```txt
feat: add login form
feat: add projects CRUD
fix: resolve Supabase session refresh
style: improve dashboard responsive layout
refactor: clean server actions
chore: update dependencies
docs: add setup instructions
```

## 9. Example professional commits for this starter

```bash
git add package.json
git commit -m "chore: install project dependencies"

git add src/lib/supabase
git commit -m "feat: configure Supabase SSR clients"

git add src/app/auth src/actions/auth.actions.ts src/components/auth
git commit -m "feat: add authentication flow"

git add src/proxy.ts
git commit -m "feat: protect dashboard routes with proxy"

git add src/app/\(dashboard\) src/components/dashboard
git commit -m "feat: add responsive dashboard layout"

git add src/actions/project.actions.ts src/components/forms/ProjectForm.tsx src/components/tables/ProjectsTable.tsx
git commit -m "feat: add projects CRUD module"

git add src/actions/task.actions.ts src/components/forms/TaskForm.tsx src/components/tables/TasksTable.tsx
git commit -m "feat: add tasks CRUD module"

git add supabase/schema.sql
git commit -m "feat: add Supabase schema and RLS policies"

git add README.md GIT_WORKFLOW.md
git commit -m "docs: add setup and git workflow guide"
```

## 10. Daily workflow

Before starting work:

```bash
git pull origin main
git checkout -b feat/your-feature-name
```

After changes:

```bash
git status
git add .
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
```

Then open a Pull Request to `main`.

## 11. Protect main branch

In GitHub:

```txt
Repository → Settings → Branches → Add branch protection rule
```

Recommended settings:

```txt
Branch name pattern: main
Require a pull request before merging: enabled
Require approvals: 1
Require status checks: enabled
Restrict who can push: enabled
Do not allow force pushes: enabled
Do not allow deletions: enabled
```
