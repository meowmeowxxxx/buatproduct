import { ProductStatus } from '@/types/product';

export const PRODUCT_STATUSES: Record<ProductStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted for Review',
  published: 'Published',
  suspended: 'Suspended',
};

export const STATUS_COLORS: Record<ProductStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  suspended: 'bg-red-100 text-red-800',
};

export const STATUS_DESCRIPTIONS: Record<ProductStatus, string> = {
  draft: 'Product is saved but not submitted for review',
  submitted: 'Product is awaiting admin approval',
  published: 'Product is live and visible to all users',
  suspended: 'Product has been suspended by admin',
};
