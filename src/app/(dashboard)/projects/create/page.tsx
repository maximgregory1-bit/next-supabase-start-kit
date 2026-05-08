import { ProjectForm } from "@/components/forms/ProjectForm";
import { Card } from "@/components/ui/Card";

export default function CreateProjectPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Create Project</h1>
        <p className="mt-2 text-slate-500">Add a new project.</p>
      </div>

      <Card>
        <ProjectForm />
      </Card>
    </div>
  );
}
