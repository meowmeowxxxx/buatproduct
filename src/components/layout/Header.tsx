'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-3 group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity'></div>
              <div className='relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                  <circle cx='12' cy='12' r='10' strokeWidth={2.5} />
                </svg>
              </div>
            </div>
            <div>
              <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                BuatProduct
              </span>
              <div className='text-xs text-gray-500 -mt-1'>Create & Launch Products</div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            <Link href='/products' className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group'>
              Products
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
            </Link>
            <Link href='/submit' className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group'>
              Submit
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
            </Link>
            <Link href='/dashboard' className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group'>
              Dashboard
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
            </Link>
          </nav>
          
          {/* Actions */}
          <div className='hidden md:flex items-center gap-3'>
            <Link href='/login'>
              <Button variant='ghost' size='sm'>
                Sign in
              </Button>
            </Link>
            <Link href='/signup'>
              <Button size='sm' className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30'>
                <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className='md:hidden p-2'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {isMobileMenuOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden py-4 border-t border-gray-100'>
            <nav className='flex flex-col gap-4'>
              <Link href='/products' className='text-sm font-medium text-gray-600 hover:text-blue-600'>Products</Link>
              <Link href='/submit' className='text-sm font-medium text-gray-600 hover:text-blue-600'>Submit</Link>
              <Link href='/dashboard' className='text-sm font-medium text-gray-600 hover:text-blue-600'>Dashboard</Link>
              <div className='flex flex-col gap-2 pt-4 border-t border-gray-100'>
                <Link href='/login'>
                  <Button variant='outline' size='sm' className='w-full'>Sign in</Button>
                </Link>
                <Link href='/signup'>
                  <Button size='sm' className='w-full bg-gradient-to-r from-blue-600 to-purple-600'>Get Started</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
