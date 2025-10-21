const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const storeService = {
  // Get all stores
  async getStores() {
    try {
      const response = await fetch(`${API_BASE_URL}/stores`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data || [] };
    } catch (error) {
      console.error('Store API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get store by ID
  async getStoreById(storeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/stores/${storeId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Store API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Get stores by owner
  async getStoresByOwner(ownerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/stores/owner/${ownerId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data || [] };
    } catch (error) {
      console.error('Store API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  }
};
