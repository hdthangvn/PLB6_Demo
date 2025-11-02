import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrderStatusBadge, getPaymentMethodLabel, canCancelOrder, canReviewOrder } from '../../services/orderService';

/**
 * Format currency VND
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Format date
 */
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * OrderCard Component
 * Displays a single order in list view
 */
const OrderCard = ({ order, onCancel, onReview, onViewDetails }) => {
  const navigate = useNavigate();
  
  const {
    id,
    orderNumber,
    status,
    totalAmount,
    createdAt,
    items = [],
    shippingAddress,
    paymentMethod,
  } = order;

  const statusBadge = getOrderStatusBadge(status);
  const canCancel = canCancelOrder(status);
  const canReview = canReviewOrder(status);

  // Get first 3 items for preview
  const previewItems = items.slice(0, 3);
  const remainingCount = items.length - 3;

  const handleCardClick = () => {
    navigate(`/orders/${id}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-600">Mã đơn hàng</p>
              <p className="font-semibold text-gray-900">#{orderNumber || id.slice(-8)}</p>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <p className="text-sm text-gray-600">Ngày đặt</p>
              <p className="font-medium text-gray-900">{formatDate(createdAt)}</p>
            </div>
          </div>

          {/* Status Badge */}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}>
            <span className="mr-1">{statusBadge.icon}</span>
            {statusBadge.label}
          </span>
        </div>
      </div>

      {/* Items Preview */}
      <div className="px-6 py-4 space-y-3">
        {previewItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Product Image */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {item.image || item.productImage ? (
                <img
                  src={item.image || item.productImage}
                  alt={item.productName || item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {item.productName || item.name}
              </p>
              <p className="text-sm text-gray-600">
                Số lượng: {item.quantity}
              </p>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}

        {remainingCount > 0 && (
          <p className="text-sm text-gray-600 text-center py-2">
            + {remainingCount} sản phẩm khác
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Thanh toán: <span className="font-medium text-gray-900">{getPaymentMethodLabel(paymentMethod)}</span>
            </p>
            {shippingAddress && (
              <p className="text-sm text-gray-600">
                Giao đến: <span className="font-medium text-gray-900">{shippingAddress.district}, {shippingAddress.province}</span>
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Tổng tiền</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={handleCardClick}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Xem chi tiết
          </button>

          {canCancel && onCancel && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel(order);
              }}
              className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Hủy đơn
            </button>
          )}

          {canReview && onReview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReview(order);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              ✍️ Đánh giá
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

OrderCard.displayName = 'OrderCard';

export default memo(OrderCard);

