import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types/database.types";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
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

  const project = data as Project;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">{project.title}</h1>
          <p className="mt-2 text-slate-500">Project detail page.</p>
        </div>

        <Link href={`/projects/${project.id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>

      <Card>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-slate-500">Description</dt>
            <dd className="mt-1 text-slate-950">{project.description || "-"}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-slate-500">Status</dt>
            <dd className="mt-1 capitalize text-slate-950">{project.status}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-slate-500">Created</dt>
            <dd className="mt-1 text-slate-950">{formatDate(project.created_at)}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
