create table public.financial_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  revision bigint not null default 0 check (revision >= 0),
  updated_at timestamptz not null default now()
);
alter table public.financial_state enable row level security;
create policy "read own state" on public.financial_state for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own state" on public.financial_state for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own state" on public.financial_state for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
revoke all on public.financial_state from anon;
grant select, insert, update on public.financial_state to authenticated;
