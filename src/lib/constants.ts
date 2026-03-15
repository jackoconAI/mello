export const ROLE_LABELS: Record<string, string> = {
  pcc: "Pre-Construction Consultant",
  es: "Estimating & Scheduling",
  psl: "Project Service Lead",
};

export const ROLE_VISIBLE_COLUMNS: Record<string, string[]> = {
  pcc: ["new", "scheduling", "estimating", "psl", "done"],
  es: ["scheduling", "estimating"],
  psl: ["psl", "done"],
};

export const MANDATORY_FIELDS = [
  "client_name",
  "address",
  "carrier",
  "cause_of_loss",
  "google_photos_link",
  "full_scope",
  "date_of_pcc_mtg",
  "matterport_link",
] as const;
