'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function DashboardPage() {
  const [products] = useState([
    {
      id: '1',
      name: 'My Awesome SaaS',
      status: 'published',
      upvotes: 45,
      views: 320,
      comments: 12,
    },
    {
      id: '2',
      name: 'Cool Mobile App',
      status: 'pending',
      upvotes: 0,
      views: 0,
      comments: 0,
    },
  ]);

  const stats = [
    { label: 'Total Products', value: '2', icon: '📦', color: 'blue' },
    { label: 'Total Upvotes', value: '45', icon: '👍', color: 'purple' },
    { label: 'Total Views', value: '320', icon: '👁️', color: 'pink' },
    { label: 'Comments', value: '12', icon: '💬', color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your products and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Products Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
            <Link href="/submit">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Submit New Product
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Upvotes</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Views</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Comments</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={product.status === 'published' ? 'success' : 'warning'}
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">{product.upvotes}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">{product.views}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">{product.comments}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost">Edit</Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-6">Submit your first product to get started</p>
              <Link href="/submit">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Submit Product
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
