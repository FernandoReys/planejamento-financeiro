create table public.financial_bootstrap (
  owner_email text primary key,
  data jsonb not null check (jsonb_typeof(data)='object')
);
alter table public.financial_bootstrap enable row level security;
revoke all on public.financial_bootstrap from anon, authenticated;
grant select on public.financial_bootstrap to authenticated;
create policy "owner reads bootstrap" on public.financial_bootstrap for select to authenticated
using (lower(owner_email)=lower((select auth.jwt()->>'email')));
-- Owner-specific configuration is inserted privately in the database, never in source code.
