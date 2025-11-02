import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pendingStores: 12,
    pendingProducts: 45,
    pendingVariants: 23,
    totalStores: 156,
    newComplaints: 8,
    pendingReports: 5,
    totalUsers: 1247,
    totalOrders: 8934
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'store_approval',
      message: 'Store "TechPro Store" đã được duyệt',
      time: '2 phút trước',
      status: 'success'
    },
    {
      id: 2,
      type: 'product_rejection',
      message: 'Sản phẩm "iPhone 15 Pro" bị từ chối - Thiếu thông tin',
      time: '15 phút trước',
      status: 'warning'
    },
    {
      id: 3,
      type: 'complaint',
      message: 'Khiếu nại mới từ khách hàng về đơn hàng #ORD-1234',
      time: '1 giờ trước',
      status: 'error'
    },
    {
      id: 4,
      type: 'variant_approval',
      message: 'Biến thể "128GB - Màu đen" đã được duyệt',
      time: '2 giờ trước',
      status: 'success'
    },
    {
      id: 5,
      type: 'report',
      message: 'Báo cáo vi phạm từ store "ABC Shop"',
      time: '3 giờ trước',
      status: 'warning'
    }
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'store_approval':
        return '🏪';
      case 'product_rejection':
        return '📦';
      case 'complaint':
        return '⚠️';
      case 'variant_approval':
        return '🔧';
      case 'report':
        return '📊';
      default:
        return '📋';
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Quản lý và giám sát hệ thống</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Store chờ duyệt</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingStores}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏪</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-yellow-600 font-medium">Cần xử lý ngay</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sản phẩm chờ duyệt</p>
                <p className="text-3xl font-bold text-blue-600">{stats.pendingProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-blue-600 font-medium">Cần kiểm tra</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Khiếu nại mới</p>
                <p className="text-3xl font-bold text-red-600">{stats.newComplaints}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-red-600 font-medium">Cần xử lý khẩn cấp</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Store</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalStores}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">Đang hoạt động</span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Hoạt động gần đây</h2>
            <p className="text-gray-600 mt-1">Các hoạt động quản lý mới nhất</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.status)}`}>
                    {activity.status === 'success' ? 'Thành công' : 
                     activity.status === 'warning' ? 'Cảnh báo' : 'Lỗi'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Duyệt Store</h3>
            <p className="text-gray-600 mb-4">Kiểm tra và duyệt các store đang chờ</p>
            <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
              Xem Store chờ duyệt
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Duyệt Sản phẩm</h3>
            <p className="text-gray-600 mb-4">Kiểm tra và duyệt các sản phẩm mới</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Xem Sản phẩm chờ duyệt
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Xử lý Khiếu nại</h3>
            <p className="text-gray-600 mb-4">Xem và xử lý các khiếu nại từ khách hàng</p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
              Xem Khiếu nại
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Báo cáo Vi phạm</h3>
            <p className="text-gray-600 mb-4">Xem và xử lý các báo cáo vi phạm</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
              Xem Báo cáo
            </button>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
