"use server";

import { createClient } from "@/lib/supabase/server";
import { projectSchema } from "@/lib/validations/project.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProjectAction(values: unknown) {
  const parsed = projectSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid project data." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Unauthorized." };
  }

  const { error } = await supabase.from("projects").insert({
    user_id: user.id,
    title: parsed.data.title,
    description: parsed.data.description || null,
    status: parsed.data.status,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProjectAction(projectId: string, values: unknown) {
  const parsed = projectSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid project data." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .update({
      title: parsed.data.title,
      description: parsed.data.description || null,
      status: parsed.data.status,
    })
    .eq("id", projectId);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
  redirect(`/projects/${projectId}`);
}

export async function deleteProjectAction(projectId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/projects");
  redirect("/projects");
}
