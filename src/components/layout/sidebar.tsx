"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { User } from "@/lib/types";
import { ROLE_LABELS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FilePlus,
  Menu,
  X,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/board", label: "Job Board", icon: LayoutDashboard, roles: ["pcc", "es", "psl"] },
    { href: "/scope/new", label: "New Scope", icon: FilePlus, roles: ["pcc"] },
  ].filter((item) => item.roles.includes(user.role));

  async function handleLogout() {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      document.cookie = "mock_role=;path=/;max-age=0";
      router.push("/login");
    } else {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    }
  }

  return (
    <>
      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#d6d8d7] px-4 h-14 flex items-center justify-between safe-top">
        <button
          onClick={() => setOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <span className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
          MELLO
        </span>
        <div className="w-9" />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-[#d6d8d7] flex flex-col transition-transform duration-300 safe-top",
          "lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo area */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-[#d6d8d7]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f87b4d] text-white flex items-center justify-center font-bold text-sm" style={{ fontFamily: "'Oswald', sans-serif" }}>
              E
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>
              MELLO
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-[#d6d8d7]">
          <p className="font-medium text-gray-900 text-sm">{user.name}</p>
          <Badge variant="default" className="mt-1">
            {ROLE_LABELS[user.role]}
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#fef0eb] text-[#f87b4d]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 safe-bottom">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
