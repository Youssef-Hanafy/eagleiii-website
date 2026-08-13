import type { Product, SiteSettings } from './types';

export const defaultSettings: SiteSettings = {
  id: 1,
  company_name: 'Egypt Herbs Wholesale',
  tagline: 'Wholesale Supply',
  hero_eyebrow: 'SOURCED FROM EGYPT · BUILT FOR B2B',
  hero_title: 'Premium dried herbs.',
  hero_accent: 'Reliable wholesale supply.',
  hero_description: 'Supplying distributors, wholesalers, and commercial buyers with premium dried herbs, seeds, and botanicals sourced from Egypt.',
  about_title: 'A straightforward supply partner for commercial buyers.',
  about_text: 'We source premium dried herbs, seeds, and botanicals from Egypt and make them available to distributors, wholesalers, and commercial buyers seeking dependable supply and direct communication.',
  email: 'your@email.com',
  phone: '+1 (000) 000-0000',
  whatsapp: '',
  facebook_url: '',
  messenger_url: '',
  instagram_url: '',
  linkedin_url: '',
  address: '',
  logo_url: '',
  logo_path: ''
};

const base = (id:string, slug:string, name:string, category:string, form:string, featured=false): Product => ({
  id, slug, name, category, form,
  short_description: `Premium ${name.toLowerCase()} sourced from Egypt for wholesale distribution and commercial buyers.`,
  description: `Premium ${name.toLowerCase()} prepared for distributors, wholesalers, and commercial buyers. Contact us for current specifications, packaging, documentation, availability, and quotations.`,
  origin: 'Egypt', packaging: 'Bulk commercial packaging', minimum_order: 'Contact us', availability: 'Available on request',
  quality_label: 'Premium Quality', main_image_url: null, main_image_path: null, specification_url: null, specification_path: null,
  featured, is_visible: true, sort_order: Number(id), product_images: []
});

export const fallbackProducts: Product[] = [
  base('1','basil','Basil','Herbs','Dried',true),
  base('2','oregano','Oregano','Herbs','Dried',true),
  base('3','thyme','Thyme','Herbs','Dried',true),
  base('4','parsley','Parsley','Herbs','Dried',true),
  base('5','dill','Dill','Herbs','Dried',false),
  base('6','hibiscus-slices','Hibiscus Slices','Botanicals','Dried slices',true),
  base('7','fennel-seeds','Fennel Seeds','Seeds','Whole dried seed',false),
  base('8','anise-seeds','Anise Seeds','Seeds','Whole dried seed',false),
  base('9','calendula-petals','Calendula Petals','Botanicals','Dried petals',false),
];
