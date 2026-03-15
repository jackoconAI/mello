export type Role = "pcc" | "es" | "psl";

export type JobStatus = "new" | "scheduling" | "estimating" | "psl" | "done";

export const JOB_COLUMNS: { id: JobStatus; label: string }[] = [
  { id: "new", label: "New" },
  { id: "scheduling", label: "Scheduling" },
  { id: "estimating", label: "Estimating" },
  { id: "psl", label: "PSL" },
  { id: "done", label: "Done" },
];

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  carrier_list: string[] | null;
}

export interface Job {
  id: string;
  status: JobStatus;
  created_at: string;
  updated_at: string;
  created_by: string;

  // Client Info
  client_name: string;
  client_phone: string | null;
  client_email: string | null;
  address: string;
  jobsite_access_notes: string | null;
  referral_partner: string | null;
  preferred_plumber: string | null;
  damage_consultant: string | null;
  mitigation_lead: string | null;
  pre_construction_consultant: string | null;

  // Claim Information
  policy_cap_or_limit: string | null;
  mortgage: string | null;
  ho6: string | null;
  drywall_estimate: string | null;
  cause_of_loss: string;
  col_repaired: string | null;
  carrier: string;
  number_of_checks: string | null;

  // Payment Breakdown
  entrusted_estimate: string | null;
  insurance_approved_amount: string | null;
  deductible: string | null;
  recoverable_depreciation: string | null;
  check_amounts: string | null;
  entrusted_wtr_amount: string | null;
  wtr_check_location: string | null;
  entrusted_mld_amount: string | null;
  insurance_mld_approved_amount: string | null;
  mld_check_location: string | null;
  payment_notes: string | null;

  // Important Notes
  scope_changes: string | null;
  additional_work: string | null;
  client_som: string | null;

  // PCC Meeting Notes
  date_of_pcc_mtg: string | null;
  matterport_link: string | null;
  google_photos_link: string | null;
  estimates_needed: string | null;
  cabinet_replacement_repair: string | null;
  threats: string | null;
  full_scope: string;
}

export type JobInsert = Omit<Job, "id" | "created_at" | "updated_at">;
