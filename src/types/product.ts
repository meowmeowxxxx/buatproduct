import { Timestamp } from 'firebase/firestore';

export type ProductStatus = 'draft' | 'submitted' | 'published' | 'suspended';

export type ProductCategory = 
  | 'SaaS'
  | 'Micro SaaS'
  | 'Digital Product'
  | 'Business for Sale'
  | 'Design'
  | 'Development'
  | 'Developer Tools'
  | 'Finance'
  | 'Marketing'
  | 'Personal Life'
  | 'Productivity'
  | 'Analytics'
  | 'AI Tools'
  | 'Mobile App'
  | 'Chrome Extension';

export interface Product {
  id: string;
  userId: string;
  username: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  logo: string;
  category: ProductCategory;
  tags: string[];
  websiteUrl?: string;
  status: ProductStatus;
  featured: boolean;
  featuredUntil?: Timestamp | null;
  premium?: boolean; // Premium launch badge
  premiumUntil?: Timestamp | null; // Premium promotion end date
  upvotes: number;
  upvotedBy: string[]; // Array of user IDs
  views: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  submittedAt?: Timestamp | null;
  publishedAt?: Timestamp | null;
  rejectionReason?: string | null;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  logo: File | string;
  category: ProductCategory;
  tags: string[];
  websiteUrl?: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  tags?: string[];
  search?: string;
  sortBy?: 'recent' | 'popular' | 'upvotes';
  status?: ProductStatus;
}

export interface ProductUpdateData {
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  logo?: string;
  category?: ProductCategory;
  tags?: string[];
  websiteUrl?: string;
  status?: ProductStatus;
  rejectionReason?: string;
  featured?: boolean;
  featuredUntil?: Timestamp | null;
}
