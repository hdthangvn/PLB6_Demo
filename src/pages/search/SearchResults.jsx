import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import SearchFilters from '../../components/search/SearchFilters';
import ProductSection from '../../components/common/ProductSection';
import { useSearch } from '../../hooks/useSearch';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const { searchResults, loading, error, totalResults, searchProducts } = useSearch();
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance'
  });

  // Perform search when query or filters change - với debounce
  useEffect(() => {
    if (query) {
      const timeoutId = setTimeout(() => {
        searchProducts(query, filters);
      }, 300); // Debounce 300ms
      
      return () => clearTimeout(timeoutId);
    }
  }, [query, filters, searchProducts]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700"
            >
              Trang chủ
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="text-gray-900 font-medium">
              Kết quả tìm kiếm: "{query}"
            </span>
          </nav>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0 hidden md:block">
            <SearchFilters
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Kết quả tìm kiếm
                </h1>
                <p className="text-gray-600">
                  {loading ? 'Đang tìm kiếm...' : `Tìm thấy ${totalResults} sản phẩm cho "${query}"`}
                </p>
              </div>

              {/* Mobile Filters */}
              <div className="md:hidden">
                <SearchFilters
                  onFiltersChange={handleFiltersChange}
                  initialFilters={filters}
                />
              </div>
            </div>

            {/* Results Content */}
            {error ? (
              <div className="text-center py-16">
                <div className="text-red-600 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-lg font-medium">Lỗi tìm kiếm</p>
                  <p className="text-sm">{error}</p>
                </div>
                <button
                  onClick={() => searchProducts(query, filters)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Thử lại
                </button>
              </div>
            ) : searchResults.length === 0 && !loading ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Không tìm thấy sản phẩm
                </h2>
                <p className="text-gray-600 mb-6">
                  Thử thay đổi từ khóa hoặc bộ lọc để tìm được sản phẩm phù hợp
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Về trang chủ
                </button>
              </div>
            ) : (
              <div>
                {/* Results Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                    >
                      {/* Product Image */}
                      <div className="relative">
                        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-colors">
                          {product.image?.startsWith('http') ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-4xl">{product.image || '📦'}</span>
                          )}
                        </div>
                        {product.badge && (
                          <div className="absolute top-2 left-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${
                              product.badge === 'Hot' ? 'bg-red-500' :
                              product.badge === 'Mới nhất' ? 'bg-green-500' :
                              product.badge === 'Gaming' ? 'bg-purple-500' :
                              'bg-blue-500'
                            }`}>
                              {product.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg font-bold text-red-600">
                            {product.price}đ
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice}đ
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {loading && (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchResults;