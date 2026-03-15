import { Job, User } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

const MOCK_USERS: User[] = [
  { id: "user-pcc-1", email: "pcc@entrusted.com", name: "Alex Morgan", role: "pcc", carrier_list: null },
  { id: "user-es-1", email: "es@entrusted.com", name: "Jordan Rivera", role: "es", carrier_list: null },
  { id: "user-psl-1", email: "psl@entrusted.com", name: "Casey Williams", role: "psl", carrier_list: ["State Farm", "Allstate"] },
];

const now = new Date().toISOString();
const twoDaysAgo = new Date(Date.now() - 49 * 60 * 60 * 1000).toISOString();

const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    status: "scheduling",
    created_at: now,
    updated_at: now,
    created_by: "user-pcc-1",
    client_name: "Sarah Johnson",
    client_phone: "(555) 123-4567",
    client_email: "sarah.j@email.com",
    address: "1234 Oak Street, Austin, TX 78701",
    jobsite_access_notes: "Gate code: 4521. Dog in backyard.",
    referral_partner: "ABC Plumbing",
    preferred_plumber: "Mike's Plumbing",
    damage_consultant: "Tom Harris",
    mitigation_lead: "Lisa Chen",
    pre_construction_consultant: "Alex Morgan",
    policy_cap_or_limit: "$250,000",
    mortgage: "yes",
    ho6: null,
    drywall_estimate: "$12,500",
    cause_of_loss: "Water damage - burst pipe",
    col_repaired: "yes",
    carrier: "State Farm",
    number_of_checks: "2",
    entrusted_estimate: "$45,000",
    insurance_approved_amount: "$42,000",
    deductible: "$1,000",
    recoverable_depreciation: "$5,500",
    check_amounts: "Check 1: $20,000 | Check 2: $22,000",
    entrusted_wtr_amount: "$8,500",
    wtr_check_location: "Office safe",
    entrusted_mld_amount: "$3,200",
    insurance_mld_approved_amount: "$3,000",
    mld_check_location: "Office safe",
    payment_notes: "Waiting on supplement approval",
    scope_changes: "Added hallway flooring per adjuster request",
    additional_work: "Trim paint in master bedroom",
    client_som: "Client satisfied with timeline",
    date_of_pcc_mtg: "2025-03-10",
    matterport_link: "https://my.matterport.com/show/?m=example123",
    google_photos_link: "https://photos.app.goo.gl/example123",
    estimates_needed: "Flooring, Cabinets, Countertops",
    cabinet_replacement_repair: "Replace upper cabinets in kitchen",
    threats: "Client concerned about timeline — keep updated weekly",
    full_scope: "## Kitchen\\n- Demo and replace all base cabinets\\n- New countertops (quartz)\\n- Flooring replacement (LVP)\\n\\n## Master Bathroom\\n- Full gut renovation\\n- New tile shower\\n- Replace vanity and mirror\\n\\n## Hallway\\n- Paint and new baseboards\\n- Replace damaged drywall section",
  },
  {
    id: "job-2",
    status: "new",
    created_at: now,
    updated_at: now,
    created_by: "user-pcc-1",
    client_name: "Marcus Thompson",
    client_phone: "(555) 987-6543",
    client_email: "marcus.t@email.com",
    address: "5678 Elm Ave, Dallas, TX 75201",
    jobsite_access_notes: null,
    referral_partner: "XYZ Insurance Agency",
    preferred_plumber: null,
    damage_consultant: null,
    mitigation_lead: null,
    pre_construction_consultant: "Alex Morgan",
    policy_cap_or_limit: null,
    mortgage: "no",
    ho6: null,
    drywall_estimate: null,
    cause_of_loss: "Fire damage",
    col_repaired: "no",
    carrier: "Allstate",
    number_of_checks: null,
    entrusted_estimate: null,
    insurance_approved_amount: null,
    deductible: null,
    recoverable_depreciation: null,
    check_amounts: null,
    entrusted_wtr_amount: null,
    wtr_check_location: null,
    entrusted_mld_amount: null,
    insurance_mld_approved_amount: null,
    mld_check_location: null,
    payment_notes: null,
    scope_changes: null,
    additional_work: null,
    client_som: null,
    date_of_pcc_mtg: null,
    matterport_link: null,
    google_photos_link: null,
    estimates_needed: null,
    cabinet_replacement_repair: null,
    threats: null,
    full_scope: "Initial assessment pending",
  },
  {
    id: "job-3",
    status: "estimating",
    created_at: twoDaysAgo,
    updated_at: twoDaysAgo,
    created_by: "user-pcc-1",
    client_name: "Emily Davis",
    client_phone: "(555) 456-7890",
    client_email: "emily.d@email.com",
    address: "910 Pine Rd, Houston, TX 77002",
    jobsite_access_notes: "Lockbox on front door: 1122",
    referral_partner: null,
    preferred_plumber: "Pro Plumbing Co",
    damage_consultant: "Sarah Wells",
    mitigation_lead: "Jake Torres",
    pre_construction_consultant: "Alex Morgan",
    policy_cap_or_limit: "$180,000",
    mortgage: "yes",
    ho6: "Yes - $50k",
    drywall_estimate: "$8,200",
    cause_of_loss: "Hail damage",
    col_repaired: "no",
    carrier: "USAA",
    number_of_checks: "1",
    entrusted_estimate: "$32,000",
    insurance_approved_amount: null,
    deductible: "$2,500",
    recoverable_depreciation: null,
    check_amounts: null,
    entrusted_wtr_amount: null,
    wtr_check_location: null,
    entrusted_mld_amount: null,
    insurance_mld_approved_amount: null,
    mld_check_location: null,
    payment_notes: null,
    scope_changes: null,
    additional_work: null,
    client_som: null,
    date_of_pcc_mtg: "2025-03-05",
    matterport_link: "https://my.matterport.com/show/?m=example456",
    google_photos_link: "https://photos.app.goo.gl/example456",
    estimates_needed: "Roofing, Siding, Gutters",
    cabinet_replacement_repair: null,
    threats: "Adjuster pushing back on scope — escalate if needed",
    full_scope: "## Roof\\n- Full tear-off and replacement\\n- New underlayment\\n\\n## Siding\\n- Replace damaged sections (north and east walls)\\n\\n## Gutters\\n- Replace all gutters and downspouts",
  },
  {
    id: "job-4",
    status: "psl",
    created_at: now,
    updated_at: now,
    created_by: "user-pcc-1",
    client_name: "Robert Kim",
    client_phone: "(555) 321-0987",
    client_email: "rob.kim@email.com",
    address: "2468 Maple Dr, San Antonio, TX 78205",
    jobsite_access_notes: "Ring doorbell, client works from home",
    referral_partner: "HomeGuard Insurance",
    preferred_plumber: null,
    damage_consultant: "Chris Park",
    mitigation_lead: "Amy Nguyen",
    pre_construction_consultant: "Alex Morgan",
    policy_cap_or_limit: "$300,000",
    mortgage: "yes",
    ho6: null,
    drywall_estimate: "$15,800",
    cause_of_loss: "Water damage - toilet overflow",
    col_repaired: "yes",
    carrier: "Liberty Mutual",
    number_of_checks: "3",
    entrusted_estimate: "$58,000",
    insurance_approved_amount: "$55,500",
    deductible: "$1,500",
    recoverable_depreciation: "$7,200",
    check_amounts: "Check 1: $25,000 | Check 2: $20,000 | Check 3: $10,500",
    entrusted_wtr_amount: "$12,000",
    wtr_check_location: "Delivered to client",
    entrusted_mld_amount: "$4,500",
    insurance_mld_approved_amount: "$4,200",
    mld_check_location: "Office safe",
    payment_notes: "Final supplement check expected next week",
    scope_changes: "Added guest bathroom to scope",
    additional_work: "Texture matching in living room ceiling",
    client_som: "Very happy with progress",
    date_of_pcc_mtg: "2025-02-28",
    matterport_link: "https://my.matterport.com/show/?m=example789",
    google_photos_link: "https://photos.app.goo.gl/example789",
    estimates_needed: "Flooring, Paint, Texture",
    cabinet_replacement_repair: "Repair lower cabinet doors",
    threats: null,
    full_scope: "## Master Bathroom\\n- Full demo\\n- New tile floor and shower\\n- New vanity, toilet, mirror\\n\\n## Guest Bathroom\\n- Replace flooring\\n- New paint\\n\\n## Living Room\\n- Ceiling texture repair\\n- Paint entire room\\n\\n## Hallway\\n- New LVP flooring\\n- Paint and baseboards",
  },
  {
    id: "job-5",
    status: "done",
    created_at: twoDaysAgo,
    updated_at: now,
    created_by: "user-pcc-1",
    client_name: "Linda Martinez",
    client_phone: "(555) 654-3210",
    client_email: "linda.m@email.com",
    address: "1357 Cedar Ln, Fort Worth, TX 76102",
    jobsite_access_notes: null,
    referral_partner: "Reliable Referrals",
    preferred_plumber: "Quick Fix Plumbing",
    damage_consultant: "Dan Murphy",
    mitigation_lead: "Rosa Sanchez",
    pre_construction_consultant: "Alex Morgan",
    policy_cap_or_limit: "$200,000",
    mortgage: "no",
    ho6: null,
    drywall_estimate: "$6,000",
    cause_of_loss: "Water damage - dishwasher leak",
    col_repaired: "yes",
    carrier: "Farmers",
    number_of_checks: "2",
    entrusted_estimate: "$28,000",
    insurance_approved_amount: "$27,500",
    deductible: "$1,000",
    recoverable_depreciation: "$3,800",
    check_amounts: "Check 1: $15,000 | Check 2: $12,500",
    entrusted_wtr_amount: "$5,500",
    wtr_check_location: "Deposited",
    entrusted_mld_amount: "$2,800",
    insurance_mld_approved_amount: "$2,800",
    mld_check_location: "Deposited",
    payment_notes: "All payments received and deposited",
    scope_changes: null,
    additional_work: null,
    client_som: "Left 5-star Google review",
    date_of_pcc_mtg: "2025-02-15",
    matterport_link: "https://my.matterport.com/show/?m=example101",
    google_photos_link: "https://photos.app.goo.gl/example101",
    estimates_needed: "Kitchen, Flooring",
    cabinet_replacement_repair: null,
    threats: null,
    full_scope: "## Kitchen\\n- Replace flooring (LVP)\\n- Paint cabinets\\n- New countertops\\n\\n## Laundry Room\\n- Replace drywall\\n- New flooring\\n- Paint",
  },
];

