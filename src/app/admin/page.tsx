'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Product } from '@/types/product';

// Admin credentials (in production, use environment variables or database)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  const { user, userData, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'submitted' | 'all'>('submitted');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, selectedTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const productsRef = collection(db, 'products');
      let q;
      
      if (selectedTab === 'submitted') {
        q = query(
          productsRef,
          where('status', '==', 'submitted'),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(productsRef, orderBy('createdAt', 'desc'));
      }

      const snapshot = await getDocs(q);
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleApprove = async (productId: string) => {
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        status: 'published',
        approvedAt: new Date(),
      });
      fetchProducts();
    } catch (error) {
      console.error('Error approving product:', error);
      alert('Failed to approve product');
    }
  };

  const handleReject = async (productId: string) => {
    const reason = prompt('Rejection reason (optional):');
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        status: 'rejected',
        rejectedAt: new Date(),
        rejectionReason: reason || 'Does not meet guidelines',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error rejecting product:', error);
      alert('Failed to reject product');
    }
  };

  const handleFeature = async (productId: string, featured: boolean) => {
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        featured: !featured,
        featuredUntil: !featured ? new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) : null,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error updating featured status:', error);
      alert('Failed to update featured status');
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200 w-full max-w-md">
          <h1 className="text-2xl font-bold text-stone-900 mb-6">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
              Login
            </Button>
          </form>

          <p className="mt-4 text-xs text-stone-500 text-center">
            Default: admin / admin123
          </p>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Admin Dashboard</h1>
            <p className="text-stone-600">Manage product submissions and reviews</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-stone-200">
          <button
            onClick={() => setSelectedTab('submitted')}
            className={`pb-3 px-4 font-medium text-sm transition-colors ${
              selectedTab === 'submitted'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Pending Review ({products.filter(p => p.status === 'submitted').length})
          </button>
          <button
            onClick={() => setSelectedTab('all')}
            className={`pb-3 px-4 font-medium text-sm transition-colors ${
              selectedTab === 'all'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Products ({products.length})
          </button>
        </div>

        {/* Products List */}
        {loadingProducts ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-stone-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white border border-stone-200 rounded-xl">
            <p className="text-stone-600">
              {selectedTab === 'submitted' ? 'No pending reviews' : 'No products found'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  {product.logo && (
                    <img
                      src={product.logo}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-stone-900">{product.name}</h3>
                        <p className="text-sm text-stone-600">{product.tagline}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : product.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {product.status}
                        </span>
                        {product.featured && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-stone-700 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
                      <span>Category: {product.category}</span>
                      <span>•</span>
                      <span>By: @{product.username}</span>
                      <span>•</span>
                      <span>👍 {product.upvotes}</span>
                      <span>•</span>
                      <span>👁️ {product.views}</span>
                      {product.websiteUrl && (
                        <>
                          <span>•</span>
                          <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                            Visit Website →
                          </a>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {product.status === 'submitted' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleApprove(product.id)}
                          >
                            ✓ Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleReject(product.id)}
                          >
                            ✕ Reject
                          </Button>
                        </>
                      )}
                      
                      {product.status === 'published' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFeature(product.id, product.featured || false)}
                        >
                          {product.featured ? '⭐ Unfeature' : '⭐ Feature'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
