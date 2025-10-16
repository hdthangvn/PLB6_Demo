import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SellerLayout from '../../layouts/SellerLayout';

const SellerOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      // Mock data - trong thực tế sẽ gọi API: GET /api/seller/orders/{orderId}
      
      // Mock data cho các đơn hàng khác nhau
      const mockOrders = {
        'ORD-001': {
          id: 'ORD-001',
          orderNumber: '#ORD-001',
          status: 'PENDING',
          createdAt: '2024-01-20T10:30:00Z',
          customerName: 'Nguyễn Văn A',
          customerPhone: '0123456789',
          customerEmail: 'nguyenvana@email.com',
          shippingAddress: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
          note: 'Giao hàng vào buổi chiều',
          items: [
            {
              productName: 'iPhone 15 Pro Max',
              variant: '256GB - Titan Xanh',
              quantity: 1,
              unitPrice: 35000000,
              totalPrice: 35000000
            },
            {
              productName: 'AirPods Pro 2',
              variant: 'Màu trắng',
              quantity: 1,
              unitPrice: 5000000,
              totalPrice: 5000000
            }
          ],
          subtotal: 40000000,
          shippingFee: 50000,
          discount: 2000000,
          total: 38050000,
          paymentMethod: 'COD',
          paymentStatus: 'PENDING',
          timeline: [
            {
              status: 'PENDING',
              timestamp: '2024-01-20T10:30:00Z',
              note: 'Đơn hàng được tạo'
            }
          ]
        },
        'ORD-009': {
          id: 'ORD-009',
          orderNumber: '#ORD-009',
          status: 'DELIVERED',
          createdAt: '2024-01-16T13:30:00Z',
          customerName: 'Ngô Văn I',
          customerPhone: '0369741852',
          customerEmail: 'ngovani@email.com',
          shippingAddress: '369 Đường VWX, Phường 9, Quận 9, TP.HCM',
          note: '',
          items: [
            {
              productName: 'Keychron K8 Pro',
              variant: 'Màu đen',
              quantity: 1,
              unitPrice: 3200000,
              totalPrice: 3200000
            }
          ],
          subtotal: 3200000,
          shippingFee: 50000,
          discount: 0,
          total: 3250000,
          paymentMethod: 'COD',
          paymentStatus: 'COMPLETED',
          timeline: [
            {
              status: 'PENDING',
              timestamp: '2024-01-16T13:30:00Z',
              note: 'Đơn hàng được tạo'
            },
            {
              status: 'CONFIRMED',
              timestamp: '2024-01-16T14:00:00Z',
              note: 'Đơn hàng đã được xác nhận'
            },
            {
              status: 'SHIPPING',
              timestamp: '2024-01-16T15:00:00Z',
              note: 'Đơn hàng đã được giao cho shipper'
            },
            {
              status: 'DELIVERED',
              timestamp: '2024-01-17T10:00:00Z',
              note: 'Đơn hàng đã được giao thành công'
            }
          ]
        }
      };
      
      const mockOrder = mockOrders[orderId] || {
        id: orderId,
        orderNumber: `#ORD-${orderId.slice(-3).padStart(3, '0')}`,
        status: 'CONFIRMED',
        createdAt: '2024-01-20T10:30:00Z',
        customerName: 'Nguyễn Văn A',
        customerPhone: '0123456789',
        customerEmail: 'nguyenvana@email.com',
        shippingAddress: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
        note: 'Giao hàng vào buổi chiều',
        items: [
          {
            productName: 'iPhone 15 Pro Max',
            variant: '256GB - Titan Xanh',
            quantity: 1,
            unitPrice: 35000000,
            totalPrice: 35000000
          },
          {
            productName: 'AirPods Pro 2',
            variant: 'Màu trắng',
            quantity: 1,
            unitPrice: 5000000,
            totalPrice: 5000000
          }
        ],
        subtotal: 40000000,
        shippingFee: 50000,
        discount: 2000000,
        total: 38050000,
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        timeline: [
          {
            status: 'PENDING',
            timestamp: '2024-01-20T10:30:00Z',
            note: 'Đơn hàng được tạo'
          },
          {
            status: 'CONFIRMED',
            timestamp: '2024-01-20T11:00:00Z',
            note: 'Đơn hàng đã được xác nhận'
          }
        ]
      };
      
      setOrder(mockOrder);
    } catch (error) {
      console.error('Error fetching order detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Mock API call - trong thực tế sẽ gọi API: PUT /api/seller/orders/{orderId}/status
      console.log(`Changing order ${orderId} status to ${newStatus}`);
      
      // Update local state
      setOrder(prev => ({
        ...prev,
        status: newStatus,
        timeline: [
          ...prev.timeline,
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: getStatusNote(newStatus)
          }
        ]
      }));
      
      // Show success message
      alert(`Đã cập nhật trạng thái đơn hàng thành ${getStatusText(newStatus)}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      PENDING: 'Chờ xác nhận',
      CONFIRMED: 'Đã xác nhận',
      SHIPPING: 'Đang giao',
      DELIVERED: 'Đã giao',
      CANCELLED: 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      SHIPPING: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusNote = (status) => {
    const noteMap = {
      PENDING: 'Đơn hàng được tạo',
      CONFIRMED: 'Đơn hàng đã được xác nhận',
      SHIPPING: 'Đơn hàng đã được giao cho shipper',
      DELIVERED: 'Đơn hàng đã được giao thành công',
      CANCELLED: 'Đơn hàng đã bị hủy'
    };
    return noteMap[status] || '';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải chi tiết đơn hàng...</p>
          </div>
        </div>
      </SellerLayout>
    );
  }

  if (!order) {
    return (
      <SellerLayout>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy đơn hàng</h3>
          <p className="text-gray-500 mb-4">Đơn hàng với ID {orderId} không tồn tại hoặc đã bị xóa.</p>
          <Link
            to="/seller/orders"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/seller/orders')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
              <p className="text-gray-500">Tạo lúc {formatDate(order.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Thông tin khách hàng</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Tên khách hàng</label>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Số điện thoại</label>
                  <p className="font-medium text-gray-900">{order.customerPhone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium text-gray-900">{order.customerEmail}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phương thức thanh toán</label>
                  <p className="font-medium text-gray-900">{order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Sản phẩm đã đặt</h3>
              </div>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.productName}</h4>
                      <p className="text-sm text-gray-500">{item.variant}</p>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{formatPrice(item.unitPrice)}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                      <p className="font-semibold text-blue-600">{formatPrice(item.totalPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Địa chỉ giao hàng</h3>
              </div>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{order.shippingAddress}</p>
              {order.note && (
                <div className="mt-4">
                  <label className="text-sm text-gray-500">Ghi chú</label>
                  <p className="text-gray-700 bg-yellow-50 rounded-lg p-3 mt-1">{order.note}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng kết đơn hàng</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-medium">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="font-medium">{formatPrice(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá</span>
                  <span className="font-medium text-red-600">-{formatPrice(order.discount)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                    <span className="text-lg font-bold text-blue-600">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

              {/* Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác</h3>
                <div className="space-y-3">
                  {order.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleStatusChange('CONFIRMED')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        Xác nhận đơn hàng
                      </button>
                      <button
                        onClick={() => handleStatusChange('CANCELLED')}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Hủy đơn hàng
                      </button>
                    </>
                  )}
                  {order.status === 'CONFIRMED' && (
                    <>
                      <button
                        onClick={() => handleStatusChange('SHIPPING')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                        </svg>
                        Bắt đầu giao hàng
                      </button>
                      <button
                        onClick={() => handleStatusChange('CANCELLED')}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Hủy đơn hàng
                      </button>
                    </>
                  )}
                  {order.status === 'SHIPPING' && (
                    <button
                      onClick={() => handleStatusChange('DELIVERED')}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Đánh dấu đã giao
                    </button>
                  )}
                  {(order.status === 'DELIVERED' || order.status === 'CANCELLED') && (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">
                        {order.status === 'DELIVERED' 
                          ? 'Đơn hàng đã được giao thành công' 
                          : 'Đơn hàng đã bị hủy'
                        }
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Không thể thay đổi trạng thái
                      </p>
                    </div>
                  )}
                </div>
              </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử đơn hàng</h3>
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${getStatusColor(event.status).split(' ')[0]}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{getStatusText(event.status)}</p>
                      <p className="text-xs text-gray-500">{formatDate(event.timestamp)}</p>
                      {event.note && (
                        <p className="text-xs text-gray-600 mt-1">{event.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerOrderDetail;
