import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { PWAInstall } from "@/components/layout/pwa-install";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen flex">
      <Sidebar user={user} />
      <main className="flex-1 lg:ml-0 mt-14 lg:mt-0 overflow-x-hidden">
        {children}
      </main>
      <PWAInstall />
    </div>
  );
}
