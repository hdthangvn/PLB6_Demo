import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SellerLayout from '../../layouts/SellerLayout';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Mock data cho C2C seller
      const mockProducts = [
        {
          id: 1,
          name: 'iPhone 13 Pro Max 256GB',
          description: 'Điện thoại iPhone 13 Pro Max 256GB màu xanh, đã qua sử dụng 8 tháng, còn bảo hành Apple đến 12/2024',
          price: 18500000,
          condition: 'Cũ',
          status: 'ACTIVE',
          category: 'Điện thoại',
          images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&crop=center'
          ],
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          name: 'MacBook Pro M1 13 inch',
          description: 'Laptop MacBook Pro M1 13 inch 256GB SSD, đã sử dụng 1 năm, máy còn mới 95%, không trầy xước',
          price: 22000000,
          condition: 'Cũ',
          status: 'SOLD',
          category: 'Laptop',
          images: [
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center'
          ],
          createdAt: '2024-01-08T10:00:00Z',
          updatedAt: '2024-01-14T10:00:00Z'
        },
        {
          id: 3,
          name: 'Samsung Galaxy S23 Ultra',
          description: 'Điện thoại Samsung Galaxy S23 Ultra 256GB màu đen, mới mua được 3 tháng, còn bảo hành Samsung',
          price: 19500000,
          condition: 'Cũ',
          status: 'HIDDEN',
          category: 'Điện thoại',
          images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop&crop=center'
          ],
          createdAt: '2024-01-05T10:00:00Z',
          updatedAt: '2024-01-12T10:00:00Z'
        },
        {
          id: 4,
          name: 'Dell XPS 15 9520',
          description: 'Laptop Dell XPS 15 9520 i7-12700H 16GB RAM 512GB SSD, đã sử dụng 6 tháng, máy còn mới',
          price: 28000000,
          condition: 'Cũ',
          status: 'ACTIVE',
          category: 'Laptop',
          images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&crop=center'
          ],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 5,
          name: 'iPad Air 5 64GB',
          description: 'Máy tính bảng iPad Air 5 64GB WiFi màu tím, mới mua được 2 tháng, còn bảo hành Apple',
          price: 12500000,
          condition: 'Cũ',
          status: 'SOLD',
          category: 'Máy tính bảng',
          images: [],
          createdAt: '2024-01-12T10:00:00Z',
          updatedAt: '2024-01-12T10:00:00Z'
        },
        {
          id: 6,
          name: 'AirPods Pro 2',
          description: 'Tai nghe AirPods Pro 2 gen, đã sử dụng 4 tháng, còn bảo hành Apple, không trầy xước',
          price: 4500000,
          condition: 'Cũ',
          status: 'ACTIVE',
          category: 'Phụ kiện',
          images: [
            'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop&crop=center'
          ],
          createdAt: '2024-01-18T10:00:00Z',
          updatedAt: '2024-01-18T10:00:00Z'
        },
        {
          id: 7,
          name: 'Apple Watch Series 8',
          description: 'Đồng hồ thông minh Apple Watch Series 8 45mm GPS, đã sử dụng 5 tháng, còn bảo hành Apple',
          price: 8500000,
          condition: 'Cũ',
          status: 'HIDDEN',
          category: 'Đồng hồ',
          images: [
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center'
          ],
          createdAt: '2024-01-20T10:00:00Z',
          updatedAt: '2024-01-20T10:00:00Z'
        },
        {
          id: 8,
          name: 'Sony WH-1000XM4',
          description: 'Tai nghe Sony WH-1000XM4 chống ồn, đã sử dụng 8 tháng, còn bảo hành Sony, máy còn mới',
          price: 3200000,
          condition: 'Cũ',
          status: 'ACTIVE',
          category: 'Phụ kiện',
          images: [
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center'
          ],
          createdAt: '2024-01-22T10:00:00Z',
          updatedAt: '2024-01-22T10:00:00Z'
        }
      ];
      
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

   // Memoized filtered products for better performance - chỉ hiển thị sản phẩm đang bán
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
       // Chỉ hiển thị sản phẩm đang bán
       return matchesSearch && product.status === 'ACTIVE';
     });
   }, [products, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200';
      case 'HIDDEN': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'SOLD': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ACTIVE': return 'Đang bán';
      case 'HIDDEN': return 'Đã ẩn';
      case 'SOLD': return 'Đã bán';
      default: return status;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
    }).format(price);
  };

  const handleRemoveProduct = (productId) => {
    if (window.confirm('Bạn có chắc muốn gỡ bài đăng này?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedProduct(null);
    setShowDetailModal(false);
  };

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  Đã gỡ bài đăng thành công!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessAlert(false)}
              className="ml-3 flex-shrink-0"
            >
              <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Quản lý sản phẩm
                  </h1>
                  <p className="text-gray-600 mt-1">Quản lý danh sách sản phẩm của bạn</p>
                </div>
              </div>
              
                 <Link
                   to="/seller-dashboard/products/add"
                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                   Thêm sản phẩm
                 </Link>
              </div>
            </div>
          </div>
        </div>


         {/* Search and Add Product */}
         <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
           <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
               <div className="relative">
                 <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                <input
                  type="text"
                   placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 />
                    </div>
                  </div>
             
              </div>
            </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                )}
                
                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                  {getStatusText(product.status)}
              </div>
            </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-red-600">{formatPrice(product.price)}</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.condition}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    Xem chi tiết
                  </button>
                  
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                    Gỡ bài
                  </button>
            </div>
          </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
             <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
             <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `Không có sản phẩm nào khớp với "${searchTerm}"`
                 : 'Bạn chưa có sản phẩm nào đang bán. Hãy thêm sản phẩm đầu tiên!'
                }
              </p>
              {!searchTerm && (
              <Link
                to="/seller-dashboard/products/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                + Thêm sản phẩm đầu tiên
              </Link>
              )}
            </div>
          )}

        {/* Product Detail Modal */}
        {showDetailModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedProduct.createdAt).toLocaleString('vi-VN')}
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
                {/* Product Image */}
                <div className="text-center">
                  {selectedProduct.images && selectedProduct.images.length > 0 ? (
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Trạng thái:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedProduct.status)}`}>
                      {getStatusText(selectedProduct.status)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Giá:</span>
                    <span className="text-lg font-bold text-red-600">{formatPrice(selectedProduct.price)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Tình trạng:</span>
                    <span className="text-sm font-medium text-gray-900">{selectedProduct.condition}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Danh mục:</span>
                    <span className="text-sm font-medium text-gray-900">{selectedProduct.category}</span>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500">Mô tả:</span>
                    <p className="text-sm text-gray-900 mt-1">{selectedProduct.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Ngày tạo:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(selectedProduct.createdAt).toLocaleDateString('vi-VN')}
                    </span>
            </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Cập nhật lần cuối:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(selectedProduct.updatedAt).toLocaleDateString('vi-VN')}
                    </span>
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
      </div>
    </SellerLayout>
  );
};

export default SellerProducts;