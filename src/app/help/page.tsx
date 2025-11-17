'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const faqs = [
  {
    question: 'How do I submit my product?',
    answer: 'Sign up for a free account, click "Submit Product" from your dashboard, fill in the details about your product, and submit for review. Our team will review within 72 hours (24 hours for Premium users).',
  },
  {
    question: 'What are the differences between Free and Premium plans?',
    answer: 'Free: 3 products, 72-hour review, community upvotes. Premium ($29/mo): Unlimited products, 24-hour review, 15-day featured placement, priority support, premium badge, advanced analytics, and custom design options.',
  },
  {
    question: 'How long does the review process take?',
    answer: 'Free accounts: up to 72 hours. Premium accounts: within 24 hours. We review every submission to ensure quality and prevent spam.',
  },
  {
    question: 'Can I edit my product after submission?',
    answer: 'Yes! You can edit your product details at any time from your dashboard. Changes will be visible immediately for approved products.',
  },
  {
    question: 'How do upvotes work?',
    answer: 'Community members can upvote products they find interesting. Products with more upvotes get better visibility and ranking in the listings.',
  },
  {
    question: 'What if my product gets rejected?',
    answer: "If your product doesn't meet our guidelines, we'll send you feedback on why it was rejected and how to improve it for resubmission.",
  },
  {
    question: 'Can I cancel my Premium subscription anytime?',
    answer: 'Yes, you can cancel your Premium subscription at any time. You\'ll continue to have Premium benefits until the end of your current billing period.',
  },
  {
    question: 'How do I track my product\'s performance?',
    answer: 'Your dashboard shows views, upvotes, and engagement metrics. Premium users get access to advanced analytics with detailed breakdowns and insights.',
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              <Link href='/help' className='text-sm text-orange-600 font-medium'>
                Help
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
              How Can We Help You?
            </h1>
            <p className='text-lg text-stone-600 mb-8'>
              Find answers to common questions or reach out to our support team.
            </p>
            <div className='max-w-xl mx-auto'>
              <input
                type='text'
                placeholder='Search for help...'
                className='w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className='py-20'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-2xl font-bold text-stone-900 mb-8'>Frequently Asked Questions</h2>
          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <div key={index} className='bg-white border border-stone-200 rounded-xl overflow-hidden'>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-stone-50 transition-colors'
                >
                  <span className='font-medium text-stone-900'>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-stone-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className='px-6 py-4 bg-stone-50 border-t border-stone-200'>
                    <p className='text-stone-600'>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className='py-20 bg-white border-t border-stone-200'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-stone-900 mb-4'>
            Still Need Help?
          </h2>
          <p className='text-lg text-stone-600 mb-8'>
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Link href='/contact'>
              <Button size='lg' className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
                Contact Support
              </Button>
            </Link>
            <Link href='/signup'>
              <Button size='lg' variant='outline' className='border-stone-300'>
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
