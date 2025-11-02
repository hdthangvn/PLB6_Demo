import React, { useState, useEffect } from 'react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d, 1y
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalStores: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    usersGrowth: 0,
    storesGrowth: 0
  });

  const [chartData, setChartData] = useState({
    revenue: [],
    orders: [],
    users: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Mock data based on time range
      const mockData = {
        '7d': {
          totalRevenue: 125000000,
          totalOrders: 1250,
          totalUsers: 12500,
          totalStores: 125,
          revenueGrowth: 12.5,
          ordersGrowth: 8.3,
          usersGrowth: 15.2,
          storesGrowth: 5.1,
          revenue: [
            { date: '2024-01-15', value: 15000000 },
            { date: '2024-01-16', value: 18000000 },
            { date: '2024-01-17', value: 22000000 },
            { date: '2024-01-18', value: 19000000 },
            { date: '2024-01-19', value: 25000000 },
            { date: '2024-01-20', value: 28000000 },
            { date: '2024-01-21', value: 30000000 }
          ],
          orders: [
            { date: '2024-01-15', value: 150 },
            { date: '2024-01-16', value: 180 },
            { date: '2024-01-17', value: 220 },
            { date: '2024-01-18', value: 190 },
            { date: '2024-01-19', value: 250 },
            { date: '2024-01-20', value: 280 },
            { date: '2024-01-21', value: 300 }
          ],
          users: [
            { date: '2024-01-15', value: 1500 },
            { date: '2024-01-16', value: 1800 },
            { date: '2024-01-17', value: 2200 },
            { date: '2024-01-18', value: 1900 },
            { date: '2024-01-19', value: 2500 },
            { date: '2024-01-20', value: 2800 },
            { date: '2024-01-21', value: 3000 }
          ]
        },
        '30d': {
          totalRevenue: 450000000,
          totalOrders: 4500,
          totalUsers: 45000,
          totalStores: 450,
          revenueGrowth: 25.3,
          ordersGrowth: 18.7,
          usersGrowth: 22.1,
          storesGrowth: 12.5,
          revenue: Array.from({ length: 30 }, (_, i) => ({
            date: `2024-01-${String(i + 1).padStart(2, '0')}`,
            value: Math.floor(Math.random() * 20000000) + 10000000
          })),
          orders: Array.from({ length: 30 }, (_, i) => ({
            date: `2024-01-${String(i + 1).padStart(2, '0')}`,
            value: Math.floor(Math.random() * 200) + 100
          })),
          users: Array.from({ length: 30 }, (_, i) => ({
            date: `2024-01-${String(i + 1).padStart(2, '0')}`,
            value: Math.floor(Math.random() * 2000) + 1000
          }))
        }
      };

      const data = mockData[timeRange] || mockData['7d'];
      setStats(data);
      setChartData({
        revenue: data.revenue,
        orders: data.orders,
        users: data.users
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const getTimeRangeLabel = (range) => {
    switch (range) {
      case '7d': return '7 ngày qua';
      case '30d': return '30 ngày qua';
      case '90d': return '90 ngày qua';
      case '1y': return '1 năm qua';
      default: return '7 ngày qua';
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Thống kê & Phân tích</h1>
            <p className="text-gray-600 mt-1">Thống kê tổng quan hệ thống</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">7 ngày qua</option>
              <option value="30d">30 ngày qua</option>
              <option value="90d">90 ngày qua</option>
              <option value="1y">1 năm qua</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-green-600 font-medium">+{stats.revenueGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">so với kỳ trước</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
                <p className="text-3xl font-bold text-blue-600">{formatNumber(stats.totalOrders)}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-blue-600 font-medium">+{stats.ordersGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">so với kỳ trước</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.totalUsers)}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-purple-600 font-medium">+{stats.usersGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">so với kỳ trước</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Store</p>
                <p className="text-3xl font-bold text-orange-600">{formatNumber(stats.totalStores)}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-orange-600 font-medium">+{stats.storesGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">so với kỳ trước</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏪</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo thời gian</h3>
            <div className="h-64 flex items-end justify-between space-x-1">
              {chartData.revenue.map((item, index) => {
                const maxValue = Math.max(...chartData.revenue.map(d => d.value));
                const height = (item.value / maxValue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-green-500 rounded-t w-full transition-all duration-300 hover:bg-green-600"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                      title={`${new Date(item.date).toLocaleDateString('vi-VN')}: ${formatCurrency(item.value)}`}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                      {new Date(item.date).getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng theo thời gian</h3>
            <div className="h-64 flex items-end justify-between space-x-1">
              {chartData.orders.map((item, index) => {
                const maxValue = Math.max(...chartData.orders.map(d => d.value));
                const height = (item.value / maxValue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                      title={`${new Date(item.date).toLocaleDateString('vi-VN')}: ${item.value} đơn`}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                      {new Date(item.date).getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh mục sản phẩm phổ biến</h3>
          <div className="space-y-4">
            {[
              { name: 'Smartphones', orders: 1250, revenue: 125000000, color: 'bg-blue-500' },
              { name: 'Laptops', orders: 890, revenue: 89000000, color: 'bg-green-500' },
              { name: 'Audio', orders: 650, revenue: 65000000, color: 'bg-purple-500' },
              { name: 'Cameras', orders: 420, revenue: 42000000, color: 'bg-orange-500' },
              { name: 'TV', orders: 380, revenue: 38000000, color: 'bg-red-500' }
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${category.color} mr-3`}></div>
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-sm text-gray-600">{category.orders} đơn</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(category.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            {[
              { action: 'Store mới đăng ký', target: 'TechPro Store', time: '2 phút trước', type: 'store' },
              { action: 'Sản phẩm được duyệt', target: 'iPhone 15 Pro', time: '15 phút trước', type: 'product' },
              { action: 'Đơn hàng mới', target: '#ORD-2025-001', time: '30 phút trước', type: 'order' },
              { action: 'Người dùng mới', target: 'Nguyễn Văn A', time: '1 giờ trước', type: 'user' },
              { action: 'Khiếu nại mới', target: 'Đơn hàng #ORD-2025-002', time: '2 giờ trước', type: 'complaint' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm">
                      {activity.type === 'store' ? '🏪' : 
                       activity.type === 'product' ? '📦' : 
                       activity.type === 'order' ? '📋' : 
                       activity.type === 'user' ? '👤' : '⚠️'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{activity.action}</span>
                    <span className="text-sm text-gray-600 ml-1">{activity.target}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default AdminAnalytics;
