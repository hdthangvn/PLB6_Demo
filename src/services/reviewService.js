const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const reviewService = {
  // Get reviews for a product - REAL API
  async getProductReviews(productId, page = 0, size = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/product/${productId}?page=${page}&size=${size}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('Review API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get reviews for a product variant - REAL API
  async getProductVariantReviews(productVariantId, page = 0, size = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/product-variant/${productVariantId}?page=${page}&size=${size}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('Review API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get review stats for a product variant - REAL API
  async getProductVariantReviewStats(productVariantId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/product-variant/${productVariantId}/stats`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Review API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Get review by ID - REAL API
  async getReviewById(reviewId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Review API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Create review - REAL API (requires authentication)
  async createReview(reviewData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Review API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Update review - REAL API (requires authentication)
  async updateReview(reviewId, reviewData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Review API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Delete review - REAL API (requires authentication)
  async deleteReview(reviewId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
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
      console.error('Review API Error:', error.message);
      return { success: false, data: null, error: error.message };
    }
  },

  // Get my reviews - REAL API (requires authentication)
  async getMyReviews(page = 0, size = 10) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/reviews/my-reviews?page=${page}&size=${size}`, {
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
      return { success: true, data: data.data?.content || [] };
    } catch (error) {
      console.error('Review API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  }
};