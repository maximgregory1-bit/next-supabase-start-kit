"use client";

import { loginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { loginSchema, type LoginInput } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const [serverError, setServerError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginInput) {
    setServerError("");

    startTransition(async () => {
      const result = await loginAction(values);

      if (result?.message) {
        setServerError(result.message);
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" {...form.register("email")} />
        <FormError message={form.formState.errors.email?.message} />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="block text-sm font-medium">Password</label>
          <Link href="/forgot-password" className="text-sm font-medium text-slate-600 hover:text-slate-950">
            Forgot?
          </Link>
        </div>
        <Input type="password" {...form.register("password")} />
        <FormError message={form.formState.errors.password?.message} />
      </div>

      <Button disabled={isPending} className="w-full">
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
