import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { deleteUser as deleteAuthUser, updateProfile } from 'firebase/auth';
import { db, auth } from './config';
import { User } from '@/types/user';

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<User, 'displayName' | 'username' | 'bio' | 'website' | 'twitter'>>
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  // Update Firebase Auth profile if displayName changed
  if (updates.displayName && auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: updates.displayName,
    });
  }
}

/**
 * Upgrade user to premium
 */
export async function upgradeUserToPremium(userId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    isPremium: true,
    premiumSince: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Downgrade user from premium
 */
export async function downgradeUserFromPremium(userId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    isPremium: false,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete user account
 * This will delete both the Firestore document and Firebase Auth account
 */
export async function deleteUserAccount(userId: string): Promise<void> {
  // Delete Firestore document
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
  
  // Delete Firebase Auth account
  if (auth.currentUser) {
    await deleteAuthUser(auth.currentUser);
  }
}

/**
 * Update user's avatar
 */
export async function updateUserAvatar(userId: string, avatarUrl: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    avatar: avatarUrl,
    updatedAt: serverTimestamp(),
  });

  // Update Firebase Auth profile
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      photoURL: avatarUrl,
    });
  }
}
