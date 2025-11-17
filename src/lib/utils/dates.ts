import { format, formatDistance, formatRelative, isToday, isYesterday, parseISO } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

/**
 * Format a Firebase Timestamp to a readable date string
 */
export function formatDate(timestamp: Timestamp | Date | string, formatStr: string = 'MMM d, yyyy'): string {
  try {
    if (timestamp instanceof Timestamp) {
      return format(timestamp.toDate(), formatStr);
    }
    if (timestamp instanceof Date) {
      return format(timestamp, formatStr);
    }
    if (typeof timestamp === 'string') {
      return format(parseISO(timestamp), formatStr);
    }
    return 'Invalid date';
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

/**
 * Format a date as a relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: Timestamp | Date | string): string {
  try {
    let date: Date;
    
    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string') {
      date = parseISO(timestamp);
    } else {
      return 'Invalid date';
    }

    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    }
    
    if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    }

    return formatDistance(date, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Invalid date';
  }
}

/**
 * Format a date for display in analytics
 */
export function formatAnalyticsDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d');
  } catch (error) {
    return dateString;
  }
}

/**
 * Get date string in YYYY-MM-DD format
 */
export function getDateString(date: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Get month string in YYYY-MM format
 */
export function getMonthString(date: Date = new Date()): string {
  return format(date, 'yyyy-MM');
}

/**
 * Parse a date string to Date object
 */
export function parseDate(dateString: string): Date {
  return parseISO(dateString);
}

/**
 * Check if a date is in the past
 */
export function isPastDate(timestamp: Timestamp | Date): boolean {
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  return date < new Date();
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(timestamp: Timestamp | Date): boolean {
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  return date > new Date();
}
