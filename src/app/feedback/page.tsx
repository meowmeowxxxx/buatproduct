'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';

export default function FeedbackPage() {
  const { user, userData } = useAuth();
  const [formData, setFormData] = useState({
    category: 'general',
    subject: '',
    message: '',
    email: user?.email || '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit feedback to Firestore
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Send Feedback</h1>
          <p className="text-stone-600">We'd love to hear your thoughts, suggestions, or issues</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-8">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium text-green-900">Feedback submitted successfully! We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Feedback Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="product">Product Issue</option>
                    <option value="account">Account Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief description of your feedback"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                  <p className="text-xs text-stone-500 mt-1">
                    We'll use this to respond to your feedback
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Please provide as much detail as possible..."
                    required
                  />
                  <p className="text-xs text-stone-500 mt-1">
                    Minimum 20 characters
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Feedback
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData({ category: 'general', subject: '', message: '', email: user?.email || '' })}
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Links */}
            <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href="/help"
                  className="flex items-center gap-3 text-sm text-stone-700 hover:text-orange-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Help Center
                </a>
                <a
                  href="/blog"
                  className="flex items-center gap-3 text-sm text-stone-700 hover:text-orange-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Blog & Updates
                </a>
                <a
                  href="/contact"
                  className="flex items-center gap-3 text-sm text-stone-700 hover:text-orange-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </a>
              </div>
            </div>

            {/* Feedback Categories */}
            <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Feedback Types</h3>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium text-stone-900">Bug Report</p>
                    <p>Report technical issues or errors</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium text-stone-900">Feature Request</p>
                    <p>Suggest new features or improvements</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium text-stone-900">General Feedback</p>
                    <p>Share your thoughts and opinions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-200 rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-3 mb-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">Response Time</h4>
                  <p className="text-xs text-stone-700">
                    We typically respond within 24-48 hours. Premium members receive priority support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-8 mt-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-stone-100 pb-4">
              <h3 className="text-sm font-semibold text-stone-900 mb-2">How long does it take to get a response?</h3>
              <p className="text-sm text-stone-600">
                We aim to respond to all feedback within 24-48 hours. Premium members receive priority support with responses typically within 12 hours.
              </p>
            </div>
            <div className="border-b border-stone-100 pb-4">
              <h3 className="text-sm font-semibold text-stone-900 mb-2">Can I attach files to my feedback?</h3>
              <p className="text-sm text-stone-600">
                Currently, file attachments are not supported in the feedback form. However, you can include links to screenshots hosted on services like Imgur or Google Drive.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 mb-2">Will my feedback be public?</h3>
              <p className="text-sm text-stone-600">
                No, all feedback is private and only visible to our support team. We may use aggregated, anonymous feedback to improve our service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
