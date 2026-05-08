"use client";

import { routes } from "@/config/routes";
import { FolderKanban, Home, ListTodo, Menu, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", href: routes.dashboard, icon: Home },
  { title: "Projects", href: routes.projects, icon: FolderKanban },
  { title: "Tasks", href: routes.tasks, icon: ListTodo },
  { title: "Profile", href: routes.profile, icon: User },
  { title: "Settings", href: routes.settings, icon: Settings },
];

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setOpen(false)}
            aria-label="Close menu backdrop"
          />

          <aside className="relative h-full w-80 max-w-[85vw] bg-white shadow-2xl z-10 h-full">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
              <Link
                href={routes.dashboard}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                  J
                </div>
                <div>
                  <p className="font-bold text-slate-950">Juberu Starter</p>
                  <p className="text-xs text-slate-500">Supabase Kit</p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1 p-4 bg-white">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
