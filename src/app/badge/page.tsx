'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { LaunchBadge } from '@/components/ui/LaunchBadge';

export default function BadgePage() {
  const [copied, setCopied] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedVariant, setSelectedVariant] = useState<'light' | 'dark'>('light');

  const embedCode = `<a href="https://buatproduct.com" target="_blank" rel="noopener noreferrer">
  <img src="https://buatproduct.com/badges/launched-${selectedVariant}-${selectedSize}.svg" alt="Launched on BuatProduct" />
</a>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      {/* Hero */}
      <section className='bg-gradient-to-b from-white to-stone-50 border-b border-stone-200'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center'>
          <div className='inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 mb-4'>
            <svg className='w-3 h-3 text-orange-600' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            <span className='text-xs font-medium text-orange-700'>Free for all launched products</span>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight'>
            Get Your Launch Badge
          </h1>
          <p className='text-base text-stone-600 max-w-2xl mx-auto'>
            Show off your launch on BuatProduct! Add this badge to your website and increase your credibility.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-16'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Customization */}
            <div>
              <h2 className='text-2xl font-bold text-stone-900 mb-6'>Customize Your Badge</h2>
              
              {/* Size Selection */}
              <div className='mb-8'>
                <label className='block text-sm font-semibold text-stone-700 mb-3'>Size</label>
                <div className='flex gap-3'>
                  {(['sm', 'md', 'lg'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant Selection */}
              <div className='mb-8'>
                <label className='block text-sm font-semibold text-stone-700 mb-3'>Style</label>
                <div className='flex gap-3'>
                  {(['light', 'dark'] as const).map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all capitalize ${
                        selectedVariant === variant
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>

              {/* Embed Code */}
              <div>
                <label className='block text-sm font-semibold text-stone-700 mb-3'>Embed Code</label>
                <div className='relative'>
                  <pre className='bg-stone-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto border border-stone-700'>
                    <code>{embedCode}</code>
                  </pre>
                  <Button
                    onClick={handleCopy}
                    size='sm'
                    className='absolute top-2 right-2 bg-stone-700 hover:bg-stone-600 text-white'
                  >
                    {copied ? (
                      <>
                        <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                        </svg>
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className='mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <h3 className='text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
                  </svg>
                  How to add the badge
                </h3>
                <ol className='text-xs text-blue-800 space-y-1 ml-6 list-decimal'>
                  <li>Copy the embed code above</li>
                  <li>Paste it into your website&apos;s HTML (preferably in the footer)</li>
                  <li>The badge will automatically link back to BuatProduct</li>
                </ol>
              </div>
            </div>

            {/* Preview */}
            <div>
              <h2 className='text-2xl font-bold text-stone-900 mb-6'>Preview</h2>
              
              <div className='bg-white border border-stone-200 rounded-2xl p-8 shadow-sm'>
                <div className='space-y-8'>
                  {/* On White Background */}
                  <div>
                    <p className='text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3'>On White Background</p>
                    <div className='flex items-center justify-center py-8 bg-white border border-stone-200 rounded-lg'>
                      <LaunchBadge size={selectedSize} variant={selectedVariant} />
                    </div>
                  </div>

                  {/* On Light Background */}
                  <div>
                    <p className='text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3'>On Light Background</p>
                    <div className='flex items-center justify-center py-8 bg-stone-50 border border-stone-200 rounded-lg'>
                      <LaunchBadge size={selectedSize} variant={selectedVariant} />
                    </div>
                  </div>

                  {/* On Dark Background */}
                  <div>
                    <p className='text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3'>On Dark Background</p>
                    <div className='flex items-center justify-center py-8 bg-stone-900 border border-stone-700 rounded-lg'>
                      <LaunchBadge size={selectedSize} variant='dark' />
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className='mt-8 space-y-4'>
                <h3 className='text-lg font-bold text-stone-900'>Benefits of displaying the badge</h3>
                <div className='space-y-3'>
                  {[
                    { icon: '🔗', title: 'Quality Backlink', desc: 'Get a dofollow backlink from our high-authority site' },
                    { icon: '✨', title: 'Social Proof', desc: 'Show visitors you launched on a trusted platform' },
                    { icon: '📈', title: 'More Traffic', desc: 'Drive additional visitors to your product page' },
                    { icon: '🎯', title: 'SEO Boost', desc: 'Improve your search engine rankings' },
                  ].map((benefit, index) => (
                    <div key={index} className='flex items-start gap-3 p-3 bg-white border border-stone-200 rounded-lg'>
                      <span className='text-2xl'>{benefit.icon}</span>
                      <div>
                        <h4 className='text-sm font-semibold text-stone-900'>{benefit.title}</h4>
                        <p className='text-xs text-stone-600'>{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
              { title: 'Resources', links: [{ name: 'Blog', href: '/blog' }, { name: 'Badge', href: '/badge' }] },
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
