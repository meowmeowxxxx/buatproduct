import { Timestamp } from 'firebase/firestore';

export interface AnalyticsStats {
  totalVisits: number;
  totalUniqueVisitors: number;
  totalPageViews: number;
  dailyStats: DailyStats[];
  monthlyStats: MonthlyStats[];
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
}

export interface MonthlyStats {
  month: string; // YYYY-MM
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
}

export interface PageView {
  id: string;
  visitorId: string;
  userId?: string | null;
  path: string;
  referrer?: string;
  userAgent?: string;
  timestamp: Timestamp;
}

export interface VisitorSession {
  visitorId: string;
  firstVisit: Timestamp;
  lastVisit: Timestamp;
  pageCount: number;
}

export interface ProductAnalytics {
  productId: string;
  views: number;
  upvotes: number;
  clicks: number;
  dailyViews: { date: string; count: number }[];
}

export interface AnalyticsSummary {
  totalVisits: number;
  totalUniqueVisitors: number;
  totalPageViews: number;
  todayVisits: number;
  todayUniqueVisitors: number;
  todayPageViews: number;
  thisMonthVisits: number;
  thisMonthUniqueVisitors: number;
  thisMonthPageViews: number;
}
