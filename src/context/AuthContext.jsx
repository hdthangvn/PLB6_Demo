import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ROLE MAP cho testing (thêm vào đầu file)
const ROLE_MAP = {
  'seller@techstore.com': ['SELLER'],
  'owner@techstore.com': ['STORE_OWNER'],
  'both@techstore.com': ['SELLER', 'STORE_OWNER'],
  'admin@techstore.com': ['ADMIN','SELLER','STORE_OWNER'],
  'user@test.com': ['BUYER']
};

const MOCK_STORES_FOR_OWNER = [
  { id: 'branch-1', name: 'TechPro - Hải Châu' },
  { id: 'branch-2', name: 'TechPro - Thanh Khê' }
];

const assignRolesForEmail = (email, user) => {
  const roles = ROLE_MAP[email] || ['BUYER'];
  user.roles = roles;
  if (roles.includes('STORE_OWNER')) {
    user.stores = MOCK_STORES_FOR_OWNER;
  } else {
    user.stores = [];
  }
  return user;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // SỬA: Kiểm tra auth từ localStorage thay vì tự động tạo user
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          const userWithRoles = assignRolesForEmail(parsedUser.email, parsedUser);
          setUser(userWithRoles);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - accept any email/password for demo
      const userData = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        avatar: null
      };
      
      // Assign roles based on email
      const userWithRoles = assignRolesForEmail(email, userData);
      const token = `token_${Date.now()}`;
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userWithRoles));
      localStorage.setItem('token', token);
      
      setUser(userWithRoles);
      setIsAuthenticated(true);
      
      return { success: true, data: userWithRoles };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.fullName,
        avatar: null
      };
      
      // Assign roles based on email
      const userWithRoles = assignRolesForEmail(userData.email, newUser);
      const token = `token_${Date.now()}`;
      
      localStorage.setItem('user', JSON.stringify(userWithRoles));
      localStorage.setItem('token', token);
      
      setUser(userWithRoles);
      setIsAuthenticated(true);
      
      return { success: true, data: userWithRoles };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = async (email) => {
    try {
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