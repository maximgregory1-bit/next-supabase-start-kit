import { deleteProjectAction } from "@/actions/project.actions";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types/database.types";
import Link from "next/link";

export function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-4 py-4">
                <Link href={`/projects/${project.id}`} className="font-semibold text-slate-950 hover:underline">
                  {project.title}
                </Link>
                <p className="mt-1 max-w-md truncate text-slate-500">
                  {project.description}
                </p>
              </td>
              <td className="px-4 py-4 capitalize">{project.status}</td>
              <td className="px-4 py-4">{formatDate(project.created_at)}</td>
              <td className="px-4 py-4">
                <div className="flex justify-end gap-2">
                  <Link href={`/projects/${project.id}/edit`} className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-slate-50">
                    Edit
                  </Link>
                  <form action={deleteProjectAction.bind(null, project.id)}>
                    <Button variant="danger" type="submit">
                      Delete
                    </Button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
