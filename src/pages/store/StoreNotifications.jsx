import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreNotifications = () => {
  const { currentStore } = useStoreContext();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Mock data cho thông báo - phân biệt theo chi nhánh
      const getMockNotificationsByBranch = (branchId) => {
        if (branchId === 'branch-1') {
          // Chi nhánh Hải Châu - Chuyên điện thoại cao cấp
          return [
            {
              id: 1,
              type: 'ORDER',
              title: 'Đơn hàng iPhone mới',
              message: 'Đơn hàng iPhone 15 Pro Max từ Nguyễn Minh Tuấn',
              priority: 'HIGH',
              isRead: false,
              createdAt: '2024-01-20T10:30:00Z',
              orderId: 'ORD-001'
            },
            {
              id: 2,
              type: 'MESSAGE',
              title: 'Tin nhắn về AirPods',
              message: 'Khách hàng Trần Thị Lan hỏi về AirPods Pro 2',
              priority: 'MEDIUM',
              isRead: false,
              createdAt: '2024-01-20T09:15:00Z',
              chatId: 1
            },
            {
              id: 3,
              type: 'REVIEW',
              title: 'Đánh giá Samsung',
              message: 'Samsung Galaxy S24 Ultra nhận được đánh giá 5 sao',
              priority: 'LOW',
              isRead: true,
              createdAt: '2024-01-19T16:45:00Z',
              productId: 1
            },
            {
              id: 4,
              type: 'STOCK',
              title: 'Cảnh báo tồn kho',
              message: 'iPhone 14 Pro sắp hết hàng (còn 2 sản phẩm)',
              priority: 'HIGH',
              isRead: false,
              createdAt: '2024-01-19T14:20:00Z',
              productId: 2
            },
            {
              id: 5,
              type: 'PROMOTION',
              title: 'Khuyến mãi AirPods',
              message: 'Chương trình giảm giá AirPods Pro 2 đã kết thúc',
              priority: 'MEDIUM',
              isRead: true,
              createdAt: '2024-01-18T11:30:00Z',
              promotionId: 1
            }
          ];
        }
        
        if (branchId === 'branch-2') {
          // Chi nhánh Thanh Khê - Chuyên laptop gaming và văn phòng
          return [
            {
              id: 1,
              type: 'ORDER',
              title: 'Đơn hàng MacBook mới',
              message: 'Đơn hàng MacBook Pro M3 từ Phạm Văn Hùng',
              priority: 'HIGH',
              isRead: false,
              createdAt: '2024-01-20T10:30:00Z',
              orderId: 'ORD-001'
            },
            {
              id: 2,
              type: 'MESSAGE',
              title: 'Tin nhắn về laptop gaming',
              message: 'Khách hàng Nguyễn Thị Mai hỏi về ASUS ROG Strix G15',
              priority: 'MEDIUM',
              isRead: false,
              createdAt: '2024-01-20T09:15:00Z',
              chatId: 1
            },
            {
              id: 3,
              type: 'REVIEW',
              title: 'Đánh giá Dell XPS',
              message: 'Dell XPS 13 nhận được đánh giá 5 sao',
              priority: 'LOW',
              isRead: true,
              createdAt: '2024-01-19T16:45:00Z',
              productId: 1
            },
            {
              id: 4,
              type: 'STOCK',
              title: 'Cảnh báo tồn kho',
              message: 'MacBook Air M2 sắp hết hàng (còn 1 sản phẩm)',
              priority: 'HIGH',
              isRead: false,
              createdAt: '2024-01-19T14:20:00Z',
              productId: 2
            },
            {
              id: 5,
              type: 'PROMOTION',
              title: 'Khuyến mãi chuột',
              message: 'Chương trình giảm giá Logitech MX Master 3S đã kết thúc',
              priority: 'MEDIUM',
              isRead: true,
              createdAt: '2024-01-18T11:30:00Z',
              promotionId: 1
            }
          ];
        }
        
        return [];
      };
      
      const mockNotifications = getMockNotificationsByBranch(currentStore?.id) || [
        {
          id: 1,
          type: 'ORDER',
          title: 'Đơn hàng mới',
          message: 'Bạn có đơn hàng mới từ Nguyễn Văn A',
          priority: 'HIGH',
          isRead: false,
          createdAt: '2024-01-20T10:30:00Z',
          orderId: 'ORD-001'
        },
        {
          id: 2,
          type: 'MESSAGE',
          title: 'Tin nhắn mới',
          message: 'Khách hàng Trần Thị B đã gửi tin nhắn',
          priority: 'MEDIUM',
          isRead: false,
          createdAt: '2024-01-20T09:15:00Z',
          chatId: 1
        },
        {
          id: 3,
          type: 'REVIEW',
          title: 'Đánh giá mới',
          message: 'Sản phẩm iPhone 15 Pro Max nhận được đánh giá 5 sao',
          priority: 'LOW',
          isRead: true,
          createdAt: '2024-01-19T16:45:00Z',
          productId: 1
        },
        {
          id: 4,
          type: 'QUESTION',
          title: 'Câu hỏi sản phẩm',
          message: 'Khách hàng Lê Văn C hỏi về sản phẩm MacBook Air M2',
          priority: 'MEDIUM',
          isRead: false,
          createdAt: '2024-01-19T14:20:00Z',
          productId: 2
        },
        {
          id: 5,
          type: 'SYSTEM',
          title: 'Cập nhật hệ thống',
          message: 'Hệ thống đã được cập nhật với các tính năng mới',
          priority: 'LOW',
          isRead: true,
          createdAt: '2024-01-19T08:00:00Z'
        },
        {
          id: 6,
          type: 'ANALYTICS',
          title: 'Báo cáo tuần',
          message: 'Doanh thu tuần này tăng 18% so với tuần trước',
          priority: 'LOW',
          isRead: true,
          createdAt: '2024-01-18T18:00:00Z'
        },
        {
          id: 7,
          type: 'PROMOTION',
          title: 'Khuyến mãi mới',
          message: 'Chương trình giảm giá 20% cho tất cả sản phẩm Apple',
          priority: 'MEDIUM',
          isRead: false,
          createdAt: '2024-01-18T12:00:00Z'
        },
        {
          id: 8,
          type: 'INVENTORY',
          title: 'Cảnh báo tồn kho',
          message: 'Sản phẩm Samsung Galaxy S24 Ultra sắp hết hàng',
          priority: 'HIGH',
          isRead: false,
          createdAt: '2024-01-17T15:30:00Z',
          productId: 3
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'ALL') return true;
    if (filter === 'UNREAD') return !notification.isRead;
    return notification.type === filter;
  });

  const markAsRead = async (notificationId) => {
    try {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      console.log(`Notification ${notificationId} marked as read`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({ ...notification, isRead: true }))
      );
      console.log('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'ORDER':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        );
      case 'MESSAGE':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        );
      case 'REVIEW':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
        );
      case 'QUESTION':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      case 'SYSTEM':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        );
      case 'ANALYTICS':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        );
      case 'PROMOTION':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
        );
      case 'INVENTORY':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        );
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'ORDER': return 'bg-blue-100 text-blue-600';
      case 'MESSAGE': return 'bg-green-100 text-green-600';
      case 'REVIEW': return 'bg-yellow-100 text-yellow-600';
      case 'QUESTION': return 'bg-purple-100 text-purple-600';
      case 'SYSTEM': return 'bg-gray-100 text-gray-600';
      case 'ANALYTICS': return 'bg-indigo-100 text-indigo-600';
      case 'PROMOTION': return 'bg-pink-100 text-pink-600';
      case 'INVENTORY': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-600';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-600';
      case 'LOW': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const NotificationCard = ({ notification }) => (
    <div className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow ${
      !notification.isRead ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
          {getTypeIcon(notification.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900">{notification.title}</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
              {notification.priority}
            </span>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {new Date(notification.createdAt).toLocaleString('vi-VN')}
            </span>
            
            <div className="flex gap-2">
              {!notification.isRead && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs text-green-600 hover:text-green-800 font-medium"
                >
                  Đánh dấu đã đọc
                </button>
              )}
              {notification.orderId && (
                <Link
                  to={`/store/orders/${notification.orderId}`}
                  className="text-xs text-green-600 hover:text-green-800 font-medium"
                >
                  Xem đơn hàng
                </Link>
              )}
              {notification.chatId && (
                <Link
                  to="/store/chats"
                  className="text-xs text-green-600 hover:text-green-800 font-medium"
                >
                  Xem chat
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <StoreLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông báo...</p>
          </div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý thông báo">
      <StoreLayout>
        {/* Notifications Content */}
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-2xl p-6">
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    <span className="text-cyan-600">Thông báo</span> <span className="text-blue-600">cửa hàng</span>
                  </h1>
                  <p className="text-gray-600 mt-1">Thông báo cho tài khoản Store Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filter Section */}
            <div className="flex gap-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-green-500 group-focus-within:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-12 pr-10 py-3 bg-white border-2 border-green-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                >
                  <option value="ALL">Tất cả thông báo</option>
                  <option value="UNREAD">Chưa đọc</option>
                  <option value="ORDER">Đơn hàng</option>
                  <option value="MESSAGE">Tin nhắn</option>
                  <option value="REVIEW">Đánh giá</option>
                  <option value="QUESTION">Câu hỏi</option>
                  <option value="SYSTEM">Hệ thống</option>
                  <option value="ANALYTICS">Phân tích</option>
                  <option value="PROMOTION">Khuyến mãi</option>
                  <option value="INVENTORY">Tồn kho</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Đánh dấu tất cả đã đọc
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có thông báo</h3>
              <p className="text-gray-500">
                {filter === 'UNREAD' 
                  ? 'Tất cả thông báo đã được đọc'
                  : 'Chưa có thông báo nào'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreNotifications;