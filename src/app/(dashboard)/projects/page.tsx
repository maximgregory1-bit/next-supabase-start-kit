import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectsTable } from "@/components/tables/ProjectsTable";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/database.types";
import Link from "next/link";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const projects = (data ?? []) as Project[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Projects</h1>
          <p className="mt-2 text-slate-500">Manage your reusable CRUD module.</p>
        </div>

        <Link href="/projects/create">
          <Button>Create Project</Button>
        </Link>
      </div>

      {projects.length ? (
        <ProjectsTable projects={projects} />
      ) : (
        <EmptyState title="No projects" description="Create your first project to test CRUD." />
      )}
    </div>
  );
}
