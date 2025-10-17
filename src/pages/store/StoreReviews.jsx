import React, { useState } from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreReviews = () => {
  const { currentStore } = useStoreContext();
  const [filter, setFilter] = useState('ALL');

  // Mock data cho reviews theo chi nhánh
  const getMockReviewsByBranch = (branchId) => {
    const branchReviews = {
      'branch-1': [ // Hải Châu - Đã duyệt - Nhiều đánh giá
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      avatar: 'A',
      product: 'iPhone 15 Pro Max',
      rating: 5,
      comment: 'Sản phẩm rất tốt, giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng với dịch vụ.',
      date: '2024-01-20',
      images: ['https://via.placeholder.com/100x100', 'https://via.placeholder.com/100x100']
    },
    {
      id: 2,
      customer: 'Trần Thị B',
      avatar: 'B',
      product: 'MacBook Air M2',
      rating: 4,
      comment: 'Laptop đẹp, hiệu năng tốt. Chỉ có điều giá hơi cao.',
      date: '2024-01-19',
      images: []
    },
    {
      id: 3,
      customer: 'Lê Văn C',
      avatar: 'C',
      product: 'Samsung Galaxy S24 Ultra',
      rating: 5,
      comment: 'Tuyệt vời! Camera đẹp, hiệu năng mạnh. Khuyến nghị mua.',
      date: '2024-01-18',
      images: ['https://via.placeholder.com/100x100']
    },
    {
      id: 4,
      customer: 'Phạm Thị D',
      avatar: 'D',
      product: 'Dell XPS 13',
      rating: 3,
      comment: 'Sản phẩm ổn nhưng pin chưa được như mong đợi.',
      date: '2024-01-17',
      images: []
    },
    {
      id: 5,
      customer: 'Hoàng Văn E',
      avatar: 'E',
      product: 'iPad Pro 12.9',
      rating: 5,
      comment: 'Màn hình đẹp, hiệu năng tốt. Phù hợp cho công việc và giải trí.',
      date: '2024-01-16',
      images: ['https://via.placeholder.com/100x100', 'https://via.placeholder.com/100x100', 'https://via.placeholder.com/100x100']
    },
    {
      id: 6,
      customer: 'Vũ Thị F',
      avatar: 'F',
      product: 'AirPods Pro 2',
      rating: 4,
      comment: 'Tai nghe tốt, âm thanh rõ ràng. Thời lượng pin ổn.',
      date: '2024-01-15',
      images: []
    },
    {
      id: 7,
      customer: 'Đặng Văn G',
      avatar: 'G',
      product: 'Apple Watch Series 9',
      rating: 5,
      comment: 'Đồng hồ thông minh tuyệt vời, nhiều tính năng hữu ích.',
      date: '2024-01-14',
      images: ['https://via.placeholder.com/100x100']
    },
    {
      id: 8,
      customer: 'Bùi Thị H',
      avatar: 'H',
      product: 'Xiaomi Redmi Note 13',
      rating: 4,
      comment: 'Điện thoại giá rẻ nhưng chất lượng tốt.',
      date: '2024-01-13',
      images: []
    },
    {
      id: 9,
      customer: 'Ngô Văn I',
      avatar: 'I',
      product: 'Sony WH-1000XM5',
      rating: 5,
      comment: 'Tai nghe chống ồn tốt nhất từng sử dụng.',
      date: '2024-01-12',
      images: ['https://via.placeholder.com/100x100', 'https://via.placeholder.com/100x100']
    },
    {
      id: 10,
      customer: 'Trịnh Thị J',
      avatar: 'J',
      product: 'Nintendo Switch OLED',
      rating: 4,
      comment: 'Console gaming tuyệt vời, màn hình đẹp.',
      date: '2024-01-11',
      images: []
    }
      ],
      'branch-2': [ // Thanh Khê - Đã duyệt - Đánh giá trung bình
        {
          id: 21,
          customer: 'Trần Văn Thanh',
          avatar: 'T',
          product: 'MacBook Air M2',
          rating: 5,
          comment: 'Laptop đẹp, hiệu năng tốt. Giao hàng nhanh.',
          date: '2024-01-20',
          images: ['https://via.placeholder.com/100x100']
        },
        {
          id: 22,
          customer: 'Lê Thị Khê',
          avatar: 'K',
          product: 'Dell XPS 13',
          rating: 4,
          comment: 'Sản phẩm ổn, giá hợp lý.',
          date: '2024-01-19',
          images: []
        },
        {
          id: 23,
          customer: 'Phạm Văn Lê',
          avatar: 'L',
          product: 'AirPods Pro 2',
          rating: 5,
          comment: 'Tai nghe tuyệt vời, âm thanh chất lượng cao.',
          date: '2024-01-18',
          images: ['https://via.placeholder.com/100x100']
        }
      ],
      'branch-3': [ // Sơn Trà (chờ duyệt) - Ít đánh giá
        {
          id: 31,
          customer: 'Nguyễn Văn Sơn',
          avatar: 'S',
          product: 'Samsung Galaxy Tab S9',
          rating: 5,
          comment: 'Máy tính bảng đẹp, hiệu năng tốt.',
          date: '2024-01-20',
          images: ['https://via.placeholder.com/100x100']
        }
      ],
      'branch-4': [], // Cẩm Lệ (bị từ chối) - Không có đánh giá
      'branch-5': []  // Liên Chiểu (bị từ chối) - Không có đánh giá
    };
    
    return branchReviews[branchId] || [];
  };

  const reviews = getMockReviewsByBranch(currentStore?.id);

  const filteredReviews = reviews.filter(review => {
    if (filter === 'ALL') return true;
    if (filter === '5_STAR') return review.rating === 5;
    if (filter === '4_STAR') return review.rating === 4;
    if (filter === '3_STAR') return review.rating === 3;
    if (filter === '2_STAR') return review.rating === 2;
    if (filter === '1_STAR') return review.rating === 1;
    return true;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const getRatingStats = () => {
    const total = reviews.length;
    const stats = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    };
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
    
    return { stats, average, total };
  };

  const { stats, average, total } = getRatingStats();

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý đánh giá">
      <StoreLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-2xl p-6">
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      <span className="text-cyan-600">Quản lý</span> <span className="text-blue-600">đánh giá</span>
                    </h1>
                    <p className="text-gray-600 mt-1">Quản lý và theo dõi đánh giá từ khách hàng</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{average.toFixed(1)}</span>
                    <div className="flex">
                      {renderStars(Math.round(average))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{total} đánh giá</p>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tổng đánh giá</p>
                      <p className="text-xl font-bold text-gray-900">{reviews.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đánh giá tích cực</p>
                      <p className="text-xl font-bold text-gray-900">{reviews.filter(r => r.rating >= 4).length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đánh giá trung bình</p>
                      <p className="text-xl font-bold text-gray-900">{reviews.filter(r => r.rating >= 2 && r.rating < 4).length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đánh giá tiêu cực</p>
                      <p className="text-xl font-bold text-gray-900">{reviews.filter(r => r.rating < 2).length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Stats */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố đánh giá</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(stats[rating] / total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{stats[rating]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Lọc theo:</span>
            <div className="flex gap-2">
              {[
                { value: 'ALL', label: 'Tất cả' },
                { value: '5_STAR', label: '5 sao' },
                { value: '4_STAR', label: '4 sao' },
                { value: '3_STAR', label: '3 sao' },
                { value: '2_STAR', label: '2 sao' },
                { value: '1_STAR', label: '1 sao' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === option.value
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{review.avatar}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.customer}</h4>
                      <p className="text-sm text-gray-600">{review.product}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  {review.images.length > 0 && (
                    <div className="flex gap-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                      👍 Cảm ơn
                    </button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                      💬 Phản hồi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có đánh giá nào</h3>
            <p className="text-gray-600">Chưa có đánh giá nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        )}
      </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreReviews;