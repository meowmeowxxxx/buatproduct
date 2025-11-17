'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const productIcons: Record<string, { bg: string; icon: JSX.Element }> = {
  'notion': {
    bg: 'bg-gradient-to-br from-black to-gray-800',
    icon: <svg className='w-full h-full p-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' /></svg>
  },
  'figma': {
    bg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    icon: <svg className='w-full h-full p-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' /></svg>
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Product will be loaded from Firebase in the future
  const product = null;

  // Show not found message when no product exists
  if (!product) {
    return (
      <div className='min-h-screen bg-stone-50 flex items-center justify-center'>
        <div className='max-w-md mx-auto px-4 text-center'>
          <div className='w-20 h-20 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg className='w-10 h-10 text-orange-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
            </svg>
          </div>
          <h1 className='text-2xl font-bold text-stone-900 mb-3'>Product Not Found</h1>
          <p className='text-stone-600 mb-6'>
            This product doesn't exist yet. Be the first to launch on BuatProduct!
          </p>
          <div className='flex gap-3 justify-center'>
            <Link href='/'>
              <Button variant='ghost' className='text-stone-600'>
                Go Home
              </Button>
            </Link>
            <Link href='/submit'>
              <Button className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
                Launch Your Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // This code will only run when product data exists
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
              <Link href='/past-launches' className='text-sm text-stone-600 hover:text-orange-600 transition-colors font-medium'>
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
      
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
        {/* Back Button */}
        <Link href='/products' className='inline-flex items-center text-stone-600 hover:text-orange-600 mb-6 transition-colors'>
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
          </svg>
          Back to Products
        </Link>

        <div className='grid lg:grid-cols-12 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-8'>
            <div className='flex items-start gap-6 mb-6'>
              {/* Logo */}
              <div className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${productIcons[slug]?.bg || 'bg-gradient-to-br from-orange-500 to-pink-500'}`}>
                {productIcons[slug]?.icon || (
                  <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                  </svg>
                )}
              </div>

              {/* Title & Meta */}
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <h1 className='text-3xl font-bold text-stone-900'>{product.name}</h1>
                  <span className='px-2 py-1 bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 rounded-md text-xs font-medium text-orange-700'>{product.category}</span>
                </div>
                <p className='text-lg text-stone-600 mb-3'>{product.shortDescription}</p>
                <div className='flex items-center gap-3 text-xs text-stone-500'>
                  <span>By @{product.username}</span>
                  <span>•</span>
                  <span>{new Date(product.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-6'>
              {product.tags.map((tag) => (
                <span key={tag} className='px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-md hover:border-orange-200 transition-colors'>
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className='bg-white border border-stone-200 rounded-xl p-6 mb-6 shadow-sm'>
              <h2 className='text-xl font-bold text-stone-900 mb-4'>About</h2>
              <div className='prose prose-sm max-w-none text-stone-700 whitespace-pre-line leading-relaxed'>
                {product.description}
              </div>
            </div>

            {/* Comments Section */}
            <div className='bg-white border border-stone-200 rounded-xl p-6 shadow-sm'>
              <h2 className='text-xl font-bold text-stone-900 mb-4'>Comments</h2>
              <div className='text-center py-12 text-stone-500'>
                <svg className='w-16 h-16 mx-auto mb-4 text-stone-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
                <p className='text-sm'>No comments yet. Be the first to comment!</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4'>
            <div className='sticky top-24 space-y-4'>
              {/* Upvote Card */}
              <div className='bg-white border border-stone-200 rounded-xl p-5 text-center shadow-sm'>
                <Button className='w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white h-12 text-sm mb-3 shadow-lg shadow-orange-500/30'>
                  <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                  </svg>
                  Upvote ({product.upvotes})
                </Button>
                <a
                  href={product.websiteUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button variant='outline' className='w-full h-11 text-sm border-stone-300 hover:border-orange-400 hover:text-orange-600'>
                    Visit Website
                    <svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                    </svg>
                  </Button>
                </a>
              </div>

              {/* Stats Card */}
              <div className='bg-white border border-stone-200 rounded-xl p-5 shadow-sm'>
                <h3 className='text-sm font-semibold text-stone-900 mb-4'>📊 Stats</h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-stone-600'>Upvotes</span>
                    <span className='text-sm font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'>{product.upvotes}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-stone-600'>Views</span>
                    <span className='text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>{product.views}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-stone-600'>Comments</span>
                    <span className='text-sm font-bold text-stone-900'>0</span>
                  </div>
                </div>
              </div>

              {/* Maker Card */}
              <div className='bg-white border border-stone-200 rounded-xl p-5 shadow-sm'>
                <h3 className='text-sm font-semibold text-stone-900 mb-4'>👤 Maker</h3>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg shadow-orange-500/30'>
                    {product.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className='text-sm font-semibold text-stone-900'>@{product.username}</div>
                    <div className='text-xs text-stone-500'>Product Creator</div>
                  </div>
                </div>
                <Button variant='outline' className='w-full text-xs border-stone-300 hover:border-orange-400 hover:text-orange-600'>
                  View Profile
                </Button>
              </div>

              {/* Share Card */}
              <div className='bg-white border border-stone-200 rounded-xl p-5 shadow-sm'>
                <h3 className='text-sm font-semibold text-stone-900 mb-4'>🔗 Share</h3>
                <div className='grid grid-cols-2 gap-2'>
                  <Button variant='outline' size='sm' className='text-xs border-stone-300 hover:border-orange-400'>
                    <svg className='w-3 h-3 mr-1.5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'/>
                    </svg>
                    Twitter
                  </Button>
                  <Button variant='outline' size='sm' className='text-xs border-stone-300 hover:border-orange-400'>
                    <svg className='w-3 h-3 mr-1.5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'/>
                    </svg>
                    Facebook
                  </Button>
                  <Button variant='outline' size='sm' className='text-xs border-stone-300 hover:border-orange-400'>
                    <svg className='w-3 h-3 mr-1.5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'/>
                      <circle cx='4' cy='4' r='2'/>
                    </svg>
                    LinkedIn
                  </Button>
                  <Button variant='outline' size='sm' className='text-xs border-stone-300 hover:border-orange-400'>
                    <svg className='w-3 h-3 mr-1.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' />
                    </svg>
                    Copy
                  </Button>
                </div>
              </div>
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
            <p className='text-xs text-stone-600'>© 2025 BuatProduct. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
