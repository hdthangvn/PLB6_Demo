import MainLayout from '../../layouts/MainLayout';
import ProductSection from '../../components/common/ProductSection';
import APIStatusWidget from '../../components/common/APIStatusWidget';
import { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  // Fetch data using custom hooks
  const { products: heroProducts, loading: heroLoading } = useProducts('hero');
  const { products: featuredProducts, loading: featuredLoading } = useProducts('featured');
  const { products: laptopProducts, loading: laptopLoading } = useProducts('laptop');
  const { products: smartphoneProducts, loading: smartphoneLoading } = useProducts('phone');
  const { categories, loading: categoriesLoading } = useCategories();

  // GIỚI HẠN 5 SẢN PHẨM CHO HOMEPAGE
  const limitedFeaturedProducts = Array.isArray(featuredProducts) ? featuredProducts.slice(0, 5) : [];
  const limitedLaptopProducts = Array.isArray(laptopProducts) ? laptopProducts.slice(0, 5) : [];
  const limitedSmartphoneProducts = Array.isArray(smartphoneProducts) ? smartphoneProducts.slice(0, 5) : [];

  // Event handlers
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleViewAllFeatured = () => {
    navigate('/products/all');
  };

  const handleViewAllLaptops = () => {
    navigate('/products/laptops');
  };

  const handleViewAllSmartphones = () => {
    navigate('/products/smartphones');
  };

  // ✅ THÊM HANDLER CHO CATEGORY CLICK
  const handleCategoryClick = (category) => {
    navigate(`/products/${category.key}`);
  };

  // SLIDER LOGIC - GIỮ NGUYÊN
  const THUMBNAILS_TO_SHOW = 5;
  const getThumbnailStartIndex = (currentIndex) => {
    const currentStart = Math.floor(currentIndex / THUMBNAILS_TO_SHOW) * THUMBNAILS_TO_SHOW;
    return currentStart;
  };
  
  const thumbnailStartIndex = getThumbnailStartIndex(currentImageIndex);
  
  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? heroProducts.length - 1 : prev - 1
    );
  };
  
  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === heroProducts.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // ✅ AUTO-PLAY ANIMATION - TỰ ĐỘNG CHUYỂN SLIDE MỖI 4 GIÂY
  useEffect(() => {
    if (heroProducts.length <= 1) return; // Không cần auto-play nếu chỉ có 1 sản phẩm
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === heroProducts.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 4 giây

    return () => clearInterval(interval);
  }, [heroProducts.length]);

  const visibleThumbnails = heroProducts.slice(
    thumbnailStartIndex, 
    thumbnailStartIndex + THUMBNAILS_TO_SHOW
  );

  // Loading states
  if (heroLoading || categoriesLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </MainLayout>
    );
  }

  const currentProduct = heroProducts[currentImageIndex] || {};

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {/* Sidebar Menu - ✅ THÊM CLICK HANDLER */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
              <nav className="flex-1 py-4">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center px-4 py-4 text-sm text-gray-700 hover:bg-white hover:text-gray-900 transition-colors group border-b border-gray-200/50 last:border-b-0 text-left"
                  >
                    <span className="mr-3 text-lg">{category.icon}</span>
                    <span className="flex-1 font-medium">{category.name}</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content Area - GIỮ NGUYÊN */}
            <div className="flex-1 flex flex-col">
              {/* Image Slider */}
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 h-96">
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  {/* Previous Button */}
                  <button
                    onClick={handlePrevious}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>

                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between px-8">
                    {/* Text Content */}
                    <div className="text-white transition-all duration-500 ease-in-out">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium">🍎</span>
                        <span className="ml-2 text-sm font-medium">
                          {currentProduct.name?.split(' ')[0]}
                        </span>
                      </div>
                      <h2 className="text-4xl font-bold mb-2">
                        {currentProduct.name?.split(' ').slice(1).join(' ')}
                      </h2>
                      <p className="text-xl mb-6">{currentProduct.subtitle}</p>
                      
                      <div className="flex items-center space-x-8 mb-6">
                        <div className="text-center">
                          <div className="text-sm opacity-90">Tổng ưu đãi</div>
                          <div className="text-lg font-bold">Đến 7 Triệu</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm opacity-90">Giá chỉ từ</div>
                          <div className="text-lg font-bold">{currentProduct.price}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm opacity-90">Trả góp 0% đến</div>
                          <div className="text-lg font-bold">12 Tháng</div>
                        </div>
                      </div>
                      
                      <button className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-2 rounded-full transition-colors">
                        Mua ngay
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="w-64 h-64 relative">
                      <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        className="w-full h-full object-cover rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="bg-white p-6 border-t border-gray-200">
                <div className="flex space-x-3 mb-4">
                  {visibleThumbnails.map((product, index) => {
                    const actualIndex = thumbnailStartIndex + index;
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleThumbnailClick(actualIndex)}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-300 ${
                          actualIndex === currentImageIndex
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        style={{ 
                          flex: `1 1 ${100 / THUMBNAILS_TO_SHOW}%`,
                          minWidth: 0 
                        }}
                      >
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1 truncate">
                            {product.name.split(' ')[0]}
                          </div>
                          <div className="text-sm font-medium truncate">
                            {product.name.split(' ').slice(1).join(' ')}
                          </div>
                          <div className="text-xs text-gray-600 mt-1 truncate">
                            {product.description}
                          </div>
                          {actualIndex === currentImageIndex && (
                            <div className="text-xs text-blue-600 mt-1 font-medium">
                              Ưu đãi đăng ký sớm
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: Math.ceil(heroProducts.length / THUMBNAILS_TO_SHOW) }).map((_, pageIndex) => (
                    <div
                      key={pageIndex}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        Math.floor(thumbnailStartIndex / THUMBNAILS_TO_SHOW) === pageIndex
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Carousel Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh mục sản phẩm</h2>
          
          <div className="relative">
            <button
              onClick={() => {
                const container = document.getElementById('category-carousel');
                if (container) {
                  container.scrollLeft -= 200;
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-colors shadow-md"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button
              onClick={() => {
                const container = document.getElementById('category-carousel');
                if (container) {
                  container.scrollLeft += 200;
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-colors shadow-md"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            <div 
              id="category-carousel"
              className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => handleCategoryClick(category)}
                  className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop';
                      }}
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 text-white hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 hover:rotate-12 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold hover:text-blue-300 transition-colors duration-300">SMART WATCH</h3>
                </div>
                <p className="text-lg mb-2 hover:text-blue-200 transition-colors duration-300">M6 Smart Band 2.3 - Fitness Band</p>
                <p className="text-gray-300 mb-4 hover:text-gray-200 transition-colors duration-300">Theo dõi sức khỏe cho nam và nữ, dây đeo đỏ</p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    <span>Nhịp tim</span>
                  </div>
                  <div className="flex items-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    <span>Bước chân</span>
                  </div>
                  <div className="flex items-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <span>Giấc ngủ</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-white bg-opacity-10 rounded-xl flex items-center justify-center mb-2 hover:bg-opacity-20 hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">Apple Watch</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-white bg-opacity-10 rounded-xl flex items-center justify-center mb-2 hover:bg-opacity-20 hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-green-800 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">Fitness Band</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-white bg-opacity-10 rounded-xl flex items-center justify-center mb-2 hover:bg-opacity-20 hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-800 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">Smart Band</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sections - CẬP NHẬT TITLE */}
      <ProductSection
        title="Sản phẩm HOT"
        products={limitedFeaturedProducts}
        loading={featuredLoading}
        onProductClick={handleProductClick}
        onViewAllClick={handleViewAllFeatured}
        backgroundColor="bg-gray-50"
        showViewAll={true}
      />

      <ProductSection
        title="Laptop"
        products={limitedLaptopProducts}
        loading={laptopLoading}
        onProductClick={handleProductClick}
        onViewAllClick={handleViewAllLaptops}
        backgroundColor="bg-white"
        showViewAll={true}
      />

      <ProductSection
        title="Điện thoại"
        products={limitedSmartphoneProducts}
        loading={smartphoneLoading}
        onProductClick={handleProductClick}
        onViewAllClick={handleViewAllSmartphones}
        backgroundColor="bg-gray-50"
        showViewAll={true}
      />

      {/* Brands Section - CẢI THIỆN */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Thương hiệu nổi tiếng
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              // Hàng 1
              { name: 'Apple', logo: '🍎', color: 'from-gray-100 to-gray-200' },
              { name: 'Samsung', logo: '📱', color: 'from-blue-100 to-blue-200' },
              { name: 'ASUS', logo: '💻', color: 'from-red-100 to-red-200' },
              { name: 'MSI', logo: '🎮', color: 'from-purple-100 to-purple-200' },
              { name: 'Sony', logo: '🎧', color: 'from-gray-100 to-gray-200' },
              { name: 'Intel', logo: '⚡', color: 'from-blue-100 to-blue-200' },
              
              // Hàng 2
              { name: 'Google', logo: '🔍', color: 'from-red-100 to-red-200' },
              { name: 'Microsoft', logo: '🪟', color: 'from-blue-100 to-blue-200' },
              { name: 'HP', logo: '🖥️', color: 'from-blue-100 to-blue-200' },
              { name: 'Dell', logo: '💻', color: 'from-blue-100 to-blue-200' },
              { name: 'Lenovo', logo: '💻', color: 'from-red-100 to-red-200' },
              { name: 'Acer', logo: '💻', color: 'from-green-100 to-green-200' },
              
              // Hàng 3
              { name: 'LG', logo: '📺', color: 'from-red-100 to-red-200' },
              { name: 'Panasonic', logo: '📹', color: 'from-blue-100 to-blue-200' },
              { name: 'Canon', logo: '📷', color: 'from-gray-100 to-gray-200' },
              { name: 'Nikon', logo: '📷', color: 'from-yellow-100 to-yellow-200' },
              { name: 'Bose', logo: '🔊', color: 'from-gray-100 to-gray-200' },
              { name: 'JBL', logo: '🔊', color: 'from-orange-100 to-orange-200' }
            ].map((brand, index) => (
              <div key={index} className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-gradient-to-br hover:from-blue-50 hover:to-purple-50">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${brand.color} flex items-center justify-center mb-3 shadow-md`}>
                  <span className="text-2xl">{brand.logo}</span>
                </div>
                <span className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Status Widget */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <APIStatusWidget />
        </div>
      </section>

      {/* Newsletter Section - GIỮ NGUYÊN */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Đăng ký nhận thông tin khuyến mãi
          </h2>
          <p className="text-blue-100 mb-8">
            Nhận thông báo về sản phẩm mới và ưu đãi đặc biệt từ TechStore
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;