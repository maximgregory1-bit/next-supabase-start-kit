import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";
import { FolderKanban, ListTodo, UserRound } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ count: projectsCount }, { count: tasksCount }] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-2 text-slate-500">Overview of your starter workspace.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="Projects" value={projectsCount ?? 0} icon={FolderKanban} />
        <StatsCard title="Tasks" value={tasksCount ?? 0} icon={ListTodo} />
        <StatsCard title="Account" value={user?.email ? "Active" : "Guest"} icon={UserRound} />
      </div>

      <Card>
        <h2 className="text-xl font-bold">Starter Kit Ready</h2>
        <p className="mt-2 text-slate-500">
          This starter includes Supabase Auth, protected routes, RLS-ready CRUD,
          validation, reusable UI components, and dashboard structure.
        </p>
      </Card>
    </div>
  );
}
