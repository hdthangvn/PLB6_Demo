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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data lịch sử bán C2C - chỉ có "Đã bán"
      const mockOrders = [
        {
          id: 'SALE-001',
          buyerName: 'Nguyễn Văn A',
          buyerPhone: '0123456789',
          buyerEmail: 'nguyenvana@gmail.com',
          status: 'SOLD',
          totalPrice: 18500000,
          createdAt: '2024-01-20T10:30:00Z',
          items: [
            { productName: 'iPhone 13 Pro Max 128GB', quantity: 1, price: 18500000 }
          ],
          shippingAddress: 'Quận 1, TP.HCM - Gặp mặt trực tiếp',
          note: 'Đã bán thành công - Gặp mặt tại Landmark 81',
          soldAt: '2024-01-20T15:30:00Z'
        },
        {
          id: 'SALE-002',
          buyerName: 'Trần Thị B',
          buyerPhone: '0987654321',
          buyerEmail: 'tranthib@gmail.com',
          status: 'SOLD',
          totalPrice: 22000000,
          createdAt: '2024-01-20T09:15:00Z',
          items: [
            { productName: 'MacBook Air M1 256GB', quantity: 1, price: 22000000 }
          ],
          shippingAddress: 'Quận 2, TP.HCM - Ship COD',
          note: 'Đã bán thành công - Ship COD',
          soldAt: '2024-01-20T14:20:00Z'
        },
        {
          id: 'SALE-003',
          buyerName: 'Lê Văn C',
          buyerPhone: '0369258147',
          buyerEmail: 'levanc@gmail.com',
          status: 'SOLD',
          totalPrice: 24000000,
          createdAt: '2024-01-19T14:20:00Z',
          items: [
            { productName: 'Samsung Galaxy S23 Ultra 256GB', quantity: 1, price: 24000000 }
          ],
          shippingAddress: 'Quận 3, TP.HCM - Gặp mặt trực tiếp',
          note: 'Đã bán thành công - Gặp mặt tại Crescent Mall',
          soldAt: '2024-01-19T16:45:00Z'
        },
        {
          id: 'SALE-004',
          buyerName: 'Phạm Thị D',
          buyerPhone: '0741852963',
          buyerEmail: 'phamthid@gmail.com',
          status: 'SOLD',
          totalPrice: 12500000,
          createdAt: '2024-01-19T10:45:00Z',
          items: [
            { productName: 'Dell Inspiron 15 3000', quantity: 1, price: 12500000 }
          ],
          shippingAddress: 'Quận 4, TP.HCM - Ship COD',
          note: 'Đã bán thành công - Ship COD',
          soldAt: '2024-01-19T13:30:00Z'
        },
        {
          id: 'SALE-005',
          buyerName: 'Hoàng Văn E',
          buyerPhone: '0852741963',
          buyerEmail: 'hoangvane@gmail.com',
          status: 'SOLD',
          totalPrice: 15500000,
          createdAt: '2024-01-18T16:30:00Z',
          items: [
            { productName: 'iPad Air 5 64GB WiFi', quantity: 1, price: 15500000 }
          ],
          shippingAddress: 'Quận 5, TP.HCM - Gặp mặt trực tiếp',
          note: 'Đã bán thành công - Gặp mặt tại AEON Mall',
          soldAt: '2024-01-18T19:15:00Z'
        },
        {
          id: 'SALE-006',
          buyerName: 'Vũ Thị F',
          buyerPhone: '0963852741',
          buyerEmail: 'vuthif@gmail.com',
          status: 'SOLD',
          totalPrice: 4200000,
          createdAt: '2024-01-18T09:15:00Z',
          items: [
            { productName: 'AirPods Pro 2', quantity: 1, price: 4200000 }
          ],
          shippingAddress: 'Quận 6, TP.HCM - Ship COD',
          note: 'Đã bán thành công - Ship COD',
          soldAt: '2024-01-18T11:45:00Z'
        },
        {
          id: 'SALE-007',
          buyerName: 'Đặng Văn G',
          buyerPhone: '0147258369',
          buyerEmail: 'dangvang@gmail.com',
          status: 'SOLD',
          totalPrice: 3500000,
          createdAt: '2024-01-17T15:45:00Z',
          items: [
            { productName: 'Sony WH-1000XM4', quantity: 1, price: 3500000 }
          ],
          shippingAddress: 'Quận 7, TP.HCM - Gặp mặt trực tiếp',
          note: 'Đã bán thành công - Gặp mặt tại SC VivoCity',
          soldAt: '2024-01-17T18:30:00Z'
        },
        {
          id: 'SALE-008',
          buyerName: 'Bùi Thị H',
          buyerPhone: '0258369741',
          buyerEmail: 'buithih@gmail.com',
          status: 'SOLD',
          totalPrice: 18500000,
          createdAt: '2024-01-17T11:20:00Z',
          items: [
            { productName: 'Canon EOS M50 Mark II', quantity: 1, price: 18500000 }
          ],
          shippingAddress: 'Quận 8, TP.HCM - Ship COD',
          note: 'Đã bán thành công - Ship COD',
          soldAt: '2024-01-17T14:15:00Z'
        },
        {
          id: 'SALE-009',
          buyerName: 'Ngô Văn I',
          buyerPhone: '0369741852',
          buyerEmail: 'ngovani@gmail.com',
          status: 'SOLD',
          totalPrice: 3200000,
          createdAt: '2024-01-16T13:30:00Z',
          items: [
            { productName: 'Samsung Galaxy Watch 5', quantity: 1, price: 3200000 }
          ],
          shippingAddress: 'Quận 9, TP.HCM - Gặp mặt trực tiếp',
          note: 'Đã bán thành công - Gặp mặt tại AEON Mall Tân Phú',
          soldAt: '2024-01-16T16:20:00Z'
        },
        {
          id: 'SALE-010',
          buyerName: 'Lý Thị K',
          buyerPhone: '0471852963',
          buyerEmail: 'lythik@gmail.com',
          status: 'SOLD',
          totalPrice: 1200000,
          createdAt: '2024-01-16T08:45:00Z',
          items: [
            { productName: 'Logitech MX Master 3', quantity: 1, price: 1200000 }
          ],
          shippingAddress: 'Quận 10, TP.HCM - Ship COD',
          note: 'Đã bán thành công - Ship COD',
          soldAt: '2024-01-16T10:30:00Z'
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
    
    const orderDate = new Date(order.createdAt);
    let matchesDate = true;
    
    if (startDate && endDate) {
      const start = new Date(startDate + 'T00:00:00');
      const end = new Date(endDate + 'T23:59:59');
      matchesDate = orderDate >= start && orderDate <= end;
    }
    
    return matchesSearch && matchesDate;
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
      case 'SOLD': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'SOLD': return 'Đã bán';
      default: return status;
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
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
            <p className="text-gray-600">Đang tải lịch sử bán hàng...</p>
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
                    Lịch sử bán hàng
                  </h1>
                  <p className="text-gray-600 mt-1">Theo dõi các giao dịch đã bán thành công</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Search Filter */}
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
                  placeholder="Tìm kiếm giao dịch..."
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
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="w-full px-2 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors text-center"
                    >
                      👁️ Xem chi tiết
                    </button>
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
                {searchTerm ? 'Không tìm thấy giao dịch' : 'Chưa có giao dịch nào'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? `Không có giao dịch nào khớp với "${searchTerm}"`
                  : 'Chưa có giao dịch nào được bán'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Chi tiết giao dịch #{selectedOrder.id}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
                <button
                  onClick={closeDetailModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Trạng thái:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusText(selectedOrder.status)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Thông tin khách hàng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Tên:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedOrder.buyerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">SĐT:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedOrder.buyerPhone}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-500">Email:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedOrder.buyerEmail}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                  Sản phẩm đã bán
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white rounded-lg p-3 border border-purple-200">
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
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Thông tin giao hàng
                </h3>
                <p className="text-sm text-gray-600 bg-white rounded-lg p-3 border border-orange-200">
                  {selectedOrder.shippingAddress}
                </p>
                {selectedOrder.note && (
                  <div className="mt-3">
                    <h4 className="font-medium text-gray-900 mb-1">Ghi chú:</h4>
                    <p className="text-sm text-gray-600 bg-white rounded-lg p-3 border border-orange-200">
                      {selectedOrder.note}
                    </p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  Tóm tắt giao dịch
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ngày đặt:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(selectedOrder.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  {selectedOrder.soldAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ngày bán:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedOrder.soldAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Tổng tiền:</span>
                    <span className="text-xl font-bold text-red-600">{formatPrice(selectedOrder.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeDetailModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SellerLayout>
  );
};

export default SellerOrders;