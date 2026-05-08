import { routes } from "@/config/routes";
import { FolderKanban, Home, ListTodo, Settings, User } from "lucide-react";
import Link from "next/link";

const navItems = [
  { title: "Dashboard", href: routes.dashboard, icon: Home },
  { title: "Projects", href: routes.projects, icon: FolderKanban },
  { title: "Tasks", href: routes.tasks, icon: ListTodo },
  { title: "Profile", href: routes.profile, icon: User },
  { title: "Settings", href: routes.settings, icon: Settings },
];

export function DashboardSidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link href={routes.dashboard} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
            J
          </div>
          <div>
            <p className="font-bold text-slate-950">Juberu Starter</p>
            <p className="text-xs text-slate-500">Supabase Kit</p>
          </div>
        </Link>
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
