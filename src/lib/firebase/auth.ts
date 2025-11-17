import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { User, UserRole } from '@/types/user';

/**
 * Sign up a new user
 */
export async function signUp(
  email: string,
  password: string,
  username: string,
  displayName: string
): Promise<{ user: FirebaseUser; userData: User }> {
  // Create auth user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update profile
  await updateProfile(user, { displayName });

  // Create user document in Firestore
  const userData: Omit<User, 'id'> = {
    email,
    username,
    displayName,
    role: 'user',
    isPremium: false,
    productCount: 0,
    createdAt: serverTimestamp() as any,
    updatedAt: serverTimestamp() as any,
    emailVerified: false,
  };

  await setDoc(doc(db, 'users', user.uid), userData);

  return { user, userData: { ...userData, id: user.uid } as User };
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string): Promise<FirebaseUser> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Get user data from Firestore
 */
export async function getUserData(uid: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, 'users', uid));
  
  if (!userDoc.exists()) {
    return null;
  }

  return {
    id: userDoc.id,
    ...userDoc.data(),
  } as User;
}

/**
 * Get user role
 */
export async function getUserRole(uid: string): Promise<UserRole> {
  const userData = await getUserData(uid);
  return userData?.role || 'user';
}

/**
 * Check if username is available
 */
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const usersRef = doc(db, 'users', username);
  const userDoc = await getDoc(usersRef);
  return !userDoc.exists();
}
