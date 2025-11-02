import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { getSellerById } from '../../constants/sellersData';
import { getProductVariantsByStore } from '../../services/productService';
import { useToast } from '../../context/ToastContext';

const SellerDetailPage = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products'); // products, about, reviews

  useEffect(() => {
    const loadSellerData = async () => {
      setLoading(true);
      
      const sellerData = getSellerById(sellerId);
      if (!sellerData) {
        error('Không tìm thấy người bán');
        navigate('/sellers');
        return;
      }
      
      setSeller(sellerData);
      
      // ✅ Fetch products from API
      // TODO: Backend may use seller/store ID differently - verify mapping
      const result = await getProductVariantsByStore(sellerId, { page: 0, size: 20 });
      if (result.success) {
        const variants = Array.isArray(result.data) ? result.data : result.data?.content || [];
        setProducts(variants);
      } else {
        console.error('Failed to fetch seller products:', result.error);
        setProducts([]);
      }
      
      setLoading(false);
    };
    
    loadSellerData();
  }, [sellerId, navigate, error]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    success(`🔍 Đang xem chi tiết sản phẩm`);
  };


  const getStatusBadge = (seller) => {
    if (seller.stats.totalSales >= 50) return { text: 'Top Seller', color: 'bg-purple-100 text-purple-800' };
    if (seller.stats.totalSales >= 20) return { text: 'Active Seller', color: 'bg-green-100 text-green-800' };
    if (seller.stats.totalSales >= 5) return { text: 'New Seller', color: 'bg-blue-100 text-blue-800' };
    return { text: 'Beginner', color: 'bg-gray-100 text-gray-800' };
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!seller) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Người bán không tồn tại
            </h3>
            <button
              onClick={() => navigate('/sellers')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const statusBadge = getStatusBadge(seller);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seller Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          {/* Banner */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-sm rounded-full ${statusBadge.color}`}>
                {statusBadge.text}
              </span>
              {seller.verified && (
                <span className="ml-2 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                  ✓ Đã xác thực
                </span>
              )}
            </div>
            <div className="absolute bottom-4 right-4 text-white">
              <div className="text-lg font-semibold">{seller.stats.totalProducts} sản phẩm</div>
              <div className="text-sm opacity-90">{seller.stats.totalSales} đơn bán</div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                {seller.avatar}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {seller.name}
                </h1>
                <p className="text-gray-600 mb-3">
                  {seller.location}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>{seller.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✉️</span>
                    <span>{seller.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📅</span>
                    <span>Tham gia {new Date(seller.joinDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mt-1">
                  {seller.stats.totalSales} đơn bán
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sản phẩm ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Giới thiệu
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Đánh giá ({seller.stats.totalReviews})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Chưa có sản phẩm nào
                    </h3>
                    <p className="text-gray-600">
                      Người bán này chưa có sản phẩm nào được đăng bán
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                      >
                        <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
                          {product.primaryImageUrl || product.imageUrls?.[0] || product.image ? (
                            <img
                              src={product.primaryImageUrl || product.imageUrls?.[0] || product.image}
                              alt={product.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="text-gray-400 text-center"><svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>';
                              }}
                            />
                          ) : (
                            <div className="text-gray-400">
                              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-orange-600">
                              {product.price}
                            </span>
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm text-gray-600">4.5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Giới thiệu người bán
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {seller.bio}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Chuyên môn
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {seller.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Thông tin liên hệ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Tên người bán</h4>
                      <p className="text-gray-600">{seller.name}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Số điện thoại</h4>
                      <p className="text-gray-600">{seller.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Email</h4>
                      <p className="text-gray-600">{seller.email}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Địa chỉ</h4>
                      <p className="text-gray-600">{seller.location}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Thống kê người bán
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {seller.stats.totalProducts}
                      </div>
                      <div className="text-sm text-gray-600">Sản phẩm</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {seller.stats.totalSales}
                      </div>
                      <div className="text-sm text-gray-600">Đơn bán</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {seller.stats.averageRating}
                      </div>
                      <div className="text-sm text-gray-600">Đánh giá TB</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {seller.stats.responseRate}%
                      </div>
                      <div className="text-sm text-gray-600">Tỷ lệ phản hồi</div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Danh hiệu
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {seller.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm rounded-full border border-purple-200"
                      >
                        🏆 {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tính năng đánh giá người bán
                </h3>
                <p className="text-gray-600">
                  Tính năng này sẽ được phát triển trong phiên bản tiếp theo
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/sellers')}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            ← Quay lại danh sách người bán
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerDetailPage;
