import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SellerDashboard from '../pages/seller/SellerDashboard';
import SellerProducts from '../pages/seller/SellerProducts';
import SellerOrders from '../pages/seller/SellerOrders';
import SellerOrderDetail from '../pages/seller/SellerOrderDetail';
import SellerChats from '../pages/seller/SellerChats';
import SellerNotifications from '../pages/seller/SellerNotifications';
import SellerProfile from '../pages/seller/SellerProfile';
import SellerShop from '../pages/seller/SellerShop';
import SellerAnalytics from '../pages/seller/SellerAnalytics';
import SellerReviews from '../pages/seller/SellerReviews';
import SellerSettings from '../pages/seller/SellerSettings';

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<SellerDashboard />} />
      <Route path="/profile" element={<SellerProfile />} />
      <Route path="/shop" element={<SellerShop />} />
      <Route path="/products" element={<SellerProducts />} />
      <Route path="/orders" element={<SellerOrders />} />
      <Route path="/orders/:orderId" element={<SellerOrderDetail />} />
      <Route path="/chats" element={<SellerChats />} />
      <Route path="/analytics" element={<SellerAnalytics />} />
      <Route path="/reviews" element={<SellerReviews />} />
      <Route path="/settings" element={<SellerSettings />} />
      <Route path="/notifications" element={<SellerNotifications />} />
    </Routes>
  );
};

export default SellerRoutes;
