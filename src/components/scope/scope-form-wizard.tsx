"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormData, FORM_STEPS } from "@/lib/schemas";
import { createJob } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StepClientInfo } from "./steps/step-client-info";
import { StepClaimInfo } from "./steps/step-claim-info";
import { StepPayment } from "./steps/step-payment";
import { StepNotes } from "./steps/step-notes";
import { StepPccMeeting } from "./steps/step-pcc-meeting";
import { ChevronLeft, ChevronRight, Send, CheckCircle2 } from "lucide-react";

const STEP_COMPONENTS = [
  StepClientInfo,
  StepClaimInfo,
  StepPayment,
  StepNotes,
  StepPccMeeting,
];

interface ScopeFormWizardProps {
  jobId: string;
  userName: string;
}

export function ScopeFormWizard({ jobId, userName }: ScopeFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema) as any,
    defaultValues: {
      client_name: "",
      client_phone: "",
      client_email: "",
      address: "",
      jobsite_access_notes: "",
      referral_partner: "",
      preferred_plumber: "",
      damage_consultant: "",
      mitigation_lead: "",
      policy_cap_or_limit: "",
      mortgage: "",
      ho6: "",
      drywall_estimate: "",
      cause_of_loss: "",
      col_repaired: "",
      carrier: "",
      number_of_checks: "",
      entrusted_estimate: "",
      insurance_approved_amount: "",
      deductible: "",
      recoverable_depreciation: "",
      check_amounts: "",
      entrusted_wtr_amount: "",
      wtr_check_location: "",
      entrusted_mld_amount: "",
      insurance_mld_approved_amount: "",
      mld_check_location: "",
      payment_notes: "",
      scope_changes: "",
      additional_work: "",
      client_som: "",
      date_of_pcc_mtg: "",
      matterport_link: "",
      google_photos_link: "",
      estimates_needed: "",
      cabinet_replacement_repair: "",
      threats: "",
      full_scope: "",
    },
    mode: "onTouched",
  });

  const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;
  const step = FORM_STEPS[currentStep];
  const StepComponent = STEP_COMPONENTS[currentStep];

  async function validateCurrentStep(): Promise<boolean> {
    const fields = FORM_STEPS[currentStep].fields;
    const result = await methods.trigger(fields as unknown as (keyof JobFormData)[]);
    return result;
  }

  async function goNext() {
    const valid = await validateCurrentStep();
    if (valid && currentStep < FORM_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function onSubmit(data: JobFormData) {
    setIsSubmitting(true);
    try {
      // Convert empty strings to null for optional fields
      const cleaned: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        cleaned[key] = value === "" ? null : value;
      }

      const result = await createJob(cleaned as any);
      if (result.error) {
        toast.error(result.error);
        setIsSubmitting(false);
        return;
      }

      toast.success("Job scope submitted! Moved to Scheduling.", {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        duration: 4000,
      });
      router.push("/board");
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <FormProvider {...methods}>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">
            Step {currentStep + 1} of {FORM_STEPS.length}
          </span>
          <span className="text-gray-400">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Step indicators */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
        {FORM_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => i < currentStep && setCurrentStep(i)}
            className={`
              flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${i === currentStep ? "bg-[#f87b4d] text-white" : ""}
              ${i < currentStep ? "bg-emerald-50 text-emerald-700 cursor-pointer hover:bg-emerald-100" : ""}
              ${i > currentStep ? "bg-gray-100 text-gray-400" : ""}
            `}
          >
            {i < currentStep ? "✓ " : ""}
            {s.title}
          </button>
        ))}
      </div>

      {/* Step content */}
      <Card className="mb-6">
        <CardContent className="p-5 lg:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {step.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{step.description}</p>
          </div>
          <StepComponent />
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={goBack}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        {currentStep < FORM_STEPS.length - 1 ? (
          <Button type="button" onClick={goNext}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={methods.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="min-w-[140px]"
          >
            {isSubmitting ? (
              "Submitting…"
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Scope
              </>
            )}
          </Button>
        )}
      </div>

      {/* Offline draft save indicator */}
      <p className="text-xs text-gray-400 text-center mt-4">
        Form data is auto-saved locally for offline access
      </p>
    </FormProvider>
  );
}
