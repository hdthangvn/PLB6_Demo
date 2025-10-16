import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreProductVariants = () => {
  const { currentStore } = useStoreContext();
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  // Mock data for product variants
  const mockVariants = [
    {
      id: 'PV-001',
      productId: 'P-001',
      productName: 'iPhone 15 Pro Max',
      name: 'iPhone 15 Pro Max 256GB Titanium Blue',
      price: 30000000,
      stock: 50,
      images: ['/images/iphone15-blue.jpg'],
      attributes: {
        color: 'Titanium Blue',
        storage: '256GB',
        ram: '8GB'
      },
      status: 'ACTIVE',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'PV-002',
      productId: 'P-001',
      productName: 'iPhone 15 Pro Max',
      name: 'iPhone 15 Pro Max 512GB Titanium White',
      price: 35000000,
      stock: 30,
      images: ['/images/iphone15-white.jpg'],
      attributes: {
        color: 'Titanium White',
        storage: '512GB',
        ram: '8GB'
      },
      status: 'ACTIVE',
      createdAt: '2024-01-15T10:35:00Z'
    },
    {
      id: 'PV-003',
      productId: 'P-002',
      productName: 'MacBook Air M2',
      name: 'MacBook Air M2 13-inch 256GB Space Gray',
      price: 28000000,
      stock: 25,
      images: ['/images/macbook-gray.jpg'],
      attributes: {
        color: 'Space Gray',
        storage: '256GB',
        screen: '13-inch'
      },
      status: 'ACTIVE',
      createdAt: '2024-01-16T09:20:00Z'
    }
  ];

  const mockProducts = [
    { id: 'P-001', name: 'iPhone 15 Pro Max' },
    { id: 'P-002', name: 'MacBook Air M2' },
    { id: 'P-003', name: 'Samsung Galaxy S24 Ultra' }
  ];

  useEffect(() => {
    // Load mock data directly without async fetch
    setVariants(mockVariants);
    setLoading(false);
  }, []);

  const handleCreateVariant = (variantData) => {
    // Optimistic update
    const newVariant = {
      id: `PV-${Date.now()}`,
      ...variantData,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    
    setVariants(prev => [...prev, newVariant]);
    setShowCreateModal(false);
    console.log('Create variant:', variantData);
  };

  const handleUpdateVariant = (variantData) => {
    // Optimistic update
    setVariants(prev => 
      prev.map(variant => 
        variant.id === editingVariant.id 
          ? { ...variant, ...variantData, updatedAt: new Date().toISOString() }
          : variant
      )
    );
    setEditingVariant(null);
    console.log('Update variant:', variantData);
  };

  const handleDeleteVariant = (variantId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa biến thể này?')) {
      // Optimistic update
      setVariants(prev => prev.filter(variant => variant.id !== variantId));
      console.log('Delete variant:', variantId);
    }
  };

  const handleStockUpdate = (variantId, newStock) => {
    // Optimistic update
    setVariants(prev => 
      prev.map(variant => 
        variant.id === variantId 
          ? { ...variant, stock: newStock, updatedAt: new Date().toISOString() }
          : variant
      )
    );
    console.log('Update stock:', variantId, newStock);
  };

  const handleStatusChange = (variantId, newStatus) => {
    // Optimistic update
    setVariants(prev => 
      prev.map(variant => 
        variant.id === variantId 
          ? { ...variant, status: newStatus, updatedAt: new Date().toISOString() }
          : variant
      )
    );
    console.log('Update status:', variantId, newStatus);
  };

  const filteredVariants = variants.filter(variant => {
    const matchesSearch = variant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variant.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProduct = !selectedProduct || variant.productId === selectedProduct;
    return matchesSearch && matchesProduct;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'OUT_OF_STOCK': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ACTIVE': return 'Đang bán';
      case 'INACTIVE': return 'Tạm dừng';
      case 'OUT_OF_STOCK': return 'Hết hàng';
      default: return 'Không xác định';
    }
  };

  if (loading) {
    return (
      <StoreLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý biến thể sản phẩm">
      <StoreLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Quản lý biến thể sản phẩm</h1>
              <p className="text-green-100">Quản lý các biến thể, màu sắc, dung lượng của sản phẩm</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              + Tạo biến thể mới
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Tổng biến thể</p>
                <p className="text-2xl font-bold text-gray-900">{variants.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Đang bán</p>
                <p className="text-2xl font-bold text-gray-900">{variants.filter(v => v.status === 'ACTIVE').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Hết hàng</p>
                <p className="text-2xl font-bold text-gray-900">{variants.filter(v => v.stock === 0).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Tổng tồn kho</p>
                <p className="text-2xl font-bold text-gray-900">{variants.reduce((sum, v) => sum + v.stock, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm biến thể sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Tất cả sản phẩm</option>
                {mockProducts.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Variants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVariants.map(variant => (
            <div key={variant.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Variant Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>

              <div className="p-4">
                {/* Product Name */}
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{variant.productName}</h3>
                  <p className="text-gray-600 text-sm">{variant.name}</p>
                </div>

                {/* Attributes */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(variant.attributes).map(([key, value]) => (
                      <span key={key} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Stock */}
                <div className="mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">{formatPrice(variant.price)}</span>
                    <span className="text-sm text-gray-500">Tồn: {variant.stock}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(variant.status)}`}>
                    {getStatusText(variant.status)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  {variant.status === 'ACTIVE' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(variant.id, 'INACTIVE')}
                        className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center justify-center transition-colors"
                        title="Tạm dừng"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleStockUpdate(variant.id, variant.stock + 10)}
                        className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors"
                        title="Thêm 10"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {variant.status === 'INACTIVE' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(variant.id, 'ACTIVE')}
                        className="w-7 h-7 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center transition-colors"
                        title="Kích hoạt"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleStockUpdate(variant.id, variant.stock + 10)}
                        className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors"
                        title="Thêm 10"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => setEditingVariant(variant)}
                    className="w-7 h-7 bg-gray-500 hover:bg-gray-600 text-white rounded-md flex items-center justify-center transition-colors"
                    title="Chỉnh sửa"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteVariant(variant.id)}
                    className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center transition-colors"
                    title="Xóa"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVariants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || selectedProduct ? 'Không tìm thấy biến thể' : 'Chưa có biến thể nào'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedProduct 
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                : 'Tạo biến thể đầu tiên cho sản phẩm của bạn'
              }
            </p>
            {!searchTerm && !selectedProduct && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                + Tạo biến thể đầu tiên
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingVariant) && (
        <VariantModal
          variant={editingVariant}
          products={mockProducts}
          onClose={() => {
            setShowCreateModal(false);
            setEditingVariant(null);
          }}
          onSave={editingVariant ? handleUpdateVariant : handleCreateVariant}
        />
      )}
    </StoreLayout>
    </StoreStatusGuard>
  );
};

// Variant Modal Component
const VariantModal = ({ variant, products, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productId: variant?.productId || '',
    name: variant?.name || '',
    price: variant?.price || 0,
    stock: variant?.stock || 0,
    attributes: variant?.attributes || {},
    images: variant?.images || []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAttributeChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {variant ? 'Chỉnh sửa biến thể' : 'Tạo biến thể mới'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sản phẩm
            </label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Chọn sản phẩm</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>

          {/* Variant Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên biến thể
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá (₫)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tồn kho
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Attributes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thuộc tính
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Thuộc tính (VD: Màu sắc)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Giá trị (VD: Xanh)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {variant ? 'Cập nhật' : 'Tạo biến thể'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreProductVariants;
