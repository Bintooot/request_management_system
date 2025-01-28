import React from "react";

const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded-md w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
      </div>

      {/* Filter Section Skeleton */}
      <div className="flex justify-end gap-4 mb-6">
        <div className="h-10 bg-gray-200 rounded-md w-48"></div>
        <div className="h-10 bg-gray-200 rounded-md w-64"></div>
      </div>

      {/* Table Skeleton */}
      <div className="border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={`header-${index}`}
              className="h-4 bg-gray-200 rounded-md"
            ></div>
          ))}
        </div>

        {/* Table Body */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="px-6 py-4 border-t grid grid-cols-5 gap-4"
          >
            {[...Array(5)].map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-4 bg-gray-200 rounded-md"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
