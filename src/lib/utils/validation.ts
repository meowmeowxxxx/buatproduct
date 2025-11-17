import { z } from 'zod';
import { ProductCategory, ProductStatus } from '@/types/product';
import { UserRole } from '@/types/user';

// Product validation schemas
export const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be less than 100 characters'),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(5000, 'Description must be less than 5000 characters'),
  shortDescription: z.string().min(20, 'Short description must be at least 20 characters').max(200, 'Short description must be less than 200 characters'),
  logo: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  category: z.enum([
    'SaaS',
    'Micro SaaS',
    'Digital Product',
    'Business for Sale',
    'Design',
    'Development',
    'Finance',
    'Marketing',
    'Personal Life',
  ] as const),
  tags: z.array(z.string().min(2).max(30)).min(1, 'At least one tag is required').max(10, 'Maximum 10 tags allowed'),
  websiteUrl: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

export const productUpdateSchema = productSchema.partial();

// User validation schemas
export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must be less than 100 characters'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').max(50, 'Display name must be less than 50 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const userProfileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters').max(50, 'Display name must be less than 50 characters'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  twitter: z.string().max(50, 'Twitter handle must be less than 50 characters').optional().or(z.literal('')),
});

// Product submission validation
export const submitProductSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
});

// Admin approval validation
export const approvalSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  approved: z.boolean(),
  rejectionReason: z.string().min(10, 'Rejection reason must be at least 10 characters').max(500, 'Rejection reason must be less than 500 characters').optional(),
});

// Upvote validation
export const upvoteSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
});

// Analytics tracking validation
export const analyticsTrackSchema = z.object({
  path: z.string().min(1, 'Path is required'),
  referrer: z.string().optional(),
  visitorId: z.string().min(1, 'Visitor ID is required'),
});

// Stripe checkout validation
export const stripeCheckoutSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  priceId: z.string().min(1, 'Price ID is required'),
});

// Helper function to validate data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { success: false, error: firstError.message };
    }
    return { success: false, error: 'Validation failed' };
  }
}

// Export types inferred from schemas
export type ProductFormInput = z.infer<typeof productSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type ApprovalInput = z.infer<typeof approvalSchema>;
