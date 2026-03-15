"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { JobInsert, JobStatus } from "@/lib/types";

// Minimal interface covering both real Supabase client and mock client
interface QueryResult {
  data: unknown;
  error: { message: string } | null;
}

interface QueryBuilder extends PromiseLike<QueryResult> {
  select: () => QueryBuilder;
  insert: (data: Record<string, unknown>) => QueryBuilder;
  update: (data: Record<string, unknown>) => QueryBuilder;
  eq: (col: string, val: string) => QueryBuilder;
  single: () => PromiseLike<QueryResult>;
}

interface SupabaseLikeClient {
  from: (table: string) => QueryBuilder;
}

async function getSupabase(): Promise<SupabaseLikeClient> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    const { createMockClient } = await import("@/lib/supabase/mock");
    return createMockClient() as unknown as SupabaseLikeClient;
  }
  const { createClient } = await import("@/lib/supabase/server");
  return await createClient() as unknown as SupabaseLikeClient;
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

  const { data: job, error } = await supabase
    .from("jobs")
    .insert(jobData as unknown as Record<string, unknown>)
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

  const { error } = await supabase
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

  const { error } = await supabase
    .from("jobs")
    .update(data as unknown as Record<string, unknown>)
    .eq("id", jobId);

  if (error) {
    return { error: error.message || "Failed to update job" };
  }

  revalidatePath("/board");
  return { success: true };
}
