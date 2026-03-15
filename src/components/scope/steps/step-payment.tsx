"use client";

import { FormField } from "../form-field";

export function StepPayment() {
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-700 mb-2">
        These fields can be filled in later as payment info becomes available.
      </div>

      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Estimates & Approval</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="entrusted_estimate" label="Entrusted Estimate" placeholder="$45,000" />
        <FormField name="insurance_approved_amount" label="Insurance Approved Amount" placeholder="$42,000" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="deductible" label="Deductible" placeholder="$1,000" />
        <FormField name="recoverable_depreciation" label="Recoverable Depreciation" placeholder="$5,500" />
      </div>
      <FormField name="check_amounts" label="Check Amount(s)" placeholder="Check 1: $20,000 | Check 2: $22,000" hint="Separate multiple checks with pipes ( | )" />

      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider pt-4">WTR (Water)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="entrusted_wtr_amount" label="Entrusted WTR Amount" placeholder="$8,500" />
        <FormField name="wtr_check_location" label="WTR Check Location" placeholder="Office safe" />
      </div>

      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider pt-4">MLD (Mold)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="entrusted_mld_amount" label="Entrusted MLD Amount" placeholder="$3,200" />
        <FormField name="insurance_mld_approved_amount" label="Insurance MLD Approved" placeholder="$3,000" />
      </div>
      <FormField name="mld_check_location" label="MLD Check Location" placeholder="Office safe" />
      <FormField name="payment_notes" label="Payment Notes" type="textarea" placeholder="Any notes about payments, supplements, etc." />
    </div>
  );
}
