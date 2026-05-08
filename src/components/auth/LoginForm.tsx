"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginInput,
} from "@/lib/validations/auth.schema";
import { loginAction } from "@/actions/auth.actions";

export function LoginForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginInput) {
    setError("");

    startTransition(async () => {
      const result = await loginAction(values);

      if (result?.message) {
        setError(result.message);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-5 rounded-2xl border bg-white p-8 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="mt-1 text-sm text-gray-500">
          Access your dashboard.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          {...form.register("email")}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
        />
        <p className="mt-1 text-sm text-red-600">
          {form.formState.errors.email?.message}
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          {...form.register("password")}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
        />
        <p className="mt-1 text-sm text-red-600">
          {form.formState.errors.password?.message}
        </p>
      </div>

      <button
        disabled={isPending}
        className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}