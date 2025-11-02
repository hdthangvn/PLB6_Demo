import React, { useState, useEffect } from 'react';

const AdminVariants = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchVariants();
  }, [filter]);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockVariants = [
        {
          id: 'var-1',
          productName: 'iPhone 15 Pro',
          variantName: '128GB - Màu đen',
          seller: 'TechPro Store',
          price: 24990000,
          stock: 50,
          status: 'PENDING',
          createdAt: '2024-01-20T10:30:00Z',
          attributes: {
            storage: '128GB',
            color: 'Đen',
            size: '6.1 inch'
          },
          rejectionReason: null
        },
        {
          id: 'var-2',
          productName: 'MacBook Pro M4',
          variantName: '512GB - Màu xám',
          seller: 'Apple Store',
          category: 'Laptops',
          price: 45990000,
          stock: 25,
          status: 'APPROVED',
          createdAt: '2024-01-18T14:20:00Z',
          attributes: {
            storage: '512GB',
            color: 'Xám',
            ram: '16GB'
          },
          rejectionReason: null
        },
        {
          id: 'var-3',
          productName: 'Sony WH-1000XM5',
          variantName: 'Màu đen',
          seller: 'Audio Store',
          price: 7990000,
          stock: 0,
          status: 'REJECTED',
          createdAt: '2024-01-15T09:15:00Z',
          attributes: {
            color: 'Đen',
            connectivity: 'Bluetooth'
          },
          rejectionReason: 'Thiếu thông tin bảo hành'
        },
        {
          id: 'var-4',
          productName: 'Canon EOS R5',
          variantName: 'Body Only',
          seller: 'Camera World',
          price: 89990000,
          stock: 15,
          status: 'PENDING',
          createdAt: '2024-01-22T16:45:00Z',
          attributes: {
            type: 'Body Only',
            sensor: '45MP'
          },
          rejectionReason: null
        }
      ];

      let filteredVariants = mockVariants;
      if (filter !== 'all') {
        filteredVariants = mockVariants.filter(variant => variant.status === filter);
      }

      setVariants(filteredVariants);
    } catch (error) {
      console.error('Error fetching variants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (variantId) => {
    try {
      setVariants(prevVariants => 
        prevVariants.map(variant => 
          variant.id === variantId 
            ? { ...variant, status: 'APPROVED', rejectionReason: null }
            : variant
        )
      );
      alert('Duyệt biến thể thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi duyệt biến thể');
    }
  };

  const handleReject = async (variantId) => {
    const reason = prompt('Nhập lý do từ chối:');
    if (!reason) return;

    try {
      setVariants(prevVariants => 
        prevVariants.map(variant => 
          variant.id === variantId 
            ? { ...variant, status: 'REJECTED', rejectionReason: reason }
            : variant
        )
      );
      alert('Từ chối biến thể thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi từ chối biến thể');
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
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Biến thể</h1>
            <p className="text-gray-600 mt-1">Duyệt và quản lý các biến thể sản phẩm</p>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'all', label: 'Tất cả', count: variants.length },
                { key: 'PENDING', label: 'Chờ duyệt', count: variants.filter(v => v.status === 'PENDING').length },
                { key: 'APPROVED', label: 'Đã duyệt', count: variants.filter(v => v.status === 'APPROVED').length },
                { key: 'REJECTED', label: 'Bị từ chối', count: variants.filter(v => v.status === 'REJECTED').length }
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

        {/* Variants Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biến thể</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người bán</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá & Kho</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {variants.map((variant) => (
                  <tr key={variant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{variant.productName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{variant.variantName}</div>
                      <div className="text-sm text-gray-500">
                        {Object.entries(variant.attributes).map(([key, value]) => (
                          <span key={key} className="mr-2">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {variant.seller}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(variant.price)}</div>
                      <div className="text-sm text-gray-500">Kho: {variant.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(variant.status)}`}>
                        {getStatusText(variant.status)}
                      </span>
                      {variant.rejectionReason && (
                        <div className="text-xs text-red-600 mt-1">{variant.rejectionReason}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(variant.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {variant.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(variant.id)}
                              className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs font-medium"
                            >
                              Duyệt
                            </button>
                            <button
                              onClick={() => handleReject(variant.id)}
                              className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs font-medium"
                            >
                              Từ chối
                            </button>
                          </>
                        )}
                        {variant.status === 'APPROVED' && (
                          <button
                            onClick={() => handleReject(variant.id)}
                            className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs font-medium"
                          >
                            Thu hồi duyệt
                          </button>
                        )}
                        {variant.status === 'REJECTED' && (
                          <button
                            onClick={() => handleApprove(variant.id)}
                            className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs font-medium"
                          >
                            Duyệt lại
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {variants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔧</span>
          </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có biến thể nào</h3>
            <p className="text-gray-600">Không có biến thể nào phù hợp với bộ lọc hiện tại.</p>
        </div>
        )}
      </div>
  );
};

export default AdminVariants;
