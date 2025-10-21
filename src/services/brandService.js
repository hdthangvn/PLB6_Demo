const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const brandService = {
  // Get all brands
  async getBrands() {
    try {
      const response = await fetch(`${API_BASE_URL}/brands`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data };
    } catch (error) {
      console.error('Brand API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get brand by ID
  async getBrandById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/brands/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data };
    } catch (error) {
      console.error('Brand API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Get brand by name
  async getBrandByName(name) {
    try {
      const response = await fetch(`${API_BASE_URL}/brands/name/${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data };
    } catch (error) {
      console.error('Brand API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  }
};
