const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const variantService = {
  // Get product variant by ID
  async getVariantById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/product-variants/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Variant API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Get variants by store
  async getVariantsByStore(storeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/product-variants/store/${storeId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('Variant API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get variants by product
  async getVariantsByProduct(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/product-variants/product/${productId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('Variant API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get latest variants
  async getLatestVariants() {
    try {
      const response = await fetch(`${API_BASE_URL}/product-variants/latest`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('Variant API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get variants by category
  async getVariantsByCategory(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/product-variants/category/${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('Variant API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get variants by category and brand
  async getVariantsByCategoryAndBrand(category, brand) {
    try {
      const response = await fetch(`${API_BASE_URL}/product-variants/category/${encodeURIComponent(category)}/brand/${encodeURIComponent(brand)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('Variant API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  }
};
