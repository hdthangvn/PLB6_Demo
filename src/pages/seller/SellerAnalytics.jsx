import React, { useState } from 'react';
import SellerLayout from '../../layouts/SellerLayout';

const SellerAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30days');

  // Mock data
  const analyticsData = {
    revenue: {
      total: 45000000,
      growth: 12.5,
      chart: [
        { month: 'T1', revenue: 15000000 },
        { month: 'T2', revenue: 18000000 },
        { month: 'T3', revenue: 22000000 },
        { month: 'T4', revenue: 25000000 },
        { month: 'T5', revenue: 30000000 },
        { month: 'T6', revenue: 35000000 },
        { month: 'T7', revenue: 40000000 },
        { month: 'T8', revenue: 45000000 }
      ]
    },
    orders: {
      total: 156,
      growth: 8.3,
      chart: [
        { month: 'T1', orders: 45 },
        { month: 'T2', orders: 52 },
        { month: 'T3', orders: 48 },
        { month: 'T4', orders: 61 },
        { month: 'T5', orders: 58 },
        { month: 'T6', orders: 67 },
        { month: 'T7', orders: 72 },
        { month: 'T8', orders: 78 }
      ]
    },
    products: {
      total: 12,
      active: 10,
      inactive: 2,
      topSelling: [
        { name: 'Laptop Dell XPS 13', sales: 25, revenue: 62500000 },
        { name: 'iPhone 14 Pro', sales: 18, revenue: 32400000 },
        { name: 'MacBook Air M2', sales: 15, revenue: 48000000 },
        { name: 'Samsung Galaxy S24', sales: 12, revenue: 18000000 },
        { name: 'iPad Pro 12.9', sales: 8, revenue: 22400000 }
      ]
    },
    customers: {
      total: 89,
      new: 23,
      returning: 66,
      chart: [
        { month: 'T1', customers: 12 },
        { month: 'T2', customers: 15 },
        { month: 'T3', customers: 18 },
        { month: 'T4', customers: 22 },
        { month: 'T5', customers: 19 },
        { month: 'T6', customers: 25 },
        { month: 'T7', customers: 28 },
        { month: 'T8', customers: 31 }
      ]
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const StatCard = ({ title, value, growth, icon, color }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? '+' : ''}{growth}%
            </span>
            <span className="text-xs text-gray-500 ml-1">so với tháng trước</span>
          </div>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, data, type = 'line' }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className={`w-full rounded-t ${
                type === 'line' ? 'bg-blue-500' : 'bg-green-500'
              } transition-all duration-300 hover:opacity-80`}
              style={{ 
                height: `${(item[Object.keys(item)[1]] / Math.max(...data.map(d => d[Object.keys(d)[1]]))) * 200}px` 
              }}
            ></div>
            <span className="text-xs text-gray-500 mt-2">{item[Object.keys(item)[0]]}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Thống kê & Phân tích
                    </h1>
                    <p className="text-gray-600 mt-1">Theo dõi hiệu suất kinh doanh của shop</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="7days">7 ngày qua</option>
                    <option value="30days">30 ngày qua</option>
                    <option value="90days">90 ngày qua</option>
                    <option value="1year">1 năm qua</option>
                  </select>
                  
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Xuất báo cáo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Tổng doanh thu"
            value={formatPrice(analyticsData.revenue.total)}
            growth={analyticsData.revenue.growth}
            icon="💰"
            color="bg-green-100"
          />
          <StatCard
            title="Tổng đơn hàng"
            value={analyticsData.orders.total}
            growth={analyticsData.orders.growth}
            icon="📋"
            color="bg-blue-100"
          />
          <StatCard
            title="Sản phẩm đang bán"
            value={`${analyticsData.products.active}/${analyticsData.products.total}`}
            growth={5.2}
            icon="📦"
            color="bg-purple-100"
          />
          <StatCard
            title="Khách hàng"
            value={analyticsData.customers.total}
            growth={15.8}
            icon="👥"
            color="bg-orange-100"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Doanh thu theo tháng"
            data={analyticsData.revenue.chart}
            type="line"
          />
          <ChartCard
            title="Đơn hàng theo tháng"
            data={analyticsData.orders.chart}
            type="bar"
          />
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sản phẩm bán chạy nhất</h3>
          <div className="space-y-4">
            {analyticsData.products.topSelling.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.sales} đơn hàng</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatPrice(product.revenue)}</p>
                  <p className="text-sm text-gray-500">Doanh thu</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân tích khách hàng</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Khách hàng mới</span>
                <span className="font-semibold text-green-600">{analyticsData.customers.new}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Khách hàng quay lại</span>
                <span className="font-semibold text-blue-600">{analyticsData.customers.returning}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(analyticsData.customers.new / analyticsData.customers.total) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tỷ lệ chuyển đổi</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tỷ lệ chuyển đổi</span>
                <span className="font-semibold text-purple-600">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Giá trị đơn hàng trung bình</span>
                <span className="font-semibold text-orange-600">{formatPrice(288461)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tỷ lệ hoàn trả</span>
                <span className="font-semibold text-red-600">2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerAnalytics;
