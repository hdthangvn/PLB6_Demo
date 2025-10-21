const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const cartService = {
  // Thêm sản phẩm vào giỏ hàng
  async addToCart(cartItems) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // ✅ THÊM SẢN PHẨM VÀO CART TRỰC TIẾP
      console.log('🛒 Adding items to cart:', cartItems);
      const response = await fetch(`${API_BASE_URL}/buyer/cart/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItems)
      });

      if (!response.ok) {
        // ✅ XỬ LÝ LỖI 500 - CÓ THỂ USER CHƯA CÓ CART
        if (response.status === 500) {
          console.warn('Cart API returned 500 - user might not have a cart yet');
          return { success: false, error: 'Cart API error - user might not have a cart yet' };
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Items added to cart successfully');
      return { success: true, data: data.data };
    } catch (error) {
      console.error('❌ Cart API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Lấy giỏ hàng từ server
  async getCart() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/buyer/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // ✅ XỬ LÝ LỖI 500 - TẠO CART TRỐNG TRƯỚC
        if (response.status === 500) {
          console.warn('Cart API returned 500 - trying to create empty cart first');
          
          // Thử tạo cart trống bằng cách gọi add với array rỗng
          try {
            const createResponse = await fetch(`${API_BASE_URL}/buyer/cart/add`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify([]) // Array rỗng để tạo cart
            });
            
            if (createResponse.ok) {
              console.log('Empty cart created successfully');
              return { success: true, data: { cartItems: [] } };
            }
          } catch (createError) {
            console.warn('Could not create empty cart:', createError);
          }
          
          return { success: true, data: { cartItems: [] } }; // Trả về cart trống
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Cart API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Cập nhật số lượng sản phẩm
  async updateCartItem(productVariantId, quantity, colorId = null) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const url = colorId 
        ? `${API_BASE_URL}/buyer/cart/${productVariantId}?colorId=${colorId}`
        : `${API_BASE_URL}/buyer/cart/${productVariantId}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Cart API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Xóa sản phẩm khỏi giỏ hàng
  async removeCartItem(productVariantId, colorId = null) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const url = colorId 
        ? `${API_BASE_URL}/buyer/cart/${productVariantId}?colorId=${colorId}`
        : `${API_BASE_URL}/buyer/cart/${productVariantId}`;

      const response = await fetch(url, {
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
      console.error('Cart API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Xóa toàn bộ giỏ hàng
  async clearCart() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/buyer/cart/clear`, {
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
      console.error('Cart API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Lấy số lượng sản phẩm trong giỏ hàng
  async getCartItemCount() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/buyer/cart/count`, {
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
      console.error('Cart API Error:', error.message);
      return { success: false, error: error.message };
    }
  }
};
