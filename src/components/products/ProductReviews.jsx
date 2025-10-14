import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useReviews } from '../../hooks/useReviews';
import ReviewForm from './ReviewForm';
import Button from '../ui/Button';

const ProductReviews = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const {
    reviews,
    summary,
    pagination,
    loading,
    error,
    submitting,
    fetchReviews,
    submitReview,
    replyToReview,
    markHelpful
  } = useReviews(product?.id);

  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    fetchReviews(1, filter, sortBy);
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    setSortBy(sort);
    fetchReviews(pagination?.currentPage || 1, activeFilter, sort);
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchReviews(page, activeFilter, sortBy);
  };

  // Handle submit review
  const handleSubmitReview = async (reviewData) => {
    try {
      const result = await submitReview(reviewData);
      setShowReviewForm(false);
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = result.message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
    } catch (err) {
      throw err;
    }
  };

  // Handle reply submit
  const handleReplySubmit = async (reviewId) => {
    if (!replyContent.trim()) return;
    
    try {
      await replyToReview(reviewId, { content: replyContent });
      setReplyingTo(null);
      setReplyContent('');
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Phản hồi đã được gửi thành công!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
    } catch (err) {
      console.error('Error submitting reply:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  if (loading && !summary) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Lỗi tải đánh giá: {error}</p>
          <Button onClick={() => fetchReviews()} className="mt-4">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Đánh giá sản phẩm ({summary?.totalReviews || 0})
        </h2>

        {/* Ẩn nút viết đánh giá trên trang chi tiết theo yêu cầu */}
      </div>

      {/* Form tự mở đã bị vô hiệu hóa để chỉ đánh giá từ lịch sử đơn hàng */}

      {/* Rating Overview */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-lg">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {summary.averageRating.toFixed(1)}/5
            </div>
            {renderStars(Math.floor(summary.averageRating), 'w-6 h-6')}
            <p className="text-gray-600 mt-2">{summary.totalReviews} đánh giá</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = summary.ratingDistribution[rating] || 0;
              const percentage = summary.totalReviews > 0 
                ? Math.round((count / summary.totalReviews) * 100) 
                : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-8 flex items-center">
                    {rating}⭐
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
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
      )}

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {/* Rating Filters */}
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Lọc theo:</span>
          {[
            {
              key: 'all',
              label: `Tất cả (${summary?.totalReviews || 0})`
            },
            {
              key: '5',
              label: `⭐⭐⭐⭐⭐ (${summary?.ratingDistribution[5] || 0})`
            },
            {
              key: '4',
              label: `⭐⭐⭐⭐☆ (${summary?.ratingDistribution[4] || 0})`
            },
            {
              key: '3',
              label: `⭐⭐⭐☆☆ (${summary?.ratingDistribution[3] || 0})`
            },
            {
              key: '2',
              label: `⭐⭐☆☆☆ (${summary?.ratingDistribution[2] || 0})`
            },
            {
              key: '1',
              label: `⭐☆☆☆☆ (${summary?.ratingDistribution[1] || 0})`
            }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
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
            onChange={(e) => handleSortChange(e.target.value)}
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
        {reviews.map((review) => (
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
                    <span className="text-sm text-gray-500">• {formatDate(review.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              {review.verifiedPurchase && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  ✓ Đã mua hàng
                </span>
              )}
            </div>

            {/* Review Content */}
            <div className="ml-13">
              {review.title && (
                <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
              )}
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
              <div className="flex items-center space-x-4 text-sm mb-4">
                <button 
                  onClick={() => markHelpful(review.id, true)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 01-2-2V6a2 2 0 012-2h2.343M11 7L9 5l2-2m0 4l2 2-2 2m0 0l2 2-2 2"/>
                  </svg>
                  <span>Hữu ích ({review.helpful})</span>
                </button>
                
                <button 
                  onClick={() => markHelpful(review.id, false)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h2.343M11 17l2 2-2 2m0-4l-2-2 2-2m0 0l-2-2 2-2"/>
                  </svg>
                  <span>Không hữu ích ({review.notHelpful})</span>
                </button>
                
                {isAuthenticated && (
                  <button 
                    onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Trả lời
                  </button>
                )}
              </div>

              {/* Reply Form */}
              {replyingTo === review.id && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Viết phản hồi của bạn..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2 mt-3">
                    <Button
                      size="sm"
                      onClick={() => handleReplySubmit(review.id)}
                      disabled={!replyContent.trim()}
                    >
                      Gửi
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent('');
                      }}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {review.replies && review.replies.length > 0 && (
                <div className="space-y-3">
                  {review.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 rounded-lg p-4 ml-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{reply.user.name}</span>
                        {reply.user.isShop && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            🏪 Nhà bán
                          </span>
                        )}
                        <span className="text-sm text-gray-500">• {formatDate(reply.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹ Trước
          </button>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 border rounded-md text-sm font-medium ${
                pagination.currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNext}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau ›
          </button>
        </div>
      )}

      {/* No Reviews Message */}
      {reviews.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7"/>
            </svg>
          </div>
          <p className="text-gray-500 mb-4">Chưa có đánh giá nào cho sản phẩm này</p>
          {isAuthenticated && (
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Viết đánh giá đầu tiên
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;