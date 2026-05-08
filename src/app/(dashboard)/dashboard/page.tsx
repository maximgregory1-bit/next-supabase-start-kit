import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";
import { FolderKanban, ListTodo, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ count: projectsCount }, { count: tasksCount }] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">
            Production Starter
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Next.js 16 + Supabase starter for future projects
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
            Includes auth, protected routes, RLS-ready database structure,
            server actions, modern responsive dashboard, validation, and CRUD modules.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatsCard title="Projects" value={projectsCount ?? 0} icon={FolderKanban} />
        <StatsCard title="Tasks" value={tasksCount ?? 0} icon={ListTodo} />
        <StatsCard title="Security" value="RLS" icon={ShieldCheck} />
      </section>

      <Card>
        <h2 className="text-xl font-bold text-slate-950">Architecture Included</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Supabase SSR Auth",
            "Next.js 16 proxy.ts",
            "React Hook Form",
            "Zod validation",
            "Projects CRUD",
            "Tasks CRUD",
            "Responsive layout",
            "RLS policies",
            "Service role admin client",
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
