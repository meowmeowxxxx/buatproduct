'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function SubmitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🚀 Submit Your Product</h1>
          <p className="text-gray-600">Share your creation with our community of makers and early adopters</p>
        </div>

        <Card className="p-8">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="One-line description of your product"
                maxLength={60}
                required
              />
              <p className="mt-1 text-sm text-gray-500">{formData.shortDescription.length}/60 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your product in detail..."
                required
              />
              <p className="mt-1 text-sm text-gray-500">Tell us what makes your product special</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">📋 Submission Guidelines</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Make sure your product is live and accessible</li>
                <li>• Provide accurate and detailed information</li>
                <li>• Use a high-quality logo image</li>
                <li>• Your submission will be reviewed within 24-48 hours</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
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
