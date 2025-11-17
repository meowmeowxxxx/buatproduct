import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  UploadResult,
} from 'firebase/storage';
import { storage } from './config';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a file to Firebase Storage
 */
export async function uploadFile(
  file: File,
  path: string,
  filename?: string
): Promise<string> {
  const actualFilename = filename || `${uuidv4()}-${file.name}`;
  const storageRef = ref(storage, `${path}/${actualFilename}`);
  
  const snapshot: UploadResult = await uploadBytes(storageRef, file, {
    contentType: file.type,
  });
  
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

/**
 * Upload product logo
 */
export async function uploadProductLogo(file: File, productId: string): Promise<string> {
  return uploadFile(file, `products/${productId}/logo`);
}

/**
 * Upload user avatar
 */
export async function uploadUserAvatar(file: File, userId: string): Promise<string> {
  return uploadFile(file, `users/${userId}/avatar`);
}

/**
 * Delete a file from Firebase Storage
 */
export async function deleteFile(fileURL: string): Promise<void> {
  try {
    const fileRef = ref(storage, fileURL);
    await deleteObject(fileRef);
  } catch (error: any) {
    // Ignore if file doesn't exist
    if (error.code !== 'storage/object-not-found') {
      throw error;
    }
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or SVG image.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 5MB limit.',
    };
  }

  return { valid: true };
}
