import { ProjectForm } from "@/components/forms/ProjectForm";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/database.types";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Edit Project</h1>
        <p className="mt-2 text-slate-500">Update project information.</p>
      </div>

      <Card>
        <ProjectForm project={data as Project} />
      </Card>
    </div>
  );
}
