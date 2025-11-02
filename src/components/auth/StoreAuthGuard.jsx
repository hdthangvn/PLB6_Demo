import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const StoreAuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // Kiểm tra authentication và role
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Kiểm tra role B2C store owner (có thể mở rộng logic này)
  // Hiện tại chỉ kiểm tra authentication, có thể thêm role check sau
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default StoreAuthGuard;
