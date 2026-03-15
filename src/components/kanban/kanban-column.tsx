"use client";

import { useDroppable } from "@dnd-kit/core";
import { Job, JobStatus } from "@/lib/types";
import { JobCard } from "./job-card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const STATUS_COLORS: Record<JobStatus, string> = {
  new: "bg-blue-500",
  scheduling: "bg-amber-500",
  estimating: "bg-purple-500",
  psl: "bg-emerald-500",
  done: "bg-gray-400",
};

interface KanbanColumnProps {
  id: JobStatus;
  label: string;
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

export function KanbanColumn({ id, label, jobs, onJobClick }: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex-shrink-0 w-[300px] lg:w-[320px] flex flex-col rounded-xl bg-gray-50 border border-transparent transition-colors",
        isOver && "border-[#f87b4d] bg-[#fef0eb]/50"
      )}
    >
      {/* Column header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("w-2.5 h-2.5 rounded-full", STATUS_COLORS[id])} />
          <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider">
            {label}
          </h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {jobs.length}
        </Badge>
      </div>

      {/* Cards */}
      <div className="flex-1 px-2 pb-2 space-y-2 overflow-y-auto max-h-[calc(100vh-14rem)]">
        {jobs.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg m-2">
            No jobs
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
          ))
        )}
      </div>
    </div>
  );
}
