import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchStores();
  }, [filter]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      // Mock data - trong thực tế sẽ gọi API: GET /api/admin/stores/{status}
      
      const mockStores = [
        {
          id: 'store-1',
          name: 'TechPro Store',
          owner: 'Nguyễn Văn A',
          email: 'nguyenvana@email.com',
          phone: '0123456789',
          address: '123 Đường ABC, Quận 1, TP.HCM',
          status: 'PENDING',
          createdAt: '2024-01-20T10:30:00Z',
          totalProducts: 45,
          totalOrders: 123
        },
        {
          id: 'store-2',
          name: 'Mobile World',
          owner: 'Trần Thị B',
          email: 'tranthib@email.com',
          phone: '0987654321',
          address: '456 Đường XYZ, Quận 2, TP.HCM',
          status: 'APPROVED',
          createdAt: '2024-01-18T14:20:00Z',
          totalProducts: 78,
          totalOrders: 234
        },
        {
          id: 'store-3',
          name: 'ABC Electronics',
          owner: 'Lê Văn C',
          email: 'levanc@email.com',
          phone: '0369258147',
          address: '789 Đường DEF, Quận 3, TP.HCM',
          status: 'REJECTED',
          createdAt: '2024-01-15T09:15:00Z',
          totalProducts: 0,
          totalOrders: 0,
          rejectionReason: 'Thiếu giấy phép kinh doanh'
        },
        {
          id: 'store-4',
          name: 'Gaming Zone',
          owner: 'Phạm Thị D',
          email: 'phamthid@email.com',
          phone: '0147258369',
          address: '321 Đường GHI, Quận 4, TP.HCM',
          status: 'PENDING',
          createdAt: '2024-01-22T16:45:00Z',
          totalProducts: 12,
          totalOrders: 0
        }
      ];

      let filteredStores = mockStores;
      if (filter !== 'all') {
        filteredStores = mockStores.filter(store => store.status === filter);
      }

      setStores(filteredStores);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (storeId) => {
    try {
      // Mock API call - trong thực tế sẽ gọi: PUT /api/admin/stores/{storeId}/approve
      console.log('Approving store:', storeId);
      
      setStores(prevStores => 
        prevStores.map(store => 
          store.id === storeId 
            ? { ...store, status: 'APPROVED' }
            : store
        )
      );
      
      alert('Duyệt store thành công!');
    } catch (error) {
      console.error('Error approving store:', error);
      alert('Có lỗi xảy ra khi duyệt store');
    }
  };

  const handleReject = async (storeId) => {
    const reason = prompt('Nhập lý do từ chối:');
    if (!reason) return;

    try {
      // Mock API call - trong thực tế sẽ gọi: PUT /api/admin/stores/{storeId}/reject?reason={reason}
      console.log('Rejecting store:', storeId, 'Reason:', reason);
      
      setStores(prevStores => 
        prevStores.map(store => 
          store.id === storeId 
            ? { ...store, status: 'REJECTED', rejectionReason: reason }
            : store
        )
      );
      
      alert('Từ chối store thành công!');
    } catch (error) {
      console.error('Error rejecting store:', error);
      alert('Có lỗi xảy ra khi từ chối store');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Chờ duyệt';
      case 'APPROVED':
        return 'Đã duyệt';
      case 'REJECTED':
        return 'Bị từ chối';
      default:
        return 'Không xác định';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Store</h1>
            <p className="text-gray-600 mt-1">Duyệt và quản lý các store trong hệ thống</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'all', label: 'Tất cả', count: stores.length },
                { key: 'PENDING', label: 'Chờ duyệt', count: stores.filter(s => s.status === 'PENDING').length },
                { key: 'APPROVED', label: 'Đã duyệt', count: stores.filter(s => s.status === 'APPROVED').length },
                { key: 'REJECTED', label: 'Bị từ chối', count: stores.filter(s => s.status === 'REJECTED').length }
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

        {/* Stores Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                    <p className="text-sm text-gray-600">Chủ sở hữu: {store.owner}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(store.status)}`}>
                    {getStatusText(store.status)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">📧</span>
                    <span>{store.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">📱</span>
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">📍</span>
                    <span className="truncate">{store.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">📅</span>
                    <span>{formatDate(store.createdAt)}</span>
                  </div>
                </div>


                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>📦 {store.totalProducts} sản phẩm</span>
                  <span>📋 {store.totalOrders} đơn hàng</span>
                </div>

                {/* Fixed height area for rejection reason */}
                <div className="mb-4 min-h-[60px]">
                  {store.rejectionReason && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <span className="font-medium">Lý do từ chối:</span> {store.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>

                {/* Fixed position buttons */}
                <div className="mt-auto">
                  {store.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(store.id)}
                        className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleReject(store.id)}
                        className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Từ chối
                      </button>
                    </div>
                  )}

                  {store.status === 'APPROVED' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(store.id)}
                        className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Thu hồi duyệt
                      </button>
                    </div>
                  )}

                  {store.status === 'REJECTED' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(store.id)}
                        className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Duyệt lại
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {stores.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏪</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có store nào</h3>
            <p className="text-gray-600">Không có store nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        )}
      </div>
  );
};

export default AdminStores;
