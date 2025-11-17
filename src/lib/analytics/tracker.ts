import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { getDateString, getMonthString } from '../utils/dates';
import { AnalyticsSummary, DailyStats, MonthlyStats } from '@/types/analytics';

/**
 * Track a page view
 */
export async function trackPageView(
  visitorId: string,
  path: string,
  userId?: string | null,
  referrer?: string,
  userAgent?: string
): Promise<void> {
  try {
    // Add page view document
    await addDoc(collection(db, 'pageViews'), {
      visitorId,
      userId: userId || null,
      path,
      referrer: referrer || null,
      userAgent: userAgent || null,
      timestamp: serverTimestamp(),
    });

    // Update visitor session
    await updateVisitorSession(visitorId);

    // Update daily stats
    await updateDailyStats();

    // Update monthly stats
    await updateMonthlyStats();
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Update visitor session
 */
async function updateVisitorSession(visitorId: string): Promise<void> {
  const sessionRef = doc(db, 'visitorSessions', visitorId);
  const sessionDoc = await getDoc(sessionRef);

  if (sessionDoc.exists()) {
    await updateDoc(sessionRef, {
      lastVisit: serverTimestamp(),
      pageCount: increment(1),
    });
  } else {
    await setDoc(sessionRef, {
      visitorId,
      firstVisit: serverTimestamp(),
      lastVisit: serverTimestamp(),
      pageCount: 1,
    });
  }
}

/**
 * Update daily stats
 */
async function updateDailyStats(): Promise<void> {
  const today = getDateString();
  const statsRef = doc(db, 'dailyStats', today);
  const statsDoc = await getDoc(statsRef);

  if (statsDoc.exists()) {
    await updateDoc(statsRef, {
      pageViews: increment(1),
      visits: increment(1),
    });
  } else {
    // Count unique visitors for today
    const uniqueVisitors = await countUniqueVisitorsForDate(today);
    
    await setDoc(statsRef, {
      date: today,
      pageViews: 1,
      visits: 1,
      uniqueVisitors: uniqueVisitors,
      timestamp: serverTimestamp(),
    });
  }
}

/**
 * Update monthly stats
 */
async function updateMonthlyStats(): Promise<void> {
  const thisMonth = getMonthString();
  const statsRef = doc(db, 'monthlyStats', thisMonth);
  const statsDoc = await getDoc(statsRef);

  if (statsDoc.exists()) {
    await updateDoc(statsRef, {
      pageViews: increment(1),
      visits: increment(1),
    });
  } else {
    // Count unique visitors for this month
    const uniqueVisitors = await countUniqueVisitorsForMonth(thisMonth);
    
    await setDoc(statsRef, {
      month: thisMonth,
      pageViews: 1,
      visits: 1,
      uniqueVisitors: uniqueVisitors,
      timestamp: serverTimestamp(),
    });
  }
}

/**
 * Count unique visitors for a specific date
 */
async function countUniqueVisitorsForDate(date: string): Promise<number> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const q = query(
    collection(db, 'pageViews'),
    where('timestamp', '>=', Timestamp.fromDate(startOfDay)),
    where('timestamp', '<=', Timestamp.fromDate(endOfDay))
  );

  const snapshot = await getDocs(q);
  const uniqueVisitors = new Set(snapshot.docs.map(doc => doc.data().visitorId));
  
  return uniqueVisitors.size;
}

/**
 * Count unique visitors for a specific month
 */
async function countUniqueVisitorsForMonth(month: string): Promise<number> {
  const [year, monthNum] = month.split('-');
  const startOfMonth = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
  const endOfMonth = new Date(parseInt(year), parseInt(monthNum), 0, 23, 59, 59, 999);

  const q = query(
    collection(db, 'pageViews'),
    where('timestamp', '>=', Timestamp.fromDate(startOfMonth)),
    where('timestamp', '<=', Timestamp.fromDate(endOfMonth))
  );

  const snapshot = await getDocs(q);
  const uniqueVisitors = new Set(snapshot.docs.map(doc => doc.data().visitorId));
  
  return uniqueVisitors.size;
}

/**
 * Get analytics summary
 */
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const today = getDateString();
  const thisMonth = getMonthString();

  // Get total stats
  const totalVisits = await getTotalCount('pageViews');
  const totalUniqueVisitors = await getTotalUniqueVisitors();
  const totalPageViews = totalVisits;

  // Get today's stats
  const todayStats = await getDailyStatsForDate(today);

  // Get this month's stats
  const monthStats = await getMonthlyStatsForMonth(thisMonth);

  return {
    totalVisits,
    totalUniqueVisitors,
    totalPageViews,
    todayVisits: todayStats.visits,
    todayUniqueVisitors: todayStats.uniqueVisitors,
    todayPageViews: todayStats.pageViews,
    thisMonthVisits: monthStats.visits,
    thisMonthUniqueVisitors: monthStats.uniqueVisitors,
    thisMonthPageViews: monthStats.pageViews,
  };
}

/**
 * Get total count from a collection
 */
async function getTotalCount(collectionName: string): Promise<number> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.size;
}

/**
 * Get total unique visitors
 */
async function getTotalUniqueVisitors(): Promise<number> {
  const snapshot = await getDocs(collection(db, 'visitorSessions'));
  return snapshot.size;
}

/**
 * Get daily stats for a specific date
 */
async function getDailyStatsForDate(date: string): Promise<DailyStats> {
  const statsDoc = await getDoc(doc(db, 'dailyStats', date));
  
  if (statsDoc.exists()) {
    const data = statsDoc.data();
    return {
      date,
      visits: data.visits || 0,
      uniqueVisitors: data.uniqueVisitors || 0,
      pageViews: data.pageViews || 0,
    };
  }

  return {
    date,
    visits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
  };
}

/**
 * Get monthly stats for a specific month
 */
async function getMonthlyStatsForMonth(month: string): Promise<MonthlyStats> {
  const statsDoc = await getDoc(doc(db, 'monthlyStats', month));
  
  if (statsDoc.exists()) {
    const data = statsDoc.data();
    return {
      month,
      visits: data.visits || 0,
      uniqueVisitors: data.uniqueVisitors || 0,
      pageViews: data.pageViews || 0,
    };
  }

  return {
    month,
    visits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
  };
}

/**
 * Get daily stats for the last N days
 */
export async function getDailyStats(days: number = 30): Promise<DailyStats[]> {
  const stats: DailyStats[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = getDateString(date);
    
    const dayStats = await getDailyStatsForDate(dateString);
    stats.unshift(dayStats);
  }

  return stats;
}

/**
 * Get monthly stats for the last N months
 */
export async function getMonthlyStats(months: number = 12): Promise<MonthlyStats[]> {
  const stats: MonthlyStats[] = [];
  const today = new Date();

  for (let i = 0; i < months; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthString = getMonthString(date);
    
    const monthStats = await getMonthlyStatsForMonth(monthString);
    stats.unshift(monthStats);
  }

  return stats;
}
