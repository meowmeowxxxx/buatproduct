'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { signIn } from '@/lib/firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600'>
              {error}
            </div>
          )}
          
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
                disabled={loading}
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
                placeholder='••••••••'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
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
                  disabled={loading}
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
              disabled={loading}
              className='w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2.5 shadow-lg shadow-orange-500/30'
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>

        <p className='text-center text-sm text-stone-600 mt-6'>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='text-orange-600 font-medium hover:text-orange-700 underline'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
