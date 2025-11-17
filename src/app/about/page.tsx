'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
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
              <Link href='/about' className='text-sm text-orange-600 font-medium'>
                About
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
              Empowering Makers to Launch Successfully
            </h1>
            <p className='text-lg text-stone-600'>
              We're on a mission to help creators bring their ideas to life and reach their first users.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-12 items-center mb-20'>
            <div>
              <h2 className='text-3xl font-bold text-stone-900 mb-4'>Our Mission</h2>
              <p className='text-stone-600 mb-4'>
                BuatProduct was created to solve a simple problem: launching a product shouldn't be complicated or expensive.
              </p>
              <p className='text-stone-600 mb-4'>
                We believe every maker deserves a platform to showcase their work, get feedback from real users, and grow their audience.
              </p>
              <p className='text-stone-600'>
                Whether you're launching your first side project or your tenth startup, we're here to help you succeed.
              </p>
            </div>
            <div className='bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white shadow-2xl shadow-orange-500/30'>
              <div className='text-5xl font-bold mb-2'>1000+</div>
              <div className='text-orange-100 mb-6'>Products Launched</div>
              <div className='text-5xl font-bold mb-2'>10K+</div>
              <div className='text-orange-100 mb-6'>Active Community Members</div>
              <div className='text-5xl font-bold mb-2'>24hr</div>
              <div className='text-orange-100'>Average Review Time</div>
            </div>
          </div>

          {/* Values */}
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white border border-stone-200 rounded-xl p-6'>
              <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-500/30'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-stone-900 mb-2'>Speed</h3>
              <p className='text-sm text-stone-600'>
                Launch fast. Get feedback faster. We keep the process simple so you can focus on building.
              </p>
            </div>

            <div className='bg-white border border-stone-200 rounded-xl p-6'>
              <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-500/30'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-stone-900 mb-2'>Community</h3>
              <p className='text-sm text-stone-600'>
                Connect with fellow makers, get honest feedback, and support each other's journeys.
              </p>
            </div>

            <div className='bg-white border border-stone-200 rounded-xl p-6'>
              <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-500/30'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-stone-900 mb-2'>Quality</h3>
              <p className='text-sm text-stone-600'>
                Every product is reviewed to maintain high standards and provide value to our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 bg-white border-t border-stone-200'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-stone-900 mb-4'>
            Join Our Community of Makers
          </h2>
          <p className='text-lg text-stone-600 mb-8'>
            Start launching your products today and connect with thousands of early adopters.
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Link href='/signup'>
              <Button size='lg' className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
                Get Started Free
              </Button>
            </Link>
            <Link href='/contact'>
              <Button size='lg' variant='outline' className='border-stone-300'>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
