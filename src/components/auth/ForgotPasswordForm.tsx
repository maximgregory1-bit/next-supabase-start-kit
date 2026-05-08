"use client";

import { forgotPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { Input } from "@/components/ui/Input";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordInput) {
    setMessage("");
    setIsSuccess(false);

    startTransition(async () => {
      const result = await forgotPasswordAction(values);
      setMessage(result.message);
      setIsSuccess(result.success);
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
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" {...form.register("email")} />
        <FormError message={form.formState.errors.email?.message} />
      </div>

      <Button disabled={isPending} className="w-full">
        {isPending ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}
