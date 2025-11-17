'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/firebase/auth';
import { User, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, userData, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            {/* Logo */}
            <Link href='/' className='flex items-center gap-3 group'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity'></div>
                <div className='relative w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center'>
                  <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                    <circle cx='12' cy='12' r='10' strokeWidth={2.5} />
                  </svg>
                </div>
              </div>
              <div>
                <span className='text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent'>
                  BuatProduct
                </span>
                <div className='text-xs text-gray-500 -mt-1'>Create & Launch Products</div>
              </div>
            </Link>
          
            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center gap-8'>
              <Link href='/products' className='text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors relative group'>
                Products
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300'></span>
              </Link>
              <Link href='/submit' className='text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors relative group'>
                Submit
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300'></span>
              </Link>
              <Link href='/dashboard' className='text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors relative group'>
                Dashboard
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300'></span>
              </Link>
            </nav>
            
            {/* Actions */}
            <div className='hidden md:flex items-center gap-3'>
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-stone-200 animate-pulse"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg">
                      {userData?.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-stone-700">
                      {userData?.displayName || 'User'}
                    </span>
                    <svg className={`w-4 h-4 text-stone-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 rounded-xl shadow-xl py-2 z-50">
                        <div className="px-4 py-3 border-b border-stone-100">
                          <p className="text-sm font-semibold text-stone-900">{userData?.displayName || 'User'}</p>
                          <p className="text-xs text-stone-500 mt-0.5">{user.email}</p>
                          {userData?.isPremium && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 rounded-md text-xs font-medium text-orange-700 mt-2">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Premium
                            </span>
                          )}
                        </div>
                        
                        <div className="py-1">
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Profile
                          </Link>
                          
                          <Link
                            href="/my-products"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            My Products
                          </Link>
                          
                          <Link
                            href="/submit"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Submit Product
                          </Link>
                          
                          <Link
                            href="/feedback"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Feedback
                          </Link>
                        </div>
                        
                        <div className="border-t border-stone-100 pt-1 mt-1">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Log Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Button variant='ghost' size='sm' onClick={() => openAuthModal('login')}>
                    Sign in
                  </Button>
                  <Button 
                    size='sm' 
                    className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg shadow-orange-500/30'
                    onClick={() => openAuthModal('signup')}
                  >
                    <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                    </svg>
                    Get Started
                  </Button>
                </>
              )}
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
              <Link href='/products' className='text-sm font-medium text-gray-600 hover:text-orange-600'>Products</Link>
              <Link href='/submit' className='text-sm font-medium text-gray-600 hover:text-orange-600'>Submit</Link>
              <Link href='/dashboard' className='text-sm font-medium text-gray-600 hover:text-orange-600'>Dashboard</Link>
              <div className='flex flex-col gap-2 pt-4 border-t border-gray-100'>
                {user ? (
                  <>
                    <div className="px-3 py-2 bg-stone-50 rounded-lg">
                      <p className="text-sm font-medium text-stone-900">{userData?.displayName}</p>
                      <p className="text-xs text-stone-500">{user.email}</p>
                    </div>
                    <Button 
                      variant='outline' 
                      size='sm' 
                      className='w-full'
                      onClick={handleSignOut}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant='outline' size='sm' className='w-full' onClick={() => openAuthModal('login')}>
                      Sign in
                    </Button>
                    <Button 
                      size='sm' 
                      className='w-full bg-gradient-to-r from-orange-500 to-pink-500'
                      onClick={() => openAuthModal('signup')}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialTab={authModalTab}
      />
    </>
  );
};
