'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';

const pricingPlans = [
  {
    id: 'free',
    name: 'Free Launch',
    badge: 'Get Started',
    badgeColor: 'bg-stone-600 text-white',
    price: '$0',
    originalPrice: null,
    period: 'forever',
    description: 'Perfect for testing the waters and getting started',
    features: [
      { text: 'Submit up to 3 products', included: true },
      { text: 'Listed on product pages', included: true },
      { text: 'Community upvotes & feedback', included: true },
      { text: 'Basic analytics (views & upvotes)', included: true },
      { text: 'Lifetime backlink (top 3 products)', included: true },
      { text: 'Edit your products anytime', included: true },
      { text: 'Standard review (48-72 hours)', included: true },
    ],
    cta: 'Start Free',
    ctaSubtext: 'No credit card required',
    popular: false,
  },
  {
    id: 'featured',
    name: 'Featured Product',
    badge: '🔥 Limited to 5 Slots',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
    price: '$19',
    originalPrice: null,
    period: 'per product',
    description: 'Get maximum visibility on the homepage for 15 days',
    features: [
      { text: 'Only 5 featured slots available', included: true, highlight: true },
      { text: '15 days featured on homepage', included: true, highlight: true },
      { text: 'Premium "Featured" badge', included: true, highlight: true },
      { text: 'Prominent placement above the fold', included: true },
      { text: 'Priority in search results', included: true },
      { text: 'Fast-track review (24 hours)', included: true },
      { text: 'Featured in weekly newsletter', included: true },
      { text: 'DR72+ lifetime backlink', included: true },
      { text: 'Advanced analytics dashboard', included: true },
    ],
    cta: 'Get Featured',
    ctaSubtext: 'One-time payment • 15 days visibility',
    popular: true,
  },
];

export default function PricingPage() {
  return (
    <div className='min-h-screen bg-stone-50'>
      <Header />

      {/* Hero */}
      <section className='bg-gradient-to-b from-white to-stone-50 border-b border-stone-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight'>
              Simple, Transparent <span className='bg-gradient-to-r from-orange-500 via-purple-600 to-pink-600 bg-clip-text text-transparent'>Pricing</span>
            </h1>
            <p className='text-base text-stone-600 mb-8 max-w-2xl mx-auto'>
              Start free, scale when you need. No hidden fees, no surprises. Choose the plan that fits your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof Section */}
      <section className='py-12 bg-gradient-to-r from-orange-50 via-purple-50 to-pink-50'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2'>10K+</div>
              <div className='text-sm text-stone-600'>Products Launched</div>
            </div>
            <div>
              <div className='text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2'>130K</div>
              <div className='text-sm text-stone-600'>Page Views/Month</div>
            </div>
            <div>
              <div className='text-4xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent mb-2'>40K</div>
              <div className='text-sm text-stone-600'>Monthly Visitors</div>
            </div>
            <div>
              <div className='text-4xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2'>DR72+</div>
              <div className='text-sm text-stone-600'>Backlink Authority</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className='py-16'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-7 ${
                  plan.popular 
                    ? 'border-2 border-orange-500 shadow-2xl shadow-orange-500/20 scale-105' 
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
                  <th className='text-center py-4 px-4 text-sm font-semibold text-orange-600'>Featured</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-stone-200'>
                {[
                  { feature: 'Product Submissions', free: '3 products', featured: 'Per product' },
                  { feature: 'Review Time', free: '48-72 hours', featured: '24 hours' },
                  { feature: 'Homepage Featured', free: '—', featured: '15 days' },
                  { feature: 'Featured Slots', free: '—', featured: 'Limited to 5' },
                  { feature: 'Premium Badge', free: '—', featured: '✓' },
                  { feature: 'Community Upvotes', free: '✓', featured: '✓' },
                  { feature: 'Product Analytics', free: 'Basic', featured: 'Advanced' },
                  { feature: 'Support', free: 'Community', featured: 'Priority' },
                  { feature: 'Newsletter Feature', free: '—', featured: '✓' },
                  { feature: 'Lifetime Backlinks', free: 'Top 3 only', featured: '✓' },
                  { feature: 'Price', free: 'Free', featured: '$19/product' },
                ].map((row, index) => (
                  <tr key={index} className='hover:bg-stone-50 transition-colors'>
                    <td className='py-4 px-4 text-sm text-stone-700 font-medium'>{row.feature}</td>
                    <td className='py-4 px-4 text-sm text-center text-stone-600'>{row.free}</td>
                    <td className='py-4 px-4 text-sm text-center text-orange-600 font-medium'>{row.featured}</td>
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
                question: 'How does the Featured Product plan work?',
                answer: 'Featured Product ($19) gives you 15 days of homepage visibility for a single product. Your product gets a premium badge, priority positioning, newsletter feature, and advanced analytics. Only 5 featured slots are available to ensure maximum visibility for each product.',
              },
              {
                question: 'Can I upgrade from Free to Featured later?',
                answer: 'Absolutely! You can start with the Free plan (3 products, 48-72 hour review) and upgrade any product to Featured ($19 for 15 days of homepage visibility) anytime. Featured products get 24-hour priority review.',
              },
              {
                question: 'Why are there only 5 featured slots available?',
                answer: 'We limit featured slots to 5 products at a time to ensure each featured product gets maximum visibility and engagement. This scarcity drives better results for featured products compared to unlimited featured listings.',
              },
              {
                question: 'What happens after the 15-day featured period ends?',
                answer: 'Your product remains on BuatProduct permanently with a lifetime backlink. After 15 days, it moves from the featured section to the regular listings where it continues to receive organic traffic and upvotes from the community.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and digital wallets. All payments are processed securely through Stripe.',
              },
              {
                question: 'Can I get a refund?',
                answer: 'We offer a 7-day money-back guarantee on Featured Product purchases. If you\'re not satisfied with the results, contact us within 7 days for a full refund.',
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
