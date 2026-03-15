"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { JobInsert, JobStatus } from "@/lib/types";

async function getSupabase() {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    const { createMockClient } = await import("@/lib/supabase/mock");
    return createMockClient();
  }
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

export async function createJob(data: Omit<JobInsert, "created_by" | "status">) {
  const user = await getCurrentUser();
  if (!user || user.role !== "pcc") {
    return { error: "Unauthorized — only PCC can create jobs" };
  }

  const supabase = await getSupabase();

  const jobData: JobInsert = {
    ...data,
    created_by: user.id,
    status: "scheduling",
    pre_construction_consultant: user.name,
  };

  const { data: job, error } = await (supabase as any)
    .from("jobs")
    .insert(jobData)
    .select()
    .single();

  if (error) {
    return { error: error.message || "Failed to create job" };
  }

  revalidatePath("/board");
  return { data: job };
}

export async function updateJobStatus(jobId: string, status: JobStatus) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const supabase = await getSupabase();

  const { error } = await (supabase as any)
    .from("jobs")
    .update({ status })
    .eq("id", jobId);

  if (error) {
    return { error: error.message || "Failed to update job" };
  }

  revalidatePath("/board");
  return { success: true };
}

export async function updateJob(jobId: string, data: Partial<JobInsert>) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const supabase = await getSupabase();

  const { error } = await (supabase as any)
    .from("jobs")
    .update(data)
    .eq("id", jobId);

  if (error) {
    return { error: error.message || "Failed to update job" };
  }

  revalidatePath("/board");
  return { success: true };
}
