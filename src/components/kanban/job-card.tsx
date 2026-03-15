"use client";

import { useDraggable } from "@dnd-kit/core";
import { Job } from "@/lib/types";
import { isOverdue } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Clock, ExternalLink } from "lucide-react";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const overdue = isOverdue(job.updated_at);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`
        bg-white rounded-xl border border-[#d6d8d7] p-4 cursor-grab active:cursor-grabbing
        hover:shadow-md hover:border-[#f87b4d]/40 transition-all
        ${isDragging ? "opacity-50 shadow-lg" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
          {job.client_name}
        </h4>
        {overdue && (
          <Badge variant="destructive" className="flex-shrink-0 text-[10px]">
            <Clock className="h-3 w-3 mr-0.5" />
            48h+
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
        <MapPin className="h-3 w-3 flex-shrink-0" />
        <span className="line-clamp-1">{job.address}</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-[10px]">
          {job.carrier}
        </Badge>
        <Badge variant="secondary" className="text-[10px]">
          {job.cause_of_loss}
        </Badge>
      </div>

      {/* Quick links */}
      <div className="flex items-center gap-2 flex-wrap">
        {job.google_photos_link && (
          <a
            href={job.google_photos_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] text-[#f87b4d] hover:underline font-medium"
          >
            <Camera className="h-3 w-3" />
            Photos
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
        {job.matterport_link && (
          <a
            href={job.matterport_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] text-purple-600 hover:underline font-medium"
          >
            <ExternalLink className="h-3 w-3" />
            Matterport
          </a>
        )}
      </div>

      {job.entrusted_estimate && (
        <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
          Est: <span className="font-medium text-gray-700">{job.entrusted_estimate}</span>
        </div>
      )}
    </div>
  );
}
