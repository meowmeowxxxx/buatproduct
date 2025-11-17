'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
  };

  return (
    <div className='min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <Link href='/' className='inline-flex items-center gap-2 mb-6'>
            <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                <circle cx='12' cy='12' r='10' strokeWidth={2.5} />
              </svg>
            </div>
          </Link>
          <h1 className='text-2xl font-bold text-stone-900 mb-2'>
            Welcome back
          </h1>
          <p className='text-sm text-stone-600'>
            Sign in to your account to continue
          </p>
        </div>

        <div className='bg-white border border-stone-200 rounded-xl p-8 shadow-sm'>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-stone-700 mb-1.5'>
                Email address
              </label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className='w-full border-stone-300 focus:border-orange-400 focus:ring-orange-400'
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-stone-700 mb-1.5'>
                Password
              </label>
              <Input
                id='password'
                type='password'
                placeholder=''
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className='w-full border-stone-300 focus:border-orange-400 focus:ring-orange-400'
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <input
                  id='remember'
                  type='checkbox'
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className='h-4 w-4 rounded border-stone-300 text-orange-500 focus:ring-orange-400'
                />
                <label htmlFor='remember' className='text-xs text-stone-600'>
                  Remember me
                </label>
              </div>
              <Link href='/forgot-password' className='text-xs text-orange-600 hover:text-orange-700 underline'>
                Forgot password?
              </Link>
            </div>

            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2.5 shadow-lg shadow-orange-500/30'
            >
              Sign in
            </Button>
          </form>

          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-stone-200'></div>
            </div>
            <div className='relative flex justify-center text-xs'>
              <span className='bg-white px-3 text-stone-500'>Or continue with</span>
            </div>
          </div>

          <div className='space-y-3'>
            <Button
              type='button'
              variant='outline'
              className='w-full border-stone-300 text-stone-700 hover:bg-stone-50 py-2.5'
            >
              <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                <path fill='currentColor' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
                <path fill='currentColor' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                <path fill='currentColor' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                <path fill='currentColor' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
              </svg>
              Continue with Google
            </Button>

            <Button
              type='button'
              variant='outline'
              className='w-full border-stone-300 text-stone-700 hover:bg-stone-50 py-2.5'
            >
              <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
              </svg>
              Continue with GitHub
            </Button>
          </div>
        </div>

        <p className='text-center text-sm text-stone-600 mt-6'>
          Don't have an account?{' '}
          <Link href='/signup' className='text-orange-600 font-medium hover:text-orange-700 underline'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
