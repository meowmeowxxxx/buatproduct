'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
  showUpvote?: boolean;
  onUpvote?: (productId: string) => void;
  isUpvoted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  showUpvote = true,
  onUpvote,
  isUpvoted = false,
}) => {
  if (variant === 'featured') {
    return (
      <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-full"></div>
        <div className="relative p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {product.logo ? (
                  <Image src={product.logo} alt={product.name} width={80} height={80} className="object-cover" />
                ) : (
                  <span className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {product.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Link href={`/products/${product.slug}`} className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  {product.name}
                </Link>
                <Badge variant="featured" className="flex-shrink-0">
                  ⭐ Featured
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex flex-wrap gap-2">
                {product.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} className="text-xs bg-white/60 backdrop-blur-sm">{tag}</Badge>
                ))}
              </div>
            </div>
            
            {showUpvote && (
              <button
                onClick={() => onUpvote?.(product.id)}
                className={cn(
                  'flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 shadow-lg',
                  isUpvoted
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-110'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                )}
              >
                <svg className="w-6 h-6" fill={isUpvoted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
                <span className="text-sm font-bold mt-1">{product.upvotes || 0}</span>
              </button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card hover className="group">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Product Logo */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              {product.logo ? (
                <Image src={product.logo} alt={product.name} width={56} height={56} className="object-cover" />
              ) : (
                <span className="text-xl font-bold text-gray-400">
                  {product.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <Link href={`/products/${product.slug}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors group-hover:translate-x-1 duration-200">
                {product.name}
              </Link>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription || product.description}</p>
            
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Upvote Button */}
          {showUpvote && (
            <button
              onClick={() => onUpvote?.(product.id)}
              className={cn(
                'flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-all duration-200',
                isUpvoted
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
              )}
            >
              <svg className="w-5 h-5" fill={isUpvoted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span className="text-xs font-semibold mt-0.5">{product.upvotes || 0}</span>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};
