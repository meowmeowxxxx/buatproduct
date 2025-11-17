import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK (server-side only)
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminStorage = admin.storage();

/**
 * Verify Firebase ID token (for API route authentication)
 */
export async function verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
  return adminAuth.verifyIdToken(token);
}

/**
 * Set custom user claims (for roles)
 */
export async function setCustomClaims(uid: string, claims: Record<string, any>): Promise<void> {
  await adminAuth.setCustomUserClaims(uid, claims);
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
  return adminAuth.getUserByEmail(email);
}

/**
 * Delete user
 */
export async function deleteUser(uid: string): Promise<void> {
  await adminAuth.deleteUser(uid);
}
