import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SellerLayout from '../../layouts/SellerLayout';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data với 20 đơn hàng mẫu cho C2C Seller
      const mockOrders = [
        {
          id: 'ORD-001',
          buyerName: 'Nguyễn Văn A',
          buyerPhone: '0123456789',
          buyerEmail: 'nguyenvana@email.com',
          status: 'PENDING',
          totalPrice: 35500000,
          createdAt: '2024-01-20T10:30:00Z',
          items: [
            { productName: 'iPhone 14 Pro', quantity: 1, price: 30000000 },
            { productName: 'AirPods Pro 2', quantity: 1, price: 5500000 }
          ],
          shippingAddress: '123 Đường ABC, Phường 1, Quận 1, TP.HCM',
          note: 'Giao hàng vào buổi chiều'
        },
        {
          id: 'ORD-002',
          buyerName: 'Trần Thị B',
          buyerPhone: '0987654321',
          buyerEmail: 'tranthib@email.com',
          status: 'CONFIRMED',
          totalPrice: 28000000,
          createdAt: '2024-01-20T09:15:00Z',
          items: [
            { productName: 'MacBook Air M2', quantity: 1, price: 28000000 }
          ],
          shippingAddress: '456 Đường XYZ, Phường 2, Quận 2, TP.HCM',
          note: ''
        },
        {
          id: 'ORD-003',
          buyerName: 'Lê Văn C',
          buyerPhone: '0369258147',
          buyerEmail: 'levanc@email.com',
          status: 'SHIPPING',
          totalPrice: 32000000,
          createdAt: '2024-01-19T14:20:00Z',
          items: [
            { productName: 'Samsung Galaxy S24', quantity: 1, price: 32000000 }
          ],
          shippingAddress: '789 Đường DEF, Phường 3, Quận 3, TP.HCM',
          note: 'Giao hàng nhanh'
        },
        {
          id: 'ORD-004',
          buyerName: 'Phạm Thị D',
          buyerPhone: '0741852963',
          buyerEmail: 'phamthid@email.com',
          status: 'DELIVERED',
          totalPrice: 15000000,
          createdAt: '2024-01-19T10:45:00Z',
          items: [
            { productName: 'Dell XPS 13', quantity: 1, price: 15000000 }
          ],
          shippingAddress: '321 Đường GHI, Phường 4, Quận 4, TP.HCM',
          note: ''
        },
        {
          id: 'ORD-005',
          buyerName: 'Hoàng Văn E',
          buyerPhone: '0852741963',
          buyerEmail: 'hoangvane@email.com',
          status: 'CANCELLED',
          totalPrice: 28000000,
          createdAt: '2024-01-18T16:30:00Z',
          items: [
            { productName: 'iPad Pro 12.9', quantity: 1, price: 28000000 }
          ],
          shippingAddress: '654 Đường JKL, Phường 5, Quận 5, TP.HCM',
          note: 'Khách hủy đơn'
        },
        {
          id: 'ORD-006',
          buyerName: 'Vũ Thị F',
          buyerPhone: '0963852741',
          buyerEmail: 'vuthif@email.com',
          status: 'PENDING',
          totalPrice: 22000000,
          createdAt: '2024-01-18T09:15:00Z',
          items: [
            { productName: 'AirPods Pro 2', quantity: 2, price: 11000000 },
            { productName: 'Apple Watch Series 9', quantity: 1, price: 11000000 }
          ],
          shippingAddress: '987 Đường MNO, Phường 6, Quận 6, TP.HCM',
          note: ''
        },
        {
          id: 'ORD-007',
          buyerName: 'Đặng Văn G',
          buyerPhone: '0147258369',
          buyerEmail: 'dangvang@email.com',
          status: 'CONFIRMED',
          totalPrice: 45000000,
          createdAt: '2024-01-17T15:45:00Z',
          items: [
            { productName: 'MacBook Pro M3', quantity: 1, price: 45000000 }
          ],
          shippingAddress: '147 Đường PQR, Phường 7, Quận 7, TP.HCM',
          note: ''
        },
        {
          id: 'ORD-008',
          buyerName: 'Bùi Thị H',
          buyerPhone: '0258369741',
          buyerEmail: 'buithih@email.com',
          status: 'SHIPPING',
          totalPrice: 18000000,
          createdAt: '2024-01-17T11:20:00Z',
          items: [
            { productName: 'Xiaomi 13 Pro', quantity: 1, price: 18000000 }
          ],
          shippingAddress: '258 Đường STU, Phường 8, Quận 8, TP.HCM',
          note: ''
        },
        {
          id: 'ORD-009',
          buyerName: 'Ngô Văn I',
          buyerPhone: '0369741852',
          buyerEmail: 'ngovani@email.com',
          status: 'DELIVERED',
          totalPrice: 3200000,
          createdAt: '2024-01-16T13:30:00Z',
          items: [
            { productName: 'Keychron K8 Pro', quantity: 1, price: 3200000 }
          ],
          shippingAddress: '369 Đường VWX, Phường 9, Quận 9, TP.HCM',
          note: ''
        },
        {
          id: 'ORD-010',
          buyerName: 'Lý Thị K',
          buyerPhone: '0471852963',
          buyerEmail: 'lythik@email.com',
          status: 'CANCELLED',
          totalPrice: 12000000,
          createdAt: '2024-01-16T08:45:00Z',
          items: [
            { productName: 'iPad Air 5', quantity: 1, price: 12000000 }
          ],
          shippingAddress: '471 Đường YZA, Phường 10, Quận 10, TP.HCM',
          note: ''
        },
        // Đơn hàng có nhiều sản phẩm để test
        {
          id: 'ORD-011',
          buyerName: 'Nguyễn Thị M',
          buyerPhone: '0123456789',
          buyerEmail: 'nguyenthim@email.com',
          status: 'PENDING',
          totalPrice: 65000000,
          createdAt: '2024-01-15T14:30:00Z',
          items: [
            { productName: 'iPhone 15 Pro Max', quantity: 1, price: 30000000 },
            { productName: 'AirPods Pro 2', quantity: 1, price: 5500000 },
            { productName: 'Apple Watch Series 9', quantity: 1, price: 11000000 },
            { productName: 'MacBook Air M2', quantity: 1, price: 28000000 }
          ],
          shippingAddress: '123 Đường ABC, Phường 1, Quận 1, TP.HCM',
          note: 'Giao hàng vào buổi chiều'
        },
        {
          id: 'ORD-012',
          buyerName: 'Trần Văn N',
          buyerPhone: '0987654321',
          buyerEmail: 'tranvann@email.com',
          status: 'CONFIRMED',
          totalPrice: 85000000,
          createdAt: '2024-01-15T11:20:00Z',
          items: [
            { productName: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 32000000 },
            { productName: 'Samsung Galaxy Buds Pro', quantity: 1, price: 3500000 },
            { productName: 'Samsung Galaxy Watch 6', quantity: 1, price: 8000000 },
            { productName: 'Samsung Tab S9', quantity: 1, price: 15000000 },
            { productName: 'Samsung Galaxy Book Pro', quantity: 1, price: 26500000 }
          ],
          shippingAddress: '456 Đường XYZ, Phường 2, Quận 2, TP.HCM',
          note: ''
        },
        {
          id: 'ORD-013',
          buyerName: 'Lê Thị O',
          buyerPhone: '0369258147',
          buyerEmail: 'lethio@email.com',
          status: 'SHIPPING',
          totalPrice: 95000000,
          createdAt: '2024-01-14T16:45:00Z',
          items: [
            { productName: 'Dell XPS 13', quantity: 1, price: 15000000 },
            { productName: 'Dell XPS 15', quantity: 1, price: 25000000 },
            { productName: 'Dell Monitor 27"', quantity: 1, price: 8000000 },
            { productName: 'Dell Keyboard', quantity: 1, price: 2000000 },
            { productName: 'Dell Mouse', quantity: 1, price: 1000000 },
            { productName: 'Dell Webcam', quantity: 1, price: 3000000 }
          ],
          shippingAddress: '789 Đường DEF, Phường 3, Quận 3, TP.HCM',
          note: 'Giao hàng nhanh'
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    
    const orderDate = new Date(order.createdAt);
    let matchesDate = true;
    
    if (startDate && endDate) {
      const start = new Date(startDate + 'T00:00:00');
      const end = new Date(endDate + 'T23:59:59');
      matchesDate = orderDate >= start && orderDate <= end;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus }
            : order
        )
      );
      console.log(`Order ${orderId} status changed to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING': return 'Chờ xác nhận';
      case 'CONFIRMED': return 'Đã xác nhận';
      case 'SHIPPED': return 'Đang giao';
      case 'DELIVERED': return 'Đã giao';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
      {/* Order Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Customer Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Thông tin khách hàng</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Tên:</span>
              <span className="ml-2 font-medium text-gray-900">{order.buyerName}</span>
            </div>
            <div>
              <span className="text-gray-500">SĐT:</span>
              <span className="ml-2 font-medium text-gray-900">{order.buyerPhone}</span>
            </div>
            <div className="md:col-span-1">
              <span className="text-gray-500">Email:</span>
              <span className="ml-2 font-medium text-gray-900">{order.buyerEmail}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Sản phẩm</h4>
          </div>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="font-medium text-gray-900">{item.productName}</p>
                  <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                </div>
                <span className="font-semibold text-gray-900">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Địa chỉ giao hàng</h4>
          </div>
          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{order.shippingAddress}</p>
          {order.note && (
            <div className="mt-3">
              <h5 className="font-medium text-gray-900 mb-1">Ghi chú</h5>
              <p className="text-sm text-gray-600 bg-yellow-50 rounded-lg p-3 border border-yellow-200">{order.note}</p>
            </div>
          )}
        </div>

        {/* Order Total */}
        <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Tổng tiền:</span>
          <span className="text-2xl font-bold text-red-600">{formatPrice(order.totalPrice)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {order.status === 'PENDING' && (
            <>
              <button
                onClick={() => handleStatusChange(order.id, 'CONFIRMED')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                Xác nhận
              </button>
              <button
                onClick={() => handleStatusChange(order.id, 'CANCELLED')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Hủy đơn
              </button>
            </>
          )}
          {order.status === 'CONFIRMED' && (
            <button
              onClick={() => handleStatusChange(order.id, 'SHIPPED')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
              Đang giao
            </button>
          )}
          {order.status === 'SHIPPED' && (
            <button
              onClick={() => handleStatusChange(order.id, 'DELIVERED')}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              Đã giao
            </button>
          )}
          <Link
            to={`/seller/orders/${order.id}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải đơn hàng...</p>
          </div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      {/* Orders Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Quản lý đơn hàng
                  </h1>
                  <p className="text-gray-600 mt-1">Theo dõi và xử lý đơn hàng của khách hàng</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Chờ xác nhận</p>
                      <p className="text-lg font-bold text-yellow-700">
                        {orders.filter(o => o.status === 'PENDING').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Đã xác nhận</p>
                      <p className="text-lg font-bold text-blue-700">
                        {orders.filter(o => o.status === 'CONFIRMED').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Đang giao</p>
                      <p className="text-lg font-bold text-purple-700">
                        {orders.filter(o => o.status === 'SHIPPED').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Đã giao</p>
                      <p className="text-lg font-bold text-green-700">
                        {orders.filter(o => o.status === 'DELIVERED').length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-red-600 font-medium">Đã hủy</p>
                      <p className="text-lg font-bold text-red-700">
                        {orders.filter(o => o.status === 'CANCELLED').length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Tổng cộng</p>
                      <p className="text-lg font-bold text-gray-700">
                        {orders.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Status Filter */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Section */}
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm đơn hàng..."
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
                {/* Clear search button */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter Section */}
            <div className="lg:w-48">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-purple-500 group-focus-within:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="PENDING">🟡 Chờ xác nhận</option>
                  <option value="CONFIRMED">🔵 Đã xác nhận</option>
                  <option value="SHIPPED">🟣 Đang giao</option>
                  <option value="DELIVERED">🟢 Đã giao</option>
                  <option value="CANCELLED">🔴 Đã hủy</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Filter - Riêng biệt */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Lọc theo khoảng thời gian</h3>
            </div>
            
            <div className="flex-1 flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-orange-500 group-focus-within:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min="2020-01-01"
                    max="2030-12-31"
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 text-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-600 font-medium px-2">đến</span>
              </div>
              
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-indigo-500 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min="2020-01-01"
                    max="2030-12-31"
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200 text-gray-700"
                  />
                </div>
              </div>

              {/* Clear Date Filter Button */}
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Xóa
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col">
                {/* Order Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">#{order.id}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  {/* Customer Info */}
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{order.buyerName}</h4>
                    <p className="text-xs text-gray-500">{order.buyerPhone}</p>
                  </div>

                  {/* Order Items */}
                  <div className="mb-3 flex-1 min-h-0">
                    <div className="space-y-1 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          <p className="truncate">{item.productName}</p>
                          <p className="text-gray-500">x{item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="mb-3 pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Tổng:</span>
                      <span className="font-semibold text-gray-900 text-sm">{formatPrice(order.totalPrice)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 mt-auto">
                    {order.status === 'PENDING' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, 'CONFIRMED');
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors"
                        >
                          ✓
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, 'CANCELLED');
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors"
                        >
                          ✕
                        </button>
                        <Link
                          to={`/seller/orders/${order.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors"
                        >
                          👁️
                        </Link>
                      </>
                    )}
                    {order.status === 'CONFIRMED' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, 'SHIPPED');
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors"
                        >
                          🚚
                        </button>
                        <Link
                          to={`/seller/orders/${order.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors"
                        >
                          👁️
                        </Link>
                      </>
                    )}
                    {order.status === 'SHIPPING' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, 'DELIVERED');
                          }}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors"
                        >
                          ✓
                        </button>
                        <Link
                          to={`/seller/orders/${order.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors"
                        >
                          👁️
                        </Link>
                      </>
                    )}
                    {(order.status === 'DELIVERED' || order.status === 'CANCELLED') && (
                      <>
                        <Link
                          to={`/seller/orders/${order.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full px-2 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors text-center"
                        >
                          👁️ Xem chi tiết
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'Không tìm thấy đơn hàng' : 'Chưa có đơn hàng nào'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? `Không có đơn hàng nào khớp với "${searchTerm}"`
                  : 'Chưa có đơn hàng nào được đặt'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerOrders;