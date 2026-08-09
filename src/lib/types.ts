export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  image_path: string;
  sort_order: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  short_description: string | null;
  description: string | null;
  origin: string | null;
  form: string | null;
  packaging: string | null;
  minimum_order: string | null;
  availability: string | null;
  quality_label: string | null;
  main_image_url: string | null;
  main_image_path: string | null;
  specification_url: string | null;
  specification_path: string | null;
  featured: boolean;
  is_visible: boolean;
  sort_order: number;
  created_at?: string;
  product_images?: ProductImage[];
};

export type SiteSettings = {
  id: number;
  company_name: string;
  tagline: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_accent: string;
  hero_description: string;
  about_title: string;
  about_text: string;
  email: string;
  phone: string;
  whatsapp: string;
  facebook_url: string;
  messenger_url: string;
  instagram_url: string;
  linkedin_url: string;
  address: string;
};

export type Inquiry = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  product_name: string | null;
  quantity: string | null;
  message: string;
  preferred_contact: string | null;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
};
