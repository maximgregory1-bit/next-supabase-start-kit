import { LogoutButton } from "@/components/auth/LogoutButton";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { createClient } from "@/lib/supabase/server";

export async function DashboardHeader() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur-xl lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <MobileSidebar />

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Workspace
          </p>
          <h1 className="truncate font-bold text-slate-950">
            {user?.email || "Dashboard"}
          </h1>
        </div>
      </div>

      <LogoutButton />
    </header>
  );
}
