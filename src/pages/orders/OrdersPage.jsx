import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import OrderList from '../../components/orders/OrderList';
import ReviewForm from '../../components/reviews/ReviewForm';

/**
 * OrdersPage Component
 * Displays user's order history with review functionality
 */
const OrdersPage = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleReview = (order) => {
    // If order has multiple items, show selection
    if (order.items && order.items.length > 1) {
      // For simplicity, review first item
      // TODO: Add item selection modal
      setSelectedItem(order.items[0]);
    } else {
      setSelectedItem(order.items?.[0]);
    }
    
    setSelectedOrder(order);
    setShowReviewModal(true);
  };

  const handleReviewSuccess = () => {
    setShowReviewModal(false);
    setSelectedOrder(null);
    setSelectedItem(null);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đơn hàng của tôi
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi tình trạng đơn hàng của bạn
          </p>
        </div>

        {/* Orders List */}
        <OrderList onReview={handleReview} />

        {/* Review Modal */}
        {showReviewModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Đánh giá sản phẩm
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedItem.productName || selectedItem.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <ReviewForm
                productVariantId={selectedItem.productVariantId || selectedItem.id}
                orderId={selectedOrder.id}
                onSuccess={handleReviewSuccess}
                onCancel={() => setShowReviewModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
