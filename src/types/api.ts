export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginationParams {
  limit?: number;
  cursor?: string;
  orderBy?: string;
  direction?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
  total?: number;
}

export interface UpvoteResponse {
  success: boolean;
  upvoted: boolean;
  upvoteCount: number;
}

export interface ApprovalRequest {
  productId: string;
  approved: boolean;
  rejectionReason?: string;
}

export interface FeatureProductRequest {
  productId: string;
  duration: number; // in days
}

export interface StripeCheckoutResponse {
  sessionId: string;
  url: string;
}
