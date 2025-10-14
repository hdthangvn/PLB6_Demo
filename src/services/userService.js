const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  // Get user profile
  async getUserProfile(userId) {
    await delay(300);
    
    // TODO: Thay bằng real API
    // const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    
    // Mock implementation
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const mockProfile = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar || null,
      phone: user.phone || '',
      address: user.address || '',
      dateOfBirth: user.dateOfBirth || '',
      gender: user.gender || '',
      preferences: {
        newsletter: true,
        promotions: true,
        notifications: true
      },
      stats: {
        totalOrders: 12,
        totalSpent: 45690000,
        memberSince: '2024-01-15'
      }
    };
    
    return {
      success: true,
      data: mockProfile
    };
  },

  // Update user profile
  async updateUserProfile(userId, profileData) {
    await delay(500);
    
    // TODO: Thay bằng real API
    // const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(profileData)
    // });
    
    // Mock implementation
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return {
      success: true,
      data: updatedUser
    };
  },

  // Change password
  async changePassword(userId, passwordData) {
    await delay(500);
    
    // TODO: Thay bằng real API
    // const response = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(passwordData)
    // });
    
    // Mock implementation - validate current password
    if (passwordData.currentPassword !== 'password123') {
      return {
        success: false,
        error: 'Mật khẩu hiện tại không đúng'
      };
    }
    
    return {
      success: true,
      message: 'Đổi mật khẩu thành công'
    };
  },

  // Upload avatar
  async uploadAvatar(userId, file) {
    await delay(1000);
    
    // TODO: Thay bằng real API với FormData
    // const formData = new FormData();
    // formData.append('avatar', file);
    // const response = await fetch(`${API_BASE_URL}/users/${userId}/avatar`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: formData
    // });
    
    // Mock implementation - tạo URL từ file
    const avatarUrl = URL.createObjectURL(file);
    
    // Cập nhật user trong localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    currentUser.avatar = avatarUrl;
    localStorage.setItem('user', JSON.stringify(currentUser));
    
    return {
      success: true,
      data: { avatarUrl }
    };
  },

  // Get order history
  async getOrderHistory(userId) {
    await delay(400);
    
    // TODO: Thay bằng real API
    // const response = await fetch(`${API_BASE_URL}/users/${userId}/orders`);
    
    const key = `orders_${userId}`;
    const saved = localStorage.getItem(key);
    const orders = saved ? JSON.parse(saved) : [];
    return { success: true, data: orders };
  },

  // Create order and persist
  async createOrder(userId, orderData) {
    await delay(300);
    const key = `orders_${userId}`;
    const saved = localStorage.getItem(key);
    const orders = saved ? JSON.parse(saved) : [];
    const newOrder = {
      id: `ORD-${new Date().getFullYear()}-${(orders.length + 1).toString().padStart(3,'0')}`,
      date: new Date().toISOString(),
      status: 'processing',
      ...orderData
    };
    orders.unshift(newOrder);
    localStorage.setItem(key, JSON.stringify(orders));
    return { success: true, data: newOrder };
  },

  // Update order status
  async updateOrderStatus(userId, orderId, status) {
    await delay(200);
    const key = `orders_${userId}`;
    const saved = localStorage.getItem(key);
    const orders = saved ? JSON.parse(saved) : [];
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return { success: false, error: 'Order not found' };
    orders[idx].status = status;
    localStorage.setItem(key, JSON.stringify(orders));
    return { success: true, data: orders[idx] };
  }
};