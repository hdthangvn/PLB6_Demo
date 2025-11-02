import { useState, useEffect } from 'react';

const OrderTrackingModal = ({ orderId, isOpen, onClose }) => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock tracking data
  const mockTrackingData = {
    trackingNumber: "VN123456789",
    carrier: "Viettel Post",
    estimatedDelivery: "2025-10-25 14:00",
    currentLocation: "Hà Nội",
    shipperName: "Nguyễn Văn A",
    shipperPhone: "0901234567",
    lastUpdated: new Date().toISOString(),
    events: [
      {
        status: "PENDING",
        description: "Đơn hàng đã được tạo",
        timestamp: "2025-10-22 22:39:17",
        location: "Cửa hàng TechStore",
        note: "Đang chuẩn bị hàng"
      },
      {
        status: "CONFIRMED", 
        description: "Đơn hàng đã được xác nhận",
        timestamp: "2025-10-23 08:30:00",
        location: "Cửa hàng TechStore",
        note: "Đang đóng gói"
      },
      {
        status: "SHIPPING",
        description: "Đơn hàng đang được vận chuyển",
        timestamp: "2025-10-23 10:15:00",
        location: "Trung tâm phân phối Hà Nội",
        note: "Đã xuất kho"
      },
      {
        status: "IN_TRANSIT",
        description: "Đang giao hàng",
        timestamp: "2025-10-23 14:20:00",
        location: "Quận Cầu Giấy, Hà Nội",
        note: "Shipper đang trên đường"
      }
    ]
  };

  useEffect(() => {
    if (isOpen && orderId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTrackingData(mockTrackingData);
        setLoading(false);
      }, 1000);
    }
  }, [isOpen, orderId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return "⏳";
      case "CONFIRMED":
        return "✅";
      case "SHIPPING":
        return "📦";
      case "IN_TRANSIT":
        return "🚚";
      case "DELIVERED":
        return "🎉";
      default:
        return "📋";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "CONFIRMED":
        return "text-blue-600 bg-blue-100";
      case "SHIPPING":
        return "text-purple-600 bg-purple-100";
      case "IN_TRANSIT":
        return "text-orange-600 bg-orange-100";
      case "DELIVERED":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Theo dõi đơn hàng</h2>
            <p className="text-sm text-gray-600">#{orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Đang tải thông tin...</span>
            </div>
          ) : trackingData ? (
            <div className="space-y-6">
              {/* Tracking Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Mã vận đơn:</span>
                    <p className="text-gray-900">{trackingData.trackingNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Đơn vị vận chuyển:</span>
                    <p className="text-gray-900">{trackingData.carrier}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dự kiến giao:</span>
                    <p className="text-gray-900">{new Date(trackingData.estimatedDelivery).toLocaleString('vi-VN')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Vị trí hiện tại:</span>
                    <p className="text-gray-900">{trackingData.currentLocation}</p>
                  </div>
                </div>
              </div>

              {/* Shipper Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Thông tin shipper</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {trackingData.shipperName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{trackingData.shipperName}</p>
                    <p className="text-sm text-gray-600">{trackingData.shipperPhone}</p>
                  </div>
                  <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    📞 Gọi điện
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Lịch trình vận chuyển</h3>
                <div className="space-y-4">
                  {trackingData.events.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
                        </div>
                        {index < trackingData.events.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300 ml-4 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{event.description}</p>
                          <p className="text-sm text-gray-500">{event.timestamp}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">📍 {event.location}</p>
                        {event.note && (
                          <p className="text-sm text-gray-500 mt-1 italic">{event.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">Bản đồ theo dõi sẽ được tích hợp sau</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Không thể tải thông tin tracking</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <p className="text-sm text-gray-500">
            Cập nhật lần cuối: {trackingData ? new Date(trackingData.lastUpdated).toLocaleString('vi-VN') : 'N/A'}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              🔄 Làm mới
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;
