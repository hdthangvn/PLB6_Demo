import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '../../layouts/StoreLayout';
import { useStoreContext } from '../../context/StoreContext';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';

const StoreOrders = () => {
  const { currentStore, loading: storeLoading } = useStoreContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (currentStore) {
    fetchOrders();
    }
  }, [currentStore]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data với orders riêng cho từng chi nhánh (chỉ chi nhánh đã duyệt)
      const getMockOrdersByBranch = (branchId) => {
        const branchOrders = {
          'branch-1-1': [ // Chi nhánh Hải Châu - Đã duyệt - Nhiều đơn hàng
        {
          id: 'ORD-001',
          buyerName: 'Nguyễn Văn A',
          buyerPhone: '0123456789',
          buyerEmail: 'nguyenvana@email.com',
          status: 'PENDING',
          totalPrice: 30550000,
          createdAt: '2024-01-20T10:30:00Z',
          items: [
            { productName: 'iPhone 14 Pro', quantity: 1, price: 25000000 },
            { productName: 'AirPods Pro 2', quantity: 1, price: 5500000 }
          ],
          shippingAddress: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
          note: 'Giao hàng vào buổi chiều'
        },
        {
          id: 'ORD-002',
          buyerName: 'Trần Thị B',
          buyerPhone: '0987654321',
          buyerEmail: 'tranthib@email.com',
          status: 'CONFIRMED',
          totalPrice: 28050000,
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
          totalPrice: 28050000,
          createdAt: '2024-01-19T14:20:00Z',
          items: [
            { productName: 'Samsung Galaxy S24', quantity: 1, price: 28000000 }
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
          totalPrice: 35050000,
          createdAt: '2024-01-19T10:45:00Z',
          items: [
            { productName: 'Dell XPS 13', quantity: 1, price: 35000000 }
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
          totalPrice: 28050000,
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
          totalPrice: 3250000,
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
          totalPrice: 120000000,
          createdAt: '2024-01-14T16:45:00Z',
          items: [
            { productName: 'MacBook Pro M3 Max', quantity: 1, price: 45000000 },
            { productName: 'iPhone 15 Pro', quantity: 1, price: 28000000 },
            { productName: 'iPad Pro 12.9', quantity: 1, price: 25000000 },
            { productName: 'AirPods Pro 2', quantity: 2, price: 11000000 },
            { productName: 'Apple Watch Ultra', quantity: 1, price: 15000000 },
            { productName: 'Magic Keyboard', quantity: 1, price: 5000000 }
          ],
          shippingAddress: '789 Đường DEF, Phường 3, Quận 3, TP.HCM',
          note: 'Giao hàng cẩn thận'
        }
      ],
          'branch-1-2': [ // Chi nhánh Thanh Khê - Đã duyệt
        {
          id: 'ORD-TK-001',
          buyerName: 'Trần Văn B',
          buyerPhone: '0987654321',
          buyerEmail: 'tranvanb@email.com',
          status: 'PENDING',
          totalPrice: 18500000,
          createdAt: '2024-01-21T10:30:00Z',
          items: [
            { productName: 'Samsung Galaxy S24', quantity: 1, price: 18000000 }
          ],
          shippingAddress: '456 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng',
          note: 'Giao hàng vào buổi sáng'
        },
        {
          id: 'ORD-TK-002',
          buyerName: 'Lê Thị C',
          buyerPhone: '0369258147',
          buyerEmail: 'lethic@email.com',
          status: 'CONFIRMED',
          totalPrice: 32000000,
          createdAt: '2024-01-21T09:15:00Z',
          items: [
            { productName: 'MacBook Air M2', quantity: 1, price: 32000000 }
          ],
          shippingAddress: '789 Lê Văn Hiến, Thanh Khê, Đà Nẵng',
          note: ''
        },
        {
          id: 'ORD-TK-003',
          buyerName: 'Phạm Văn D',
          buyerPhone: '0741852963',
          buyerEmail: 'phamvand@email.com',
          status: 'SHIPPING',
          totalPrice: 15000000,
          createdAt: '2024-01-20T14:20:00Z',
          items: [
            { productName: 'iPad Air 5', quantity: 1, price: 15000000 }
          ],
          shippingAddress: '321 Nguyễn Tri Phương, Thanh Khê, Đà Nẵng',
          note: 'Giao hàng nhanh'
        },
        {
          id: 'ORD-TK-004',
          buyerName: 'Hoàng Thị E',
          buyerPhone: '0852741963',
          buyerEmail: 'hoangthie@email.com',
          status: 'DELIVERED',
          totalPrice: 25000000,
          createdAt: '2024-01-19T16:30:00Z',
          items: [
            { productName: 'Dell XPS 13', quantity: 1, price: 25000000 }
          ],
          shippingAddress: '654 Lê Độ, Thanh Khê, Đà Nẵng',
          note: ''
        },
        {
          id: 'ORD-TK-005',
          buyerName: 'Vũ Văn F',
          buyerPhone: '0963852741',
          buyerEmail: 'vuvanf@email.com',
          status: 'CANCELLED',
          totalPrice: 12000000,
          createdAt: '2024-01-18T11:20:00Z',
          items: [
            { productName: 'AirPods Pro 2', quantity: 1, price: 12000000 }
          ],
          shippingAddress: '987 Hùng Vương, Thanh Khê, Đà Nẵng',
          note: 'Khách hủy đơn'
        }
      ],
          'branch-1-3': [ // Chi nhánh Sơn Trà (chờ duyệt) - Ít đơn hàng
        {
          id: 'ORD-ST-001',
          buyerName: 'Nguyễn Văn Sơn',
          buyerPhone: '0123456789',
          buyerEmail: 'nguyenvanson@email.com',
          status: 'PENDING',
          totalPrice: 15000000,
          createdAt: '2024-01-20T10:30:00Z',
          items: [
            { productName: 'Samsung Galaxy Tab S9', quantity: 1, price: 15000000 }
          ],
          shippingAddress: '789 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
          note: 'Chờ duyệt chi nhánh'
        }
      ],
          'branch-1-4': [ // Chi nhánh Cẩm Lệ (bị từ chối) - Đơn hàng cũ
        {
          id: 'ORD-CL-001',
          buyerName: 'Trần Thị Cẩm',
          buyerPhone: '0987654321',
          buyerEmail: 'tranthicam@email.com',
          status: 'CANCELLED',
          totalPrice: 25000000,
          createdAt: '2024-01-15T10:30:00Z',
          items: [
            { productName: 'iPhone 14 Pro', quantity: 1, price: 25000000 }
          ],
          shippingAddress: '321 Nguyễn Văn Thoại, Cẩm Lệ, Đà Nẵng',
          note: 'Chi nhánh bị từ chối'
        }
      ],
          'branch-1-5': [ // Chi nhánh Ngũ Hành Sơn (bị từ chối) - Đơn hàng cũ
        {
          id: 'ORD-LC-001',
          buyerName: 'Lê Văn Liên',
          buyerPhone: '0369258147',
          buyerEmail: 'levanlien@email.com',
          status: 'CANCELLED',
          totalPrice: 28000000,
          createdAt: '2024-01-10T10:30:00Z',
          items: [
            { productName: 'MacBook Air M2', quantity: 1, price: 28000000 }
          ],
          shippingAddress: '654 Điện Biên Phủ, Liên Chiểu, Đà Nẵng',
          note: 'Chi nhánh bị từ chối'
        }
      ]
    };
    
    return branchOrders[branchId] || [];
  };
  
  const mockOrders = getMockOrdersByBranch(currentStore?.id);
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = searchTerm === '' ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerPhone.includes(searchTerm) ||
        order.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
      
      const matchesDate = (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
                         (!endDate || new Date(order.createdAt) <= new Date(endDate));
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, searchTerm, statusFilter, startDate, endDate]);

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

  const getStatusLabel = (status) => {
    switch (status) {
      case 'PENDING': return 'Chờ xác nhận';
      case 'CONFIRMED': return 'Đã xác nhận';
      case 'SHIPPING': return 'Đang giao hàng';
      case 'DELIVERED': return 'Đã giao hàng';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      );
      case 'CONFIRMED': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      );
      case 'SHIPPING': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
      );
      case 'DELIVERED': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
        </svg>
      );
      case 'CANCELLED': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      );
      default: return null;
    }
  };

  if (loading) {
    return (
      <StoreLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải đơn hàng...</p>
          </div>
        </div>
      </StoreLayout>
    );
  }

  if (!currentStore) {
    return (
      <StoreLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa chọn chi nhánh</h3>
            <p className="text-gray-500 mb-4">Vui lòng chọn chi nhánh để xem đơn hàng</p>
          </div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý đơn hàng" loading={storeLoading}>
      <StoreLayout>
        {/* Orders Content */}
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-2xl p-6">
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      <span className="text-cyan-600">Quản lý</span> <span className="text-blue-600">đơn hàng</span>
                    </h1>
                    <p className="text-gray-600 mt-1">Quản lý và theo dõi đơn hàng của khách hàng</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-6">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Chờ xác nhận</p>
                      <p className="text-xl font-bold text-gray-900">{orders.filter(o => o.status === 'PENDING').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đã xác nhận</p>
                      <p className="text-xl font-bold text-gray-900">{orders.filter(o => o.status === 'CONFIRMED').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đang giao</p>
                      <p className="text-xl font-bold text-gray-900">{orders.filter(o => o.status === 'SHIPPING').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đã giao</p>
                      <p className="text-xl font-bold text-gray-900">{orders.filter(o => o.status === 'DELIVERED').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đã hủy</p>
                      <p className="text-xl font-bold text-gray-900">{orders.filter(o => o.status === 'CANCELLED').length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Section */}
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-green-500 group-focus-within:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm đơn hàng..."
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-green-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
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
            
            {/* Status Filter */}
            <div className="lg:w-64">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-white border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="PENDING">🟡 Chờ xác nhận</option>
                  <option value="CONFIRMED">🔵 Đã xác nhận</option>
                  <option value="SHIPPING">🟣 Đang giao hàng</option>
                  <option value="DELIVERED">🟢 Đã giao hàng</option>
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

          {/* Date Range Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Từ ngày</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Đến ngày</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 flex flex-col">
                {/* Order Header */}
                <div className="p-2 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-xs text-gray-600">{order.buyerName}</p>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>📞 {order.buyerPhone}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-2 flex-1">
                  <h4 className="text-xs font-medium text-gray-700 mb-1">Sản phẩm:</h4>
                  <div className="max-h-12 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-0.5 text-xs">
                        <span className="text-gray-600 truncate flex-1">{item.productName}</span>
                        <span className="text-gray-500 ml-1">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-2 border-t border-gray-100 mt-auto">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-700">Tổng:</span>
                    <span className="text-xs font-bold text-red-600">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(order.totalPrice)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    <p>📅 {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
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
                          to={`/store-dashboard/orders/${order.id}`}
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
                            handleStatusChange(order.id, 'SHIPPING');
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors"
                        >
                          🚚
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
                          to={`/store-dashboard/orders/${order.id}`}
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
                          to={`/store-dashboard/orders/${order.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors"
                        >
                          👁️
                        </Link>
                      </>
                    )}
                    
                    {(order.status === 'DELIVERED' || order.status === 'CANCELLED') && (
                      <Link
                        to={`/store-dashboard/orders/${order.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors text-center"
                      >
                        👁️ Xem chi tiết
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
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
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreOrders;