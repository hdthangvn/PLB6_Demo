import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { mockSellers, getVerifiedSellers, getTopSellers } from '../../constants/sellersData';
import { useToast } from '../../context/ToastContext';

const SellersPage = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('sales'); // sales, rating, products, verified
  const [filterVerified, setFilterVerified] = useState(false);

  useEffect(() => {
    const loadSellers = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      setSellers(mockSellers);
      setLoading(false);
    };
    loadSellers();
  }, []);

  const filteredAndSortedSellers = sellers
    .filter(seller => {
      const matchesSearch = 
        seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesVerified = !filterVerified || seller.verified;
      
      return matchesSearch && matchesVerified;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.stats.averageRating - a.stats.averageRating;
        case 'products':
          return b.stats.totalProducts - a.stats.totalProducts;
        case 'verified':
          return b.verified - a.verified;
        default:
          return b.stats.totalSales - a.stats.totalSales;
      }
    });

  const handleSellerClick = (sellerId) => {
    navigate(`/seller/${sellerId}`);
    success(`👤 Đang chuyển đến trang người bán`);
  };


  const getStatusBadge = (seller) => {
    if (seller.stats.totalSales >= 50) return { text: 'Top Seller', color: 'bg-purple-100 text-purple-800' };
    if (seller.stats.totalSales >= 20) return { text: 'Active', color: 'bg-green-100 text-green-800' };
    if (seller.stats.totalSales >= 5) return { text: 'New', color: 'bg-blue-100 text-blue-800' };
    return { text: 'Beginner', color: 'bg-gray-100 text-gray-800' };
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Người bán cá nhân
          </h1>
          <p className="text-gray-600">
            Khám phá các người bán C2C uy tín tại Đà Nẵng
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm người bán..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sales">Sắp xếp theo doanh số</option>
              <option value="rating">Sắp xếp theo đánh giá</option>
              <option value="products">Sắp xếp theo sản phẩm</option>
              <option value="verified">Sắp xếp theo xác thực</option>
            </select>
          </div>
          <div className="sm:w-48">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filterVerified}
                onChange={(e) => setFilterVerified(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Chỉ người bán đã xác thực</span>
            </label>
          </div>
        </div>

        {/* Top Sellers Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 Top người bán</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {getTopSellers(3).map((seller, index) => (
              <div
                key={seller.id}
                onClick={() => handleSellerClick(seller.id)}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                    {seller.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{seller.name}</h3>
                      {seller.verified && <span className="text-blue-500">✓</span>}
                    </div>
                    <p className="text-sm text-gray-600">{seller.stats.totalSales} đơn bán</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-yellow-600">#{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Sellers */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tất cả người bán</h2>
          
          {filteredAndSortedSellers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không tìm thấy người bán nào
              </h3>
              <p className="text-gray-600">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedSellers.map((seller) => {
                const statusBadge = getStatusBadge(seller);
                return (
                  <div
                    key={seller.id}
                    onClick={() => handleSellerClick(seller.id)}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                  >
                    {/* Seller Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {seller.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                              {seller.name}
                            </h3>
                            {seller.verified && (
                              <span className="text-blue-500 text-sm" title="Đã xác thực">✓</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{seller.location}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusBadge.color}`}>
                            {statusBadge.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Seller Info */}
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {seller.bio}
                      </p>

                      {/* Specialties */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {seller.specialties.slice(0, 3).map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                          {seller.specialties.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                              +{seller.specialties.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Đơn bán:</span>
                          <span className="font-medium">{seller.stats.totalSales}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Sản phẩm:</span>
                          <span className="font-medium">{seller.stats.totalProducts}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Phản hồi:</span>
                          <span className="font-medium">{seller.stats.responseRate}%</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Xem trang người bán
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Thống kê tổng quan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {sellers.length}
              </div>
              <div className="text-sm text-gray-600">Người bán</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {sellers.filter(s => s.verified).length}
              </div>
              <div className="text-sm text-gray-600">Đã xác thực</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {sellers.reduce((sum, seller) => sum + seller.stats.totalProducts, 0)}
              </div>
              <div className="text-sm text-gray-600">Sản phẩm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {sellers.reduce((sum, seller) => sum + seller.stats.totalSales, 0)}
              </div>
              <div className="text-sm text-gray-600">Đơn bán</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellersPage;
