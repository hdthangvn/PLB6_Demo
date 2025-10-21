const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const authService = {
  // Đăng nhập
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Debug: Log response để xem cấu trúc thực tế
      console.log('Login response:', data);
      
      // Xử lý response theo cấu trúc thực tế từ backend
      if (data.token || data.data?.token) {
        const token = data.token || data.data.token;
        const refreshToken = data.refreshToken || data.data.refreshToken;
        const userId = data.id || data.data?.id;
        const username = data.username || data.data?.username;
        const roles = data.roles || data.data?.roles;
        
        localStorage.setItem('token', token);
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify({
          id: userId,
          email: email,
          name: username || email,
          roles: roles || ['USER']
        }));
      } else if (data.id || data.data?.id) {
        // Backend trả về user data nhưng không có token
        console.warn('Backend returned user data but no token, creating session:', data);
        const userId = data.id || data.data.id;
        const username = data.username || data.data?.username;
        
        // Tạo session token từ user ID
        localStorage.setItem('token', 'session-' + userId + '-' + Date.now());
        localStorage.setItem('user', JSON.stringify({
          id: userId,
          email: email,
          name: username || email.split('@')[0],
          roles: ['USER']
        }));
      } else {
        console.warn('No user data found in response:', data);
      }

      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Đăng ký
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Xác minh email
  async verifyEmail(code) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/verify?code=${code}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Lấy thông tin user hiện tại
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Nếu là session token, không gọi API
      if (token.startsWith('session-') || token.startsWith('mock-token-')) {
        console.log('Session token detected, skipping API call');
        return { success: true, data: null };
      }

      console.log('Calling API /users/current with JWT token');
      const response = await fetch(`${API_BASE_URL}/users/current`, {
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
      return { success: false, error: error.message };
    }
  },

  // Google OAuth callback
  async googleCallback(code) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/auth/social/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Lưu token và user info
      if (data.data) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({
          id: data.data.id,
          email: email,
          name: data.data.username,
          roles: data.data.roles
        }));
      }

      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Đăng xuất
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};
