import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { StoreProvider } from './context/StoreContext';
import AuthPage from './pages/auth/AuthPage';
import HomePage from './pages/home/HomePage';
import ProductDetail from './pages/products/ProductDetail';
import ProductList from './pages/products/ProductList';
import CartPage from './pages/cart/CartPage';
import ShopPage from './pages/shop/ShopPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/orders/OrdersPage';
import SearchResults from './pages/search/SearchResults';
import ProfilePage from './pages/profile/ProfilePage';
import APITestPage from './pages/test/APITestPage';
import StoresPage from './pages/stores/StoresPage';
import StoreDetailPage from './pages/stores/StoreDetailPage';
import SellerRoutes from './routes/SellerRoutes';
import StoreRoutes from './routes/StoreRoutes';
import AdminRoutes from './routes/AdminRoutes';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  // Bỏ qua loading check để seller routes luôn hoạt động
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/shop/:id" element={<ShopPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/test" element={<APITestPage />} />
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/store/:id" element={<StoreDetailPage />} />
      
      {/* Seller Routes */}
      <Route path="/seller/*" element={<SellerRoutes />} />
      
      {/* Store Routes */}
      <Route path="/store/*" element={<StoreRoutes />} />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <StoreProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </StoreProvider>
      </CartProvider>
    </AuthProvider>
  );
}
