import { createClient } from '@/lib/supabase/server';
import { defaultSettings, fallbackProducts } from '@/lib/default-data';
import type { Product, SiteSettings } from '@/lib/types';

function configured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export async function getProducts(options?: { featured?: boolean; includeHidden?: boolean }): Promise<Product[]> {
  if (!configured()) {
    let rows = fallbackProducts;
    if (options?.featured) rows = rows.filter(p => p.featured);
    if (!options?.includeHidden) rows = rows.filter(p => p.is_visible);
    return rows;
  }
  try {
    const supabase = await createClient();
    let query = supabase.from('products').select('*, product_images(*)').order('sort_order').order('name');
    if (!options?.includeHidden) query = query.eq('is_visible', true);
    if (options?.featured) query = query.eq('featured', true);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Product[];
  } catch {
    let rows = fallbackProducts;
    if (options?.featured) rows = rows.filter(p => p.featured);
    return rows;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!configured()) return fallbackProducts.find(p => p.slug === slug) ?? null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('products').select('*, product_images(*)').eq('slug', slug).eq('is_visible', true).maybeSingle();
    if (error) throw error;
    return data as Product | null;
  } catch { return fallbackProducts.find(p => p.slug === slug) ?? null; }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!configured()) return defaultSettings;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).single();
    if (error) throw error;
    return { ...defaultSettings, ...(data ?? {}) } as SiteSettings;
  } catch { return defaultSettings; }
}
