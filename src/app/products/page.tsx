'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types/product';
import { Timestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils/cn';

const allProducts: Product[] = [
  {
    id: '1',
    name: 'DesignFlow Pro',
    slug: 'designflow-pro',
    tagline: 'Complete design system',
    description: 'Complete design system with 200+ components and dark mode support',
    shortDescription: 'Complete design system',
    website: 'https://example.com/designflow',
    category: 'SaaS',
    tags: ['Design', 'UI Kit', 'Components'],
    websiteUrl: 'https://example.com/designflow',
    logo: '',
    status: 'published',
    featured: true,
    upvotes: 342,
    upvotedBy: [],
    views: 2850,
    userId: 'user1',
    username: 'designpro',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '2',
    name: 'CodeSnippets AI',
    slug: 'codesnippets-ai',
    tagline: 'AI-powered code manager',
    description: 'AI-powered code snippet manager for developers',
    shortDescription: 'AI-powered code manager',
    website: 'https://example.com/codesnippets',
    category: 'Developer Tools',
    tags: ['AI', 'Productivity', 'Code'],
    websiteUrl: 'https://example.com/codesnippets',
    logo: '',
    status: 'published',
    featured: false,
    upvotes: 198,
    upvotedBy: [],
    views: 1540,
    userId: 'user2',
    username: 'codecrafter',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '3',
    name: 'TaskMaster AI',
    slug: 'taskmaster-ai',
    tagline: 'Smart task management',
    description: 'AI-powered task management with priority predictions',
    shortDescription: 'Smart task management',
    website: 'https://example.com/taskmaster',
    category: 'Productivity',
    tags: ['AI', 'Tasks', 'Automation'],
    websiteUrl: 'https://example.com/taskmaster',
    logo: '',
    status: 'published',
    featured: true,
    upvotes: 425,
    upvotedBy: [],
    views: 3200,
    userId: 'user3',
    username: 'aibuilder',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '4',
    name: 'ChatBot Builder',
    slug: 'chatbot-builder',
    tagline: 'No-code chatbot creation',
    description: 'Build intelligent chatbots without coding',
    shortDescription: 'No-code chatbot creation',
    website: 'https://example.com/chatbot',
    category: 'SaaS',
    tags: ['AI', 'Chatbots', 'No-Code'],
    websiteUrl: 'https://example.com/chatbot',
    logo: '',
    status: 'published',
    featured: true,
    upvotes: 289,
    upvotedBy: [],
    views: 2100,
    userId: 'user4',
    username: 'chatmaster',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '5',
    name: 'EmailCraft Studio',
    slug: 'emailcraft-studio',
    tagline: 'Email template builder',
    description: 'Create stunning email templates with drag-and-drop editor',
    shortDescription: 'Email template builder',
    website: 'https://example.com/emailcraft',
    category: 'SaaS',
    tags: ['Email', 'Templates', 'No-Code'],
    websiteUrl: 'https://example.com/emailcraft',
    logo: '',
    status: 'published',
    featured: false,
    upvotes: 187,
    upvotedBy: [],
    views: 1320,
    userId: 'user5',
    username: 'emailwizard',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '6',
    name: 'Analytics Dashboard',
    slug: 'analytics-dashboard',
    tagline: 'Real-time analytics',
    description: 'Real-time analytics dashboard with beautiful charts',
    shortDescription: 'Real-time analytics',
    website: 'https://example.com/analytics',
    category: 'Developer Tools',
    tags: ['Analytics', 'Charts', 'Data'],
    websiteUrl: 'https://example.com/analytics',
    logo: '',
    status: 'published',
    featured: false,
    upvotes: 156,
    upvotedBy: [],
    views: 980,
    userId: 'user6',
    username: 'datamaster',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '7',
    name: 'SEO Toolkit Pro',
    slug: 'seo-toolkit-pro',
    tagline: 'Complete SEO solution',
    description: 'Complete SEO solution with keyword research and rank tracking',
    shortDescription: 'Complete SEO solution',
    website: 'https://example.com/seo',
    category: 'Developer Tools',
    tags: ['SEO', 'Marketing', 'Analytics'],
    websiteUrl: 'https://example.com/seo',
    logo: '',
    status: 'published',
    featured: false,
    upvotes: 223,
    upvotedBy: [],
    views: 1890,
    userId: 'user7',
    username: 'seoexpert',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '8',
    name: 'Invoice Generator',
    slug: 'invoice-generator',
    tagline: 'Professional invoicing',
    description: 'Create professional invoices in seconds with automatic reminders',
    shortDescription: 'Professional invoicing',
    website: 'https://example.com/invoice',
    category: 'Productivity',
    tags: ['Finance', 'Invoicing', 'Business'],
    websiteUrl: 'https://example.com/invoice',
    logo: '',
    status: 'published',
    featured: false,
    upvotes: 145,
    upvotedBy: [],
    views: 1100,
    userId: 'user8',
    username: 'financeapp',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '9',
    name: 'VideoMeet Pro',
    slug: 'videomeet-pro',
    tagline: 'Video conferencing platform',
    description: 'HD video conferencing with screen sharing and recording',
    shortDescription: 'Video conferencing platform',
    website: 'https://example.com/videomeet',
    category: 'SaaS',
    tags: ['Video', 'Communication', 'Collaboration'],
    websiteUrl: 'https://example.com/videomeet',
    logo: '',
    status: 'published',
    featured: false,
    upvotes: 312,
    upvotedBy: [],
    views: 2450,
    userId: 'user9',
    username: 'videomaker',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: '10',
    name: 'FormBuilder Plus',
    slug: 'formbuilder-plus',
    tagline: 'Drag-and-drop form creator',
    description: 'Create beautiful forms with conditional logic and integrations',
    shortDescription: 'Drag-and-drop form creator',
    website: 'https://example.com/formbuilder',
    category: 'Productivity',
    tags: ['Forms', 'No-Code', 'Automation'],
    websiteUrl: 'https://example.com/formbuilder',
    logo: '',
    status: 'published',
    featured: false,
    upvotes: 234,
    upvotedBy: [],
    views: 1650,
    userId: 'user10',
    username: 'formmaker',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

const productIcons: Record<string, { bg: string; icon: JSX.Element }> = {
  '1': {
    bg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' /></svg>
  },
  '2': {
    bg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' /></svg>
  },
  '3': {
    bg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' /></svg>
  },
  '4': {
    bg: 'bg-gradient-to-br from-orange-500 to-red-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' /></svg>
  },
  '5': {
    bg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg>
  },
  '6': {
    bg: 'bg-gradient-to-br from-teal-500 to-cyan-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' /></svg>
  },
  '7': {
    bg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /></svg>
  },
  '8': {
    bg: 'bg-gradient-to-br from-rose-500 to-pink-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' /></svg>
  },
  '9': {
    bg: 'bg-gradient-to-br from-purple-600 to-blue-600',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' /></svg>
  },
  '10': {
    bg: 'bg-gradient-to-br from-pink-500 to-orange-500',
    icon: <svg className='w-full h-full p-2.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' /></svg>
  },
};

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'saas', label: 'SaaS' },
  { id: 'developer', label: 'Developer Tools' },
  { id: 'productivity', label: 'Productivity' },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('upvotes');
  const [searchQuery, setSearchQuery] = useState('');

  let filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => 
        p.category.toLowerCase().replace(' ', '').includes(selectedCategory.toLowerCase()) || 
        p.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
    if (sortBy === 'views') return b.views - a.views;
    if (sortBy === 'newest') return b.createdAt.seconds - a.createdAt.seconds;
    return 0;
  });

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
              <Link href='/products' className='text-sm text-orange-600 font-medium'>
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
      <div className='bg-gradient-to-b from-white to-stone-50 border-b border-stone-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight'>Explore Products</h1>
          <p className='text-base text-stone-600 mb-6'>Discover amazing products built by makers around the world</p>
          
          <div className='max-w-2xl'>
            <div className='relative'>
              <svg className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              <input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-12 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white'
              />
            </div>
          </div>
        </div>
      </div>

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
                      'w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all',
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                        : 'text-stone-600 hover:bg-white'
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Products Grid */}
          <div className='lg:col-span-10'>
            <div className='flex items-center justify-between mb-5'>
              <div>
                <h2 className='text-xl font-bold text-stone-900'>
                  {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
                </h2>
                <p className='text-xs text-stone-600 mt-1'>
                  {selectedCategory === 'all' ? 'All categories' : categories.find(c => c.id === selectedCategory)?.label}
                </p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='text-xs border border-stone-300 rounded-lg px-3 py-1.5 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-400'
              >
                <option value='upvotes'>Most Upvoted</option>
                <option value='newest'>Newest First</option>
                <option value='views'>Most Viewed</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className='text-center py-16 bg-white rounded-xl border border-stone-200'>
                <div className='text-6xl mb-4'></div>
                <h3 className='text-xl font-bold text-stone-900 mb-2'>No products found</h3>
                <p className='text-stone-600 mb-6'>Try adjusting your filters or search query</p>
                <Button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className='space-y-3'>
                {filteredProducts.map((product) => (
                  <div key={product.id} className='bg-white border border-stone-200 rounded-xl hover:shadow-lg hover:border-orange-200 transition-all duration-200 group'>
                    <div className='p-4 flex items-center gap-4'>
                      <a href={product.websiteUrl} target='_blank' rel='noopener noreferrer' className='flex-shrink-0'>
                        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center shadow-md transition-transform group-hover:scale-110', productIcons[product.id]?.bg || 'bg-stone-100')}>
                          {productIcons[product.id]?.icon || <span className='text-xl font-bold text-white'>{product.name.charAt(0)}</span>}
                        </div>
                      </a>
                      <Link href={/product/+product.slug} className='flex-1 min-w-0'>
                        <h3 className='text-sm font-semibold text-stone-900 mb-1 group-hover:text-orange-600 transition-colors'>
                          {product.name}
                        </h3>
                        <p className='text-xs text-stone-600 mb-2 truncate'>
                          {product.description}
                        </p>
                        <div className='flex flex-wrap gap-1.5'>
                          {product.tags.slice(0, 3).map((tag) => (
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
