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
  'Other',
];

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  'SaaS': 'Software as a Service products',
  'Micro SaaS': 'Small, niche SaaS products',
  'Digital Product': 'Digital downloads, templates, and resources',
  'Business for Sale': 'Existing businesses looking for buyers',
  'Design': 'Design tools, templates, and resources',
  'Development': 'Developer tools and libraries',
  'Developer Tools': 'Tools and resources for developers',
  'Finance': 'Financial tools and services',
  'Marketing': 'Marketing tools and resources',
  'Personal Life': 'Personal productivity and lifestyle products',
  'Productivity': 'Productivity and efficiency tools',
  'Analytics': 'Analytics and data tracking tools',
  'AI Tools': 'Artificial intelligence powered tools',
  'Mobile App': 'Mobile applications for iOS and Android',
  'Chrome Extension': 'Browser extensions for Chrome',
  'Other': 'Products that don\'t fit other categories',
};

export const CATEGORY_COLORS: Record<ProductCategory, string> = {
  'SaaS': 'bg-blue-100 text-blue-800',
  'Micro SaaS': 'bg-indigo-100 text-indigo-800',
  'Digital Product': 'bg-purple-100 text-purple-800',
  'Business for Sale': 'bg-green-100 text-green-800',
  'Design': 'bg-pink-100 text-pink-800',
  'Development': 'bg-yellow-100 text-yellow-800',
  'Developer Tools': 'bg-slate-100 text-slate-800',
  'Finance': 'bg-emerald-100 text-emerald-800',
  'Marketing': 'bg-orange-100 text-orange-800',
  'Personal Life': 'bg-cyan-100 text-cyan-800',
  'Productivity': 'bg-teal-100 text-teal-800',
  'Analytics': 'bg-violet-100 text-violet-800',
  'AI Tools': 'bg-fuchsia-100 text-fuchsia-800',
  'Mobile App': 'bg-rose-100 text-rose-800',
  'Chrome Extension': 'bg-lime-100 text-lime-800',
  'Other': 'bg-gray-100 text-gray-800',
};
