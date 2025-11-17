'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { createProduct } from '@/lib/firebase/products';
import { uploadProductLogo, validateImageFile } from '@/lib/firebase/storage';
import Link from 'next/link';

export default function SubmitPage() {
  const router = useRouter();
  const { user, userData, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setLogoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userData) return;
    
    setLoading(true);
    setError('');

    try {
      let logoUrl = formData.logo;

      // Upload logo if file is selected
      if (logoFile) {
        setUploadingLogo(true);
        const tempProductId = `temp_${user.uid}_${Date.now()}`;
        logoUrl = await uploadProductLogo(logoFile, tempProductId);
        setUploadingLogo(false);
      }

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
        logo: logoUrl || '',
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
      setUploadingLogo(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">🚀 Submit Your Product</h1>
            <p className="text-base text-stone-600">Share your creation with our community of makers and early adopters</p>
          </div>
          
          {/* Embed Badges - Compact Version */}
          <div className="ml-6 flex-shrink-0">
            <details className="group">
              <summary className="cursor-pointer list-none">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-stone-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all">
                  <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-stone-700">Embed Badges</span>
                  <svg className="w-4 h-4 text-stone-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              
              <div className="mt-3 absolute right-0 z-50 w-96 bg-white border-2 border-stone-200 rounded-xl shadow-2xl p-5">
                <h3 className="text-base font-bold text-stone-900 mb-3">🎖️ Embed Badges</h3>
                <p className="text-xs text-stone-600 mb-4">Add these badges to your website to showcase your launch</p>
                
                <div className="space-y-4">
                  {/* Launched Badge */}
                  <div className="border border-stone-200 rounded-lg p-3 bg-stone-50">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/badges?type=launched`} 
                        alt="Launched Badge" 
                        className="h-8"
                      />
                      <span className="text-xs font-medium text-stone-700">Launched Badge</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`<a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}"><img src="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/badges?type=launched" alt="Launched on BuatProduct" /></a>`);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs font-medium text-stone-700 hover:bg-stone-50 hover:border-orange-400 transition-colors"
                    >
                      📋 Copy HTML Code
                    </button>
                  </div>

                  {/* Featured Badge */}
                  <div className="border border-stone-200 rounded-lg p-3 bg-stone-50">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/badges?type=featured`} 
                        alt="Featured Badge" 
                        className="h-8"
                      />
                      <span className="text-xs font-medium text-stone-700">Featured Badge</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`<a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}"><img src="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/badges?type=featured" alt="Featured on BuatProduct" /></a>`);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs font-medium text-stone-700 hover:bg-stone-50 hover:border-orange-400 transition-colors"
                    >
                      📋 Copy HTML Code
                    </button>
                  </div>
                </div>
              </div>
            </details>
          </div>
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
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Logo Upload
              </label>
              <div className="space-y-3">
                {logoPreview && (
                  <div className="flex items-center gap-4 p-4 bg-stone-50 border border-stone-200 rounded-lg">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-900">{logoFile?.name}</p>
                      <p className="text-xs text-stone-500">
                        {logoFile && (logoFile.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLogoFile(null);
                        setLogoPreview('');
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
              </div>
              <p className="mt-2 text-sm text-stone-500">
                🔒 Secure upload: Max 2MB, JPG/PNG/SVG only. No double extensions allowed.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-orange-900 mb-2">🚀 Want to get featured?</h3>
                  <p className="text-sm text-orange-800 mb-3">
                    Get 15 days of homepage visibility, priority review in 24 hours, and premium badge for just $19.
                  </p>
                  <Link href="/pricing">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-orange-400 text-orange-700 hover:bg-orange-100 text-sm"
                    >
                      View Featured Plans →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <h3 className="font-semibold text-stone-900 mb-2">📋 Submission Guidelines</h3>
              <ul className="text-sm text-stone-700 space-y-1">
                <li>• Make sure your product is live and accessible</li>
                <li>• Provide accurate and detailed information</li>
                <li>• Upload a high-quality logo (recommended: 512x512px)</li>
                <li>• Free plan: Standard review within 48-72 hours</li>
                <li>• Featured plan: Priority review within 24 hours</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-8 shadow-lg shadow-orange-500/30"
                isLoading={loading || uploadingLogo}
                disabled={loading || uploadingLogo}
              >
                {uploadingLogo ? 'Uploading Logo...' : 'Submit Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading || uploadingLogo}
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
