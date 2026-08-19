import React from 'react';

const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="py-6 sm:py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery Skeleton (6 cols) */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 justify-center sm:justify-start">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-slate-200/80" />
            ))}
          </div>

          {/* Main Image Box */}
          <div className="flex-1 h-72 sm:h-96 md:h-[420px] rounded-3xl bg-slate-200/80" />
        </div>

        {/* Right: Product Meta Skeleton (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Badges & Category */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-24 bg-slate-200/80 rounded-full" />
            <div className="h-5 w-20 bg-slate-200/60 rounded-full" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-7 bg-slate-200/90 rounded-xl w-4/5" />
            <div className="h-7 bg-slate-200/70 rounded-xl w-3/5" />
          </div>

          {/* Price Box */}
          <div className="p-4 bg-slate-100/70 rounded-2xl space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-28 bg-slate-200/90 rounded-lg" />
              <div className="h-6 w-20 bg-slate-200/60 rounded-lg" />
            </div>
            <div className="h-3 w-44 bg-slate-200/50 rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 bg-slate-200/70 rounded-full w-full" />
            <div className="h-3 bg-slate-200/70 rounded-full w-5/6" />
            <div className="h-3 bg-slate-200/60 rounded-full w-2/3" />
          </div>

          {/* Pack Weight Selector */}
          <div className="space-y-3 pt-2">
            <div className="h-4 w-28 bg-slate-200/80 rounded-md" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-9 w-20 bg-slate-200/70 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-slate-200/80 rounded-2xl" />
            <div className="h-12 flex-1 bg-slate-200/90 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
