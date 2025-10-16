import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StoreSidebar from '../components/store/StoreSidebar';
import { useStoreContext } from '../context/StoreContext';

const StoreLayout = ({ children }) => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStoreSwitcher, setShowStoreSwitcher] = useState(false);
  const location = useLocation();
  const { currentStore, userStores, selectStore, loading } = useStoreContext();

  useEffect(() => {
    // Mock unread notifications count
    setUnreadNotifications(3);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StoreSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {currentStore ? `${currentStore.name} - ${currentStore.branchName}` : 'Store Management'}
              </h1>
              <p className="text-sm text-gray-500">
                {currentStore ? 'Quản lý chi nhánh của bạn' : 'Chọn chi nhánh để tiếp tục'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Store Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setShowStoreSwitcher(!showStoreSwitcher)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {currentStore ? currentStore.branchName : 'Chọn chi nhánh'}
                  </span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                {showStoreSwitcher && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Chọn chi nhánh</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {userStores.map((store) => (
                        <button
                          key={store.id}
                          onClick={() => {
                            selectStore(store.id);
                            setShowStoreSwitcher(false);
                          }}
                          className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                            currentStore?.id === store.id ? 'bg-green-50 text-green-700' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                {store.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{store.branchName}</p>
                              <p className="text-xs text-gray-500">{store.address}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <Link
                        to="/store/management"
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                        onClick={() => setShowStoreSwitcher(false)}
                      >
                        + Quản lý chi nhánh
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Thông báo</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                        <p className="text-sm text-gray-900">Đơn hàng mới #ORD-001</p>
                        <p className="text-xs text-gray-500">2 phút trước</p>
                      </div>
                      <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                        <p className="text-sm text-gray-900">Sản phẩm sắp hết hàng</p>
                        <p className="text-xs text-gray-500">1 giờ trước</p>
                      </div>
                      <div className="p-3 hover:bg-gray-50">
                        <p className="text-sm text-gray-900">Khuyến mãi mới đã được tạo</p>
                        <p className="text-xs text-gray-500">3 giờ trước</p>
                      </div>
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <Link 
                        to="/store/notifications"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Xem tất cả thông báo
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SM</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Store Manager</p>
                  <p className="text-xs text-gray-500">B2C Store</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                </button>
              </div>
              
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StoreLayout;