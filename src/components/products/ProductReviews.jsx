import { useState } from 'react';

const ProductReviews = ({ product }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      user: {
        name: 'Nguyễn Văn A',
        avatar: '👤',
        verified: true
      },
      rating: 5,
      date: '2024-01-20',
      content: 'Sản phẩm tuyệt vời! Camera chụp ảnh rất đẹp, pin trâu, thiết kế sang trọng. Đáng tiền bỏ ra.',
      helpful: 12,
      notHelpful: 1,
      images: ['📷', '📷'],
      verified_purchase: true
    },
    {
      id: 2,
      user: {
        name: 'Trần Thị B',
        avatar: '👩',
        verified: true
      },
      rating: 4,
      date: '2024-01-18',
      content: 'Chất lượng ok, ship nhanh, đóng gói cẩn thận. Chỉ có điều màn hình hơi nhỏ so với mong đợi.',
      helpful: 8,
      notHelpful: 0,
      images: [],
      verified_purchase: true
    },
    {
      id: 3,
      user: {
        name: 'Lê Văn C',
        avatar: '👨',
        verified: false
      },
      rating: 5,
      date: '2024-01-15',
      content: 'Mình đã dùng qua nhiều thương hiệu, nhưng sản phẩm này thực sự ấn tượng. Performance mượt mà, design đẹp.',
      helpful: 15,
      notHelpful: 2,
      images: ['📷'],
      verified_purchase: true
    },
    {
      id: 4,
      user: {
        name: 'Phạm Thị D',
        avatar: '👩',
        verified: true
      },
      rating: 3,
      date: '2024-01-12',
      content: 'Sản phẩm tạm ổn, nhưng không outstanding như quảng cáo. Có vài điểm cần cải thiện.',
      helpful: 5,
      notHelpful: 3,
      images: [],
      verified_purchase: true
    },
    {
      id: 5,
      user: {
        name: 'Hoàng Văn E',
        avatar: '👨',
        verified: true
      },
      rating: 5,
      date: '2024-01-10',
      content: 'Excellent! Exactly as described. Fast shipping and great customer service. Highly recommend!',
      helpful: 20,
      notHelpful: 0,
      images: ['📷', '📷', '🎥'],
      verified_purchase: true
    }
  ];

  // Rating distribution
  const averageRating = 4.5;
  const ratingDistribution = {
    5: 89,
    4: 45,
    3: 15,
    2: 5,
    1: 2
  };
  
  const totalReviews = Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0);

  // Filter and sort reviews
  const getFilteredReviews = () => {
    let filtered = mockReviews;
    
    if (activeFilter !== 'all') {
      const rating = parseInt(activeFilter);
      filtered = filtered.filter(review => review.rating === rating);
    }
    
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.helpful - a.helpful);
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const filteredReviews = getFilteredReviews();
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage, 
    currentPage * reviewsPerPage
  );
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating, size = 'w-4 h-4') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${size} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Đánh giá sản phẩm</h2>
      
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-lg">
        {/* Average Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}/5</div>
          {renderStars(Math.floor(averageRating), 'w-6 h-6')}
          <p className="text-gray-600 mt-2">{totalReviews} đánh giá</p>
          <p className="text-sm text-green-600 mt-1">95% khách hàng sẽ giới thiệu sản phẩm này</p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating];
            const percentage = Math.round((count / totalReviews) * 100);
            
            return (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 w-8 flex items-center">
                  {rating}⭐
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                <span className="text-sm text-gray-500 w-12 text-right">
                  ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {/* Rating Filters */}
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Lọc theo:</span>
          {[
            {
              key: 'all',
              label: `Tất cả (${totalReviews})`
            },
            {
              key: '5',
              label: `⭐⭐⭐⭐⭐ (${ratingDistribution[5]})`
            },
            {
              key: '4',
              label: `⭐⭐⭐⭐☆ (${ratingDistribution[4]})`
            },
            {
              key: '3',
              label: `⭐⭐⭐☆☆ (${ratingDistribution[3]})`
            },
            {
              key: '2',
              label: `⭐⭐☆☆☆ (${ratingDistribution[2]})`
            },
            {
              key: '1',
              label: `⭐☆☆☆☆ (${ratingDistribution[1]})`
            }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="highest">Rating cao</option>
            <option value="lowest">Rating thấp</option>
            <option value="helpful">Hữu ích nhất</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {currentReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">{review.user.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.user.name}</span>
                    {review.user.verified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        ✓ Đã xác minh
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">• {formatDate(review.date)}</span>
                  </div>
                </div>
              </div>
              
              {review.verified_purchase && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  ✓ Đã mua hàng
                </span>
              )}
            </div>

            {/* Review Content */}
            <div className="ml-13">
              <p className="text-gray-700 mb-3">{review.content}</p>
              
              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex space-x-2 mb-3">
                  {review.images.map((image, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{image}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center space-x-4 text-sm">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 01-2-2V6a2 2 0 012-2h2.343M11 7L9 5l2-2m0 4l2 2-2 2m0 0l2 2-2 2"/>
                  </svg>
                  <span>Hữu ích ({review.helpful})</span>
                </button>
                
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h2.343M11 17l2 2-2 2m0-4l-2-2 2-2m0 0l-2-2 2-2"/>
                  </svg>
                  <span>Không hữu ích ({review.notHelpful})</span>
                </button>
                
                <button className="text-gray-500 hover:text-gray-700">
                  Trả lời
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹ Trước
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 border rounded-md text-sm font-medium ${
                currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau ›
          </button>
        </div>
      )}

      {/* No Reviews Message */}
      {currentReviews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7"/>
            </svg>
          </div>
          <p className="text-gray-500">Không có đánh giá nào phù hợp với bộ lọc hiện tại</p>
        </div>
      )}

      {/* Write Review Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          ✍️ Viết đánh giá
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;