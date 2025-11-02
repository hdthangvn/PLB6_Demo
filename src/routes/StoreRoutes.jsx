import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StoreAuthGuard from '../components/auth/StoreAuthGuard';
import StoreDashboard from '../pages/store/StoreDashboard';
import StoreProducts from '../pages/store/StoreProducts';
import StoreProfile from '../pages/store/StoreProfile';
import StoreOrders from '../pages/store/StoreOrders';
import StoreProductDetail from '../pages/store/StoreProductDetail';
import StoreOrderDetail from '../pages/store/StoreOrderDetail';
import StorePromotions from '../pages/store/StorePromotions';
import StoreAnalytics from '../pages/store/StoreAnalytics';
import StoreNotifications from '../pages/store/StoreNotifications';
import StoreCreateProduct from '../pages/store/StoreCreateProduct';
import StoreChats from '../pages/store/StoreChats';

const StoreRoutes = () => {
  return (
    <StoreAuthGuard>
      <Routes>
        <Route path="/" element={<StoreDashboard />} />
        <Route path="/dashboard" element={<StoreDashboard />} />
        <Route path="/profile" element={<StoreProfile />} />
        <Route path="/products" element={<StoreProducts />} />
        <Route path="/products/create" element={<StoreCreateProduct />} />
        <Route path="/products/:productId" element={<StoreProductDetail />} />
        <Route path="/orders" element={<StoreOrders />} />
        <Route path="/orders/:orderId" element={<StoreOrderDetail />} />
        <Route path="/promotions" element={<StorePromotions />} />
        <Route path="/analytics" element={<StoreAnalytics />} />
        <Route path="/notifications" element={<StoreNotifications />} />
        <Route path="/chats" element={<StoreChats />} />
      </Routes>
    </StoreAuthGuard>
  );
};

export default StoreRoutes;
