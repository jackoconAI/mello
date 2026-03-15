import { z } from "zod";

export const jobFormSchema = z.object({
  // Client Info
  client_name: z.string().min(1, "Client name is required"),
  client_phone: z.string().default(""),
  client_email: z.string().default(""),
  address: z.string().min(1, "Address is required"),
  jobsite_access_notes: z.string().default(""),
  referral_partner: z.string().default(""),
  preferred_plumber: z.string().default(""),
  damage_consultant: z.string().default(""),
  mitigation_lead: z.string().default(""),

  // Claim Information
  policy_cap_or_limit: z.string().default(""),
  mortgage: z.string().default(""),
  ho6: z.string().default(""),
  drywall_estimate: z.string().default(""),
  cause_of_loss: z.string().min(1, "Cause of loss is required"),
  col_repaired: z.string().default(""),
  carrier: z.string().min(1, "Carrier is required"),
  number_of_checks: z.string().default(""),

  // Payment Breakdown
  entrusted_estimate: z.string().default(""),
  insurance_approved_amount: z.string().default(""),
  deductible: z.string().default(""),
  recoverable_depreciation: z.string().default(""),
  check_amounts: z.string().default(""),
  entrusted_wtr_amount: z.string().default(""),
  wtr_check_location: z.string().default(""),
  entrusted_mld_amount: z.string().default(""),
  insurance_mld_approved_amount: z.string().default(""),
  mld_check_location: z.string().default(""),
  payment_notes: z.string().default(""),

  // Important Notes
  scope_changes: z.string().default(""),
  additional_work: z.string().default(""),
  client_som: z.string().default(""),

  // PCC Meeting Notes
  date_of_pcc_mtg: z.string().min(1, "PCC meeting date is required"),
  matterport_link: z.string().min(1, "Matterport link is required"),
  google_photos_link: z.string().min(1, "Google Photos link is required"),
  estimates_needed: z.string().default(""),
  cabinet_replacement_repair: z.string().default(""),
  threats: z.string().default(""),
  full_scope: z.string().min(1, "Full scope is required"),
});

export type JobFormData = z.infer<typeof jobFormSchema>;

export const FORM_STEPS = [
  {
    id: "client-info",
    title: "Client Information",
    description: "Basic client and project details",
    fields: [
      "client_name",
      "client_phone",
      "client_email",
      "address",
      "jobsite_access_notes",
      "referral_partner",
      "preferred_plumber",
      "damage_consultant",
      "mitigation_lead",
    ] as const,
  },
  {
    id: "claim-info",
    title: "Claim Information",
    description: "Insurance and damage details",
    fields: [
      "policy_cap_or_limit",
      "mortgage",
      "ho6",
      "drywall_estimate",
      "cause_of_loss",
      "col_repaired",
      "carrier",
      "number_of_checks",
    ] as const,
  },
  {
    id: "payment",
    title: "Check Info & Payment",
    description: "Payment breakdown and check tracking",
    fields: [
      "entrusted_estimate",
      "insurance_approved_amount",
      "deductible",
      "recoverable_depreciation",
      "check_amounts",
      "entrusted_wtr_amount",
      "wtr_check_location",
      "entrusted_mld_amount",
      "insurance_mld_approved_amount",
      "mld_check_location",
      "payment_notes",
    ] as const,
  },
  {
    id: "notes",
    title: "Important Notes",
    description: "Scope changes and additional info",
    fields: ["scope_changes", "additional_work", "client_som"] as const,
  },
  {
    id: "pcc-meeting",
    title: "PCC Meeting Notes",
    description: "Meeting details, links, and full scope",
    fields: [
      "date_of_pcc_mtg",
      "matterport_link",
      "google_photos_link",
      "estimates_needed",
      "cabinet_replacement_repair",
      "threats",
      "full_scope",
    ] as const,
  },
];
