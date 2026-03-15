"use client";

import { FormField } from "../form-field";

export function StepClientInfo() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="client_name" label="Client Name" required placeholder="Full name" />
        <FormField name="client_phone" label="Client Phone" type="tel" placeholder="(555) 123-4567" />
      </div>
      <FormField name="client_email" label="Client Email" type="email" placeholder="client@email.com" />
      <FormField name="address" label="Jobsite Address" required placeholder="Full street address, city, state, zip" />
      <FormField
        name="jobsite_access_notes"
        label="Jobsite Access Notes"
        type="textarea"
        placeholder="Gate codes, lockbox info, pet warnings, etc."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="referral_partner" label="Referral Partner" placeholder="Company or individual" />
        <FormField name="preferred_plumber" label="Preferred Plumber" placeholder="Plumber name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="damage_consultant" label="Damage Consultant" placeholder="Name" />
        <FormField name="mitigation_lead" label="Mitigation Lead" placeholder="Name" />
      </div>
    </div>
  );
}
