const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reviewService = {
  // Get reviews for a product
  async getProductReviews(productId, page = 1, limit = 5, filter = 'all', sortBy = 'newest') {
    await delay(300);
    
    // Load persisted reviews from localStorage
    const storeKey = 'reviews_by_product';
    const byProduct = JSON.parse(localStorage.getItem(storeKey) || '{}');
    const saved = Array.isArray(byProduct[productId]) ? byProduct[productId] : [];

    // Seed mock reviews (kept for demo so trang chi tiết có sẵn dữ liệu)
    const mockReviews = [
      {
        id: 1,
        productId: parseInt(productId),
        userId: 'user_1',
        user: {
          id: 'user_1',
          name: 'Nguyễn Văn A',
          avatar: '👤',
          verified: true
        },
        rating: 5,
        title: 'Sản phẩm tuyệt vời!',
        content: 'Camera chụp ảnh rất đẹp, pin trâu, thiết kế sang trọng. Đáng tiền bỏ ra.',
        images: ['📷', '📷'],
        verifiedPurchase: true,
        helpful: 12,
        notHelpful: 1,
        createdAt: '2024-01-20T10:30:00Z',
        updatedAt: '2024-01-20T10:30:00Z',
        replies: [
          {
            id: 'reply_1',
            userId: 'shop_official',
            user: {
              name: 'TechStore Official',
              avatar: '🏪',
              isShop: true
            },
            content: 'Cảm ơn bạn đã tin tưởng và sử dụng sản phẩm! 😊',
            createdAt: '2024-01-20T14:00:00Z'
          }
        ]
      },
      {
        id: 2,
        productId: parseInt(productId),
        userId: 'user_2',
        user: {
          id: 'user_2',
          name: 'Trần Thị B',
          avatar: '👩',
          verified: true
        },
        rating: 4,
        title: 'Chất lượng tốt',
        content: 'Chất lượng ok, ship nhanh, đóng gói cẩn thận. Chỉ có điều màn hình hơi nhỏ so với mong đợi.',
        images: [],
        verifiedPurchase: true,
        helpful: 8,
        notHelpful: 0,
        createdAt: '2024-01-18T09:15:00Z',
        updatedAt: '2024-01-18T09:15:00Z',
        replies: []
      }
    ];

    // Combine (ưu tiên review vừa lưu lên trước)
    let combined = [...saved, ...mockReviews];

    // Filter theo số sao nếu cần
    if (['1','2','3','4','5'].includes(filter)) {
      combined = combined.filter(r => String(r.rating) === filter);
    }

    // Sort
    combined.sort((a,b)=>{
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return new Date(b.createdAt) - new Date(a.createdAt); // newest
    });

    // Pagination
    const totalReviews = combined.length;
    const totalPages = Math.max(1, Math.ceil(totalReviews / limit));
    const start = (page - 1) * limit;
    const paged = combined.slice(start, start + limit);

    // Summary
    const sumRating = combined.reduce((s,r)=> s + (r.rating || 0), 0);
    const ratingDistribution = {1:0,2:0,3:0,4:0,5:0};
    combined.forEach(r => { const k = r.rating||0; if (ratingDistribution[k] != null) ratingDistribution[k]++; });

    return {
      success: true,
      data: {
        reviews: paged,
        pagination: {
          currentPage: page,
          totalPages,
          totalReviews,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        summary: {
          averageRating: totalReviews ? sumRating / totalReviews : 0,
          totalReviews,
          ratingDistribution
        }
      }
    };
  },

  // Submit a new review
  async submitReview(productId, reviewData) {
    await delay(500);
    
    // TODO: Replace with real API call
    // const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(reviewData)
    // });

    // Mock validation
    if (!reviewData.rating || !reviewData.content.trim()) {
      return {
        success: false,
        error: 'Vui lòng điền đầy đủ thông tin đánh giá'
      };
    }

    // Chuẩn hóa ảnh (biểu tượng) để hiển thị đơn giản
    const images = (reviewData.images || []).map(() => '📷');

    // Success + persist to localStorage
    const newReview = {
      id: Date.now(),
      productId: parseInt(productId),
      userId: 'current_user',
      user: {
        id: 'current_user',
        name: reviewData.userName || 'Bạn',
        avatar: '👤',
        verified: true
      },
      rating: reviewData.rating,
      title: reviewData.title || '',
      content: reviewData.content,
      images,
      verifiedPurchase: reviewData.verifiedPurchase || false,
      helpful: 0,
      notHelpful: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: []
    };

    const storeKey = 'reviews_by_product';
    const byProduct = JSON.parse(localStorage.getItem(storeKey) || '{}');
    const list = Array.isArray(byProduct[productId]) ? byProduct[productId] : [];
    byProduct[productId] = [newReview, ...list];
    localStorage.setItem(storeKey, JSON.stringify(byProduct));

    return {
      success: true,
      data: newReview,
      message: 'Đánh giá của bạn đã được gửi thành công!'
    };
  },

  // Reply to a review
  async replyToReview(reviewId, replyData) {
    await delay(300);
    
    // TODO: Replace with real API call
    // const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/replies`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(replyData)
    // });

    const newReply = {
      id: `reply_${Date.now()}`,
      userId: 'current_user',
      user: {
        name: replyData.userName || 'Bạn',
        avatar: '👤',
        isShop: false
      },
      content: replyData.content,
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      data: newReply,
      message: 'Phản hồi đã được gửi thành công!'
    };
  },

  // Mark review as helpful/not helpful
  async markReviewHelpful(reviewId, isHelpful) {
    await delay(200);
    
    // TODO: Replace with real API call
    // const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/helpful`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({ isHelpful })
    // });

    return {
      success: true,
      data: {
        reviewId,
        isHelpful,
        newHelpfulCount: isHelpful ? 13 : 12,
        newNotHelpfulCount: isHelpful ? 1 : 2
      }
    };
  },

  // Upload review images
  async uploadReviewImages(files) {
    await delay(1000);
    
    // TODO: Replace with real API call
    // const formData = new FormData();
    // files.forEach(file => formData.append('images', file));
    // const response = await fetch(`${API_BASE_URL}/reviews/upload-images`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: formData
    // });

    // Mock uploaded images
    const uploadedImages = files.map((file, index) => ({
      id: `img_${Date.now()}_${index}`,
      url: URL.createObjectURL(file),
      filename: file.name,
      size: file.size
    }));

    return {
      success: true,
      data: uploadedImages
    };
  }
};