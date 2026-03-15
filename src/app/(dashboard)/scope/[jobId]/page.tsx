import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ScopeFormWizard } from "@/components/scope/scope-form-wizard";

export default async function ScopePage({ params }: { params: Promise<{ jobId: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "pcc") redirect("/board");

  const { jobId } = await params;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 lg:py-10">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          {jobId === "new" ? "New Job Scope" : "Edit Scope"}
        </h1>
        <p className="text-gray-500 mt-1">
          PCC Meeting Notes — fill in all required fields to submit
        </p>
      </div>
      <ScopeFormWizard />
    </div>
  );
}
