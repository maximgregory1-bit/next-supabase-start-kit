import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import type { ReactNode } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <DashboardSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <main className="mx-auto w-full max-w-7xl p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
