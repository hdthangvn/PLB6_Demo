const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const adminService = {
  // ===== STORE MANAGEMENT =====
  
  // Get pending stores
  async getPendingStores(page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc') {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `${API_BASE_URL}/admin/stores/pending?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Get approved stores
  async getApprovedStores(page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc') {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `${API_BASE_URL}/admin/stores/approved?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Approve store
  async approveStore(storeId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_BASE_URL}/admin/stores/${storeId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Reject store
  async rejectStore(storeId, reason) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_BASE_URL}/admin/stores/${storeId}/reject?reason=${encodeURIComponent(reason)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // ===== PRODUCT MANAGEMENT =====

  // Get pending products
  async getPendingProducts(page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc') {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `${API_BASE_URL}/admin/products/pending?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Approve product
  async approveProduct(productId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_BASE_URL}/admin/products/${productId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Reject product
  async rejectProduct(productId, reason) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_BASE_URL}/admin/products/${productId}/reject?reason=${encodeURIComponent(reason)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // ===== PRODUCT VARIANT MANAGEMENT =====

  // Get pending product variants
  async getPendingProductVariants(page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc') {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `${API_BASE_URL}/admin/product-variants/pending?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Approve product variant
  async approveProductVariant(variantId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_BASE_URL}/admin/product-variants/${variantId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Reject product variant
  async rejectProductVariant(variantId, reason) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_BASE_URL}/admin/product-variants/${variantId}/reject?reason=${encodeURIComponent(reason)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Admin API Error:', error.message);
      return { success: false, error: error.message };
    }
  }
};
