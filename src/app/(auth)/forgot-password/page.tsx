import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md bg-white p-8">
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter your email and we will send a reset link.
        </p>

        <div className="mt-8">
          <ForgotPasswordForm />
        </div>

        <Link href="/login" className="mt-6 block text-center text-sm font-semibold text-slate-950">
          Back to login
        </Link>
      </Card>
    </main>
  );
}
