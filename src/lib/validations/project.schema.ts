import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required").max(120),
  description: z.string().max(1000).optional().or(z.literal("")),
  status: z.enum(["active", "paused", "completed"]).default("active"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
