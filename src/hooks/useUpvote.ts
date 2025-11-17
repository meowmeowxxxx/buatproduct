'use client';

import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import useAuth from './useAuth';

export function useUpvote() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { user } = useAuth();

  const toggleUpvote = async (productId: string, isUpvoted: boolean) => {
    if (!user) {
      addToast('error', 'Please login to upvote');
      return false;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/upvotes', {
        method: isUpvoted ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update upvote');
      }

      return true;
    } catch (error: any) {
      addToast('error', error.message || 'Failed to update upvote');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { toggleUpvote, loading };
}
