import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kiểm tra authentication khi app khởi động
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      
      if (savedUser && savedToken) {
        try {
          // ✅ Gọi API /current để verify token còn hợp lệ không
          const result = await authService.getCurrentUser();
          
          if (result.success) {
            // Token hợp lệ → Cập nhật user từ BE (data mới nhất)
            const latestUser = result.data;
            localStorage.setItem('user', JSON.stringify(latestUser));
            setUser(latestUser);
            setIsAuthenticated(true);
          } else {
            // Token không hợp lệ → Xóa localStorage
            console.warn('Token không hợp lệ:', result.error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error validating token:', error);
          
          // Lỗi kết nối → Dùng cache (offline mode)
          try {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setIsAuthenticated(true);
          } catch {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
          }
        }
      }
      
      setLoading(false);
    };

    checkAuth();
    
    // Listen for user updates from other components
    const handleUserUpdate = (event) => {
      setUser(event.detail);
    };
    
    window.addEventListener('userUpdated', handleUserUpdate);
    
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // ✅ Gọi API thật
      const result = await authService.login({ email, password });
      
      if (result.success) {
        const { user, token } = result.data;
        
        // Lưu token + user đã được xử lý trong authService.login
        // Cập nhật state
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true, data: user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // ✅ Gọi API thật
      const result = await authService.register(userData);
      
      if (result.success) {
        // ⚠️ Lưu ý: API register không trả token ngay, cần verify email trước
        // Nên không setUser/setIsAuthenticated ở đây
        return { 
          success: true, 
          data: result.data,
          message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.' 
        };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('cart'); // ✅ Xóa giỏ hàng khi đăng xuất
    setUser(null);
    setIsAuthenticated(false);
    
    // ✅ Dispatch event để CartContext có thể clear cart
    window.dispatchEvent(new CustomEvent('userLogout'));
  };

  const forgotPassword = async (email) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};