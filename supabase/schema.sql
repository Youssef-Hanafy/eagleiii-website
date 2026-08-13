-- EGYPT HERBS WHOLESALE - PHASE 2 BACKEND
-- Run this entire file in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.admin_users where user_id = (select auth.uid()));
$$;

grant execute on function public.is_admin() to authenticated;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null default 'Herbs',
  short_description text,
  description text,
  origin text default 'Egypt',
  form text,
  packaging text,
  minimum_order text,
  availability text default 'Available on request',
  quality_label text default 'Premium Quality',
  main_image_url text,
  main_image_path text,
  specification_url text,
  specification_path text,
  featured boolean not null default false,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  image_path text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  country text,
  product_name text,
  quantity text,
  message text not null,
  preferred_contact text,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  company_name text default 'Egypt Herbs Wholesale',
  tagline text default 'Wholesale Supply',
  hero_eyebrow text default 'SOURCED FROM EGYPT · BUILT FOR B2B',
  hero_title text default 'Premium dried herbs.',
  hero_accent text default 'Reliable wholesale supply.',
  hero_description text,
  about_title text,
  about_text text,
  email text,
  phone text,
  whatsapp text,
  facebook_url text,
  messenger_url text,
  instagram_url text,
  linkedin_url text,
  address text,
  logo_url text,
  logo_path text,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, hero_description, about_title, about_text)
values (1,
'Supplying distributors, wholesalers, and commercial buyers with premium dried herbs, seeds, and botanicals sourced from Egypt.',
'A straightforward supply partner for commercial buyers.',
'We source premium dried herbs, seeds, and botanicals from Egypt and make them available to distributors, wholesalers, and commercial buyers seeking dependable supply and direct communication.')
on conflict (id) do nothing;

-- Starter product records. Change details/photos later from /admin.
insert into public.products (name,slug,category,form,origin,short_description,featured,sort_order)
values
('Basil','basil','Herbs','Dried','Egypt','Premium dried basil sourced from Egypt for wholesale distribution and commercial buyers.',true,1),
('Oregano','oregano','Herbs','Dried','Egypt','Aromatic dried oregano sourced from Egypt for B2B supply and distribution.',true,2),
('Thyme','thyme','Herbs','Dried','Egypt','Commercial dried thyme available for distributors, wholesalers, and food businesses.',true,3),
('Parsley','parsley','Herbs','Dried','Egypt','Dried parsley supplied in bulk for commercial and wholesale applications.',true,4),
('Dill','dill','Herbs','Dried','Egypt','Premium dried dill available for bulk commercial supply.',false,5),
('Hibiscus Slices','hibiscus-slices','Botanicals','Dried slices','Egypt','Vibrant dried hibiscus slices supplied for wholesale and commercial buyers.',true,6),
('Fennel Seeds','fennel-seeds','Seeds','Whole dried seed','Egypt','Egyptian fennel seeds available in bulk for B2B buyers and distributors.',false,7),
('Anise Seeds','anise-seeds','Seeds','Whole dried seed','Egypt','Aromatic anise seeds supplied in commercial quantities for wholesale distribution.',false,8),
('Calendula Petals','calendula-petals','Botanicals','Dried petals','Egypt','Dried calendula petals sourced from Egypt and available for bulk commercial supply.',false,9)
on conflict (slug) do nothing;

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.site_settings enable row level security;

-- Basic grants, with RLS determining which rows/operations succeed.
grant select on public.products, public.product_images, public.site_settings to anon;
grant insert on public.inquiries to anon;
grant select, insert, update, delete on public.products, public.product_images, public.inquiries, public.site_settings, public.admin_users to authenticated;

create policy "User can confirm own admin membership" on public.admin_users for select to authenticated using (user_id = (select auth.uid()));

create policy "Public reads visible products" on public.products for select to anon using (is_visible = true);
create policy "Authenticated reads products" on public.products for select to authenticated using (public.is_admin());
create policy "Admins insert products" on public.products for insert to authenticated with check (public.is_admin());
create policy "Admins update products" on public.products for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete products" on public.products for delete to authenticated using (public.is_admin());

create policy "Public reads product images" on public.product_images for select to anon using (exists(select 1 from public.products p where p.id=product_id and p.is_visible=true));
create policy "Admins read product images" on public.product_images for select to authenticated using (public.is_admin());
create policy "Admins insert product images" on public.product_images for insert to authenticated with check (public.is_admin());
create policy "Admins update product images" on public.product_images for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete product images" on public.product_images for delete to authenticated using (public.is_admin());

create policy "Public submits inquiries" on public.inquiries for insert to anon, authenticated with check (true);
create policy "Admins read inquiries" on public.inquiries for select to authenticated using (public.is_admin());
create policy "Admins update inquiries" on public.inquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete inquiries" on public.inquiries for delete to authenticated using (public.is_admin());

create policy "Public reads settings" on public.site_settings for select to anon using (true);
create policy "Authenticated reads settings" on public.site_settings for select to authenticated using (true);
create policy "Admins update settings" on public.site_settings for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Public buckets: files are intentionally public once uploaded, but only admins may upload/change them.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('product-images','product-images',true,10485760,array['image/jpeg','image/png','image/webp']),
       ('product-files','product-files',true,20971520,array['application/pdf']),
       ('site-assets','site-assets',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=excluded.public, file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;

create policy "Admins upload product images" on storage.objects for insert to authenticated with check (bucket_id='product-images' and public.is_admin());
create policy "Admins update product images" on storage.objects for update to authenticated using (bucket_id='product-images' and public.is_admin()) with check (bucket_id='product-images' and public.is_admin());
create policy "Admins delete product images" on storage.objects for delete to authenticated using (bucket_id='product-images' and public.is_admin());
create policy "Admins read product image rows" on storage.objects for select to authenticated using (bucket_id='product-images' and public.is_admin());

create policy "Admins upload product files" on storage.objects for insert to authenticated with check (bucket_id='product-files' and public.is_admin());
create policy "Admins update product files" on storage.objects for update to authenticated using (bucket_id='product-files' and public.is_admin()) with check (bucket_id='product-files' and public.is_admin());
create policy "Admins delete product files" on storage.objects for delete to authenticated using (bucket_id='product-files' and public.is_admin());
create policy "Admins read product file rows" on storage.objects for select to authenticated using (bucket_id='product-files' and public.is_admin());

create policy "Admins upload site assets" on storage.objects for insert to authenticated with check (bucket_id='site-assets' and public.is_admin());
create policy "Admins update site assets" on storage.objects for update to authenticated using (bucket_id='site-assets' and public.is_admin()) with check (bucket_id='site-assets' and public.is_admin());
create policy "Admins delete site assets" on storage.objects for delete to authenticated using (bucket_id='site-assets' and public.is_admin());
create policy "Admins read site asset rows" on storage.objects for select to authenticated using (bucket_id='site-assets' and public.is_admin());

-- IMPORTANT: after creating your dad's Auth user in Supabase, run this separately with the real email:
-- insert into public.admin_users(user_id,email)
-- select id,email from auth.users where email='YOUR_DADS_EMAIL_HERE';
