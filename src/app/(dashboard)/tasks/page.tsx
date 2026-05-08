import { TaskForm } from "@/components/forms/TaskForm";
import { TasksTable } from "@/components/tables/TasksTable";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";
import type { Project, Task } from "@/types/database.types";

export default async function TasksPage() {
  const supabase = await createClient();

  const [{ data: tasksData }, { data: projectsData }] = await Promise.all([
    supabase.from("tasks").select("*").order("created_at", { ascending: false }),
    supabase.from("projects").select("*").order("title", { ascending: true }),
  ]);

  const tasks = (tasksData ?? []) as Task[];
  const projects = (projectsData ?? []) as Project[];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Tasks</h1>
          <p className="mt-2 text-slate-500">Manage task CRUD.</p>
        </div>

        {tasks.length ? (
          <TasksTable tasks={tasks} />
        ) : (
          <EmptyState title="No tasks" description="Create your first task." />
        )}
      </div>

      <Card className="h-fit">
        <h2 className="mb-4 text-lg font-bold">Create Task</h2>
        <TaskForm projects={projects} />
      </Card>
    </div>
  );
}
