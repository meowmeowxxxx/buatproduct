import { UserRole } from '@/types/user';

export const USER_ROLES: Record<UserRole, string> = {
  user: 'User',
  admin: 'Admin',
};

export const ROLE_PERMISSIONS = {
  user: [
    'create_product',
    'edit_own_product',
    'delete_own_product',
    'view_products',
    'upvote_product',
  ],
  admin: [
    'create_product',
    'edit_own_product',
    'edit_any_product',
    'delete_own_product',
    'delete_any_product',
    'view_products',
    'approve_product',
    'reject_product',
    'feature_product',
    'view_analytics',
    'manage_users',
    'upvote_product',
  ],
} as const;

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission as any) ?? false;
}

export function isAdmin(role: UserRole): boolean {
  return role === 'admin';
}
