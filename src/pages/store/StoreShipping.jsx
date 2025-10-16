import React, { useState } from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreShipping = () => {
  const { currentStore } = useStoreContext();
  const [activeTab, setActiveTab] = useState('orders');

  // Mock data for shipping
  const shippingOrders = [
    {
      id: 'ORD001',
      customerName: 'Nguyễn Văn A',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      phone: '0123456789',
      products: ['iPhone 15 Pro Max', 'AirPods Pro 2'],
      totalAmount: 35500000,
      shippingMethod: 'EXPRESS',
      status: 'PENDING',
      orderDate: '2024-01-20',
      estimatedDelivery: '2024-01-22'
    },
    {
      id: 'ORD002',
      customerName: 'Trần Thị B',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      phone: '0987654321',
      products: ['MacBook Pro M3'],
      totalAmount: 45000000,
      shippingMethod: 'STANDARD',
      status: 'SHIPPED',
      orderDate: '2024-01-19',
      estimatedDelivery: '2024-01-25',
      trackingNumber: 'VN123456789'
    },
    {
      id: 'ORD003',
      customerName: 'Lê Văn C',
      address: '789 Đường DEF, Quận 3, TP.HCM',
      phone: '0555666777',
      products: ['Samsung Galaxy S24 Ultra'],
      totalAmount: 28000000,
      shippingMethod: 'EXPRESS',
      status: 'DELIVERED',
      orderDate: '2024-01-18',
      estimatedDelivery: '2024-01-20',
      trackingNumber: 'VN987654321',
      deliveredDate: '2024-01-20'
    }
  ];

  const shippingMethods = [
    {
      id: 'STANDARD',
      name: 'Giao hàng tiêu chuẩn',
      description: 'Giao hàng trong 3-5 ngày làm việc',
      cost: 30000,
      isActive: true
    },
    {
      id: 'EXPRESS',
      name: 'Giao hàng nhanh',
      description: 'Giao hàng trong 1-2 ngày làm việc',
      cost: 50000,
      isActive: true
    },
    {
      id: 'SAME_DAY',
      name: 'Giao hàng trong ngày',
      description: 'Giao hàng trong cùng ngày (chỉ TP.HCM)',
      cost: 100000,
      isActive: false
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-600';
      case 'SHIPPED': return 'bg-blue-100 text-blue-600';
      case 'DELIVERED': return 'bg-green-100 text-green-600';
      case 'CANCELLED': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING': return 'Chờ giao';
      case 'SHIPPED': return 'Đang giao';
      case 'DELIVERED': return 'Đã giao';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'STANDARD': return 'bg-blue-100 text-blue-600';
      case 'EXPRESS': return 'bg-green-100 text-green-600';
      case 'SAME_DAY': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getMethodText = (method) => {
    switch (method) {
      case 'STANDARD': return 'Tiêu chuẩn';
      case 'EXPRESS': return 'Nhanh';
      case 'SAME_DAY': return 'Trong ngày';
      default: return method;
    }
  };

  const tabs = [
    { id: 'orders', label: 'Đơn hàng vận chuyển', count: shippingOrders.length },
    { id: 'methods', label: 'Phương thức giao hàng', count: shippingMethods.length },
    { id: 'tracking', label: 'Theo dõi đơn hàng', count: shippingOrders.filter(o => o.trackingNumber).length }
  ];

  const renderOrdersTab = () => (
    <div className="space-y-4">
      {shippingOrders.map(order => (
        <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Đơn hàng #{order.id}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMethodColor(order.shippingMethod)}`}>
                  {getMethodText(order.shippingMethod)}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.address}</p>
                  <p className="text-sm text-gray-600">{order.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sản phẩm:</p>
                  <ul className="text-sm text-gray-900">
                    {order.products.map((product, index) => (
                      <li key={index}>• {product}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{formatPrice(order.totalAmount)}</p>
              <p className="text-sm text-gray-600">Đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
              <p className="text-sm text-gray-600">Dự kiến: {new Date(order.estimatedDelivery).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
          
          {order.trackingNumber && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Mã theo dõi: {order.trackingNumber}</p>
                  <p className="text-sm text-gray-600">Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Theo dõi
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {order.status === 'PENDING' && (
              <>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Xác nhận giao hàng
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Tạo mã theo dõi
                </button>
              </>
            )}
            {order.status === 'SHIPPED' && (
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Đánh dấu đã giao
              </button>
            )}
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              In nhãn
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMethodsTab = () => (
    <div className="space-y-4">
      {shippingMethods.map(method => (
        <div key={method.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${method.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                  {method.isActive ? 'Hoạt động' : 'Tạm dừng'}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{method.description}</p>
              <p className="text-sm text-gray-500">Phí vận chuyển: {formatPrice(method.cost)}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Chỉnh sửa
              </button>
              <button className={`px-4 py-2 rounded-lg text-sm transition-colors ${method.isActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                {method.isActive ? 'Tạm dừng' : 'Kích hoạt'}
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Thêm phương thức giao hàng</h3>
        <p className="text-gray-600 mb-4">Tạo phương thức giao hàng mới cho store</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Thêm phương thức
        </button>
      </div>
    </div>
  );

  const renderTrackingTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theo dõi đơn hàng</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nhập mã đơn hàng hoặc mã theo dõi..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Theo dõi
          </button>
        </div>
      </div>

      {shippingOrders.filter(o => o.trackingNumber).map(order => (
        <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-900">Đơn hàng #{order.id}</h4>
              <p className="text-sm text-gray-600">Mã theo dõi: {order.trackingNumber}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Đơn hàng đã được xác nhận</p>
                <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleString('vi-VN')}</p>
              </div>
            </div>
            
            {order.status !== 'PENDING' && (
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Đơn hàng đang được giao</p>
                  <p className="text-xs text-gray-500">{order.trackingNumber}</p>
                </div>
              </div>
            )}
            
            {order.status === 'DELIVERED' && (
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Đơn hàng đã được giao</p>
                  <p className="text-xs text-gray-500">{new Date(order.deliveredDate).toLocaleString('vi-VN')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'orders': return renderOrdersTab();
      case 'methods': return renderMethodsTab();
      case 'tracking': return renderTrackingTab();
      default: return renderOrdersTab();
    }
  };

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý vận chuyển">
      <StoreLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Quản lý vận chuyển
                  </h1>
                  <p className="text-gray-600 mt-1">Theo dõi và quản lý đơn hàng vận chuyển</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-blue-600">{shippingOrders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Chờ giao</p>
                <p className="text-2xl font-bold text-yellow-600">{shippingOrders.filter(o => o.status === 'PENDING').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đang giao</p>
                <p className="text-2xl font-bold text-blue-600">{shippingOrders.filter(o => o.status === 'SHIPPED').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã giao</p>
                <p className="text-2xl font-bold text-green-600">{shippingOrders.filter(o => o.status === 'DELIVERED').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreShipping;
