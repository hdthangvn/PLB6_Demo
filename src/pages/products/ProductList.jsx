import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ProductSection from '../../components/common/ProductSection';
import SearchFilters from '../../components/search/SearchFilters';
import { useState, useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(category);
  const [filters, setFilters] = useState({ category, brands: [], sortBy: 'relevance', minPrice: '', maxPrice: '' });

  const filteredProducts = useMemo(() => {
    let result = products.slice();
    // Brand filter: suy ra brand từ tên
    if (filters.brands?.length) {
      result = result.filter(p => {
        const name = (p.name || '').toLowerCase();
        return filters.brands.some(b => name.includes(b.toLowerCase()));
      });
    }
    // CPU filter (áp dụng cho laptop/pc): dò trong tên
    if (filters.cpu?.length && (category === 'laptops' || category === 'pc' || category === 'smartphones')) {
      result = result.filter(p => {
        const name = (p.name || '').toLowerCase();
        return filters.cpu.some(c => name.includes(c.toLowerCase()));
      });
    }
    // RAM filter (áp dụng cho laptop/pc/smartphones): dò trong name/badge nếu có
    if (filters.ram?.length && (category === 'laptops' || category === 'pc' || category === 'smartphones')) {
      result = result.filter(p => {
        const combined = `${p.name || ''} ${p.badge || ''}`.toLowerCase();
        return filters.ram.some(r => combined.includes(r.toLowerCase()));
      });
    }
    // Price filter (giá là string VNĐ; loại bỏ ký tự)
    const parsePrice = (s) => {
      if (!s) return NaN;
      const digits = String(s).replace(/[^0-9]/g, '');
      return digits ? parseInt(digits, 10) : NaN;
    };
    const min = parsePrice(filters.minPrice);
    const max = parsePrice(filters.maxPrice);
    if (!isNaN(min)) result = result.filter(p => parsePrice(p.price) >= min);
    if (!isNaN(max)) result = result.filter(p => parsePrice(p.price) <= max);
    // Sort
    if (filters.sortBy === 'price-asc') result.sort((a,b)=>parsePrice(a.price)-parsePrice(b.price));
    if (filters.sortBy === 'price-desc') result.sort((a,b)=>parsePrice(b.price)-parsePrice(a.price));
    if (filters.sortBy === 'name') result.sort((a,b)=> (a.name||'').localeCompare(b.name||''));

    // TV filters: match theo tên/badge
    if (category === 'tv') {
      if (filters.tvResolutions?.length) {
        result = result.filter(p => {
          const text = `${p.name||''} ${p.badge||''}`.toLowerCase();
          return filters.tvResolutions.some(r => text.includes(r.toLowerCase()));
        });
      }
      if (filters.tvPanels?.length) {
        result = result.filter(p => {
          const text = `${p.name||''} ${p.badge||''}`.toLowerCase();
          return filters.tvPanels.some(t => text.includes(t.toLowerCase()));
        });
      }
      if (filters.tvSizes?.length) {
        result = result.filter(p => {
          const text = `${p.name||''}`;
          return filters.tvSizes.some(s => text.includes(s));
        });
      }
    }

    // Camera filters
    if (category === 'camera') {
      if (filters.cameraSensors?.length) {
        result = result.filter(p => {
          const text = `${p.name||''} ${p.badge||''}`.toLowerCase();
          return filters.cameraSensors.some(s => text.includes(s.toLowerCase()));
        });
      }
      if (filters.cameraTypes?.length) {
        result = result.filter(p => {
          const text = `${p.name||''} ${p.badge||''}`.toLowerCase();
          return filters.cameraTypes.some(t => text.includes(t.toLowerCase()));
        });
      }
    }

    // Audio filters (suy từ tên/badge)
    if (category === 'audio') {
      if (filters.audioTypes?.length) {
        result = result.filter(p => {
          const t = `${p.name||''} ${p.badge||''}`.toLowerCase();
          return filters.audioTypes.some(x => t.includes(x.toLowerCase()) || (x==='Earbuds' && t.includes('airpods')));
        });
      }
      if (filters.audioFeatures?.length) {
        result = result.filter(p => {
          const t = `${p.name||''} ${p.badge||''}`.toLowerCase();
          return filters.audioFeatures.some(x => t.includes(x.toLowerCase()) || (x==='Chống ồn' && (t.includes('chống ồn') || t.includes('noise'))));
        });
      }
    }

    // Accessories filters
    if (category === 'accessories' && filters.accessoriesTypes?.length) {
      result = result.filter(p => {
        const t = `${p.name||''} ${p.badge||''}`.toLowerCase();
        return filters.accessoriesTypes.some(x => t.includes(x.toLowerCase()) || (x==='Pin dự phòng' && t.includes('powerbank')));
      });
    }

    // Home filters
    if (category === 'home' && filters.homeTypes?.length) {
      result = result.filter(p => {
        const t = `${p.name||''} ${p.badge||''}`.toLowerCase();
        return filters.homeTypes.some(x => t.includes(x.toLowerCase()) || (x==='Robot hút bụi' && t.includes('robot vacuum')));
      });
    }
    return result;
  }, [products, filters]);
  const { categories } = useCategories();

  // ✅ TÌM TÊN DANH MỤC DỰA TRÊN KEY
  const currentCategory = categories.find(cat => cat.key === category);
  const categoryName = currentCategory?.name || category;

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">Đang tải sản phẩm...</p>
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
          <div className="w-64 hidden md:block flex-shrink-0 pt-1">
            <SearchFilters onFiltersChange={(f)=> setFilters({...f, category})} initialFilters={{...filters, category}} />
          </div>
          <div className="flex-1">
            <ProductSection
              title={categoryName}
              products={filteredProducts}
              onProductClick={handleProductClick}
              showViewAll={false}
              backgroundColor="bg-white"
              compact
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductList;