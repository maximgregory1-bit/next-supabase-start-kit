import { LogoutButton } from "@/components/auth/LogoutButton";
import { createClient } from "@/lib/supabase/server";

export async function DashboardHeader() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur lg:px-8">
      <div>
        <p className="text-sm text-slate-500">Welcome back</p>
        <h1 className="font-bold text-slate-950">{user?.email}</h1>
      </div>

      <LogoutButton />
    </header>
  );
}
