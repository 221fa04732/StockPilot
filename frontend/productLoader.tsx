import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800 animate-pulse">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-2">
            <div className="h-6 w-3/4 bg-gray-800 rounded"></div>
            <div className="h-4 w-16 bg-gray-800 rounded-full"></div>
          </div>
          <div className="h-7 w-16 bg-gray-800 rounded"></div>
        </div>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <div className="h-4 w-16 bg-gray-800 rounded"></div>
            <div className="h-4 w-8 bg-gray-800 rounded"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-16 bg-gray-800 rounded"></div>
            <div className="h-4 w-16 bg-gray-800 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-800">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-800 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductLoader({ count = 4 }: { count?: number }) {
  return (
    <div className="w-10/12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}