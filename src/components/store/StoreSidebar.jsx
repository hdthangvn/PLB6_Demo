import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStoreContext } from '../../context/StoreContext';

const StoreSidebar = () => {
  const { currentStore, userStores } = useStoreContext();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'APPROVED': return 'Đã duyệt';
      case 'PENDING': return 'Chờ duyệt';
      case 'REJECTED': return 'Bị từ chối';
      default: return 'Không xác định';
    }
  };

  if (!currentStore) {
    return (
      <aside className="w-64 bg-gray-700 min-h-screen">
        <div className="p-6 border-b border-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">
              <span className="text-blue-300">Tech</span>
              <span className="text-purple-300">Store</span>
            </h1>
          </div>
        </div>
        
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Chưa chọn cửa hàng</h3>
          <p className="text-gray-300 text-sm mb-4">Vui lòng chọn một cửa hàng để tiếp tục</p>
          <Link
            to="/store/management"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Quản lý cửa hàng
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-700 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-600">
        <Link to={`/store/dashboard`} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">
              {currentStore.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">
            <span className="text-blue-300">Tech</span>
            <span className="text-purple-300">Store</span>
          </h1>
        </Link>
      </div>

      {/* Store Info Section */}
      <div className="px-4 py-4 border-b border-gray-600">
        
        {/* Store Count */}
        <div className="mb-3">
          <div className="bg-gray-600 rounded-lg p-2">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span className="font-medium">{userStores.length} chi nhánh</span>
              <Link
                to="/store/management"
                className="text-green-400 hover:text-green-300 transition-colors font-medium"
              >
                Quản lý
              </Link>
            </div>
          </div>
        </div>

        {/* Store Info */}
        <div className="text-gray-300 text-xs space-y-1 mb-3">
          <p className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center leading-none">🏪</span>
            <span>{currentStore.name}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center leading-none">📍</span>
            <span>{currentStore.branchName}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center leading-none">📧</span>
            <span>{currentStore.email || 'contact@techpro.com'}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center leading-none">📱</span>
            <span>{currentStore.phone || '0123456789'}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center leading-none">⭐</span>
            <span>{currentStore.stats.rating}/5 ({currentStore.stats.customers || 0} khách hàng)</span>
          </p>
        </div>

        {/* Store Status */}
        <div className="mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(currentStore.status)}`}>
            {getStatusText(currentStore.status)}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-4 border-b border-gray-600">
        <h4 className="text-gray-300 text-xs font-medium mb-3">THỐNG KÊ NHANH</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-600 rounded p-2">
            <div className="text-green-400 font-bold">{currentStore.stats.products}</div>
            <div className="text-gray-300">Sản phẩm</div>
          </div>
          <div className="bg-gray-600 rounded p-2">
            <div className="text-blue-400 font-bold">{currentStore.stats.orders}</div>
            <div className="text-gray-300">Đơn hàng</div>
          </div>
          <div className="bg-gray-600 rounded p-2">
            <div className="text-yellow-400 font-bold">{formatPrice(currentStore.stats.revenue)}</div>
            <div className="text-gray-300">Doanh thu</div>
          </div>
          <div className="bg-gray-600 rounded p-2">
            <div className="text-purple-400 font-bold">{currentStore.stats.customers || 0}</div>
            <div className="text-gray-300">Khách hàng</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <div className="px-4 space-y-2">
          <Link
            to="/store/dashboard"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/dashboard')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">📊</span>
            Dashboard
          </Link>
          
          <Link
            to="/store/profile"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/profile')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🏢</span>
            Thông tin store
          </Link>
          
          <Link
            to="/store/products"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/products')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">📦</span>
            Sản phẩm
          </Link>
          
          <Link
            to="/store/product-variants"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/product-variants')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🎨</span>
            Biến thể sản phẩm
          </Link>
          
          <Link
            to="/store/orders"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/orders')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">📋</span>
            Đơn hàng
          </Link>
          
          <Link
            to="/store/promotions"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/promotions')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🎯</span>
            Khuyến mãi
          </Link>
          
          <Link
            to="/store/analytics"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/analytics')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">📈</span>
            Thống kê & Phân tích
          </Link>
          
          <Link
            to="/store/reviews"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/reviews')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">⭐</span>
            Đánh giá
          </Link>
          
          <Link
            to="/store/settings"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/settings')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">⚙️</span>
            Cài đặt
          </Link>
          
          <Link
            to="/store/notifications"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/notifications')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🔔</span>
            Thông báo
          </Link>
          
          <Link
            to="/store/chats"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/chats')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">💬</span>
            Chat
          </Link>
          
          <Link
            to="/store/customers"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/customers')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">👥</span>
            Khách hàng
          </Link>
          
          <Link
            to="/store/inventory"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/inventory')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">📦</span>
            Quản lý kho
          </Link>
          
          <Link
            to="/store/shipping"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/shipping')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🚚</span>
            Vận chuyển
          </Link>
          
          <Link
            to="/store/payments"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/payments')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">💳</span>
            Thanh toán
          </Link>
          
          <Link
            to="/store/categories"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/categories')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">📂</span>
            Danh mục
          </Link>
          
          <Link
            to="/store/brands"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/brands')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🏷️</span>
            Thương hiệu
          </Link>
          
          <Link
            to="/store/returns"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/returns')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🔄</span>
            Đổi trả
          </Link>
          
          <Link
            to="/store/support"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/support')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🆘</span>
            Hỗ trợ
          </Link>
          
          <Link
            to="/store/reports"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/reports')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">📊</span>
            Báo cáo
          </Link>
          
          <Link
            to="/store/website"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('/store/website')
                ? 'bg-gray-100 text-gray-700 border-r-2 border-gray-700'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">🌐</span>
            Website Store
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default StoreSidebar;
