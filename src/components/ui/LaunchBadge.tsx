import React from 'react';

interface LaunchBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const LaunchBadge: React.FC<LaunchBadgeProps> = ({ size = 'md', variant = 'light' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const variantClasses = {
    light: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
    dark: 'bg-gradient-to-r from-orange-600 to-pink-600 text-white',
  };

  return (
    <div
      className={`inline-flex items-center ${sizeClasses[size]} ${variantClasses[variant]} font-medium rounded-full shadow-md hover:shadow-lg transition-shadow`}
    >
      <svg className={iconSizes[size]} fill='currentColor' viewBox='0 0 20 20'>
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
      <span className='uppercase tracking-wide font-semibold'>Launched on BuatProduct</span>
    </div>
  );
};

// Premium Badge Component
interface PremiumBadgeProps {
  size?: 'sm' | 'md' | 'lg';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ size = 'sm' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1',
    lg: 'px-3 py-1 text-base gap-1.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div
      className={`inline-flex items-center ${sizeClasses[size]} bg-gradient-to-r from-lime-400 to-lime-500 text-black font-bold rounded-md shadow-md`}
    >
      <svg className={iconSizes[size]} fill='currentColor' viewBox='0 0 20 20'>
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
      <span className='uppercase tracking-wide'>Premium</span>
    </div>
  );
};
