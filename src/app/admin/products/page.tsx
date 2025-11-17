'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, orderBy, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Product, ProductStatus } from '@/types/product';
import { Button } from '@/components/ui/Button';

type FilterStatus = 'all' | ProductStatus;

export default function AdminProductsPage() {
  const router = useRouter();
  const { userData, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('submitted');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Check if user is admin
  useEffect(() => {
    if (!authLoading && (!userData || userData.role !== 'admin')) {
      router.push('/');
    }
  }, [userData, authLoading, router]);

  // Fetch products
  useEffect(() => {
    if (!userData || userData.role !== 'admin') return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsRef = collection(db, 'products');
        let q;

        if (filterStatus === 'all') {
          q = query(productsRef, orderBy('submittedAt', 'desc'));
        } else {
          q = query(
            productsRef,
            where('status', '==', filterStatus),
            orderBy('submittedAt', 'desc')
          );
        }

        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userData, filterStatus]);

  const handleApprove = async (product: Product) => {
    if (!userData) return;

    try {
      setProcessingId(product.id);
      const productRef = doc(db, 'products', product.id);
      await updateDoc(productRef, {
        status: 'published',
        reviewedAt: Timestamp.now(),
        reviewedBy: userData.id,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? { ...p, status: 'published' as ProductStatus, reviewedAt: Timestamp.now(), reviewedBy: userData.id }
            : p
        )
      );
    } catch (error) {
      console.error('Error approving product:', error);
      alert('Failed to approve product');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async () => {
    if (!userData || !selectedProduct || !rejectionReason.trim()) return;

    try {
      setProcessingId(selectedProduct.id);
      const productRef = doc(db, 'products', selectedProduct.id);
      await updateDoc(productRef, {
        status: 'rejected',
        reviewedAt: Timestamp.now(),
        reviewedBy: userData.id,
        rejectionReason: rejectionReason.trim(),
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                status: 'rejected' as ProductStatus,
                reviewedAt: Timestamp.now(),
                reviewedBy: userData.id,
                rejectionReason: rejectionReason.trim(),
              }
            : p
        )
      );

      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error rejecting product:', error);
      alert('Failed to reject product');
    } finally {
      setProcessingId(null);
    }
  };

  const openRejectModal = (product: Product) => {
    setSelectedProduct(product);
    setShowRejectModal(true);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedProduct(null);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: ProductStatus) => {
    const styles: Record<ProductStatus, string> = {
      draft: 'bg-stone-100 text-stone-800 border-stone-300',
      submitted: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      published: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      suspended: 'bg-gray-100 text-gray-800 border-gray-300',
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className='min-h-screen bg-stone-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-stone-600'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!userData || userData.role !== 'admin') {
    return null;
  }

  return (
    <div className='min-h-screen bg-stone-50'>
      {/* Header */}
      <header className='bg-white border-b border-stone-200 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-stone-900'>Admin Dashboard</h1>
              <p className='text-sm text-stone-600 mt-1'>Review and manage product submissions</p>
            </div>
            <Button onClick={() => router.push('/')} variant='outline' size='sm'>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className='bg-white border-b border-stone-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex gap-4 py-4'>
            {[
              { label: 'Submitted', value: 'submitted' as FilterStatus },
              { label: 'Published', value: 'published' as FilterStatus },
              { label: 'Rejected', value: 'rejected' as FilterStatus },
              { label: 'All', value: 'all' as FilterStatus },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilterStatus(tab.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filterStatus === tab.value
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {products.length === 0 ? (
          <div className='bg-white rounded-xl border border-stone-200 p-12 text-center'>
            <p className='text-stone-600'>No products found with status: {filterStatus}</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {products.map((product) => (
              <div key={product.id} className='bg-white rounded-xl border border-stone-200 p-6 shadow-sm'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      {product.logo && (
                        <img src={product.logo} alt='' className='w-12 h-12 rounded-lg object-cover' />
                      )}
                      <div>
                        <h3 className='text-lg font-semibold text-stone-900'>{product.name}</h3>
                        <p className='text-sm text-stone-600'>{product.tagline}</p>
                      </div>
                    </div>

                    <p className='text-sm text-stone-700 mb-3'>{product.description}</p>

                    <div className='flex flex-wrap gap-4 text-xs text-stone-600 mb-3'>
                      <div>
                        <span className='font-medium'>Category:</span> {product.category}
                      </div>
                      <div>
                        <span className='font-medium'>Submitted:</span> {formatDate(product.submittedAt)}
                      </div>
                      {product.reviewedAt && (
                        <div>
                          <span className='font-medium'>Reviewed:</span> {formatDate(product.reviewedAt)}
                        </div>
                      )}
                      <div>
                        <span className='font-medium'>Website:</span>{' '}
                        <a
                          href={product.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-orange-600 hover:underline'
                        >
                          {product.website}
                        </a>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      {getStatusBadge(product.status)}
                      {product.rejectionReason && (
                        <span className='text-xs text-red-600 italic'>Reason: {product.rejectionReason}</span>
                      )}
                    </div>
                  </div>

                  {product.status === 'submitted' && (
                    <div className='flex gap-2'>
                      <Button
                        onClick={() => handleApprove(product)}
                        disabled={processingId === product.id}
                        className='bg-green-600 hover:bg-green-700 text-white text-sm'
                      >
                        {processingId === product.id ? 'Processing...' : 'Approve'}
                      </Button>
                      <Button
                        onClick={() => openRejectModal(product)}
                        disabled={processingId === product.id}
                        className='bg-red-600 hover:bg-red-700 text-white text-sm'
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedProduct && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6'>
            <h2 className='text-xl font-bold text-stone-900 mb-4'>Reject Product</h2>
            <p className='text-sm text-stone-600 mb-4'>
              Are you sure you want to reject <strong>{selectedProduct.name}</strong>? Please provide a reason:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder='Enter rejection reason...'
              className='w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm'
              rows={4}
            />
            <div className='flex gap-3 mt-6'>
              <Button
                onClick={closeRejectModal}
                variant='outline'
                className='flex-1'
                disabled={processingId === selectedProduct.id}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={!rejectionReason.trim() || processingId === selectedProduct.id}
                className='flex-1 bg-red-600 hover:bg-red-700 text-white'
              >
                {processingId === selectedProduct.id ? 'Processing...' : 'Reject'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
