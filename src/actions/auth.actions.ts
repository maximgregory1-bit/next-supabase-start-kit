"use server";

import { createClient } from "@/lib/supabase/server";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from "@/lib/validations/auth.schema";
import { appConfig } from "@/config/app.config";
import { redirect } from "next/navigation";

export async function loginAction(values: unknown) {
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid login details." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { success: false, message: error.message };
  }

  redirect("/dashboard");
}

export async function registerAction(values: unknown) {
  const parsed = registerSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid registration details." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        name: parsed.data.name,
      },
      emailRedirectTo: `${appConfig.url}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Account created. Please check your email to confirm your account.",
  };
}

export async function forgotPasswordAction(values: unknown) {
  const parsed = forgotPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid email address." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${appConfig.url}/auth/callback?next=/settings`,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Password reset link sent to your email.",
  };
}

export async function googleLoginAction() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${appConfig.url}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function logoutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}
