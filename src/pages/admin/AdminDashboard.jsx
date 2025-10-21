import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { adminService } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pendingStores: 0,
    approvedStores: 0,
    pendingProducts: 0,
    pendingVariants: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch all stats in parallel
        const [pendingStoresResult, approvedStoresResult, pendingProductsResult, pendingVariantsResult] = await Promise.all([
          adminService.getPendingStores(0, 1),
          adminService.getApprovedStores(0, 1),
          adminService.getPendingProducts(0, 1),
          adminService.getPendingProductVariants(0, 1)
        ]);

        setStats({
          pendingStores: pendingStoresResult.success ? pendingStoresResult.data.totalElements : 0,
          approvedStores: approvedStoresResult.success ? approvedStoresResult.data.totalElements : 0,
          pendingProducts: pendingProductsResult.success ? pendingProductsResult.data.totalElements : 0,
          pendingVariants: pendingVariantsResult.success ? pendingVariantsResult.data.totalElements : 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Cửa hàng chờ duyệt',
      value: stats.pendingStores,
      icon: '🏪',
      color: 'bg-yellow-500',
      href: '/admin/stores?tab=pending'
    },
    {
      title: 'Cửa hàng đã duyệt',
      value: stats.approvedStores,
      icon: '✅',
      color: 'bg-green-500',
      href: '/admin/stores?tab=approved'
    },
    {
      title: 'Sản phẩm chờ duyệt',
      value: stats.pendingProducts,
      icon: '📦',
      color: 'bg-blue-500',
      href: '/admin/products'
    },
    {
      title: 'Biến thể chờ duyệt',
      value: stats.pendingVariants,
      icon: '🔧',
      color: 'bg-purple-500',
      href: '/admin/product-variants'
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">Đang tải thống kê...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tổng quan hệ thống và quản lý nội dung
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => window.location.href = stat.href}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="absolute top-0 right-0 -mt-4 -mr-4">
                <div className={`h-8 w-8 rounded-full ${stat.color} opacity-20`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thao tác nhanh</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/admin/stores?tab=pending"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-yellow-100 text-yellow-600">
                    <span className="text-2xl">🏪</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                    Duyệt cửa hàng
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Xem và duyệt các cửa hàng đang chờ phê duyệt
                  </p>
                </div>
              </a>

              <a
                href="/admin/products"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-blue-100 text-blue-600">
                    <span className="text-2xl">📦</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                    Duyệt sản phẩm
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Xem và duyệt các sản phẩm đang chờ phê duyệt
                  </p>
                </div>
              </a>

              <a
                href="/admin/product-variants"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-purple-100 text-purple-600">
                    <span className="text-2xl">🔧</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                    Duyệt biến thể
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Xem và duyệt các biến thể sản phẩm đang chờ
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Hoạt động gần đây</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <span className="text-white text-sm">📊</span>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Hệ thống đã được khởi tạo và sẵn sàng hoạt động
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          Vừa xong
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
