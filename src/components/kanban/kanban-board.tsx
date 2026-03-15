"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Job, JobStatus, JOB_COLUMNS } from "@/lib/types";
import { updateJobStatus } from "@/lib/actions";
import { KanbanColumn } from "./kanban-column";
import { JobCard } from "./job-card";
import { JobDetailModal } from "./job-detail-modal";
import { toast } from "sonner";

interface KanbanBoardProps {
  initialJobs: Job[];
  visibleColumns: string[];
  userRole: string;
}

export function KanbanBoard({ initialJobs, visibleColumns, userRole }: KanbanBoardProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const columns = JOB_COLUMNS.filter((col) => visibleColumns.includes(col.id));

  const getJobsByColumn = useCallback(
    (status: JobStatus) => jobs.filter((j) => j.status === status),
    [jobs]
  );

  function handleDragStart(event: DragStartEvent) {
    const job = jobs.find((j) => j.id === event.active.id);
    setActiveJob(job || null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveJob(null);
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id as string;
    const newStatus = over.id as JobStatus;
    const job = jobs.find((j) => j.id === jobId);

    if (!job || job.status === newStatus) return;

    // Optimistic update
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: newStatus, updated_at: new Date().toISOString() } : j
      )
    );

    const result = await updateJobStatus(jobId, newStatus);
    if (result.error) {
      // Revert
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: job.status } : j))
      );
      toast.error(result.error);
    } else {
      toast.success(`Moved "${job.client_name}" to ${newStatus}`);
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 px-4 lg:px-6 pb-6 overflow-x-auto min-h-[calc(100vh-10rem)]">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              jobs={getJobsByColumn(col.id)}
              onJobClick={setSelectedJob}
            />
          ))}
        </div>

        <DragOverlay>
          {activeJob ? (
            <div className="rotate-3 opacity-90">
              <JobCard job={activeJob} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <JobDetailModal
        job={selectedJob}
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </>
  );
}
