export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Herbs" | "Seeds" | "Botanicals";
  origin: string;
  form: string;
  packaging: string;
  description: string;
  accent: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "basil",
    name: "Basil",
    category: "Herbs",
    origin: "Egypt",
    form: "Dried",
    packaging: "Bulk commercial packaging",
    description: "Premium dried basil prepared for wholesale distribution and commercial buyers.",
    accent: "BA",
    featured: true
  },
  {
    id: "2",
    slug: "oregano",
    name: "Oregano",
    category: "Herbs",
    origin: "Egypt",
    form: "Dried",
    packaging: "Bulk commercial packaging",
    description: "Aromatic dried oregano sourced from Egypt for B2B supply and distribution.",
    accent: "OR",
    featured: true
  },
  {
    id: "3",
    slug: "thyme",
    name: "Thyme",
    category: "Herbs",
    origin: "Egypt",
    form: "Dried",
    packaging: "Bulk commercial packaging",
    description: "Commercial dried thyme available for distributors, wholesalers, and food businesses.",
    accent: "TH",
    featured: true
  },
  {
    id: "4",
    slug: "parsley",
    name: "Parsley",
    category: "Herbs",
    origin: "Egypt",
    form: "Dried",
    packaging: "Bulk commercial packaging",
    description: "Dried parsley supplied in bulk for commercial and wholesale applications.",
    accent: "PA",
    featured: true
  },
  {
    id: "5",
    slug: "dill",
    name: "Dill",
    category: "Herbs",
    origin: "Egypt",
    form: "Dried",
    packaging: "Bulk commercial packaging",
    description: "Premium dried dill available for bulk commercial supply.",
    accent: "DI",
    featured: false
  },
  {
    id: "6",
    slug: "hibiscus-slices",
    name: "Hibiscus Slices",
    category: "Botanicals",
    origin: "Egypt",
    form: "Dried slices",
    packaging: "Bulk commercial packaging",
    description: "Vibrant dried hibiscus slices supplied for wholesale and commercial buyers.",
    accent: "HI",
    featured: true
  },
  {
    id: "7",
    slug: "fennel-seeds",
    name: "Fennel Seeds",
    category: "Seeds",
    origin: "Egypt",
    form: "Whole dried seed",
    packaging: "Bulk commercial packaging",
    description: "Egyptian fennel seeds available in bulk for B2B buyers and distributors.",
    accent: "FE",
    featured: false
  },
  {
    id: "8",
    slug: "anise-seeds",
    name: "Anise Seeds",
    category: "Seeds",
    origin: "Egypt",
    form: "Whole dried seed",
    packaging: "Bulk commercial packaging",
    description: "Aromatic anise seeds supplied in commercial quantities for wholesale distribution.",
    accent: "AN",
    featured: false
  },
  {
    id: "9",
    slug: "calendula-petals",
    name: "Calendula Petals",
    category: "Botanicals",
    origin: "Egypt",
    form: "Dried petals",
    packaging: "Bulk commercial packaging",
    description: "Dried calendula petals sourced from Egypt and available for bulk commercial supply.",
    accent: "CA",
    featured: false
  }
];
