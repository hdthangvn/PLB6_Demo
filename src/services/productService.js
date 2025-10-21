const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const productService = {
  // Get hero slider products - sử dụng search API để lấy sản phẩm nổi bật
  async getHeroProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products?name=&page=0&size=8`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get products by category
  async getProductsByCategory(category, page = 0, size = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/category/${encodeURIComponent(category)}?page=${page}&size=${size}`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get featured products - sử dụng search API với từ khóa phổ biến
  async getFeaturedProducts(limit = 5) {
    try {
      const response = await fetch(`${API_BASE_URL}/products?name=&page=0&size=${limit}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Search products by name
  async searchProducts(name, page = 0, size = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?name=${encodeURIComponent(name)}&page=${page}&size=${size}`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get products by category and brand
  async getProductsByCategoryAndBrand(category, brand, page = 0, size = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/category/${encodeURIComponent(category)}/brand/${encodeURIComponent(brand)}?page=${page}&size=${size}`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get all products - sử dụng search API với query rỗng
  async getAllProducts(page = 0, size = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/products?name=&page=${page}&size=${size}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get products by store ID
  async getProductsByStore(storeId, page = 0, size = 20) {
    try {
      // Fetch all products and filter by store ID client-side
      const response = await fetch(`${API_BASE_URL}/products?name=&page=${page}&size=${size}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const allProducts = data.data?.content || [];
      
      // Filter products by store ID
      const storeProducts = allProducts.filter(product => 
        product.store && product.store.id === storeId
      );
      
      return { success: true, data: storeProducts };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  }
};