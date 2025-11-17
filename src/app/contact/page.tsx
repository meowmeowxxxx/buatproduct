'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this to your backend or email service
      console.log('Contact form submitted:', formData);
      
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <Link href='/contact' className='text-sm text-orange-600 font-medium'>
                Contact
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
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16'>
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-4xl md:text-5xl font-bold text-stone-900 mb-4'>
              Get in Touch
            </h1>
            <p className='text-lg text-stone-600'>
              Have a question or need help? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className='py-20'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div className='bg-white border border-stone-200 rounded-xl p-8'>
              <h2 className='text-2xl font-bold text-stone-900 mb-6'>Send us a message</h2>
              
              {success && (
                <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 text-sm'>
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}
              
              {error && (
                <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                  <p className='text-red-800 text-sm'>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-stone-700 mb-2'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    required
                    disabled={loading}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className='w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-stone-100'
                    placeholder='Your name'
                  />
                </div>

                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-stone-700 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    required
                    disabled={loading}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className='w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-stone-100'
                    placeholder='your@email.com'
                  />
                </div>

                <div>
                  <label htmlFor='subject' className='block text-sm font-medium text-stone-700 mb-2'>
                    Subject
                  </label>
                  <input
                    type='text'
                    id='subject'
                    required
                    disabled={loading}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className='w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-stone-100'
                    placeholder='How can we help?'
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-stone-700 mb-2'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    required
                    disabled={loading}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className='w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-stone-100'
                    placeholder='Tell us more about your question or feedback...'
                  />
                </div>

                <Button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30 disabled:opacity-50'
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className='space-y-8'>
              <div>
                <h2 className='text-2xl font-bold text-stone-900 mb-6'>Other ways to reach us</h2>
                
                <div className='space-y-6'>
                  <div className='flex gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange-500/30'>
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-stone-900 mb-1'>Email Support</h3>
                      <p className='text-stone-600 text-sm mb-1'>support@buatproduct.com</p>
                      <p className='text-stone-500 text-xs'>We reply within 24 hours</p>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange-500/30'>
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-stone-900 mb-1'>Help Center</h3>
                      <Link href='/help' className='text-orange-600 hover:text-orange-700 text-sm'>
                        Visit our FAQ →
                      </Link>
                      <p className='text-stone-500 text-xs mt-1'>Find quick answers</p>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange-500/30'>
                      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-stone-900 mb-1'>Social Media</h3>
                      <p className='text-stone-600 text-sm mb-1'>@buatproduct</p>
                      <p className='text-stone-500 text-xs'>Follow for updates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className='bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100 rounded-xl p-6'>
                <h3 className='font-semibold text-stone-900 mb-4'>Quick Links</h3>
                <div className='space-y-2'>
                  <Link href='/help' className='block text-sm text-stone-600 hover:text-orange-600 transition-colors'>
                    Help Center & FAQs
                  </Link>
                  <Link href='/pricing' className='block text-sm text-stone-600 hover:text-orange-600 transition-colors'>
                    Pricing & Plans
                  </Link>
                  <Link href='/features' className='block text-sm text-stone-600 hover:text-orange-600 transition-colors'>
                    Features
                  </Link>
                  <Link href='/about' className='block text-sm text-stone-600 hover:text-orange-600 transition-colors'>
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
