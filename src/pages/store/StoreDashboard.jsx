import React from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreDashboard = () => {
  const { currentStore } = useStoreContext();
  
  // Mock data động theo chi nhánh
  const getStatsByBranch = (branchId) => {
    const branchStats = {
      'branch-1': { // Hải Châu
        revenue: {
          today: 12500000,
          thisWeek: 85000000,
          thisMonth: 350000000,
          growth: 15.2
        },
        orders: {
          pending: 12,
          confirmed: 8,
          shipped: 15,
          delivered: 45,
          cancelled: 3,
          total: 83
        },
        products: {
          active: 45,
          inactive: 3,
          outOfStock: 2,
          total: 50
        },
        customers: {
          new: 23,
          returning: 156,
          total: 179
        }
      },
      'branch-2': { // Thanh Khê
        revenue: {
          today: 8500000,
          thisWeek: 65000000,
          thisMonth: 280000000,
          growth: 12.8
        },
        orders: {
          pending: 8,
          confirmed: 6,
          shipped: 12,
          delivered: 35,
          cancelled: 2,
          total: 63
        },
        products: {
          active: 32,
          inactive: 2,
          outOfStock: 1,
          total: 35
        },
        customers: {
          new: 18,
          returning: 98,
          total: 116
        }
      },
      'branch-3': { // Sơn Trà
        revenue: {
          today: 0,
          thisWeek: 0,
          thisMonth: 0,
          growth: 0
        },
        orders: {
          pending: 0,
          confirmed: 0,
          shipped: 0,
          delivered: 0,
          cancelled: 0,
          total: 0
        },
        products: {
          active: 28,
          inactive: 0,
          outOfStock: 0,
          total: 28
        },
        customers: {
          new: 0,
          returning: 0,
          total: 0
        }
      }
    };
    
    return branchStats[branchId] || branchStats['branch-1'];
  };
  
  const stats = currentStore ? getStatsByBranch(currentStore.id) : getStatsByBranch('branch-1');

  const getRecentOrdersByBranch = (branchId) => {
    const branchOrders = {
      'branch-1': [ // Hải Châu
        {
          id: 'ORD001',
          customer: 'Nguyễn Văn A',
          product: 'iPhone 15 Pro',
          amount: 25000000,
          status: 'PENDING',
          date: '2024-01-20'
        },
        {
          id: 'ORD002',
          customer: 'Trần Thị B',
          product: 'MacBook Air M2',
          amount: 32000000,
          status: 'CONFIRMED',
          date: '2024-01-20'
        },
        {
          id: 'ORD003',
          customer: 'Lê Văn C',
          product: 'Samsung Galaxy S24',
          amount: 28000000,
          status: 'SHIPPING',
          date: '2024-01-19'
        }
      ],
      'branch-2': [ // Thanh Khê
        {
          id: 'ORD004',
          customer: 'Phạm Thị D',
          product: 'Dell XPS 13',
          amount: 15000000,
          status: 'PENDING',
          date: '2024-01-20'
        },
        {
          id: 'ORD005',
          customer: 'Hoàng Văn E',
          product: 'iPad Pro 12.9',
          amount: 18000000,
          status: 'CONFIRMED',
          date: '2024-01-19'
        },
        {
          id: 'ORD006',
          customer: 'Vũ Thị F',
          product: 'Surface Laptop 5',
          amount: 20000000,
          status: 'SHIPPING',
          date: '2024-01-18'
        }
      ],
      'branch-3': [] // Sơn Trà - chưa có đơn hàng
    };
    
    return branchOrders[branchId] || branchOrders['branch-1'];
  };
  
  const recentOrders = currentStore ? getRecentOrdersByBranch(currentStore.id) : getRecentOrdersByBranch('branch-1');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      PENDING: 'Chờ xác nhận',
      CONFIRMED: 'Đã xác nhận',
      SHIPPED: 'Đang giao',
      DELIVERED: 'Đã giao',
      CANCELLED: 'Đã hủy'
    };
    return texts[status] || status;
  };

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="bảng điều khiển">
      <StoreLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-2xl p-6">
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      <span className="text-cyan-600">Tổng quan</span> <span className="text-blue-600">cửa hàng</span>
                    </h1>
                    <p className="text-gray-600 mt-1">Tổng quan về hoạt động cửa hàng</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">Tăng trưởng tháng này:</span>
                    <span className="text-lg font-bold text-green-600">+{stats.revenue.growth}%</span>
                  </div>
                  <p className="text-sm text-gray-500">So với tháng trước</p>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">💰</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Doanh thu hôm nay</p>
                      <p className="text-xl font-bold text-gray-900">{formatPrice(stats.revenue.today)}</p>
                      <p className="text-xs text-green-600">+12.5% so với hôm qua</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đơn hàng mới</p>
                      <p className="text-xl font-bold text-gray-900">{stats.orders.pending}</p>
                      <p className="text-xs text-blue-600">+8 trong 24h qua</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📦</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sản phẩm đang bán</p>
                      <p className="text-xl font-bold text-gray-900">{stats.products.active}</p>
                      <p className="text-xs text-purple-600">+3 tuần này</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">👥</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Khách hàng mới</p>
                      <p className="text-xl font-bold text-gray-900">{stats.customers.new}</p>
                      <p className="text-xs text-orange-600">+15 tuần này</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/store/products"
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📦</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Thêm sản phẩm</h4>
                <p className="text-sm text-gray-600">Tạo sản phẩm mới</p>
              </div>
            </Link>

            <Link
              to="/store/orders"
              className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📋</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Xem đơn hàng</h4>
                <p className="text-sm text-gray-600">Quản lý đơn hàng</p>
              </div>
            </Link>

            <Link
              to="/store/promotions"
              className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🎯</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Tạo khuyến mãi</h4>
                <p className="text-sm text-gray-600">Chương trình giảm giá</p>
              </div>
            </Link>

            <Link
              to="/store/analytics"
              className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📈</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Xem báo cáo</h4>
                <p className="text-sm text-gray-600">Thống kê doanh thu</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h3>
            <Link
              to="/store/orders"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Xem tất cả →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">#{order.id.slice(-3)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{order.customer}</h4>
                    <p className="text-sm text-gray-600">{order.product}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatPrice(order.amount)}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái đơn hàng</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chờ xác nhận</span>
                <span className="font-semibold text-yellow-600">{stats.orders.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đã xác nhận</span>
                <span className="font-semibold text-blue-600">{stats.orders.confirmed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đang giao</span>
                <span className="font-semibold text-purple-600">{stats.orders.shipped}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đã giao</span>
                <span className="font-semibold text-green-600">{stats.orders.delivered}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đã hủy</span>
                <span className="font-semibold text-red-600">{stats.orders.cancelled}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan sản phẩm</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đang bán</span>
                <span className="font-semibold text-green-600">{stats.products.active}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tạm dừng</span>
                <span className="font-semibold text-gray-600">{stats.products.inactive}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hết hàng</span>
                <span className="font-semibold text-red-600">{stats.products.outOfStock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tổng cộng</span>
                <span className="font-semibold text-blue-600">{stats.products.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreDashboard;
