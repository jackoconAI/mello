"use client";

import { useFormContext } from "react-hook-form";
import { FormField } from "../form-field";
import { ExternalLink, Camera } from "lucide-react";

export function StepPccMeeting() {
  const { watch } = useFormContext();
  const googlePhotosLink = watch("google_photos_link");
  const matterportLink = watch("matterport_link");

  return (
    <div className="space-y-5">
      <FormField
        name="date_of_pcc_mtg"
        label="Date of PCC Meeting"
        type="date"
        required
      />

      <FormField
        name="matterport_link"
        label="Matterport Link"
        type="url"
        required
        placeholder="https://my.matterport.com/show/?m=..."
      />
      {matterportLink && matterportLink.startsWith("http") && (
        <a
          href={matterportLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 text-purple-700 text-sm hover:bg-purple-100 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Preview Matterport Tour
        </a>
      )}

      <FormField
        name="google_photos_link"
        label="Google Photos Album Link"
        type="url"
        required
        placeholder="https://photos.app.goo.gl/..."
        hint="Must start with photos.app.goo.gl or photos.google.com"
      />
      {googlePhotosLink && googlePhotosLink.startsWith("http") && (
        <a
          href={googlePhotosLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f87b4d]/10 text-[#f87b4d] text-sm hover:bg-[#f87b4d]/20 transition-colors font-medium"
        >
          <Camera className="h-4 w-4" />
          Open Google Photos Album
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}

      <FormField name="ho6" label="HO6 (if applicable)" placeholder="e.g. Yes - $50k" hint="Leave blank if not applicable" />

      <FormField
        name="estimates_needed"
        label="Estimates Needed"
        placeholder="Flooring, Cabinets, Countertops, Paint..."
        hint="Comma-separated list of trade estimates needed"
      />

      <FormField
        name="cabinet_replacement_repair"
        label="Cabinet Replacement/Repair?"
        placeholder="e.g. Replace upper cabinets in kitchen"
      />

      <FormField
        name="threats"
        label="Threats"
        type="textarea"
        placeholder="Client concerns, adjuster pushback, timeline risks..."
        hint="Anything that could derail the job"
      />

      <div>
        <FormField
          name="full_scope"
          label="Full Scope"
          type="textarea"
          required
          placeholder={"## Kitchen\n- Demo and replace all base cabinets\n- New countertops (quartz)\n- Flooring replacement (LVP)\n\n## Master Bathroom\n- Full gut renovation\n- New tile shower\n- Replace vanity and mirror\n\n## Hallway\n- Paint and new baseboards"}
        />

        {/* Built-in checklist guide */}
        <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
          <p className="text-xs font-semibold text-blue-700 mb-2">Scope Checklist — Remember to include:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {[
              "Kitchen", "Master Bath", "Guest Bath", "Master Bedroom",
              "Living Room", "Dining Room", "Hallway", "Laundry Room",
              "Garage", "Linen Closet", "Exterior", "HVAC/Ducts",
              "Flooring", "Paint", "Baseboards", "Trim",
              "Cabinets", "Countertops", "Fixtures", "Drywall",
            ].map((item) => (
              <span key={item} className="text-xs text-blue-600">• {item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
