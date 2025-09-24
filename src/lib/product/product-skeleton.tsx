// Skeleton Loader for Product
export const ProductSkeleton = () => {
    return (
      <div className="animate-pulse flex flex-col justify-between border border-gray-300 rounded-md h-full">
        <div className="bg-gray-200 h-[220px] w-full rounded-t-md" />
        <div className="p-2 space-y-2">
          <div className="bg-gray-300 h-4 w-3/4 rounded" />
          <div className="bg-gray-300 h-4 w-1/2 rounded" />
          <div className="bg-gray-300 h-3 w-1/4 rounded" />
          <div className="bg-gray-300 h-4 w-full rounded" />
          <div className="bg-gray-300 h-4 w-1/3 rounded" />
          <div className="bg-gray-300 h-10 w-full rounded mt-2" />
        </div>
      </div>
    );
  };
  