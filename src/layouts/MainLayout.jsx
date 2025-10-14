import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import SearchBar from '../components/search/SearchBar'; // ✅ PHẢI CÓ DÒNG NÀY

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems, cartItems } = useCart();
  const totalItems = getTotalItems();
  const distinctCount = cartItems.length;

  // Topbar marquee slogans
  const slogans = [
    '• Chào mừng thành viên mới – Đăng ký thành viên – Rinh quà ngay!',
    '• Công nghệ đỉnh cao, – Giá rẻ bất ngờ',
    '• Mua hàng online – Chuẩn từng ly – Nhận ngay tức thì!',
    '• Sản phẩm chính hãng – Xuất VAT đầy đủ – Bảo hành 12–36 tháng'
  ];
  const marqueeText = slogans.join('    ');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        {/* Top Bar - GIỮ NGUYÊN */}
        <div className="bg-blue-600 text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-10">
              {/* Left side */}
              <div className="flex items-center space-x-6 flex-nowrap overflow-hidden">
                <span className="hover:text-blue-200 cursor-pointer whitespace-nowrap">Kênh Người Bán</span>
                <span className="text-blue-200">|</span>
                <div className="flex items-center space-x-2">
                  <span className="whitespace-nowrap">Kết nối</span>
                  {/* Facebook */}
                  <a href="#" className="hover:text-blue-200" aria-label="Facebook">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a href="#" className="hover:text-blue-200" aria-label="YouTube">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="2" y="6" width="20" height="12" rx="3" ry="3" strokeWidth="2"/>
                      <path d="M10 9l5 3-5 3V9z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
                <div className="hidden lg:block w-[520px] overflow-hidden">
                  <div className="relative w-full">
                    <div className="flex whitespace-nowrap animate-[ticker_22s_linear_infinite] will-change-transform text-sm">
                      <span className="mr-8 italic opacity-90">{marqueeText}</span>
                      <span className="mr-8 italic opacity-90" aria-hidden="true">{marqueeText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-6 flex-nowrap">
                <div className="hidden md:flex items-center space-x-1 hover:text-blue-200 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-2 13a2 2 0 01-2 1.7H7a2 2 0 01-2-1.7L3 3zm3 16a2 2 0 104 0m8 0a2 2 0 104 0"/>
                  </svg>
                  <span className="whitespace-nowrap">Tra cứu đơn</span>
                </div>
                <span className="hidden md:inline text-blue-200">|</span>
                <div className="hidden sm:flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 16.92V21a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.05 5.2 2 2 0 014 3h4.09a2 2 0 012 1.72 12.66 12.66 0 00.7 2.81 2 2 0 01-.45 2.11L9 11a16 16 0 006 6l1.36-1.36a2 2 0 012.11-.45 12.66 12.66 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <a href="tel:18001234" className="hover:text-blue-200 whitespace-nowrap">Hotline: 1800 1234</a>
                </div>
                <div className="flex items-center space-x-1 hover:text-blue-200 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="whitespace-nowrap">Hỗ Trợ</span>
                </div>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {/* User Profile Link */}
                    <button
                      onClick={() => navigate('/profile')}
                      className="flex items-center space-x-2 hover:text-blue-200 cursor-pointer whitespace-nowrap"
                    >
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span>{user?.name}</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 flex-nowrap">
                    <button className="hover:text-blue-200 whitespace-nowrap">Đăng Ký</button>
                    <span className="text-blue-200">|</span>
                    <button className="hover:text-blue-200 whitespace-nowrap">Đăng Nhập</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
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

              {/* Search Bar - PHẢI CÓ PHẦN NÀY */}
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

                {/* Orders - standalone orders page */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors" onClick={()=>navigate('/orders')}>
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

                {isAuthenticated && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="ml-2"
                  >
                    Đăng xuất
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - GIỮ NGUYÊN */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TechStore</h3>
              <p className="text-gray-300 text-sm">
                Nền tảng mua sắm công nghệ hàng đầu Việt Nam
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Điện tử</a></li>
                <li><a href="#" className="hover:text-white">Laptop</a></li>
                <li><a href="#" className="hover:text-white">Smartphone</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Chính sách</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Theo dõi</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
            <p>&copy; 2024 TechStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;