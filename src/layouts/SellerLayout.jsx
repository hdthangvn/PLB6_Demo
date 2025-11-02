import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SellerLayout = ({ children }) => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Mock unread notifications count
    setUnreadNotifications(5);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-700 min-h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-600">
          <Link to="/seller-dashboard/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">
              <span className="text-blue-300">Tech</span>
              <span className="text-purple-300">Store</span>
            </h1>
          </Link>
        </div>


        <nav className="mt-4">
          <div className="px-4 space-y-2">
            <Link
              to="/seller-dashboard/profile"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/seller/profile')
                  ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                  : 'text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">👤</span>
              Thông tin cá nhân
            </Link>
            <Link
              to="/seller-dashboard/products"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/seller/products')
                  ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                  : 'text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">📦</span>
              Sản phẩm
            </Link>
            <Link
              to="/seller-dashboard/orders"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/seller/orders')
                  ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                  : 'text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">📈</span>
              Lịch sử bán
            </Link>
            <Link
              to="/seller-dashboard/chats"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/seller/chats')
                  ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                  : 'text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">💬</span>
              Tin nhắn
            </Link>
            <Link
              to="/seller-dashboard/notifications"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/seller/notifications')
                  ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                  : 'text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">🔔</span>
              Thông báo
            </Link>
          </div>
        </nav>

      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-end items-center space-x-4">
              {/* Notification Icon */}
              <Link
                to="/seller-dashboard/notifications"
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </Link>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Quang Nguyễn</p>
                  <p className="text-xs text-gray-500">Người bán</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium text-sm">Q</span>
                </div>
              </div>

              {/* Logout Button */}
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                Đăng xuất
              </button>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
