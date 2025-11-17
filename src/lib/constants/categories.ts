import { ProductCategory } from '@/types/product';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'SaaS',
  'Micro SaaS',
  'Digital Product',
  'Business for Sale',
  'Design',
  'Development',
  'Finance',
  'Marketing',
  'Personal Life',
];

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  'SaaS': 'Software as a Service products',
  'Micro SaaS': 'Small, niche SaaS products',
  'Digital Product': 'Digital downloads, templates, and resources',
  'Business for Sale': 'Existing businesses looking for buyers',
  'Design': 'Design tools, templates, and resources',
  'Development': 'Developer tools and libraries',
  'Finance': 'Financial tools and services',
  'Marketing': 'Marketing tools and resources',
  'Personal Life': 'Personal productivity and lifestyle products',
};

export const CATEGORY_COLORS: Record<ProductCategory, string> = {
  'SaaS': 'bg-blue-100 text-blue-800',
  'Micro SaaS': 'bg-indigo-100 text-indigo-800',
  'Digital Product': 'bg-purple-100 text-purple-800',
  'Business for Sale': 'bg-green-100 text-green-800',
  'Design': 'bg-pink-100 text-pink-800',
  'Development': 'bg-yellow-100 text-yellow-800',
  'Finance': 'bg-emerald-100 text-emerald-800',
  'Marketing': 'bg-orange-100 text-orange-800',
  'Personal Life': 'bg-cyan-100 text-cyan-800',
};
