import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminStores from '../pages/admin/AdminStores';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminVariants from '../pages/admin/AdminVariants';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import AdminComplaints from '../pages/admin/AdminComplaints';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/stores" element={<AdminStores />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/variants" element={<AdminVariants />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/analytics" element={<AdminAnalytics />} />
        <Route path="/complaints" element={<AdminComplaints />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
