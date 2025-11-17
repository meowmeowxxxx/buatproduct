'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const blogPosts = [
  {
    title: 'How to Launch Your First Product Successfully',
    excerpt: 'A complete guide to launching your product and getting your first 100 users.',
    date: '2024-03-15',
    author: 'BuatProduct Team',
    category: 'Guide',
  },
  {
    title: '10 Tips for Writing a Compelling Product Description',
    excerpt: 'Learn how to write product descriptions that convert visitors into users.',
    date: '2024-03-10',
    author: 'BuatProduct Team',
    category: 'Tips',
  },
  {
    title: 'Understanding Product Hunt vs Other Launch Platforms',
    excerpt: 'Compare different product launch platforms and choose the right one for your needs.',
    date: '2024-03-05',
    author: 'BuatProduct Team',
    category: 'Comparison',
  },
];

export default function BlogPage() {
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
              <Link href='/blog' className='text-sm text-orange-600 font-medium'>
                Blog
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
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-4xl md:text-5xl font-bold text-stone-900 mb-4'>
              Product Launch Insights & Tips
            </h1>
            <p className='text-lg text-stone-600'>
              Learn from successful makers and grow your product launch strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='space-y-8'>
            {blogPosts.map((post, index) => (
              <article key={index} className='bg-white border border-stone-200 rounded-xl p-8 hover:shadow-lg transition-shadow'>
                <div className='flex items-center gap-3 mb-4'>
                  <span className='inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full'>
                    {post.category}
                  </span>
                  <span className='text-sm text-stone-500'>{post.date}</span>
                </div>
                <h2 className='text-2xl font-bold text-stone-900 mb-2 hover:text-orange-600 cursor-pointer transition-colors'>
                  {post.title}
                </h2>
                <p className='text-stone-600 mb-4'>{post.excerpt}</p>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-stone-500'>By {post.author}</span>
                  <button className='text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors'>
                    Read more →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Message */}
          <div className='mt-12 text-center p-8 bg-stone-100 rounded-xl'>
            <p className='text-stone-600'>
              More articles coming soon! Follow us to stay updated with the latest product launch tips and strategies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 bg-white border-t border-stone-200'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-stone-900 mb-4'>
            Ready to Launch Your Product?
          </h2>
          <p className='text-lg text-stone-600 mb-8'>
            Put these insights into action and launch your product today.
          </p>
          <Link href='/signup'>
            <Button size='lg' className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
