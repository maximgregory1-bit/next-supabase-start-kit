"use client";

import { registerAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { Input } from "@/components/ui/Input";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: RegisterInput) {
    setMessage("");
    setIsSuccess(false);

    startTransition(async () => {
      const result = await registerAction(values);

      if (result?.message) {
        setMessage(result.message);
        setIsSuccess(result.success);
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {message && isSuccess && <FormSuccess message={message} />}
      {message && !isSuccess && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {message}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Full name</label>
        <Input {...form.register("name")} />
        <FormError message={form.formState.errors.name?.message} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" {...form.register("email")} />
        <FormError message={form.formState.errors.email?.message} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <Input type="password" {...form.register("password")} />
        <FormError message={form.formState.errors.password?.message} />
      </div>

      <Button disabled={isPending} className="w-full">
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
