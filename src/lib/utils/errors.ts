/**
 * Custom error classes for better error handling
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND_ERROR', 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT_ERROR', 409);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 'RATE_LIMIT_ERROR', 429);
    this.name = 'RateLimitError';
  }
}

/**
 * Log error with context
 */
export function logError(error: any, context?: Record<string, any>): void {
  console.error('Error occurred:', {
    message: error.message,
    name: error.name,
    code: error.code,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Handle API errors and return appropriate response
 */
export function handleApiError(error: any): { statusCode: number; error: string; code: string } {
  logError(error);

  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      error: error.message,
      code: error.code,
    };
  }

  // Firebase Auth errors
  if (error.code?.startsWith('auth/')) {
    return {
      statusCode: 401,
      error: getFirebaseAuthErrorMessage(error.code),
      code: error.code,
    };
  }

  // Firestore errors
  if (error.code?.startsWith('firestore/')) {
    return {
      statusCode: 500,
      error: 'Database error occurred',
      code: 'DATABASE_ERROR',
    };
  }

  // Stripe errors
  if (error.type?.startsWith('Stripe')) {
    return {
      statusCode: 400,
      error: error.message || 'Payment processing error',
      code: 'PAYMENT_ERROR',
    };
  }

  // Default error
  return {
    statusCode: 500,
    error: 'An unexpected error occurred',
    code: 'INTERNAL_SERVER_ERROR',
  };
}

/**
 * Get user-friendly Firebase Auth error messages
 */
function getFirebaseAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/invalid-email': 'Invalid email address',
    'auth/operation-not-allowed': 'Operation not allowed',
    'auth/weak-password': 'Password is too weak',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later',
    'auth/invalid-credential': 'Invalid credentials',
  };

  return messages[code] || 'Authentication error occurred';
}

/**
 * Safe error message for client display
 */
export function getSafeErrorMessage(error: any): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error.code?.startsWith('auth/')) {
    return getFirebaseAuthErrorMessage(error.code);
  }

  return 'An unexpected error occurred. Please try again.';
}
