"use client";

import { FormField } from "../form-field";

export function StepNotes() {
  return (
    <div className="space-y-4">
      <FormField
        name="scope_changes"
        label="Scope Changes"
        type="textarea"
        placeholder="Document any changes to the original scope..."
        hint="Note who requested changes and when"
      />
      <FormField
        name="additional_work"
        label="Additional Work"
        type="textarea"
        placeholder="Any additional work outside the original scope..."
      />
      <FormField
        name="client_som"
        label="Client SOM (State of Mind)"
        type="textarea"
        placeholder="How is the client feeling about the project? Any concerns?"
        hint="Helps team understand client sentiment and priorities"
      />
    </div>
  );
}
