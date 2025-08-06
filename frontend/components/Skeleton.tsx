import { motion } from 'framer-motion';

interface SkeletonProps {
  readonly className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}

export function TableSkeleton({ rows = 5 }: { readonly rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={`table-skeleton-row-${i}-${rows}`} className="flex space-x-4">
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/6 h-4" />
          <Skeleton className="w-1/6 h-4" />
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/6 h-4" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-16 h-8" />
          <Skeleton className="w-12 h-3" />
        </div>
        <Skeleton className="w-12 h-12 rounded-lg" />
      </div>
    </div>
  );
}