let currentMockUser = MOCK_USERS[0]; // Default to PCC

function setMockUser(email: string) {
  if (email.includes("es")) {
    currentMockUser = MOCK_USERS[1];
  } else if (email.includes("psl")) {
    currentMockUser = MOCK_USERS[2];
  } else {
    currentMockUser = MOCK_USERS[0];
  }
}

// Build a chainable query mock
function createQueryBuilder(table: string) {
  const filters: Record<string, string> = {};
  let isSingle = false;
  let insertData: Record<string, unknown> | null = null;
  let updateData: Record<string, unknown> | null = null;

  const builder: Record<string, unknown> = {
    select: () => builder,
    insert: (data: Record<string, unknown> | Record<string, unknown>[]) => {
      const row = Array.isArray(data) ? data[0] : data;
      insertData = row;
      return builder;
    },
    update: (data: Record<string, unknown>) => {
      updateData = data;
      return builder;
    },
    eq: (col: string, val: string) => {
      filters[col] = val;
      return builder;
    },
    neq: () => builder,
    order: () => builder,
    limit: () => builder,
    single: () => {
      isSingle = true;
      return builder;
    },
    maybeSingle: () => {
      isSingle = true;
      return builder;
    },
    then: (resolve: (val: { data: unknown; error: null }) => void) => {
      let result: unknown;

      if (table === "users") {
        if (isSingle && filters.id) {
          result = MOCK_USERS.find((u) => u.id === filters.id) || null;
        } else {
          result = MOCK_USERS;
        }
      } else if (table === "jobs") {
        if (insertData) {
          const newJob: Job = {
            id: uuidv4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...insertData,
          } as Job;
          MOCK_JOBS.push(newJob);
          result = isSingle ? newJob : [newJob];
        } else if (updateData && filters.id) {
          const idx = MOCK_JOBS.findIndex((j) => j.id === filters.id);
          if (idx !== -1) {
            MOCK_JOBS[idx] = { ...MOCK_JOBS[idx], ...updateData, updated_at: new Date().toISOString() };
            result = isSingle ? MOCK_JOBS[idx] : [MOCK_JOBS[idx]];
          }
        } else if (isSingle && filters.id) {
          result = MOCK_JOBS.find((j) => j.id === filters.id) || null;
        } else {
          let jobs = [...MOCK_JOBS];
          if (filters.created_by) jobs = jobs.filter((j) => j.created_by === filters.created_by);
          if (filters.status) jobs = jobs.filter((j) => j.status === filters.status);
          result = jobs;
        }
      }

      resolve({ data: result, error: null });
    },
  };

  return builder;
}

export function createMockClient() {
  return {
    auth: {
      getUser: async () => ({
        data: {
          user: {
            id: currentMockUser.id,
            email: currentMockUser.email,
            user_metadata: { name: currentMockUser.name },
          },
        },
        error: null,
      }),
      getSession: async () => ({
        data: {
          session: {
            user: {
              id: currentMockUser.id,
              email: currentMockUser.email,
              user_metadata: { name: currentMockUser.name },
            },
            access_token: "mock-token",
          },
        },
        error: null,
      }),
      signInWithPassword: async ({ email }: { email: string; password: string }) => {
        setMockUser(email);
        return {
          data: {
            user: {
              id: currentMockUser.id,
              email: currentMockUser.email,
              user_metadata: { name: currentMockUser.name },
            },
            session: { access_token: "mock-token" },
          },
          error: null,
        };
      },
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    from: (table: string) => createQueryBuilder(table),
    channel: () => ({
      on: () => ({
        on: function() { return this; },
        subscribe: (cb?: (status: string) => void) => {
          cb?.("SUBSCRIBED");
          return { unsubscribe: () => {} };
        },
      }),
      subscribe: (cb?: (status: string) => void) => {
        cb?.("SUBSCRIBED");
        return { unsubscribe: () => {} };
      },
    }),
    removeChannel: () => {},
  };
}

export { MOCK_USERS, MOCK_JOBS };
