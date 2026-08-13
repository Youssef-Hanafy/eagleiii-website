-- Run this ONCE in Supabase SQL Editor for the existing Eagle III project.

alter table public.site_settings
  add column if not exists logo_url text,
  add column if not exists logo_path text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-assets',
  'site-assets',
  true,
  5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins upload site assets" on storage.objects;
drop policy if exists "Admins update site assets" on storage.objects;
drop policy if exists "Admins delete site assets" on storage.objects;
drop policy if exists "Admins read site asset rows" on storage.objects;

create policy "Admins upload site assets"
on storage.objects for insert to authenticated
with check (bucket_id = 'site-assets' and public.is_admin());

create policy "Admins update site assets"
on storage.objects for update to authenticated
using (bucket_id = 'site-assets' and public.is_admin())
with check (bucket_id = 'site-assets' and public.is_admin());

create policy "Admins delete site assets"
on storage.objects for delete to authenticated
using (bucket_id = 'site-assets' and public.is_admin());

create policy "Admins read site asset rows"
on storage.objects for select to authenticated
using (bucket_id = 'site-assets' and public.is_admin());
