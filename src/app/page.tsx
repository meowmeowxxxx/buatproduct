'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { PremiumBadge } from '@/components/ui/LaunchBadge';
import { Product } from '@/types/product';
import { Timestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils/cn';
import { getProducts, getFeaturedProducts } from '@/lib/firebase/products';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'saas', label: 'SaaS' },
  { id: 'developer', label: 'Developer Tools' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'analytics', label: 'Analytics' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('upvotes');
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const [allProducts, featured] = await Promise.all([
          getProducts(50, 'createdAt'),
          getFeaturedProducts(3),
        ]);
        setProducts(allProducts);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  let filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter((p: Product) =>
        p.category.toLowerCase().replace(' ', '').includes(selectedCategory.toLowerCase())
      );

  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
    if (sortBy === 'views') return b.views - a.views;
    return 0;
  });
  
  return (
    <div className='min-h-screen bg-stone-50'>
      <Header />
      
      {/* Hero */}
      <section className='bg-gradient-to-b from-white to-stone-50 border-b border-stone-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 mb-4'>
              <span className='relative flex h-1.5 w-1.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-600'></span>
              </span>
              <span className='text-xs font-medium text-orange-700'>
                {products.length === 0 ? 'Ready to launch the first product' : `${products.length.toLocaleString()}+ products launched`}
              </span>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight'>
              Discover and Launch Amazing Products
            </h1>
            <p className='text-base text-stone-600 mb-6 max-w-2xl mx-auto'>
              Connect with early adopters and grow your product
            </p>
            <div className='flex items-center justify-center gap-3'>
              <Link href='/products'>
                <Button size='md' className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 shadow-lg shadow-orange-500/30'>
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid lg:grid-cols-12 gap-6'>
          {/* Sidebar */}
          <div className='lg:col-span-2'>
            <div className='sticky top-24'>
              <h3 className='text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 px-2'>
                Categories
              </h3>
              <nav className='space-y-1'>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2',
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                        : 'text-stone-600 hover:bg-white'
                    )}
                  >
                    <span>{category.label}</span>
                  </button>
                ))}
              </nav>

              <div className='mt-6 p-4 bg-white rounded-lg border border-stone-200 shadow-sm'>
                <h4 className='text-xs font-semibold text-stone-900 mb-3'>📊 Today</h4>
                <div className='space-y-2'>
                  <div>
                    <div className='text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'>
                      {products.length}
                    </div>
                    <div className='text-xs text-stone-600'>Products</div>
                  </div>
                  <div>
                    <div className='text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
                      {products.reduce((sum: number, p: Product) => sum + p.upvotes, 0).toLocaleString()}
                    </div>
                    <div className='text-xs text-stone-600'>Upvotes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className='lg:col-span-10'>
            {/* Top Products */}
            <div className='mb-10'>
              <div className='flex items-center justify-between mb-5'>
                <div>
                  <h2 className='text-2xl font-bold text-stone-900'>🚀 Top Products This Week</h2>
                  <p className='text-xs text-stone-600 mt-1'>Most upvoted by the community</p>
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className='bg-white border-2 border-dashed border-stone-300 rounded-xl p-12 text-center'>
                  <div className='max-w-md mx-auto'>
                    <div className='w-20 h-20 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                      <svg className='w-10 h-10 text-orange-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                      </svg>
                    </div>
                    <h3 className='text-lg font-bold text-stone-900 mb-2'>No Products Yet</h3>
                    <p className='text-sm text-stone-600 mb-6'>
                      Be the first to launch your product and connect with early adopters!
                    </p>
                    <Link href='/submit'>
                      <Button className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
                        Launch Your Product
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className='grid md:grid-cols-3 gap-5'>
                  {featuredProducts.length > 0 ? (
                    featuredProducts.map((product: Product) => (
                    <div key={product.id} className='bg-white border border-stone-200 rounded-xl hover:shadow-xl hover:border-orange-200 transition-all duration-300 group'>
                      <div className='p-5'>
                        <div className='flex items-start justify-between mb-4'>
                          <a href={product.websiteUrl} target='_blank' rel='noopener noreferrer' className='flex-shrink-0'>
                            <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110'>
                              <span className='text-2xl font-bold text-white'>{product.name.charAt(0)}</span>
                            </div>
                          </a>
                          <div className='flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:border-orange-200 transition-all cursor-pointer'>
                            <svg className='w-4 h-4 text-stone-600 group-hover:text-orange-600 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                            </svg>
                            <span className='text-sm font-semibold text-stone-700'>{product.upvotes}</span>
                          </div>
                        </div>
                        <Link href={`/product/${product.slug}`} className='block'>
                          <div className='flex items-center gap-2 mb-2'>
                            <h3 className='text-base font-semibold text-stone-900 group-hover:text-orange-600 transition-colors'>
                              {product.name}
                            </h3>
                            {product.premium && <PremiumBadge size='sm' />}
                          </div>
                          <p className='text-xs text-stone-600 mb-4 line-clamp-2'>
                            {product.description}
                          </p>
                          <div className='flex flex-wrap gap-1.5'>
                            {product.tags.map((tag: string) => (
                              <span key={tag} className='px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-md border border-stone-200 hover:border-orange-200 transition-colors'>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                  ) : (
                    <div className='col-span-3 text-center text-stone-600 text-sm py-8'>
                      No featured products yet
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Latest */}
            <div>
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <h2 className='text-xl font-bold text-stone-900'>⚡ Latest Launches</h2>
                  <p className='text-xs text-stone-600 mt-1'>Recently submitted products</p>
                </div>
                {filteredProducts.length > 0 && (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='text-xs border border-stone-300 rounded-lg px-3 py-1.5 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent'
                  >
                    <option value='upvotes'>Most Upvoted</option>
                    <option value='views'>Most Viewed</option>
                  </select>
                )}
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className='bg-gradient-to-br from-white to-stone-50 border-2 border-dashed border-stone-300 rounded-xl p-10 text-center'>
                  <div className='max-w-md mx-auto'>
                    <div className='text-6xl mb-4'>🎉</div>
                    <h3 className='text-lg font-bold text-stone-900 mb-2'>Ready to Launch?</h3>
                    <p className='text-sm text-stone-600 mb-6'>
                      Share your product with thousands of early adopters and get valuable feedback.
                    </p>
                    <Link href='/submit'>
                      <Button className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
                        Submit Your Product
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className='space-y-3'>
                  {filteredProducts.map((product: Product) => (
                    <div key={product.id} className='bg-white border border-stone-200 rounded-xl hover:shadow-lg hover:border-orange-200 transition-all duration-200 group'>
                      <div className='p-4 flex items-center gap-4'>
                        <a href={product.websiteUrl} target='_blank' rel='noopener noreferrer' className='flex-shrink-0'>
                          <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-md transition-transform group-hover:scale-110'>
                            <span className='text-xl font-bold text-white'>{product.name.charAt(0)}</span>
                          </div>
                        </a>
                        <Link href={`/product/${product.slug}`} className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h3 className='text-sm font-semibold text-stone-900 group-hover:text-orange-600 transition-colors'>
                              {product.name}
                            </h3>
                            {product.premium && <PremiumBadge size='sm' />}
                          </div>
                          <p className='text-xs text-stone-600 mb-2 truncate'>
                            {product.description}
                          </p>
                          <div className='flex flex-wrap gap-1.5'>
                            {product.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className='px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-md border border-stone-200'>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Link>
                        <div className='flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:border-orange-200 transition-all cursor-pointer'>
                          <svg className='w-4 h-4 text-stone-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                          </svg>
                          <span className='text-sm font-semibold text-stone-700'>{product.upvotes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-white border-t border-stone-200 mt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid md:grid-cols-4 gap-6 mb-6'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-7 h-7 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30'>
                  <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                    <circle cx='12' cy='12' r='10' strokeWidth={2.5} />
                  </svg>
                </div>
                <span className='text-base font-semibold text-stone-900'>BuatProduct</span>
              </div>
              <p className='text-xs text-stone-600'>
                Launch and grow your products
              </p>
            </div>
            
            {[
              { title: 'Product', links: [{ name: 'Features', href: '/features' }, { name: 'Pricing', href: '/pricing' }] },
              { title: 'Resources', links: [{ name: 'Blog', href: '/blog' }, { name: 'Help', href: '/help' }] },
              { title: 'Company', links: [{ name: 'About', href: '/about' }, { name: 'Contact', href: '/contact' }] },
            ].map((column) => (
              <div key={column.title}>
                <h4 className='font-semibold text-stone-900 mb-2 text-xs'>{column.title}</h4>
                <ul className='space-y-1.5'>
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className='text-xs text-stone-600 hover:text-orange-600 transition-colors'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className='pt-6 border-t border-stone-200 text-center'>
            <p className='text-xs text-stone-600'> 2025 BuatProduct. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
