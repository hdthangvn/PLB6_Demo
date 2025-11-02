import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ProductSection from '../../components/common/ProductSection';
import SearchFilters from '../../components/search/SearchFilters';
import { useState, useMemo, useEffect } from 'react';
import { useProductVariants } from '../../hooks/useProductVariants';
import { useCategories } from '../../hooks/useCategories';
import { 
  getProductVariantsByCategoryAndBrand,
  getProductsByCategoryAndBrand 
} from '../../services/productService';

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ PAGINATION: Mỗi trang 50 sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại (bắt đầu từ 1)
  const ITEMS_PER_PAGE = 50; // Mỗi trang hiển thị 50 sản phẩm
  
  // ✅ Load TẤT CẢ variants 1 lần (200 items = tất cả variants trong DB)
  const { variants: allVariants, loading, error, totalElements } = useProductVariants(
    category || 'all', 
    { size: 200 } // Load tất cả
  );
  
  const [filters, setFilters] = useState({ category, brands: [], sortBy: 'relevance', minPrice: '', maxPrice: '' });
  
  // ✅ State cho API mới: Category + Brand filter
  const [categoryBrandProducts, setCategoryBrandProducts] = useState(null);
  const [categoryBrandLoading, setCategoryBrandLoading] = useState(false);
  
  // ✅ Reset về trang 1 CHỈ KHI category thay đổi
  useEffect(() => {
    setCurrentPage(1);
    setFilters({ category, brands: [], sortBy: 'relevance', minPrice: '', maxPrice: '' });
    setCategoryBrandProducts(null); // Reset API results
    // Scroll to top mượt mà khi chuyển danh mục
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);
  
  // ✅ Auto-select brand từ navigation state (khi click brand từ HomePage)
  useEffect(() => {
    if (location.state?.selectedBrand) {
      const brandName = location.state.selectedBrand;
      console.log('🏷️ Auto-selecting brand from navigation:', brandName);
      setFilters(prev => ({ ...prev, brands: [brandName] }));
      // Clear navigation state để không bị auto-select lại khi refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);
  
  // ✅ LOGIC MỚI: Khi user chọn 1 brand duy nhất + đang ở category cụ thể → Gọi API mới
  useEffect(() => {
    const fetchCategoryBrandProducts = async () => {
      // Điều kiện: Phải chọn ĐÚNG 1 brand
      // Nếu category = 'all' → Không gọi API (vì backend không hỗ trợ), để client-side filter
      if (!filters.brands.length || filters.brands.length !== 1) {
        setCategoryBrandProducts(null);
        return;
      }
      
      // Nếu category = 'all' → Skip API, dùng client-side filter
      if (!category || category === 'all') {
        setCategoryBrandProducts(null);
        return;
      }
      
      const selectedBrand = filters.brands[0];
      
      // Map category key sang API name (giống logic trong useProductVariants)
      const KEY_TO_API_NAME = {
        'smartphones': 'Phone',
        'laptops': 'Laptop',
        'audio': 'Earphone',
        'loudspeaker': 'Loudspeaker',
        'watch': 'Watch',
        'camera': 'Camera',
        'tv': 'TV',
        'tablets': 'Tablet',
        'accessories': 'Accessories'
      };
      
      const categoryName = KEY_TO_API_NAME[category] || category;
      
      console.log('🎨🏷️ Calling Category+Brand APIs:', { category: categoryName, brand: selectedBrand });
      
      setCategoryBrandLoading(true);
      
      try {
        // ✅ GỌI CẢ 2 APIs SONG SONG: Products + Product Variants
        const [productsResult, variantsResult] = await Promise.all([
          getProductsByCategoryAndBrand(categoryName, selectedBrand, {
            page: 0,
            size: 200,
            sortBy: 'createdAt',
            sortDir: 'desc'
          }),
          getProductVariantsByCategoryAndBrand(categoryName, selectedBrand, {
            page: 0,
            size: 200,
            sortBy: 'createdAt',
            sortDir: 'desc'
          })
        ]);
        
        console.log('✅ Products API Result:', productsResult);
        console.log('✅ Variants API Result:', variantsResult);
        
        // ✅ Ưu tiên dùng Product Variants (vì có đầy đủ thông tin hơn)
        // Fallback sang Products nếu không có variants
        let finalProducts = [];
        
        if (variantsResult.success && variantsResult.data?.content?.length > 0) {
          console.log('📦 Using Product Variants data');
          finalProducts = (variantsResult.data.content || []).map(variant => ({
            id: variant.id,
            name: variant.name,
            images: variant.images || (variant.primaryImage ? [variant.primaryImage] : []),
            image: variant.primaryImage || variant.images?.[0] || null,
            price: variant.price || 0,
            stock: variant.stock || 0,
            description: variant.description,
            attributes: variant.attributes,
            variantId: variant.id,
            ...variant,
          }));
        } else if (productsResult.success && productsResult.data?.content?.length > 0) {
          console.log('📦 Using Products data (fallback)');
          finalProducts = (productsResult.data.content || []).map(product => ({
            id: product.id,
            name: product.name,
            images: product.images || [],
            image: product.images?.[0] || null,
            price: product.price || 0,
            stock: product.stock || 0,
            description: product.description,
            ...product,
          }));
        } else {
          console.warn('⚠️ No data from both APIs');
          finalProducts = [];
        }
        
        setCategoryBrandProducts(finalProducts);
      } catch (err) {
        console.error('❌ Category+Brand API Exception:', err);
        setCategoryBrandProducts([]);
      } finally {
        setCategoryBrandLoading(false);
      }
    };
    
    fetchCategoryBrandProducts();
  }, [category, filters.brands]);
  
  // ✅ Sử dụng categoryBrandProducts nếu có (từ API mới), nếu không thì dùng allVariants
  const products = categoryBrandProducts !== null ? categoryBrandProducts : allVariants;

  // Helper to parse price string like "12.000.000" or "12.000.000₫" to number 12000000
  const parsePrice = (s) => {
    if (!s) return NaN;
    const digits = String(s).replace(/[^0-9]/g, '');
    return digits ? parseInt(digits, 10) : NaN;
  };

  // ✅ Filter tất cả variants
  const allFilteredProducts = useMemo(() => {
    let result = products.slice();
    
    // ✅ QUAN TRỌNG: Nếu đang dùng API mới (categoryBrandProducts), KHÔNG filter brand nữa
    // Vì API đã filter rồi. Chỉ filter brand khi dùng allVariants
    const shouldFilterBrand = categoryBrandProducts === null && filters.brands?.length > 0;
    
    // Brand filter: suy ra brand từ tên (chỉ khi không dùng API mới)
    if (shouldFilterBrand) {
      result = result.filter(p => {
        const name = (p.name || '').toLowerCase();
        return filters.brands.some(b => name.includes(b.toLowerCase()));
      });
    }
    // Price filter (giá là string VNĐ; loại bỏ ký tự)
    const min = parsePrice(filters.minPrice);
    const max = parsePrice(filters.maxPrice);
    if (!isNaN(min)) result = result.filter(p => parsePrice(p.price) >= min);
    if (!isNaN(max)) result = result.filter(p => parsePrice(p.price) <= max);
    // Sort
    if (filters.sortBy === 'price-asc') result.sort((a,b)=>parsePrice(a.price)-parsePrice(b.price));
    if (filters.sortBy === 'price-desc') result.sort((a,b)=>parsePrice(b.price)-parsePrice(a.price));
    if (filters.sortBy === 'name') result.sort((a,b)=> (a.name||'').localeCompare(b.name||''));

    return result;
  }, [products, filters, categoryBrandProducts]);
  
  // ✅ Tính toán phân trang
  const totalPages = Math.ceil(allFilteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const filteredProducts = allFilteredProducts.slice(startIndex, endIndex);
  
  const { categories } = useCategories();

  // ✅ TÌM TÊN DANH MỤC DỰA TRÊN KEY
  const currentCategory = categories.find(cat => cat.key === category);
  const categoryName = currentCategory?.name || (category === 'all' ? 'Tất cả sản phẩm' : category);

  // ✅ Memoize initialFilters để tránh tạo object mới mỗi lần render
  const initialFilters = useMemo(() => ({
    ...filters,
    category
  }), [filters, category]);

  const handleProductClick = (variant) => {
    // ✅ Nếu có variantId thì điều hướng đến variant detail, nếu không thì điều hướng đến product detail
    if (variant.variantId) {
      navigate(`/product/${variant.variantId}`);
    } else if (variant.id) {
      navigate(`/product/${variant.id}`);
    }
  };

  // ✅ Hàm xử lý khi filters thay đổi
  const handleFiltersChange = (newFilters) => {
    // ✅ CHO PHÉP THAY ĐỔI CATEGORY từ dropdown filter
    // Nếu category từ newFilters khác với URL category → Navigate sang trang đó
    if (newFilters.category && newFilters.category !== category) {
      console.log('📂 Category changed via dropdown:', newFilters.category);
      navigate(`/products/${newFilters.category}`);
      return; // Navigate sẽ trigger useEffect để load dữ liệu mới
    }
    
    // Chỉ reset trang nếu filters thực sự thay đổi (không bao gồm category)
    const { category: _, ...oldFiltersWithoutCategory } = filters;
    const { category: __, ...newFiltersWithoutCategory } = newFilters;
    const filtersChanged = JSON.stringify(oldFiltersWithoutCategory) !== JSON.stringify(newFiltersWithoutCategory);
    
    setFilters({...newFilters, category});
    
    if (filtersChanged) {
      setCurrentPage(1); // Reset về trang 1 CHỈ KHI filters thực sự thay đổi
    }
  };

  // ✅ Hàm xử lý pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top khi chuyển trang
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ✅ Tính toán các trang cần hiển thị - HIỂN THỊ TẤT CẢ (không có "...")
  const getVisiblePages = () => {
    const pages = [];
    // Hiển thị tất cả các trang từ 1 đến totalPages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // ✅ Loading screen khi load lần đầu
  const isLoading = loading || categoryBrandLoading;
  
  if (isLoading && products.length === 0) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">
            {categoryBrandLoading ? 'Đang lọc sản phẩm theo thương hiệu...' : 'Đang tải sản phẩm...'}
          </p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-red-600">Lỗi: {error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Về trang chủ
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{categoryName}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex gap-8 items-start">
          <div className="w-80 hidden md:block flex-shrink-0 pt-1">
            <SearchFilters 
              onFiltersChange={handleFiltersChange} 
              initialFilters={initialFilters}
              currentProducts={allVariants}
            />
          </div>
          <div className="flex-1">
            {/* ✅ Hiển thị badge khi đang dùng API mới */}
            {categoryBrandProducts !== null && filters.brands.length === 1 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm text-blue-800 font-medium">
                  🎯 Đang lọc nâng cao: {categoryName} + {filters.brands[0]} 
                  <span className="text-blue-600 ml-1">({allFilteredProducts.length} sản phẩm)</span>
                </span>
              </div>
            )}
            
            <ProductSection
              title={categoryName}
              products={filteredProducts}
              onProductClick={handleProductClick}
              showViewAll={false}
              backgroundColor="bg-white"
              compact
            />
            
            {/* ✅ PAGINATION COMPONENT */}
            {allFilteredProducts.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 mb-8">
                {/* Pagination Controls */}
                <div className="flex items-center justify-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 shadow-sm hover:shadow-md hover:scale-105'
                    }`}
                    aria-label="Trang trước"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getVisiblePages().map((page) => {
                      const isActive = page === currentPage;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[40px] h-10 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-red-500 text-white shadow-lg scale-110'
                              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 shadow-sm hover:shadow-md hover:scale-105'
                          }`}
                          aria-label={`Trang ${page}`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 shadow-sm hover:shadow-md hover:scale-105'
                    }`}
                    aria-label="Trang sau"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* ✅ Thông báo khi không có sản phẩm */}
            {allFilteredProducts.length === 0 && !loading && (
              <div className="text-center mt-12 mb-12">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-50 text-yellow-700 rounded-2xl border-2 border-yellow-300 shadow-lg">
                  <svg className="w-7 h-7 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-lg">Không tìm thấy sản phẩm nào</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductList;