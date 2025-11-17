'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProducts() {
  const { data, error, mutate } = useSWR<{ success: boolean; data: Product[] }>(
    '/api/products',
    fetcher
  );

  return {
    products: data?.data || [],
    loading: !error && !data,
    error,
    mutate,
  };
}

export function useProduct(productId: string) {
  const { data, error, mutate } = useSWR<{ success: boolean; data: Product }>(
    productId ? `/api/products/${productId}` : null,
    fetcher
  );

  return {
    product: data?.data || null,
    loading: !error && !data,
    error,
    mutate,
  };
}

export function useUserProducts(userId: string) {
  const { data, error, mutate } = useSWR<{ success: boolean; data: Product[] }>(
    userId ? `/api/products?userId=${userId}` : null,
    fetcher
  );

  return {
    products: data?.data || [],
    loading: !error && !data,
    error,
    mutate,
  };
}
