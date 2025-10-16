import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StoreDashboard from '../pages/store/StoreDashboard';
import StoreProducts from '../pages/store/StoreProducts';
import StoreProfile from '../pages/store/StoreProfile';
import StoreOrders from '../pages/store/StoreOrders';
import StoreProductDetail from '../pages/store/StoreProductDetail';
import StoreOrderDetail from '../pages/store/StoreOrderDetail';
import StorePromotions from '../pages/store/StorePromotions';
import StoreAnalytics from '../pages/store/StoreAnalytics';
import StoreReviews from '../pages/store/StoreReviews';
import StoreSettings from '../pages/store/StoreSettings';
import StoreNotifications from '../pages/store/StoreNotifications';
import StoreCustomers from '../pages/store/StoreCustomers';
import StoreInventory from '../pages/store/StoreInventory';
import StoreShipping from '../pages/store/StoreShipping';
import StorePayments from '../pages/store/StorePayments';
import StoreCategories from '../pages/store/StoreCategories';
import StoreBrands from '../pages/store/StoreBrands';
import StoreManagement from '../pages/store/StoreManagement';
import StoreProductVariants from '../pages/store/StoreProductVariants';
import StoreChats from '../pages/store/StoreChats';

const StoreRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<StoreDashboard />} />
      <Route path="/management" element={<StoreManagement />} />
      <Route path="/profile" element={<StoreProfile />} />
      <Route path="/products" element={<StoreProducts />} />
      <Route path="/products/:productId" element={<StoreProductDetail />} />
      <Route path="/product-variants" element={<StoreProductVariants />} />
      <Route path="/orders" element={<StoreOrders />} />
      <Route path="/orders/:orderId" element={<StoreOrderDetail />} />
      <Route path="/promotions" element={<StorePromotions />} />
      <Route path="/analytics" element={<StoreAnalytics />} />
      <Route path="/reviews" element={<StoreReviews />} />
      <Route path="/settings" element={<StoreSettings />} />
          <Route path="/notifications" element={<StoreNotifications />} />
          <Route path="/chats" element={<StoreChats />} />
          <Route path="/customers" element={<StoreCustomers />} />
      <Route path="/inventory" element={<StoreInventory />} />
      <Route path="/shipping" element={<StoreShipping />} />
      <Route path="/payments" element={<StorePayments />} />
      <Route path="/categories" element={<StoreCategories />} />
      <Route path="/brands" element={<StoreBrands />} />
      <Route path="/coupons" element={<div>Store Coupons Page</div>} />
      <Route path="/returns" element={<div>Store Returns Page</div>} />
      <Route path="/support" element={<div>Store Support Page</div>} />
      <Route path="/reports" element={<div>Store Reports Page</div>} />
      <Route path="/website" element={<div>Store Website Page</div>} />
    </Routes>
  );
};

export default StoreRoutes;
