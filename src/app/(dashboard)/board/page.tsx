import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { MOCK_JOBS } from "@/lib/supabase/mock";
import { createClient } from "@/lib/supabase/server";
import { Job } from "@/lib/types";
import { ROLE_VISIBLE_COLUMNS } from "@/lib/constants";

export default async function BoardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  let jobs: Job[] = [];

  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    jobs = MOCK_JOBS;
    // Filter for PCC — only their own jobs
    if (user.role === "pcc") {
      jobs = jobs.filter((j) => j.created_by === user.id);
    }
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });
    jobs = (data as Job[]) || [];
  }

  const visibleColumns = ROLE_VISIBLE_COLUMNS[user.role] || [];

  return (
    <div className="h-full">
      <div className="px-4 lg:px-6 py-4 lg:py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Job Board</h1>
            <p className="text-sm text-gray-500 mt-1">{jobs.length} active jobs</p>
          </div>
          {user.role === "pcc" && (
            <Link
              href="/scope/new"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-[#f87b4d] text-white text-sm font-medium hover:bg-[#e5693d] transition-colors shadow-sm"
            >
              + New Scope
            </Link>
          )}
        </div>
      </div>
      <KanbanBoard
        initialJobs={jobs}
        visibleColumns={visibleColumns}
        userRole={user.role}
      />
    </div>
  );
}
