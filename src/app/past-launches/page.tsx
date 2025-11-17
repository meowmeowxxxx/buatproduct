'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types/product';
import { Timestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils/cn';

// Empty launches array - ready to be populated from Firebase
const generatePastLaunches = (): Product[] => {
  return [];
};

const productIcons: Record<string, { bg: string; icon: JSX.Element }> = {
  '1': { bg: 'bg-gradient-to-br from-black to-gray-800', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' /></svg> },
  '2': { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' /></svg> },
  '3': { bg: 'bg-gradient-to-br from-blue-500 to-purple-600', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' /></svg> },
  '4': { bg: 'bg-gradient-to-br from-indigo-600 to-purple-600', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' /></svg> },
  '5': { bg: 'bg-gradient-to-br from-cyan-500 to-blue-500', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' /></svg> },
  '6': { bg: 'bg-gradient-to-br from-green-500 to-emerald-600', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' /></svg> },
  '7': { bg: 'bg-gradient-to-br from-black to-gray-900', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' /></svg> },
  '8': { bg: 'bg-gradient-to-br from-purple-600 to-blue-600', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' /></svg> },
  '9': { bg: 'bg-gradient-to-br from-pink-500 to-orange-500', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' /></svg> },
  '10': { bg: 'bg-gradient-to-br from-red-500 to-orange-500', icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' /></svg> },
};

const timeFilters = [
  { id: 'all', label: 'All Time' },
  { id: 'week', label: 'Past Week', days: 7 },
  { id: 'month', label: 'Past Month', days: 30 },
  { id: 'quarter', label: 'Past 3 Months', days: 90 },
];

export default function PastLaunchesPage() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const allLaunches = generatePastLaunches();

  let filteredLaunches = [...allLaunches];

  // Apply time filter
  if (selectedTimeFilter !== 'all') {
    const filter = timeFilters.find(f => f.id === selectedTimeFilter);
    if (filter && filter.days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - filter.days);
      filteredLaunches = filteredLaunches.filter(p => p.createdAt.toDate() >= cutoffDate);
    }
  }

  // Apply sorting
  filteredLaunches.sort((a, b) => {
    if (sortBy === 'recent') return b.createdAt.seconds - a.createdAt.seconds;
    if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
    if (sortBy === 'views') return b.views - a.views;
    return 0;
  });

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    const now = new Date();
    const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className='min-h-screen bg-stone-50'>
      {/* Header */}
      <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <Link href='/' className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                  <circle cx='12' cy='12' r='10' strokeWidth={2.5} />
                </svg>
              </div>
              <span className='text-lg font-semibold text-stone-800'>BuatProduct</span>
            </Link>
            
            <nav className='hidden md:flex items-center gap-8'>
              <Link href='/products' className='text-sm text-stone-600 hover:text-orange-600 transition-colors font-medium'>
                Products
              </Link>
              <Link href='/pricing' className='text-sm text-stone-600 hover:text-orange-600 transition-colors font-medium'>
                Pricing
              </Link>
              <Link href='/past-launches' className='text-sm text-orange-600 font-medium'>
                Past Launches
              </Link>
            </nav>
            
            <div className='flex items-center gap-3'>
              <Link href='/login'>
                <Button variant='ghost' size='sm' className='text-sm text-stone-600 hover:text-orange-600'>
                  Sign in
                </Button>
              </Link>
              <Link href='/signup'>
                <Button size='sm' className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-sm px-4 shadow-lg shadow-orange-500/30'>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='bg-gradient-to-b from-white to-stone-50 border-b border-stone-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12'>
          <div className='max-w-3xl mx-auto text-center'>
            <div className='inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 mb-4'>
              <span className='text-xs font-medium text-orange-700'>📚 Archive of Success Stories</span>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight'>
              Past Product Launches
            </h1>
            <p className='text-base text-stone-600 mb-6 max-w-2xl mx-auto'>
              Explore the history of successful products launched on our platform. Get inspired by their journey and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className='bg-white border-b border-stone-200 sticky top-16 z-40'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-2 overflow-x-auto'>
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedTimeFilter(filter.id)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                    selectedTimeFilter === filter.id
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            <div className='flex items-center gap-3'>
              <span className='text-sm text-stone-600'>{filteredLaunches.length} products</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='text-sm border border-stone-300 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-400'
              >
                <option value='recent'>Most Recent</option>
                <option value='upvotes'>Most Upvoted</option>
                <option value='views'>Most Viewed</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className='py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='space-y-3'>
            {filteredLaunches.map((product) => (
              <div key={product.id} className='bg-white border border-stone-200 rounded-xl hover:shadow-lg hover:border-orange-200 transition-all duration-200 group'>
                <div className='p-5 flex items-center gap-4'>
                  <Link href={`/product/${product.slug}`} className='flex-shrink-0'>
                    <div className={cn('w-14 h-14 rounded-lg flex items-center justify-center shadow-md transition-transform group-hover:scale-110', productIcons[product.id]?.bg || 'bg-stone-100')}>
                      {productIcons[product.id]?.icon || <span className='text-xl font-bold text-white'>{product.name.charAt(0)}</span>}
                    </div>
                  </Link>
                  
                  <Link href={`/product/${product.slug}`} className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h3 className='text-base font-semibold text-stone-900 group-hover:text-orange-600 transition-colors'>
                        {product.name}
                      </h3>
                      <span className='px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-md border border-stone-200'>
                        {product.category}
                      </span>
                    </div>
                    <div className='flex items-center gap-3 text-xs text-stone-500 mb-2'>
                      <span>🚀 Launched {formatDate(product.createdAt)}</span>
                      <span>•</span>
                      <span>👀 {product.views.toLocaleString()} views</span>
                    </div>
                    <div className='flex flex-wrap gap-1.5'>
                      {product.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className='px-2 py-0.5 bg-stone-50 text-stone-600 text-xs rounded-md'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                  
                  <div className='flex items-center gap-1.5 px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg'>
                    <svg className='w-5 h-5 text-orange-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                    </svg>
                    <span className='text-base font-bold text-stone-900'>{product.upvotes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLaunches.length === 0 && (
            <div className='text-center py-20 bg-white rounded-xl border-2 border-dashed border-stone-300'>
              <div className='max-w-md mx-auto'>
                <div className='text-6xl mb-4'>�</div>
                <h3 className='text-xl font-bold text-stone-900 mb-2'>No Past Launches Yet</h3>
                <p className='text-stone-600 mb-6'>
                  {selectedTimeFilter !== 'all' 
                    ? 'No launches found in this time period. Try viewing all time.'
                    : 'Be the first to launch your product and start your success story!'
                  }
                </p>
                {selectedTimeFilter !== 'all' ? (
                  <Button 
                    onClick={() => setSelectedTimeFilter('all')} 
                    className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'
                  >
                    Show All Time
                  </Button>
                ) : (
                  <Link href='/submit'>
                    <Button className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
                      Launch Your Product
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

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
            <p className='text-xs text-stone-600'>© 2025 BuatProduct. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
