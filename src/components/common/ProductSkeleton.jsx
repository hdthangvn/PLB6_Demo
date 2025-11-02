/**
 * ProductSkeleton - Hiển thị skeleton loading cho products
 * Tạo hiệu ứng shimmer animation để UX tốt hơn
 */

const ProductSkeleton = ({ count = 5 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
          {/* Image skeleton */}
          <div className="w-full aspect-square bg-gray-200 rounded-lg mb-3"></div>
          
          {/* Title skeleton */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          
          {/* Price skeleton */}
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
          
          {/* Rating skeleton */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          
          {/* Button skeleton */}
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;

