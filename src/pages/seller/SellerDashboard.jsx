import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SellerLayout from '../../layouts/SellerLayout';

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    activeProducts: 0,
    todayOrders: 0,
    unreadMessages: 0,
    monthlyRevenue: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Mock data dựa trên BE logic
    setStats({
      activeProducts: 12,
      todayOrders: 5,
      unreadMessages: 3,
      monthlyRevenue: 15000000
    });

    setRecentOrders([
      {
        id: '1',
        buyerName: 'Nguyễn Văn A',
        totalPrice: 2500000,
        status: 'PENDING',
        createdAt: '2024-01-15T10:30:00Z',
        items: [
          { productName: 'Laptop Dell XPS 13', quantity: 1, price: 2500000 }
        ]
      },
      {
        id: '2',
        buyerName: 'Trần Thị B',
        totalPrice: 1800000,
        status: 'CONFIRMED',
        createdAt: '2024-01-15T09:15:00Z',
        items: [
          { productName: 'iPhone 14 Pro', quantity: 1, price: 1800000 }
        ]
      }
    ]);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'SHIPPING': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatsCard = ({ title, value, icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            {typeof value === 'number' && title.includes('Doanh thu') ? formatPrice(value) : value}
          </p>
        </div>
      </div>
    </div>
  );

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">Đơn hàng #{order.id}</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm font-medium text-gray-900">Khách hàng: {order.buyerName}</p>
        <div className="mt-2 space-y-1">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.productName} x{item.quantity}</span>
              <span className="font-medium">{formatPrice(item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t">
        <span className="text-lg font-bold text-red-600">
          Tổng: {formatPrice(order.totalPrice)}
        </span>
        <Link 
          to={`/seller/orders/${order.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );

  return (
    <SellerLayout>
      {/* Dashboard Content */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Người Bán</h1>
          <p className="text-gray-600 mt-1">Quản lý sản phẩm và đơn hàng của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard 
            title="Sản phẩm đang bán" 
            value={stats.activeProducts} 
            icon="📦" 
            color="blue" 
          />
          <StatsCard 
            title="Đơn hàng hôm nay" 
            value={stats.todayOrders} 
            icon="📋" 
            color="green" 
          />
          <StatsCard 
            title="Tin nhắn chưa đọc" 
            value={stats.unreadMessages} 
            icon="💬" 
            color="purple" 
          />
          <StatsCard 
            title="Doanh thu tháng" 
            value={stats.monthlyRevenue} 
            icon="💰" 
            color="yellow" 
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Thao tác nhanh</h2>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/seller/products" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              + Thêm sản phẩm mới
            </Link>
            <Link 
              to="/seller/products" 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Quản lý sản phẩm
            </Link>
            <Link 
              to="/seller/chats" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Tin nhắn ({stats.unreadMessages})
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Đơn hàng gần đây</h2>
            <Link 
              to="/seller/orders" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboard;