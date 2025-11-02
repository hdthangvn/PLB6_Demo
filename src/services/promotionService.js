import api from './api';

// ==================== API CALLS ====================
// ⚠️ LƯU Ý: Các API promotions thực tế tồn tại trong Swagger:
// - GET /api/v1/promotions/{promotionId}
// - GET /api/v1/promotions/active
// - GET /api/v1/promotions/platform
// - GET /api/v1/promotions/active/store/{storeId}
// - GET /api/v1/promotions/validate/{promotionId}
// - GET /api/v1/promotions/calculate-discount/{promotionId}
//
// Tuy nhiên, hiện tại frontend KHÔNG GỌI các API này trực tiếp.
// Promotion code được validate và apply ở BACKEND khi checkout.
// File này chỉ chứa helper functions để UI hiển thị.

// ==================== HELPER FUNCTIONS ====================

/**
 * Tính toán số tiền giảm giá dựa trên promotion
 * @param {Object} promotion - Promotion object
 * @param {Number} orderTotal - Tổng giá trị đơn hàng
 * @returns {Number} - Số tiền giảm
 */
export const calculateDiscount = (promotion, orderTotal) => {
  if (!promotion || !orderTotal) return 0;

  const { discountType, discountValue, maxDiscountAmount } = promotion;

  let discount = 0;

  if (discountType === 'PERCENTAGE') {
    // Giảm theo phần trăm
    discount = (orderTotal * discountValue) / 100;
    // Giới hạn maxDiscountAmount nếu có
    if (maxDiscountAmount && discount > maxDiscountAmount) {
      discount = maxDiscountAmount;
    }
  } else if (discountType === 'FIXED_AMOUNT') {
    // Giảm cố định
    discount = discountValue;
  }

  // Đảm bảo discount không vượt quá orderTotal
  return Math.min(discount, orderTotal);
};

/**
 * Format discount value để hiển thị
 * @param {Object} promotion - Promotion object
 * @returns {String} - String hiển thị (VD: "10%", "50.000đ")
 */
export const formatDiscountValue = (promotion) => {
  if (!promotion) return '';

  const { discountType, discountValue, maxDiscountAmount } = promotion;

  if (discountType === 'PERCENTAGE') {
    let text = `${discountValue}%`;
    if (maxDiscountAmount) {
      text += ` (tối đa ${formatCurrency(maxDiscountAmount)})`;
    }
    return text;
  } else if (discountType === 'FIXED_AMOUNT') {
    return formatCurrency(discountValue);
  }

  return '';
};

/**
 * Format currency (VNĐ)
 */
export const formatCurrency = (amount) => {
  if (!amount) return '0đ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount).replace('₫', 'đ');
};

/**
 * Kiểm tra promotion có hợp lệ không (theo thời gian, số lượng)
 * @param {Object} promotion - Promotion object
 * @returns {Boolean}
 */
export const isPromotionValid = (promotion) => {
  if (!promotion) return false;

  const now = new Date();
  const startDate = new Date(promotion.startDate);
  const endDate = new Date(promotion.endDate);

  // Kiểm tra thời gian
  if (now < startDate || now > endDate) return false;

  // Kiểm tra status
  if (promotion.status !== 'ACTIVE') return false;

  // Kiểm tra số lượng
  if (promotion.maxUsageCount && promotion.currentUsageCount >= promotion.maxUsageCount) {
    return false;
  }

  return true;
};

/**
 * Get promotion status label
 */
export const getPromotionStatusLabel = (status) => {
  const statusMap = {
    ACTIVE: 'Đang hoạt động',
    INACTIVE: 'Tạm dừng',
    EXPIRED: 'Đã hết hạn',
    USED_UP: 'Đã hết lượt',
  };
  return statusMap[status] || status;
};

/**
 * Get promotion status badge class
 */
export const getPromotionStatusBadge = (status) => {
  const badgeMap = {
    ACTIVE: 'bg-green-100 text-green-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    EXPIRED: 'bg-red-100 text-red-800',
    USED_UP: 'bg-yellow-100 text-yellow-800',
  };
  return badgeMap[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get promotion type label
 */
export const getPromotionTypeLabel = (type) => {
  const typeMap = {
    PERCENTAGE: 'Giảm theo %',
    FIXED_AMOUNT: 'Giảm cố định',
  };
  return typeMap[type] || type;
};

/**
 * Check if user can use promotion (based on usage limits)
 */
export const canUsePromotion = (promotion, userUsageCount = 0) => {
  if (!isPromotionValid(promotion)) return false;

  // Kiểm tra giới hạn sử dụng per user
  if (promotion.maxUsagePerUser && userUsageCount >= promotion.maxUsagePerUser) {
    return false;
  }

  return true;
};

/**
 * Get promotion error message
 */
export const getPromotionErrorMessage = (promotion, orderTotal, userUsageCount = 0) => {
  if (!promotion) return 'Mã khuyến mãi không tồn tại';

  const now = new Date();
  const startDate = new Date(promotion.startDate);
  const endDate = new Date(promotion.endDate);

  if (promotion.status !== 'ACTIVE') {
    return 'Mã khuyến mãi không còn hoạt động';
  }

  if (now < startDate) {
    return `Mã khuyến mãi chưa bắt đầu. Có hiệu lực từ ${new Date(startDate).toLocaleDateString('vi-VN')}`;
  }

  if (now > endDate) {
    return 'Mã khuyến mãi đã hết hạn';
  }

  if (promotion.maxUsageCount && promotion.currentUsageCount >= promotion.maxUsageCount) {
    return 'Mã khuyến mãi đã hết lượt sử dụng';
  }

  if (promotion.maxUsagePerUser && userUsageCount >= promotion.maxUsagePerUser) {
    return `Bạn đã sử dụng tối đa ${promotion.maxUsagePerUser} lần cho mã này`;
  }

  if (promotion.minOrderAmount && orderTotal < promotion.minOrderAmount) {
    return `Đơn hàng tối thiểu ${formatCurrency(promotion.minOrderAmount)} để sử dụng mã này`;
  }

  return 'Mã khuyến mãi không hợp lệ';
};

export default {
  // Helper functions only (API calls removed - see comment at top of file)
  // ⚠️ Promotion APIs are not called directly from frontend
  // Promotion code is sent in platformPromotions.orderPromotionCode during checkout
  calculateDiscount,
  formatDiscountValue,
  formatCurrency,
  isPromotionValid,
  getPromotionStatusLabel,
  getPromotionStatusBadge,
  getPromotionTypeLabel,
  canUsePromotion,
  getPromotionErrorMessage,
};

