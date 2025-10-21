import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminStores from '../pages/admin/AdminStores';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminProductVariants from '../pages/admin/AdminProductVariants';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/stores" element={<AdminStores />} />
      <Route path="/products" element={<AdminProducts />} />
      <Route path="/product-variants" element={<AdminProductVariants />} />
    </Routes>
  );
};

export default AdminRoutes;
