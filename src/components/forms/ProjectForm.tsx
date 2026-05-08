"use client";

import { createProjectAction, updateProjectAction } from "@/actions/project.actions";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { projectSchema, type ProjectInput } from "@/lib/validations/project.schema";
import type { Project } from "@/types/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export function ProjectForm({ project }: { project?: Project }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      status: (project?.status as ProjectInput["status"]) ?? "active",
    },
  });

  function onSubmit(values: ProjectInput) {
    startTransition(async () => {
      if (project) {
        await updateProjectAction(project.id, values);
      } else {
        await createProjectAction(values);
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <Input {...form.register("title")} />
        <FormError message={form.formState.errors.title?.message} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <Textarea {...form.register("description")} />
        <FormError message={form.formState.errors.description?.message} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Status</label>
        <select
          {...form.register("status")}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-950"
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <Button disabled={isPending}>
        {isPending ? "Saving..." : project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
