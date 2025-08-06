import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  type?: 'text' | 'card' | 'avatar' | 'chart' | 'form';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  count = 1,
  type = 'text',
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className={cn('space-y-2', className)}>
            {[...Array(count)].map((_, i) => {
              // Generate a random width class for each skeleton line
              const widths = ['w-3/5', 'w-2/3', 'w-3/4', 'w-4/5', 'w-full'];
              const widthClass = widths[Math.floor(Math.random() * widths.length)];
              return (
                <div
                  key={`skeleton-text-${type}-${i}`}
                  className={cn("h-4 bg-gray-200 rounded animate-pulse", widthClass)}
                />
              );
            })}
          </div>
        );
      
      case 'card':
        return (
          <div className={cn('bg-white p-6 rounded-lg shadow-sm', className)}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        );
      
      case 'avatar':
        return (
          <div className={cn('flex items-center space-x-3', className)}>
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        );
      
      case 'chart':
        return (
          <div className={cn('bg-white p-6 rounded-lg shadow-sm', className)}>
            <div className="h-64 bg-gray-200 rounded animate-pulse" />
          </div>
        );
      
      case 'form':
        return (
          <div className={cn('space-y-4', className)}>
            {[...Array(count)].map((_, i) => (
              <div key={`skeleton-form-${type}-${count}-${i}`} className="space-y-2">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className={cn('h-4 bg-gray-200 rounded animate-pulse', className)} />
        );
    }
  };

  return renderSkeleton();
};

// Loading spinner component
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
          sizeClasses[size]
        )}
      />
    </div>
  );
};

// Full page loader
export const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
);
