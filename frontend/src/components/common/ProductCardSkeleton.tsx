import React from 'react';

interface ProductCardSkeletonProps {
  count?: number;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-3 sm:p-4 shadow-xs flex flex-col justify-between animate-pulse"
        >
          <div>
            {/* Image Placeholder */}
            <div className="h-32 sm:h-44 w-full bg-slate-200/80 rounded-xl sm:rounded-2xl mb-3" />

            {/* Category & Weight Placeholder */}
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-16 bg-slate-200/70 rounded" />
              <div className="h-4 w-12 bg-slate-200/60 rounded" />
            </div>

            {/* Title Placeholder */}
            <div className="space-y-1.5 mb-3">
              <div className="h-3.5 bg-slate-200/80 rounded w-4/5" />
              <div className="h-3.5 bg-slate-200/60 rounded w-3/5" />
            </div>

            {/* Rating Stars Placeholder */}
            <div className="h-3 w-20 bg-slate-200/60 rounded mb-3" />
          </div>

          {/* Price & Add to Cart Button Placeholder */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="h-5 w-16 bg-slate-200/90 rounded" />
            <div className="h-8 w-8 bg-slate-200/80 rounded-xl" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCardSkeleton;
