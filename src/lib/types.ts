export interface ColorVariant {
  name: string;
  displayColor: string;
  hex?: string;
  ral?: string;
  image?: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  shortDescription: string;
  description: string;
  features: string[];
  images: string[];
  colors: ColorVariant[];
  sizes: string[];
  materials: string[];
  standards: string[];
  specifications: Specification[];
  customizationAvailable: boolean;
  featured: boolean;
}

export interface SubcategoryMeta {
  name: string;
  slug: string;
  description: string;
  productCount?: number;
}

export interface CategoryMeta {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  index: string;
  image: string;
  subcategories: SubcategoryMeta[];
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  notes?: string;
}

export interface QuoteFormData {
  companyName: string;
  cui?: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  county: string;
  notes?: string;
  wantCustomization: boolean;
  customizationNotes?: string;
}

export interface ContactFormData {
  name: string;
  company?: string;
  phone: string;
  email: string;
  message: string;
}
