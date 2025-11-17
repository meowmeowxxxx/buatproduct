import { Timestamp } from 'firebase/firestore';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  website?: string;
  twitter?: string;
  role: UserRole;
  isPremium: boolean;
  productCount: number;
  subscriptionEndDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  emailVerified: boolean;
  stripeCustomerId?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  website?: string;
  twitter?: string;
  productsCount: number;
  joinedAt: Timestamp;
}

export interface UserFormData {
  displayName: string;
  username: string;
  bio?: string;
  avatar?: File | string;
  website?: string;
  twitter?: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role: UserRole;
}
