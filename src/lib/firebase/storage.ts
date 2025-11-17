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
 * Validate image file with security checks
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 2 * 1024 * 1024; // 2MB (reduced for security)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or SVG image.',
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 2MB limit.',
    };
  }

  // Security: Check for double extensions (e.g., logo.jpg.php, logo.png.exe)
  const fileName = file.name.toLowerCase();
  const parts = fileName.split('.');
  
  if (parts.length > 2) {
    return { 
      valid: false, 
      error: 'Invalid filename. No double extensions allowed for security.' 
    };
  }

  // Get file extension
  const extension = parts[parts.length - 1];
  
  // Security: Validate extension
  if (!allowedExtensions.includes(extension)) {
    return { 
      valid: false, 
      error: `Invalid file extension. Allowed: ${allowedExtensions.join(', ')}` 
    };
  }

  // Security: Check for suspicious patterns in filename
  const suspiciousPatterns = [
    /\.\./,           // Directory traversal
    /%00/,            // Null byte injection
    /[<>:"|?*]/,      // Invalid characters
    /^\.+$/,          // Hidden files
    /\s{2,}/,         // Multiple spaces
    /[\x00-\x1f\x7f]/,// Control characters
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(fileName)) {
      return { 
        valid: false, 
        error: 'Invalid filename. Contains suspicious characters.' 
      };
    }
  }

  return { valid: true };
}
