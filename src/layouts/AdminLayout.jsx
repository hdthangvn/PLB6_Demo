import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen bg-gray-100">
      <AdminSidebar />
      <main className="ml-80 h-screen overflow-y-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
