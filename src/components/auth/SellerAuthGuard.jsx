import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const SellerAuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // Kiểm tra authentication và role
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Kiểm tra role C2C seller (có thể mở rộng logic này)
  // Hiện tại chỉ kiểm tra authentication, có thể thêm role check sau
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default SellerAuthGuard;
