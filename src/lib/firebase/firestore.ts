import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Product, ProductStatus, ProductUpdateData } from '@/types/product';
import { User } from '@/types/user';

/**
 * Create a new product
 */
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const productsRef = collection(db, 'products');
  const docRef = await addDoc(productsRef, {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Get a single product by ID
 */
export async function getProduct(productId: string): Promise<Product | null> {
  const productDoc = await getDoc(doc(db, 'products', productId));
  
  if (!productDoc.exists()) {
    return null;
  }

  return {
    id: productDoc.id,
    ...productDoc.data(),
  } as Product;
}

/**
 * Get a product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as Product;
}

/**
 * Update a product
 */
export async function updateProduct(productId: string, updates: ProductUpdateData): Promise<void> {
  await updateDoc(doc(db, 'products', productId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string): Promise<void> {
  await deleteDoc(doc(db, 'products', productId));
}

/**
 * Get products with pagination
 */
export async function getProducts(
  status?: ProductStatus,
  limitCount: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ products: Product[]; lastDoc: DocumentSnapshot | null }> {
  let q = query(
    collection(db, 'products'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  if (status) {
    q = query(q, where('status', '==', status));
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];

  return {
    products,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
  };
}

/**
 * Get products by user ID
 */
export async function getProductsByUser(userId: string): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const now = Timestamp.now();
  const q = query(
    collection(db, 'products'),
    where('featured', '==', true),
    where('featuredUntil', '>', now),
    where('status', '==', 'published'),
    orderBy('featuredUntil', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

/**
 * Submit product for approval
 */
export async function submitProduct(productId: string): Promise<void> {
  await updateDoc(doc(db, 'products', productId), {
    status: 'submitted',
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Approve a product
 */
export async function approveProduct(productId: string): Promise<void> {
  await updateDoc(doc(db, 'products', productId), {
    status: 'published',
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    rejectionReason: null,
  });
}

/**
 * Reject a product
 */
export async function rejectProduct(productId: string, reason: string): Promise<void> {
  await updateDoc(doc(db, 'products', productId), {
    status: 'draft',
    rejectionReason: reason,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Feature a product
 */
export async function featureProduct(productId: string, days: number): Promise<void> {
  const featuredUntil = new Date();
  featuredUntil.setDate(featuredUntil.getDate() + days);

  await updateDoc(doc(db, 'products', productId), {
    featured: true,
    featuredUntil: Timestamp.fromDate(featuredUntil),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Upvote a product
 */
export async function upvoteProduct(productId: string, userId: string): Promise<void> {
  await updateDoc(doc(db, 'products', productId), {
    upvotes: increment(1),
    upvotedBy: arrayUnion(userId),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Remove upvote from a product
 */
export async function removeUpvote(productId: string, userId: string): Promise<void> {
  await updateDoc(doc(db, 'products', productId), {
    upvotes: increment(-1),
    upvotedBy: arrayRemove(userId),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Increment product views
 */
export async function incrementProductViews(productId: string): Promise<void> {
  await updateDoc(doc(db, 'products', productId), {
    views: increment(1),
  });
}

/**
 * Check if slug is available
 */
export async function isSlugAvailable(slug: string, excludeProductId?: string): Promise<boolean> {
  const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return true;
  }

  // If we're updating an existing product, allow the same slug
  if (excludeProductId && snapshot.docs[0].id === excludeProductId) {
    return true;
  }

  return false;
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
  await updateDoc(doc(db, 'users', userId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Get user by username
 */
export async function getUserByUsername(username: string): Promise<User | null> {
  const q = query(collection(db, 'users'), where('username', '==', username), limit(1));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as User;
}
