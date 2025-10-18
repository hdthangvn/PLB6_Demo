import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Thêm useLocation
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import SearchBar from '../components/search/SearchBar'; // ✅ PHẢI CÓ DÒNG NÀY
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';

const MainLayout = ({ children }) => {
  // ✅ THAY ĐỔI STATE - dùng Modal thay vì dropdown
  const [showSellerModal, setShowSellerModal] = useState(false); // Thay showSellerMenu
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems, cartItems } = useCart();
  
  const distinctCount = cartItems ? cartItems.length : 0;
  const totalQuantity = getTotalItems();
  
  // ✅ SỬA LOGIC handleSellerClick
  const handleSellerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const hasSeller = user?.roles?.includes?.('SELLER');
    const hasStore = user?.roles?.includes?.('STORE_OWNER');
    
    console.log('🔍 Debug Info:');
    console.log('User roles:', user?.roles);
    console.log('Has seller:', hasSeller, 'Has store:', hasStore);
    
    if (hasSeller && hasStore) {
      console.log('✅ Opening Modal for both roles');
      setShowSellerModal(true); // Mở modal thay vì dropdown
    } else if (hasStore) {
      console.log('🏪 Redirecting to store dashboard');
      navigate('/store/dashboard');
    } else if (hasSeller) {
      console.log('📊 Redirecting to seller dashboard');
      navigate('/seller/dashboard');
    } else {
      console.log('🔄 Fallback to seller dashboard');
      navigate('/seller/dashboard');
    }
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        {/* Top Bar */}
        <div className="bg-blue-600 text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-10">
              {/* Left side */}
              <div className="flex items-center space-x-6 flex-nowrap overflow-hidden">
                {/* ✅ SỬA PHẦN "Kênh Người Bán" - Đơn giản hóa */}
                <button
                  onClick={handleSellerClick}
                  className="hover:text-blue-200 cursor-pointer whitespace-nowrap focus:outline-none transition-colors"
                  type="button"
                >
                  Kênh Người Bán
                </button>

                <span className="text-blue-200">|</span>
                <span className="hover:text-blue-200 cursor-pointer whitespace-nowrap">Trở thành Seller TechStore</span>
                <span className="text-blue-200">|</span>
                <span className="hover:text-blue-200 cursor-pointer whitespace-nowrap">Tải ứng dụng</span>
                <span className="text-blue-200">|</span>
                <span className="hover:text-blue-200 cursor-pointer whitespace-nowrap">Kết nối</span>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4 flex-nowrap">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => navigate('/profile')}
                      className="flex items-center space-x-2 hover:text-blue-200 cursor-pointer whitespace-nowrap"
                    >
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span>{user?.name}</span>
                    </button>
                    <button 
                      onClick={logout}
                      className="hover:text-blue-200 whitespace-nowrap"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 flex-nowrap">
                    <button 
                      onClick={() => openAuthModal('register')}
                      className="hover:text-blue-200 whitespace-nowrap"
                    >
                      Đăng Ký
                    </button>
                    <span className="text-blue-200">|</span>
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="hover:text-blue-200 whitespace-nowrap"
                    >
                      Đăng Nhập
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Header - giữ nguyên */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-blue-600">Tech</span>
                    <span className="text-purple-600">Store</span>
                  </h1>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-3xl mx-8">
                <SearchBar />
              </div>

              {/* Cart & Actions */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0H9m6 0a3 3 0 11-6 0"/>
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Orders */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors" onClick={() => navigate('/orders')}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </button>

                {/* Cart */}
                <button 
                  onClick={() => navigate('/cart')}
                  className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-9 0V9a2 2 0 012-2h6a2 2 0 012 2v4.01"/>
                  </svg>
                  {distinctCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {distinctCount > 99 ? '99+' : distinctCount}
                    </span>
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {distinctCount > 0 ? `${distinctCount} sản phẩm khác nhau trong giỏ` : 'Giỏ hàng trống'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - giữ nguyên */}
      <footer className="bg-gray-800 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">TechStore</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Nền tảng mua sắm công nghệ hàng đầu Việt Nam. Cam kết mang đến sản phẩm chính hãng với giá tốt nhất.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Sản phẩm</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Điện thoại & Tablet</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Laptop & PC</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Âm thanh & Mic</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Camera & Đồng hồ</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Đồ gia dụng</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Phụ kiện</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Tivi</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Hỗ trợ</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Chính sách đổi trả</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Bảo hành sản phẩm</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>FAQ</a></li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Liên hệ</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <div>
                    <p className="text-sm text-gray-300">123 Nguyễn Huệ, Q1</p>
                    <p className="text-sm text-gray-300">TP. Hồ Chí Minh</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <p className="text-sm text-gray-300">1900 1234</p>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <p className="text-sm text-gray-300">support@techstore.vn</p>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="text-md font-semibold mb-3 text-white">Đăng ký nhận tin</h5>
                <div className="flex">
                  <input 
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-1 px-3 py-2 rounded-l-md border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-white transition-colors">
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 TechStore. Tất cả quyền được bảo lưu. | 
              <a href="#" className="hover:text-white ml-1">Điều khoản</a> | 
              <a href="#" className="hover:text-white ml-1">Bảo mật</a>
            </p>
          </div>
        </div>
      </footer>

      {/* ✅ THÊM SELLER SELECTION MODAL */}
      {showSellerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-md mx-4 transform transition-all">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Chọn Dashboard</h3>
              <button
                onClick={() => setShowSellerModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 mb-6 text-center">
              Bạn có cả 2 vai trò. Vui lòng chọn dashboard muốn truy cập:
            </p>

            {/* Options */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  console.log('🎯 Modal: Navigating to Seller Dashboard');
                  setShowSellerModal(false);
                  navigate('/seller/dashboard');
                }}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700">Seller Dashboard</div>
                  <div className="text-sm text-gray-500">Quản lý bán hàng cá nhân</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  console.log('🎯 Modal: Navigating to Store Dashboard');
                  setShowSellerModal(false);
                  navigate('/store/dashboard');
                }}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl">🏪</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-green-700">Store Dashboard</div>
                  <div className="text-sm text-gray-500">Quản lý cửa hàng & chi nhánh</div>
                </div>
              </button>
            </div>

            {/* Footer info */}
            <div className="mt-6 text-center text-xs text-gray-500">
              Vai trò hiện tại: {user?.roles?.join(', ')}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal - giữ nguyên */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            {authMode === 'login' ? (
              <LoginForm 
                onSwitchToSignUp={() => setAuthMode('register')}
                onSwitchToForgotPassword={() => setAuthMode('forgot')}
              />
            ) : (
              <RegisterForm 
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
