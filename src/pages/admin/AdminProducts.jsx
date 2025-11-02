import React, { useState, useEffect } from 'react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockProducts = [
        {
          id: 'prod-1',
          name: 'iPhone 15 Pro',
          seller: 'TechPro Store',
          category: 'Smartphones',
          price: 24990000,
          status: 'PENDING',
          createdAt: '2024-01-20T10:30:00Z',
          images: ['https://via.placeholder.com/150'],
          description: 'iPhone 15 Pro với chip A17 Pro mạnh mẽ',
          rejectionReason: null
        },
        {
          id: 'prod-2',
          name: 'MacBook Pro M4',
          seller: 'Apple Store',
          category: 'Laptops',
          price: 45990000,
          status: 'APPROVED',
          createdAt: '2024-01-18T14:20:00Z',
          images: ['https://via.placeholder.com/150'],
          description: 'MacBook Pro với chip M4 hiệu năng cao',
          rejectionReason: null
        },
        {
          id: 'prod-3',
          name: 'Sony WH-1000XM5',
          seller: 'Audio Store',
          category: 'Audio',
          price: 7990000,
          status: 'REJECTED',
          createdAt: '2024-01-15T09:15:00Z',
          images: ['https://via.placeholder.com/150'],
          description: 'Tai nghe chống ồn cao cấp',
          rejectionReason: 'Thiếu thông tin bảo hành'
        },
        {
          id: 'prod-4',
          name: 'Canon EOS R5',
          seller: 'Camera World',
          category: 'Cameras',
          price: 89990000,
          status: 'PENDING',
          createdAt: '2024-01-22T16:45:00Z',
          images: ['https://via.placeholder.com/150'],
          description: 'Máy ảnh mirrorless chuyên nghiệp',
          rejectionReason: null
        }
      ];

      let filteredProducts = mockProducts;
      if (filter !== 'all') {
        filteredProducts = mockProducts.filter(product => product.status === filter);
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (productId) => {
    try {
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, status: 'APPROVED', rejectionReason: null }
            : product
        )
      );
      alert('Duyệt sản phẩm thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi duyệt sản phẩm');
    }
  };

  const handleReject = async (productId) => {
    const reason = prompt('Nhập lý do từ chối:');
    if (!reason) return;

    try {
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, status: 'REJECTED', rejectionReason: reason }
            : product
        )
      );
      alert('Từ chối sản phẩm thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi từ chối sản phẩm');
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
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
            <p className="text-gray-600 mt-1">Duyệt và quản lý các sản phẩm trong hệ thống</p>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'all', label: 'Tất cả', count: products.length },
                { key: 'PENDING', label: 'Chờ duyệt', count: products.filter(p => p.status === 'PENDING').length },
                { key: 'APPROVED', label: 'Đã duyệt', count: products.filter(p => p.status === 'APPROVED').length },
                { key: 'REJECTED', label: 'Bị từ chối', count: products.filter(p => p.status === 'REJECTED').length }
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Người bán: {product.seller}</p>
                    <p className="text-sm text-gray-500">Danh mục: {product.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </div>

                <div className="mb-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Giá:</span>
                    <span className="text-lg font-semibold text-gray-900">{formatCurrency(product.price)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ngày tạo:</span>
                    <span className="text-sm text-gray-900">{formatDate(product.createdAt)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
                </div>

                {/* Fixed height area for rejection reason */}
                <div className="mb-4 min-h-[60px]">
                  {product.rejectionReason && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <span className="font-medium">Lý do từ chối:</span> {product.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>

                {/* Fixed position buttons */}
                <div className="mt-auto">
                  {product.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(product.id)}
                        className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleReject(product.id)}
                        className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Từ chối
                      </button>
                    </div>
                  )}

                  {product.status === 'APPROVED' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(product.id)}
                        className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Thu hồi duyệt
                      </button>
                    </div>
                  )}

                  {product.status === 'REJECTED' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(product.id)}
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

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có sản phẩm nào</h3>
            <p className="text-gray-600">Không có sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
        </div>
        )}
      </div>
  );
};

export default AdminProducts;
