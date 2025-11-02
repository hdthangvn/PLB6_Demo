import React, { useState, useEffect } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, blocked

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockUsers = [
        {
          id: 'user-1',
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@email.com',
          phone: '0123456789',
          role: 'CUSTOMER',
          status: 'ACTIVE',
          createdAt: '2024-01-15T10:30:00Z',
          totalOrders: 15,
          totalSpent: 2500000
        },
        {
          id: 'user-2',
          name: 'Trần Thị B',
          email: 'tranthib@email.com',
          phone: '0987654321',
          role: 'SELLER',
          status: 'ACTIVE',
          createdAt: '2024-01-10T14:20:00Z',
          totalOrders: 8,
          totalSpent: 1200000,
          storeName: 'TechPro Store'
        },
        {
          id: 'user-3',
          name: 'Lê Văn C',
          email: 'levanc@email.com',
          phone: '0369258147',
          role: 'CUSTOMER',
          status: 'BLOCKED',
          createdAt: '2024-01-05T09:15:00Z',
          totalOrders: 3,
          totalSpent: 500000,
          blockReason: 'Vi phạm quy định'
        },
        {
          id: 'user-4',
          name: 'Phạm Thị D',
          email: 'phamthid@email.com',
          phone: '0147258369',
          role: 'STORE_OWNER',
          status: 'ACTIVE',
          createdAt: '2024-01-20T16:45:00Z',
          totalOrders: 25,
          totalSpent: 5000000,
          storeName: 'Mobile World'
        }
      ];

      let filteredUsers = mockUsers;
      if (filter !== 'all') {
        filteredUsers = mockUsers.filter(user => user.status === filter);
      }

      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId) => {
    const reason = prompt('Nhập lý do khóa tài khoản:');
    if (!reason) return;

    try {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: 'BLOCKED', blockReason: reason }
            : user
        )
      );
      alert('Khóa tài khoản thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi khóa tài khoản');
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: 'ACTIVE', blockReason: null }
            : user
        )
      );
      alert('Mở khóa tài khoản thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi mở khóa tài khoản');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;

    try {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      alert('Xóa người dùng thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi xóa người dùng');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'BLOCKED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'CUSTOMER':
        return 'bg-blue-100 text-blue-800';
      case 'SELLER':
        return 'bg-purple-100 text-purple-800';
      case 'STORE_OWNER':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý User</h1>
            <p className="text-gray-600 mt-1">Quản lý người dùng trong hệ thống</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'all', label: 'Tất cả', count: users.length },
                { key: 'ACTIVE', label: 'Hoạt động', count: users.filter(u => u.status === 'ACTIVE').length },
                { key: 'BLOCKED', label: 'Bị khóa', count: users.filter(u => u.status === 'BLOCKED').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === tab.key
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thống kê</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {user.role === 'CUSTOMER' ? 'Khách hàng' : 
                         user.role === 'SELLER' ? 'Người bán' : 'Chủ store'}
                      </span>
                      {user.storeName && (
                        <div className="text-xs text-gray-500 mt-1">{user.storeName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(user.status)}`}>
                        {user.status === 'ACTIVE' ? 'Hoạt động' : 'Bị khóa'}
                      </span>
                      {user.blockReason && (
                        <div className="text-xs text-red-600 mt-1">{user.blockReason}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{user.totalOrders} đơn hàng</div>
                      <div className="text-gray-500">{formatCurrency(user.totalSpent)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {user.status === 'ACTIVE' ? (
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs font-medium"
                          >
                            Khóa
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnblockUser(user.id)}
                            className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs font-medium"
                          >
                            Mở khóa
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-xs font-medium"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có người dùng nào</h3>
            <p className="text-gray-600">Không có người dùng nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        )}
      </div>
  );
};

export default AdminUsers;
