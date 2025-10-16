import React, { useState } from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreCustomers = () => {
  const { currentStore } = useStoreContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Mock data for customers theo chi nhánh
  const getMockCustomersByBranch = (branchId) => {
    const branchCustomers = {
      'branch-1': [ // Hải Châu - Đã duyệt - Nhiều khách hàng
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      totalOrders: 5,
      totalSpent: 15000000,
      lastOrder: '2024-01-20',
      status: 'ACTIVE',
      joinDate: '2023-12-15'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      totalOrders: 12,
      totalSpent: 35000000,
      lastOrder: '2024-01-19',
      status: 'VIP',
      joinDate: '2023-10-20'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0555666777',
      totalOrders: 2,
      totalSpent: 8000000,
      lastOrder: '2024-01-18',
      status: 'ACTIVE',
      joinDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0333444555',
      totalOrders: 8,
      totalSpent: 22000000,
      lastOrder: '2024-01-17',
      status: 'ACTIVE',
      joinDate: '2023-11-05'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      phone: '0777888999',
      totalOrders: 1,
      totalSpent: 5000000,
      lastOrder: '2024-01-16',
      status: 'INACTIVE',
      joinDate: '2024-01-15'
    }
      ],
      'branch-2': [ // Thanh Khê - Đã duyệt - Khách hàng trung bình
        {
          id: 21,
          name: 'Trần Văn Thanh',
          email: 'tranvanthanh@email.com',
          phone: '0987654321',
          totalOrders: 8,
          totalSpent: 28000000,
          lastOrder: '2024-01-20',
          status: 'VIP',
          joinDate: '2023-11-15'
        },
        {
          id: 22,
          name: 'Lê Thị Khê',
          email: 'lethikhe@email.com',
          phone: '0369258147',
          totalOrders: 3,
          totalSpent: 12000000,
          lastOrder: '2024-01-19',
          status: 'ACTIVE',
          joinDate: '2024-01-05'
        }
      ],
      'branch-3': [ // Sơn Trà (chờ duyệt) - Ít khách hàng
        {
          id: 31,
          name: 'Nguyễn Văn Sơn',
          email: 'nguyenvanson@email.com',
          phone: '0123456789',
          totalOrders: 1,
          totalSpent: 15000000,
          lastOrder: '2024-01-20',
          status: 'ACTIVE',
          joinDate: '2024-01-20'
        }
      ],
      'branch-4': [], // Cẩm Lệ (bị từ chối) - Không có khách hàng
      'branch-5': []  // Liên Chiểu (bị từ chối) - Không có khách hàng
    };
    
    return branchCustomers[branchId] || [];
  };

  const customers = getMockCustomersByBranch(currentStore?.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'VIP': return 'bg-purple-100 text-purple-600';
      case 'ACTIVE': return 'bg-green-100 text-green-600';
      case 'INACTIVE': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý khách hàng">
      <StoreLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Quản lý khách hàng
                    </h1>
                    <p className="text-gray-600 mt-1">Theo dõi và quản lý thông tin khách hàng</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Thêm khách hàng
                  </button>
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
                <p className="text-sm text-gray-600 mb-1">Tổng khách hàng</p>
                <p className="text-2xl font-bold text-blue-600">{customers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Khách VIP</p>
                <p className="text-2xl font-bold text-purple-600">{customers.filter(c => c.status === 'VIP').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👑</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Khách hoạt động</p>
                <p className="text-2xl font-bold text-green-600">{customers.filter(c => c.status === 'ACTIVE').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng chi tiêu</p>
                <p className="text-2xl font-bold text-orange-600">{formatPrice(customers.reduce((sum, c) => sum + c.totalSpent, 0))}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="VIP">VIP</option>
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Không hoạt động</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liên hệ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng chi tiêu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{customer.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">Tham gia: {new Date(customer.joinDate).toLocaleDateString('vi-VN')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.totalOrders} đơn</div>
                      <div className="text-sm text-gray-500">Cuối: {new Date(customer.lastOrder).toLocaleDateString('vi-VN')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">Xem</button>
                        <button className="text-green-600 hover:text-green-900">Sửa</button>
                        <button className="text-red-600 hover:text-red-900">Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreCustomers;
