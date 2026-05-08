"use client";

import { createTaskAction } from "@/actions/task.actions";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { taskSchema, type TaskInput } from "@/lib/validations/task.schema";
import type { Project } from "@/types/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export function TaskForm({ projects }: { projects: Project[] }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      project_id: "",
      due_date: "",
    },
  });

  function onSubmit(values: TaskInput) {
    startTransition(async () => {
      await createTaskAction(values);
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
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Project</label>
        <select
          {...form.register("project_id")}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
        >
          <option value="">No project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Due date</label>
        <Input type="date" {...form.register("due_date")} />
      </div>

      <Button disabled={isPending}>
        {isPending ? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
}
