"use client";

import { FormField } from "../form-field";

export function StepClaimInfo() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="carrier" label="Carrier" required placeholder="e.g. State Farm, Allstate" />
        <FormField name="cause_of_loss" label="Cause of Loss" required placeholder="e.g. Water damage - burst pipe" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="policy_cap_or_limit" label="Policy Cap or Limit" placeholder="$250,000" />
        <FormField
          name="mortgage"
          label="Mortgage"
          type="select"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="drywall_estimate" label="Drywall Estimate" placeholder="$12,500" />
        <FormField
          name="col_repaired"
          label="COL Repaired?"
          type="select"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </div>
      <FormField name="number_of_checks" label="Number of Checks" placeholder="e.g. 2" />
    </div>
  );
}
