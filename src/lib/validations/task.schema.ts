import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(2, "Title is required").max(120),
  description: z.string().max(1000).optional().or(z.literal("")),
  project_id: z.string().uuid().optional().or(z.literal("")),
  due_date: z.string().optional().or(z.literal("")),
});

export type TaskInput = z.infer<typeof taskSchema>;
