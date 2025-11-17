import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  increment,
} from 'firebase/firestore';
import { db } from './config';
import { Product } from '@/types/product';

/**
 * Create a new product
 */
export async function createProduct(
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'upvotes' | 'upvotedBy' | 'views'>
): Promise<string> {
  const productsRef = collection(db, 'products');
  
  const newProduct = {
    ...productData,
    upvotes: 0,
    upvotedBy: [],
    views: 0,
    status: 'published' as const,
    featured: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(productsRef, newProduct);
  
  // Update user's product count
  const userRef = doc(db, 'users', productData.userId);
  await updateDoc(userRef, {
    productCount: increment(1),
  });
  
  return docRef.id;
}

/**
 * Get all published products
 */
export async function getProducts(
  limitCount?: number,
  orderByField: 'createdAt' | 'upvotes' | 'views' = 'createdAt'
): Promise<Product[]> {
  const productsRef = collection(db, 'products');
  let q = query(
    productsRef,
    where('status', '==', 'published'),
    orderBy(orderByField, 'desc')
  );

  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limitCount: number = 3): Promise<Product[]> {
  const productsRef = collection(db, 'products');
  const q = query(
    productsRef,
    where('status', '==', 'published'),
    where('featured', '==', true),
    orderBy('upvotes', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

/**
 * Get products by user ID
 */
export async function getProductsByUser(userId: string): Promise<Product[]> {
  const productsRef = collection(db, 'products');
  const q = query(
    productsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

/**
 * Get a single product by ID
 */
export async function getProduct(productId: string): Promise<Product | null> {
  const productRef = doc(db, 'products', productId);
  const productDoc = await getDoc(productRef);

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
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('slug', '==', slug), limit(1));
  
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as Product;
}

/**
 * Update a product
 */
export async function updateProduct(
  productId: string,
  updates: Partial<Omit<Product, 'id' | 'createdAt' | 'userId'>>
): Promise<void> {
  const productRef = doc(db, 'products', productId);
  
  await updateDoc(productRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string, userId: string): Promise<void> {
  const productRef = doc(db, 'products', productId);
  await deleteDoc(productRef);
  
  // Decrement user's product count
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    productCount: increment(-1),
  });
}

/**
 * Upvote a product
 */
export async function upvoteProduct(productId: string, userId: string): Promise<void> {
  const productRef = doc(db, 'products', productId);
  const product = await getProduct(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if user already upvoted
  if (product.upvotedBy.includes(userId)) {
    // Remove upvote
    await updateDoc(productRef, {
      upvotes: increment(-1),
      upvotedBy: product.upvotedBy.filter(id => id !== userId),
    });
  } else {
    // Add upvote
    await updateDoc(productRef, {
      upvotes: increment(1),
      upvotedBy: [...product.upvotedBy, userId],
    });
  }
}

/**
 * Increment product views
 */
export async function incrementViews(productId: string): Promise<void> {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, {
    views: increment(1),
  });
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  category: string,
  limitCount?: number
): Promise<Product[]> {
  const productsRef = collection(db, 'products');
  let q = query(
    productsRef,
    where('status', '==', 'published'),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );

  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}
