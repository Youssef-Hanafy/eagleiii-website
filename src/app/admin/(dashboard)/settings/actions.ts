'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

function safeFile(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
}

async function assertAdmin() {
  const s = await createClient();
  const { data } = await s.auth.getClaims();
  const uid = data?.claims?.sub;
  if (!uid) redirect('/admin/login');

  const { data: admin } = await s
    .from('admin_users')
    .select('user_id')
    .eq('user_id', uid)
    .maybeSingle();

  if (!admin) redirect('/admin/login');
  return s;
}

async function uploadLogo(s: Awaited<ReturnType<typeof createClient>>, file: File) {
  if (!file || file.size === 0) return null;
  if (file.size > 5 * 1024 * 1024) throw new Error('Logo too large');

  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.type)) throw new Error('Unsupported logo type');

  const path = `logos/${crypto.randomUUID()}-${safeFile(file.name)}`;
  const { error } = await s.storage.from('site-assets').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;

  const { data } = s.storage.from('site-assets').getPublicUrl(path);
  return { path, url: data.publicUrl };
}

export async function saveSettings(formData: FormData) {
  const s = await assertAdmin();
  const { data: existing } = await s
    .from('site_settings')
    .select('logo_url,logo_path')
    .eq('id', 1)
    .single();

  let logo: { path: string; url: string } | null = null;
  try {
    logo = await uploadLogo(s, formData.get('logo') as File);
  } catch {
    redirect('/admin/settings?error=upload');
  }

  if (logo && existing?.logo_path) {
    await s.storage.from('site-assets').remove([existing.logo_path]);
  }

  const payload = {
    company_name: String(formData.get('company_name') || ''),
    tagline: String(formData.get('tagline') || ''),
    hero_eyebrow: String(formData.get('hero_eyebrow') || ''),
    hero_title: String(formData.get('hero_title') || ''),
    hero_accent: String(formData.get('hero_accent') || ''),
    hero_description: String(formData.get('hero_description') || ''),
    about_title: String(formData.get('about_title') || ''),
    about_text: String(formData.get('about_text') || ''),
    email: String(formData.get('email') || ''),
    phone: String(formData.get('phone') || ''),
    whatsapp: String(formData.get('whatsapp') || ''),
    facebook_url: String(formData.get('facebook_url') || ''),
    messenger_url: String(formData.get('messenger_url') || ''),
    instagram_url: String(formData.get('instagram_url') || ''),
    linkedin_url: String(formData.get('linkedin_url') || ''),
    address: String(formData.get('address') || ''),
    logo_url: logo?.url || existing?.logo_url || '',
    logo_path: logo?.path || existing?.logo_path || '',
    updated_at: new Date().toISOString(),
  };

  const { error } = await s.from('site_settings').update(payload).eq('id', 1);
  if (error) redirect('/admin/settings?error=1');

  revalidatePath('/', 'layout');
  redirect('/admin/settings?saved=1');
}
