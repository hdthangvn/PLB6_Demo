import { memo } from 'react';

/**
 * ReviewStats Component
 * Displays review statistics with rating distribution
 */
const ReviewStats = ({ stats, onFilterByRating, selectedRating = null }) => {
  if (!stats) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">Chưa có đánh giá nào</p>
      </div>
    );
  }

  const {
    averageRating = 0,
    totalReviews = 0,
    ratingDistribution = {},
  } = stats;

  // Calculate percentage for each rating
  const getRatingPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    return Math.round(((ratingDistribution[rating] || 0) / totalReviews) * 100);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Overall Rating */}
      <div className="flex items-start space-x-6 pb-6 border-b border-gray-200">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-1">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600">{totalReviews} đánh giá</p>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating] || 0;
            const percentage = getRatingPercentage(rating);

            return (
              <button
                key={rating}
                onClick={() => onFilterByRating && onFilterByRating(rating)}
                className={`w-full flex items-center space-x-2 mb-2 hover:bg-gray-50 rounded p-1 transition-colors ${
                  selectedRating === rating ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="text-sm text-gray-600 w-16 text-right">
                  {count} ({percentage}%)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Actions */}
      {selectedRating && (
        <div className="mt-4">
          <button
            onClick={() => onFilterByRating && onFilterByRating(null)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Xem tất cả đánh giá
          </button>
        </div>
      )}
    </div>
  );
};

ReviewStats.displayName = 'ReviewStats';

export default memo(ReviewStats);

