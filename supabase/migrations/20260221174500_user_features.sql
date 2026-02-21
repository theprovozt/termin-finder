-- Step 3 user features: profiles, saved searches, alerts

create table if not exists public.user_profiles (
  id uuid primary key,
  email text,
  display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  category text,
  location text,
  query text,
  notify_email boolean default true,
  notify_push boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.alert_events (
  id uuid primary key default gen_random_uuid(),
  saved_search_id uuid,
  appointment_id uuid,
  channel text default 'email',
  status text default 'queued',
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  sent_at timestamptz
);

create index if not exists idx_saved_searches_user_id on public.saved_searches(user_id);
create index if not exists idx_saved_searches_category on public.saved_searches(category);
create index if not exists idx_saved_searches_location on public.saved_searches(location);
create index if not exists idx_alert_events_status on public.alert_events(status);

alter table public.user_profiles enable row level security;
alter table public.saved_searches enable row level security;
alter table public.alert_events enable row level security;

-- Temporary permissive policies for MVP (tighten after auth rollout)
drop policy if exists "profiles_all" on public.user_profiles;
create policy "profiles_all" on public.user_profiles for all using (true) with check (true);

drop policy if exists "saved_searches_all" on public.saved_searches;
create policy "saved_searches_all" on public.saved_searches for all using (true) with check (true);

drop policy if exists "alert_events_all" on public.alert_events;
create policy "alert_events_all" on public.alert_events for all using (true) with check (true);
