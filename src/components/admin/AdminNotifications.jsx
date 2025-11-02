import React, { useState, useEffect } from 'react';

const AdminNotifications = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // all, unread, complaints, reports

  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  const fetchNotifications = async () => {
    // Mock data
    const mockNotifications = [
      {
        id: 'notif-1',
        type: 'complaint',
        title: 'Khiếu nại mới từ khách hàng',
        message: 'Khách hàng Nguyễn Văn A khiếu nại về đơn hàng #ORD-2025-001 - Sản phẩm bị hỏng',
        from: 'Nguyễn Văn A',
        orderId: 'ORD-2025-001',
        createdAt: '2024-01-23T10:30:00Z',
        isRead: false,
        priority: 'high'
      },
      {
        id: 'notif-2',
        type: 'report',
        title: 'Báo cáo vi phạm store',
        message: 'Store "ABC Electronics" bị báo cáo vi phạm chính sách - Bán hàng giả',
        from: 'Hệ thống',
        storeId: 'store-3',
        createdAt: '2024-01-23T09:15:00Z',
        isRead: false,
        priority: 'high'
      },
      {
        id: 'notif-3',
        type: 'store',
        title: 'Store mới đăng ký',
        message: 'Store "Gaming Zone" đã đăng ký và chờ duyệt',
        from: 'Phạm Thị D',
        storeId: 'store-4',
        createdAt: '2024-01-23T08:45:00Z',
        isRead: true,
        priority: 'medium'
      },
      {
        id: 'notif-4',
        type: 'product',
        title: 'Sản phẩm mới chờ duyệt',
        message: 'Sản phẩm "Canon EOS R5" từ Camera World chờ duyệt',
        from: 'Camera World',
        productId: 'prod-4',
        createdAt: '2024-01-23T07:20:00Z',
        isRead: true,
        priority: 'medium'
      },
      {
        id: 'notif-5',
        type: 'complaint',
        title: 'Khiếu nại về giao hàng',
        message: 'Khách hàng Trần Thị B khiếu nại về việc giao hàng chậm đơn #ORD-2025-002',
        from: 'Trần Thị B',
        orderId: 'ORD-2025-002',
        createdAt: '2024-01-22T16:30:00Z',
        isRead: true,
        priority: 'medium'
      },
      {
        id: 'notif-6',
        type: 'system',
        title: 'Bảo trì hệ thống',
        message: 'Hệ thống sẽ được bảo trì vào 02:00 - 04:00 ngày 24/01/2024',
        from: 'Hệ thống',
        createdAt: '2024-01-22T14:00:00Z',
        isRead: true,
        priority: 'low'
      }
    ];

    let filteredNotifications = mockNotifications;
    if (activeTab === 'unread') {
      filteredNotifications = mockNotifications.filter(n => !n.isRead);
    } else if (activeTab === 'complaints') {
      filteredNotifications = mockNotifications.filter(n => n.type === 'complaint');
    } else if (activeTab === 'reports') {
      filteredNotifications = mockNotifications.filter(n => n.type === 'report');
    }

    setNotifications(filteredNotifications);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'complaint':
        return '⚠️';
      case 'report':
        return '🚨';
      case 'store':
        return '🏪';
      case 'product':
        return '📦';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    
    // Navigate based on notification type
    if (notification.type === 'complaint' && notification.orderId) {
      // Navigate to order detail
      console.log('Navigate to order:', notification.orderId);
    } else if (notification.type === 'report' && notification.storeId) {
      // Navigate to store detail
      console.log('Navigate to store:', notification.storeId);
    } else if (notification.type === 'store' && notification.storeId) {
      // Navigate to store management
      console.log('Navigate to store management:', notification.storeId);
    } else if (notification.type === 'product' && notification.productId) {
      // Navigate to product management
      console.log('Navigate to product management:', notification.productId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Thông báo</h2>
              <p className="text-gray-600 mt-1">Quản lý thông báo và khiếu nại</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Đánh dấu tất cả đã đọc
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'all', label: 'Tất cả', count: notifications.length },
              { key: 'unread', label: 'Chưa đọc', count: notifications.filter(n => !n.isRead).length },
              { key: 'complaints', label: 'Khiếu nại', count: notifications.filter(n => n.type === 'complaint').length },
              { key: 'reports', label: 'Báo cáo', count: notifications.filter(n => n.type === 'report').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-6">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📢</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có thông báo</h3>
              <p className="text-gray-600">Không có thông báo nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all ${
                    getPriorityColor(notification.priority)
                  } ${!notification.isRead ? 'ring-2 ring-blue-200' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                          <span className="text-xs text-gray-500">{formatDate(notification.createdAt)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>👤 {notification.from}</span>
                        {notification.orderId && <span>📋 {notification.orderId}</span>}
                        {notification.storeId && <span>🏪 Store ID: {notification.storeId}</span>}
                        {notification.productId && <span>📦 Product ID: {notification.productId}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
