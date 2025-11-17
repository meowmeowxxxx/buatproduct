'use client';

import useSWR from 'swr';
import { AnalyticsSummary } from '@/types/analytics';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAnalytics() {
  const { data, error, mutate } = useSWR<{ success: boolean; data: AnalyticsSummary }>(
    '/api/analytics/stats',
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
    }
  );

  return {
    analytics: data?.data || null,
    loading: !error && !data,
    error,
    mutate,
  };
}
