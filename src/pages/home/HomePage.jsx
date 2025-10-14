import MainLayout from '../../layouts/MainLayout';
import ProductSection from '../../components/common/ProductSection';
import { useState, useEffect, useRef } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  // Fetch data using custom hooks
  const { products: heroProducts, loading: heroLoading } = useProducts('hero');
  const { products: featuredProducts, loading: featuredLoading } = useProducts('featured');
  const { products: laptopProducts, loading: laptopLoading } = useProducts('laptops');
  const { products: smartphoneProducts, loading: smartphoneLoading } = useProducts('smartphones');
  const { categories, loading: categoriesLoading } = useCategories();
  const catScrollRef = useRef(null);
  const [catIndex, setCatIndex] = useState(0);
  const scrollCategories = (dir) => {
    if (!catScrollRef.current) return;
    const total = Array.isArray(categories) ? categories.length : 0;
    if (total === 0) return;
    const newIndex = Math.max(0, Math.min(total - 1, catIndex + (dir === 'left' ? -1 : 1)));
    setCatIndex(newIndex);
    const cardWidth = 180; // approximate card width including gap
    catScrollRef.current.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
  };

  // GIỚI HẠN 5 SẢN PHẨM CHO HOMEPAGE
  const limitedFeaturedProducts = featuredProducts.slice(0, 5);
  const limitedLaptopProducts = laptopProducts.slice(0, 5);
  const limitedSmartphoneProducts = smartphoneProducts.slice(0, 5);

  // Event handlers
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleViewAllFeatured = () => {
    navigate('/products/featured');
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
  const AUTO_PLAY_INTERVAL_MS = 4000;
  const FADE_DURATION_MS = 300;
  const [isFading, setIsFading] = useState(false);
  const getThumbnailStartIndex = (currentIndex) => {
    const currentStart = Math.floor(currentIndex / THUMBNAILS_TO_SHOW) * THUMBNAILS_TO_SHOW;
    return currentStart;
  };
  
  const thumbnailStartIndex = getThumbnailStartIndex(currentImageIndex);
  
  const handlePrevious = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => 
        prev === 0 ? heroProducts.length - 1 : prev - 1
      );
      setIsFading(false);
    }, FADE_DURATION_MS);
  };
  
  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => 
        prev === heroProducts.length - 1 ? 0 : prev + 1
      );
      setIsFading(false);
    }, FADE_DURATION_MS);
  };

  const handleThumbnailClick = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsFading(false);
    }, FADE_DURATION_MS);
  };

  const visibleThumbnails = heroProducts.slice(
    thumbnailStartIndex, 
    thumbnailStartIndex + THUMBNAILS_TO_SHOW
  );

  // Autoplay slider with fade animation
  useEffect(() => {
    if (!heroProducts || heroProducts.length === 0) return;

    let intervalId;
    let timeoutId;

    intervalId = setInterval(() => {
      setIsFading(true);
      timeoutId = setTimeout(() => {
        setCurrentImageIndex((prev) => 
          prev === heroProducts.length - 1 ? 0 : prev + 1
        );
        setIsFading(false);
      }, FADE_DURATION_MS);
    }, AUTO_PLAY_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [heroProducts]);

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
                  <div className={`flex-1 flex items-center justify-between px-8 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                    {/* Text Content */}
                    <div className="text-white">
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
                        className="w-full h-full object-cover rounded-lg"
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

      {/* Product Sections - GIỮ NGUYÊN */}
      {/* Category one-row strip with left/right tabs */}
      <section className="py-3 bg-white">
        <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <button onClick={() => scrollCategories('left')} className="flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border shadow hover:bg-gray-50" aria-label="Prev">‹</button>
          <button onClick={() => scrollCategories('right')} className="flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border shadow hover:bg-gray-50" aria-label="Next">›</button>
          <div ref={catScrollRef} className="flex gap-4 overflow-x-hidden px-10">
            {categories.map((cat, idx) => (
              <button key={idx} onClick={() => handleCategoryClick(cat)} className="min-w-[160px] bg-white border rounded-xl hover:shadow-sm transition p-4 flex flex-col items-center">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center mb-2">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=220&q=80'; }}
                    />
                  ) : (
                    <span className="text-3xl">{cat.icon}</span>
                  )}
                </div>
                <div className="text-sm font-medium text-gray-800 text-center">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <ProductSection
        title="Sản phẩm nổi bật"
        products={limitedFeaturedProducts}
        loading={featuredLoading}
        onProductClick={handleProductClick}
        onViewAllClick={handleViewAllFeatured}
        backgroundColor="bg-gray-50"
        showViewAll={true}
      />

      <ProductSection
        title="Laptop Gaming & Văn phòng"
        products={limitedLaptopProducts}
        loading={laptopLoading}
        onProductClick={handleProductClick}
        onViewAllClick={handleViewAllLaptops}
        backgroundColor="bg-white"
        showViewAll={true}
      />

      <ProductSection
        title="Điện thoại Hot nhất"
        products={limitedSmartphoneProducts}
        loading={smartphoneLoading}
        onProductClick={handleProductClick}
        onViewAllClick={handleViewAllSmartphones}
        backgroundColor="bg-gray-50"
        showViewAll={true}
      />

      {/* Brands Section - GIỮ NGUYÊN */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Thương hiệu nổi tiếng
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { name: 'Apple', logo: '🍎' },
              { name: 'Samsung', logo: '📱' },
              { name: 'ASUS', logo: '💻' },
              { name: 'MSI', logo: '🎮' },
              { name: 'Sony', logo: '🎧' },
              { name: 'Intel', logo: '⚡' }
            ].map((brand, index) => (
              <div key={index} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <span className="text-3xl mb-2">{brand.logo}</span>
                <span className="text-sm font-medium text-gray-700">{brand.name}</span>
              </div>
            ))}
          </div>
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