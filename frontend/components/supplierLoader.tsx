function SupplierSkeleton() {
  return (
    <div className="w-full flex flex-col items-center md:justify-between gap-4 p-4 bg-gray-900 rounded-lg shadow-md animate-pulse">
      <div className="w-full flex justify-start gap-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full" />
        <div>
          <div className="w-32 sm:w-40 h-4 bg-gray-700 rounded mb-2" />
          <div className="w-48 sm:w-64 h-3 bg-gray-700 rounded" />
        </div>
      </div>
      <div className="flex gap-2 w-full justify-end">
        <div className="w-20 h-6 bg-gray-700 rounded" />
        <div className="w-20 h-6 bg-gray-700 rounded" />
      </div>
    </div>
  );
}



export function SupplierLoader({ count = 6 }: { count?: number }) {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  return (
    <div className="w-10/12 flex flex-col gap-2">
      {[...Array(count)].map((_, i) => (
        <SupplierSkeleton key={i} />
      ))}
    </div>
  );
}