'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email=String(formData.get('email')||'').trim(); const password=String(formData.get('password')||'');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect('/admin/login?error=credentials');
  const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', data.user.id).maybeSingle();
  if (!admin) { await supabase.auth.signOut(); redirect('/admin/login?error=unauthorized'); }
  redirect('/admin');
}
