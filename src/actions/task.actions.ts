"use server";

import { createClient } from "@/lib/supabase/server";
import { taskSchema } from "@/lib/validations/task.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTaskAction(values: unknown) {
  const parsed = taskSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid task data." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Unauthorized." };
  }

  const { error } = await supabase.from("tasks").insert({
    user_id: user.id,
    title: parsed.data.title,
    description: parsed.data.description || null,
    project_id: parsed.data.project_id || null,
    due_date: parsed.data.due_date || null,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function toggleTaskAction(taskId: string, completed: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", taskId);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/tasks");
  return { success: true, message: "Task updated." };
}

export async function deleteTaskAction(taskId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}
