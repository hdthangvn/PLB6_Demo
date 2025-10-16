import React, { useState } from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreAnalytics = () => {
  const { currentStore } = useStoreContext();
  const [timeRange, setTimeRange] = useState('30days');

  // Mock data động theo chi nhánh
  const getAnalyticsByBranch = (branchId) => {
    const branchAnalytics = {
      'branch-1': { // Hải Châu - Điện thoại cao cấp
        revenue: {
          total: 125000000,
          growth: 18.5,
          chart: [
            { month: 'T1', revenue: 35000000 },
            { month: 'T2', revenue: 42000000 },
            { month: 'T3', revenue: 48000000 },
            { month: 'T4', revenue: 55000000 },
            { month: 'T5', revenue: 62000000 },
            { month: 'T6', revenue: 70000000 },
            { month: 'T7', revenue: 85000000 },
            { month: 'T8', revenue: 125000000 }
          ]
        },
        orders: {
          total: 456,
          growth: 12.3,
          chart: [
            { month: 'T1', orders: 125 },
            { month: 'T2', orders: 142 },
            { month: 'T3', orders: 138 },
            { month: 'T4', orders: 161 },
            { month: 'T5', orders: 158 },
            { month: 'T6', orders: 167 },
            { month: 'T7', orders: 182 },
            { month: 'T8', orders: 198 }
          ]
        },
        products: {
          total: 25,
          active: 22,
          inactive: 3,
          topSelling: [
            { name: 'iPhone 15 Pro Max', sales: 45, revenue: 135000000 },
            { name: 'MacBook Air M2', sales: 38, revenue: 106400000 },
            { name: 'Samsung Galaxy S24 Ultra', sales: 32, revenue: 102400000 },
            { name: 'Dell XPS 13', sales: 28, revenue: 42000000 },
            { name: 'iPad Pro 12.9', sales: 25, revenue: 70000000 }
          ]
        },
        customers: {
          total: 289,
          new: 67,
          returning: 222,
          chart: [
            { month: 'T1', customers: 32 },
            { month: 'T2', customers: 45 },
            { month: 'T3', customers: 38 },
            { month: 'T4', customers: 52 },
            { month: 'T5', customers: 49 },
            { month: 'T6', customers: 55 },
            { month: 'T7', customers: 62 },
            { month: 'T8', customers: 67 }
          ]
        }
      },
      'branch-2': { // Thanh Khê - Laptop và phụ kiện
        revenue: {
          total: 85000000,
          growth: 12.8,
          chart: [
            { month: 'T1', revenue: 25000000 },
            { month: 'T2', revenue: 30000000 },
            { month: 'T3', revenue: 35000000 },
            { month: 'T4', revenue: 40000000 },
            { month: 'T5', revenue: 45000000 },
            { month: 'T6', revenue: 50000000 },
            { month: 'T7', revenue: 65000000 },
            { month: 'T8', revenue: 85000000 }
          ]
        },
        orders: {
          total: 289,
          growth: 8.5,
          chart: [
            { month: 'T1', orders: 75 },
            { month: 'T2', orders: 85 },
            { month: 'T3', orders: 82 },
            { month: 'T4', orders: 95 },
            { month: 'T5', orders: 88 },
            { month: 'T6', orders: 92 },
            { month: 'T7', orders: 105 },
            { month: 'T8', orders: 89 }
          ]
        },
        products: {
          total: 18,
          active: 16,
          inactive: 2,
          topSelling: [
            { name: 'Dell XPS 13', sales: 28, revenue: 42000000 },
            { name: 'MacBook Air M2', sales: 25, revenue: 70000000 },
            { name: 'Surface Laptop 5', sales: 22, revenue: 44000000 },
            { name: 'Lenovo ThinkPad', sales: 18, revenue: 36000000 },
            { name: 'HP Spectre x360', sales: 15, revenue: 30000000 }
          ]
        },
        customers: {
          total: 189,
          new: 45,
          returning: 144,
          chart: [
            { month: 'T1', customers: 22 },
            { month: 'T2', customers: 28 },
            { month: 'T3', customers: 25 },
            { month: 'T4', customers: 32 },
            { month: 'T5', customers: 29 },
            { month: 'T6', customers: 35 },
            { month: 'T7', customers: 38 },
            { month: 'T8', customers: 45 }
          ]
        }
      },
      'branch-3': { // Sơn Trà - Gaming và âm thanh
        revenue: {
          total: 0,
          growth: 0,
          chart: [
            { month: 'T1', revenue: 0 },
            { month: 'T2', revenue: 0 },
            { month: 'T3', revenue: 0 },
            { month: 'T4', revenue: 0 },
            { month: 'T5', revenue: 0 },
            { month: 'T6', revenue: 0 },
            { month: 'T7', revenue: 0 },
            { month: 'T8', revenue: 0 }
          ]
        },
        orders: {
          total: 0,
          growth: 0,
          chart: [
            { month: 'T1', orders: 0 },
            { month: 'T2', orders: 0 },
            { month: 'T3', orders: 0 },
            { month: 'T4', orders: 0 },
            { month: 'T5', orders: 0 },
            { month: 'T6', orders: 0 },
            { month: 'T7', orders: 0 },
            { month: 'T8', orders: 0 }
          ]
        },
        products: {
          total: 15,
          active: 15,
          inactive: 0,
          topSelling: [
            { name: 'Gaming Headset', sales: 0, revenue: 0 },
            { name: 'Mechanical Keyboard', sales: 0, revenue: 0 },
            { name: 'Gaming Mouse', sales: 0, revenue: 0 },
            { name: 'Monitor 27"', sales: 0, revenue: 0 },
            { name: 'Webcam HD', sales: 0, revenue: 0 }
          ]
        },
        customers: {
          total: 0,
          new: 0,
          returning: 0,
          chart: [
            { month: 'T1', customers: 0 },
            { month: 'T2', customers: 0 },
            { month: 'T3', customers: 0 },
            { month: 'T4', customers: 0 },
            { month: 'T5', customers: 0 },
            { month: 'T6', customers: 0 },
            { month: 'T7', customers: 0 },
            { month: 'T8', customers: 0 }
          ]
        }
      }
    };
    
    return branchAnalytics[branchId] || branchAnalytics['branch-1'];
  };
  
  const analyticsData = currentStore ? getAnalyticsByBranch(currentStore.id) : getAnalyticsByBranch('branch-1');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="phân tích dữ liệu">
      <StoreLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl opacity-5"></div>
              <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Phân tích dữ liệu
                      </h1>
                      <p className="text-gray-600 mt-1">Thống kê và báo cáo chi tiết</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <option value="7days">7 ngày qua</option>
                      <option value="30days">30 ngày qua</option>
                      <option value="90days">90 ngày qua</option>
                      <option value="1year">1 năm qua</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(analyticsData.revenue.total)}</p>
                  <p className="text-sm text-green-600">+{analyticsData.revenue.growth}% so với tháng trước</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.orders.total)}</p>
                  <p className="text-sm text-green-600">+{analyticsData.orders.growth}% so với tháng trước</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sản phẩm</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.products.total)}</p>
                  <p className="text-sm text-gray-500">{formatNumber(analyticsData.products.active)} đang bán</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Khách hàng</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.customers.total)}</p>
                  <p className="text-sm text-gray-500">{formatNumber(analyticsData.customers.new)} mới</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {analyticsData.revenue.chart.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                      style={{ height: `${(item.revenue / Math.max(...analyticsData.revenue.chart.map(c => c.revenue))) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                    <span className="text-xs text-gray-700 font-medium">{formatPrice(item.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders Chart */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng theo tháng</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {analyticsData.orders.chart.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                      style={{ height: `${(item.orders / Math.max(...analyticsData.orders.chart.map(c => c.orders))) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                    <span className="text-xs text-gray-700 font-medium">{formatNumber(item.orders)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm bán chạy</h3>
            <div className="space-y-4">
              {analyticsData.products.topSelling.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{formatNumber(product.sales)} sản phẩm đã bán</p>
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
        </div>
      </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreAnalytics;