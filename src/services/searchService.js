const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const searchService = {
  // Search products by query
  async searchProducts(query, filters = {}) {
    try {
      // ✅ SỬA: Khi có brand filter, fetch tất cả sản phẩm để filter client-side
      let searchParams = new URLSearchParams();
      
      if (filters.brands && filters.brands.length > 0) {
        // Có brand filter → fetch tất cả sản phẩm
        searchParams.append('page', '0');
        searchParams.append('size', '100'); // Tăng size để có đủ sản phẩm
      } else {
        // Không có brand filter → search bình thường
        if (query) searchParams.append('name', query);
        if (filters.category && filters.category !== 'all') {
          searchParams.append('category', filters.category);
        }
        searchParams.append('page', '0');
        searchParams.append('size', '50');
      }
      
      const response = await fetch(`${API_BASE_URL}/products?${searchParams.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let results = data.data?.content || [];

      // Client-side filtering cho các filter không có trong API
      
      // ✅ BRAND FILTERING - Xử lý cả DBRef và string
      if (filters.brands && filters.brands.length > 0) {
        // Fetch brands để map DBRef
        let brandMap = {};
        try {
          const brandsResponse = await fetch(`${API_BASE_URL}/brands`);
          if (brandsResponse.ok) {
            const brandsData = await brandsResponse.json();
            brandMap = brandsData.reduce((map, brand) => {
              map[brand.id] = brand.name;
              return map;
            }, {});
          }
        } catch (error) {
          console.warn('Could not fetch brands for mapping:', error);
        }
        
        results = results.filter(product => {
          const productName = product.name || '';
          const productBrand = product.brand || '';
          
          // Kiểm tra từ tên sản phẩm (fallback)
          const nameMatch = filters.brands.some(brand => 
            productName.toLowerCase().includes(brand.toLowerCase())
          );
          
          // Kiểm tra từ brand field
          let brandMatch = false;
          if (productBrand) {
            if (typeof productBrand === 'string') {
              brandMatch = filters.brands.some(brand => 
                productBrand.toLowerCase().includes(brand.toLowerCase())
              );
            } else if (productBrand.$id) {
              // DBRef case - map brand ID to name
              const brandName = brandMap[productBrand.$id];
              if (brandName) {
                brandMatch = filters.brands.some(brand => 
                  brandName.toLowerCase().includes(brand.toLowerCase())
                );
              }
            }
          }
          
          return nameMatch || brandMatch;
        });
      }

      if (filters.minPrice) {
        results = results.filter(product => {
          const price = product.price || 0;
          return price >= parseInt(filters.minPrice);
        });
      }

      if (filters.maxPrice) {
        results = results.filter(product => {
          const price = product.price || 0;
          return price <= parseInt(filters.maxPrice);
        });
      }

      // Sort results
      if (filters.sortBy) {
        results.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price-asc':
              return (a.price || 0) - (b.price || 0);
            case 'price-desc':
              return (b.price || 0) - (a.price || 0);
            case 'name':
              return a.name.localeCompare(b.name);
            default:
              return 0;
          }
        });
      }

      return {
        success: true,
        data: {
          products: results,
          total: results.length,
          query: query,
          filters: filters
        }
      };
    } catch (error) {
      console.error('Search API Error:', error.message);
      return {
        success: false,
        data: {
          products: [],
          total: 0,
          query: query,
          filters: filters
        },
        error: error.message
      };
    }
  },

  // Get search suggestions
  async getSearchSuggestions(query) {
    try {
      if (!query || query.length < 2) {
        return { success: true, data: [] };
      }

      const response = await fetch(`${API_BASE_URL}/products?name=${encodeURIComponent(query)}&page=0&size=5`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const suggestions = (data.data?.content || []).map(product => product.name);

      return {
        success: true,
        data: suggestions
      };
    } catch (error) {
      console.error('Search suggestions API Error:', error.message);
      return {
        success: false,
        data: [],
        error: error.message
      };
    }
  }
};