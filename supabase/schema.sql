-- Mello App Database Schema
-- Supabase / PostgreSQL

-- =============================================================================
-- 1. TABLES
-- =============================================================================

-- Users table
create table public.users (
  id          uuid        primary key references auth.users (id) on delete cascade,
  role        text        not null check (role in ('pcc', 'es', 'psl')),
  name        text        not null,
  email       text,
  carrier_list jsonb      default '[]'::jsonb,
  created_at  timestamptz default now()
);

-- Jobs table
create table public.jobs (
  id                            uuid        primary key default gen_random_uuid(),
  status                        text        not null default 'new'
                                            check (status in ('new','scheduling','estimating','psl','done')),
  created_at                    timestamptz default now(),
  updated_at                    timestamptz default now(),
  created_by                    uuid        references public.users (id),

  -- Client info
  client_name                   text        not null,
  client_phone                  text,
  client_email                  text,
  address                       text        not null,
  jobsite_access_notes          text,

  -- People / partners
  referral_partner              text,
  preferred_plumber             text,
  damage_consultant             text,
  mitigation_lead               text,
  pre_construction_consultant   text,

  -- Insurance & financials
  policy_cap_or_limit           text,
  mortgage                      text,
  ho6                           text,
  drywall_estimate              text,
  cause_of_loss                 text        not null,
  col_repaired                  text,
  carrier                       text        not null,
  number_of_checks              text,
  entrusted_estimate            text,
  insurance_approved_amount     text,
  deductible                    text,
  recoverable_depreciation      text,
  check_amounts                 text,

  -- Water / MLD payments
  entrusted_wtr_amount          text,
  wtr_check_location            text,
  entrusted_mld_amount          text,
  insurance_mld_approved_amount text,
  mld_check_location            text,
  payment_notes                 text,

  -- Scope & work
  scope_changes                 text,
  additional_work               text,
  client_som                    text,
  date_of_pcc_mtg               date,
  matterport_link               text,
  google_photos_link            text,
  estimates_needed              text,
  cabinet_replacement_repair    text,
  threats                       text,
  full_scope                    text        not null
);

-- =============================================================================
-- 2. INDEXES
-- =============================================================================

create index idx_jobs_status     on public.jobs (status);
create index idx_jobs_created_by on public.jobs (created_by);

-- =============================================================================
-- 3. TRIGGER: auto-update updated_at on jobs
-- =============================================================================

create or replace function public.handle_jobs_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_jobs_updated_at
  before update on public.jobs
  for each row
  execute function public.handle_jobs_updated_at();

-- =============================================================================
-- 4. ROW LEVEL SECURITY
-- =============================================================================

-- Enable RLS
alter table public.users enable row level security;
alter table public.jobs  enable row level security;

-- ---- Users policies ---------------------------------------------------------

-- Any authenticated user can read all users
create policy "Users: select all"
  on public.users for select
  to authenticated
  using (true);

-- Users can only update their own row
create policy "Users: update own"
  on public.users for update
  to authenticated
  using  (id = auth.uid())
  with check (id = auth.uid());

-- ---- Jobs policies: PCC role ------------------------------------------------

create policy "Jobs: PCC insert own"
  on public.jobs for insert
  to authenticated
  with check (
    (select role from public.users where id = auth.uid()) = 'pcc'
    and created_by = auth.uid()
  );

create policy "Jobs: PCC select own"
  on public.jobs for select
  to authenticated
  using (
    (select role from public.users where id = auth.uid()) = 'pcc'
    and created_by = auth.uid()
  );

create policy "Jobs: PCC update own"
  on public.jobs for update
  to authenticated
  using (
    (select role from public.users where id = auth.uid()) = 'pcc'
    and created_by = auth.uid()
  )
  with check (
    (select role from public.users where id = auth.uid()) = 'pcc'
    and created_by = auth.uid()
  );

-- ---- Jobs policies: ES role -------------------------------------------------

create policy "Jobs: ES select scheduling/estimating"
  on public.jobs for select
  to authenticated
  using (
    (select role from public.users where id = auth.uid()) = 'es'
    and status in ('scheduling', 'estimating')
  );

create policy "Jobs: ES update scheduling/estimating"
  on public.jobs for update
  to authenticated
  using (
    (select role from public.users where id = auth.uid()) = 'es'
    and status in ('scheduling', 'estimating')
  )
  with check (
    (select role from public.users where id = auth.uid()) = 'es'
    and status in ('scheduling', 'estimating')
  );

-- ---- Jobs policies: PSL role ------------------------------------------------

create policy "Jobs: PSL select psl/done"
  on public.jobs for select
  to authenticated
  using (
    (select role from public.users where id = auth.uid()) = 'psl'
    and status in ('psl', 'done')
  );

create policy "Jobs: PSL update psl/done"
  on public.jobs for update
  to authenticated
  using (
    (select role from public.users where id = auth.uid()) = 'psl'
    and status in ('psl', 'done')
  )
  with check (
    (select role from public.users where id = auth.uid()) = 'psl'
    and status in ('psl', 'done')
  );

-- =============================================================================
-- 5. REALTIME
-- =============================================================================

alter publication supabase_realtime add table jobs;
