'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { createProduct } from '@/lib/firebase/products';

export default function SubmitPage() {
  const router = useRouter();
  const { user, userData, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: 'SaaS',
    websiteUrl: '',
    tags: '',
    logo: '',
  });

  // Check authentication on mount
  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to home if not authenticated
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-stone-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render form if not authenticated
  if (!user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userData) return;
    
    setLoading(true);
    setError('');

    try {
      // Parse tags
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Create product in Firestore
      const productId = await createProduct({
        name: formData.name,
        slug: formData.slug,
        tagline: formData.shortDescription,
        description: formData.description,
        shortDescription: formData.shortDescription,
        category: formData.category as any,
        tags,
        website: formData.websiteUrl,
        websiteUrl: formData.websiteUrl,
        logo: formData.logo || '',
        userId: user.uid,
        username: userData.username,
        status: 'published',
        featured: false,
      });

      console.log('Product created with ID:', productId);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Error submitting product:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">🚀 Submit Your Product</h1>
          <p className="text-stone-600">Share your creation with our community of makers and early adopters</p>
        </div>

        <Card className="p-8 border-stone-200 bg-white">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="My Awesome Product"
                required
              />
              <p className="mt-1 text-sm text-gray-500">The name of your product</p>
            </div>

            <div>
              <Input
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="my-awesome-product"
                required
              />
              <p className="mt-1 text-sm text-gray-500">URL-friendly version (auto-generated)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="One-line description of your product"
                maxLength={60}
                required
              />
              <p className="mt-1 text-sm text-stone-500">{formData.shortDescription.length}/60 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Full Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Describe your product in detail..."
                required
              />
              <p className="mt-1 text-sm text-stone-500">Tell us what makes your product special</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                required
              >
                <option value="SaaS">SaaS</option>
                <option value="Developer Tools">Developer Tools</option>
                <option value="Productivity">Productivity</option>
                <option value="Marketing">Marketing</option>
                <option value="Analytics">Analytics</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Chrome Extension">Chrome Extension</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <Input
                label="Website URL"
                name="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                required
              />
              <p className="mt-1 text-sm text-gray-500">The URL where people can access your product</p>
            </div>

            <div>
              <Input
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="productivity, ai, automation"
              />
              <p className="mt-1 text-sm text-gray-500">Comma-separated tags (e.g., productivity, ai, automation)</p>
            </div>

            <div>
              <Input
                label="Logo URL"
                name="logo"
                type="url"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
              <p className="mt-1 text-sm text-gray-500">Direct link to your product logo (recommended: 512x512px)</p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">📋 Submission Guidelines</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Make sure your product is live and accessible</li>
                <li>• Provide accurate and detailed information</li>
                <li>• Use a high-quality logo image</li>
                <li>• Your submission will be reviewed within 24-48 hours</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-8 shadow-lg shadow-orange-500/30"
                isLoading={loading}
              >
                Submit Product
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
