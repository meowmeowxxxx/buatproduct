'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const pricingPlans = [
  {
    name: 'Free',
    badge: 'Launch for Free',
    badgeColor: 'bg-stone-600 text-white',
    price: '$0',
    originalPrice: null,
    period: '',
    description: 'Perfect for testing the waters',
    features: [
      { text: 'Submit up to 3 products', included: true },
      { text: 'Reviewed & listed within 72 hours', included: true },
      { text: 'Get upvotes from the community', included: true },
      { text: 'Free "Launched on BuatProduct" badge', included: true },
      { text: 'Share your product page', included: true },
      { text: 'Track views and upvotes', included: true },
      { text: 'Edit your product anytime', included: true },
    ],
    cta: 'Get Started Free',
    ctaSubtext: 'No credit card required',
    popular: false,
  },
  {
    name: 'Premium',
    badge: 'Most Popular',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
    price: '$29',
    originalPrice: null,
    period: '/month',
    description: 'For serious makers who want maximum visibility',
    features: [
      { text: 'Submit unlimited products', included: true, highlight: true },
      { text: 'Featured on homepage for 15 days', included: true, highlight: true },
      { text: 'Reviewed & listed under 24 hours', included: true, highlight: true },
      { text: 'Priority support', included: true },
      { text: 'Premium "Launched on BuatProduct" badge', included: true },
      { text: 'Advanced analytics & insights', included: true },
      { text: 'Custom product page design', included: true },
      { text: 'Share across all social channels', included: true },
    ],
    cta: 'Upgrade to Premium',
    ctaSubtext: 'Billed monthly, cancel anytime',
    popular: true,
  },
];

export default function PricingPage() {
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
              <Link href='/pricing' className='text-sm text-orange-600 font-medium'>
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
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight'>
              Launch Your Product for <span className='bg-gradient-to-r from-orange-500 via-purple-600 to-pink-600 bg-clip-text text-transparent'>Free</span>
            </h1>
            <p className='text-base text-stone-600 mb-8 max-w-2xl mx-auto'>
              No hidden fees, no credit card required. Start connecting with early adopters today.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className='py-16'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-8'>
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.popular 
                    ? 'border-2 border-orange-500 shadow-xl shadow-orange-500/20' 
                    : 'border border-stone-200 shadow-lg'
                }`}
              >
                {/* Badge */}
                <div className='mb-4'>
                  <span className={`inline-block px-3 py-1 ${plan.badgeColor} text-xs font-semibold rounded-full`}>
                    {plan.badge}
                  </span>
                </div>

                {/* Title & Price */}
                <div className='mb-6'>
                  <h3 className='text-2xl font-bold text-stone-900 mb-2'>{plan.name}</h3>
                  <div className='flex items-baseline gap-2 mb-2'>
                    <span className='text-4xl font-bold text-stone-900'>{plan.price}</span>
                    {plan.originalPrice && (
                      <span className='text-lg text-stone-400 line-through'>{plan.originalPrice}</span>
                    )}
                    {plan.period && <span className='text-stone-600 text-sm'>{plan.period}</span>}
                  </div>
                  <p className='text-sm text-stone-600'>{plan.description}</p>
                </div>

                {/* What's inside */}
                <div className='mb-6'>
                  <h4 className='text-sm font-semibold text-stone-700 mb-3'>What&apos;s inside:</h4>
                  <div className='space-y-3'>
                    {plan.features.map((feature, index) => (
                      <div key={index} className='flex items-start gap-2'>
                        <svg className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        <span className={`text-sm ${(feature as any).highlight ? 'text-orange-600 font-semibold' : 'text-stone-700'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-3 font-semibold ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg' 
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
                <p className='text-xs text-center text-stone-500'>{plan.ctaSubtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className='py-16 bg-white border-y border-stone-200'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-stone-900 mb-3'>Compare Plans</h2>
            <p className='text-stone-600'>Choose the plan that best fits your needs</p>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b-2 border-stone-200'>
                  <th className='text-left py-4 px-4 text-sm font-semibold text-stone-900'>Feature</th>
                  <th className='text-center py-4 px-4 text-sm font-semibold text-stone-900'>Free</th>
                  <th className='text-center py-4 px-4 text-sm font-semibold text-orange-600'>Premium</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-stone-200'>
                {[
                  { feature: 'Product Submissions', free: '3 products', premium: 'Unlimited' },
                  { feature: 'Review Time', free: '72 hours', premium: '24 hours' },
                  { feature: 'Homepage Featured', free: '—', premium: '15 days' },
                  { feature: 'Community Upvotes', free: '✓', premium: '✓' },
                  { feature: 'Product Analytics', free: 'Basic', premium: 'Advanced' },
                  { feature: 'Support', free: 'Community', premium: 'Priority' },
                  { feature: 'Custom Design', free: '—', premium: '✓' },
                  { feature: 'Badge', free: 'Standard', premium: 'Premium' },
                ].map((row, index) => (
                  <tr key={index} className='hover:bg-stone-50 transition-colors'>
                    <td className='py-4 px-4 text-sm text-stone-700'>{row.feature}</td>
                    <td className='py-4 px-4 text-sm text-center text-stone-600'>{row.free}</td>
                    <td className='py-4 px-4 text-sm text-center text-orange-600 font-medium'>{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 bg-white border-t border-stone-200'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-stone-900 mb-3'>Frequently Asked Questions</h2>
            <p className='text-stone-600'>Everything you need to know about our pricing</p>
          </div>

          <div className='space-y-6'>
            {[
              {
                question: 'What happens when I reach my 3-product limit on the Free plan?',
                answer: 'Once you submit 3 products on the Free plan, you\'ll need to upgrade to Premium to submit more. Your existing products will remain published.',
              },
              {
                question: 'How does the 15-day featured placement work?',
                answer: 'Premium products are prominently featured on the homepage for 15 consecutive days after approval, giving you maximum visibility to the community.',
              },
              {
                question: 'Can I upgrade from Free to Premium anytime?',
                answer: 'Yes! Upgrade instantly to unlock unlimited submissions, priority 24-hour review, and 15-day featured placement for all future products.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, Mastercard, American Express). Payments are processed securely through Stripe.',
              },
              {
                question: 'What happens when I cancel Premium?',
                answer: 'Your premium benefits continue until the end of your billing period. After that, you\'ll return to the Free plan with the 3-product limit.',
              },
            ].map((faq, index) => (
              <div key={index} className='bg-stone-50 border border-stone-200 rounded-xl p-6'>
                <h3 className='text-lg font-semibold text-stone-900 mb-2'>{faq.question}</h3>
                <p className='text-stone-600 text-sm'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gradient-to-b from-stone-50 to-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-stone-900 mb-4'>
            Still have questions?
          </h2>
          <p className='text-stone-600 mb-8'>
            Our team is here to help. Get in touch and we&apos;ll respond within 24 hours.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Link href='/contact'>
              <Button className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/30'>
                Contact Sales
              </Button>
            </Link>
            <Link href='/products'>
              <Button variant='outline' className='border-stone-300 hover:border-orange-400 hover:text-orange-600'>
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-white border-t border-stone-200'>
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
