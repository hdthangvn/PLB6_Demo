import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StoreLayout from '../../layouts/StoreLayout';
import { useStoreContext } from '../../context/StoreContext';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';

const StoreProducts = () => {
  const navigate = useNavigate();
  const { currentStore } = useStoreContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockInput, setStockInput] = useState('');

  useEffect(() => {
    if (currentStore) {
    fetchProducts();
    }
  }, [currentStore]);

  const getMockProductsByBranch = (branchId) => {
    const baseProducts = [
        {
          id: 1,
        name: 'iPhone 14 Pro',
        description: 'Điện thoại iPhone 14 Pro 128GB màu tím',
          price: 25000000,
        stock: 5,
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
          name: 'MacBook Air M2',
        description: 'Laptop MacBook Air M2 13 inch 256GB',
          price: 32000000,
          stock: 0,
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
        name: 'Samsung Galaxy S24',
          description: 'Điện thoại Samsung Galaxy S24 Ultra 256GB',
          price: 28000000,
        stock: 3,
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
          name: 'Dell XPS 13',
          description: 'Laptop Dell XPS 13 4K Touch 16GB RAM 512GB SSD',
          price: 35000000,
        stock: 2,
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
          name: 'iPad Pro 12.9',
          description: 'Máy tính bảng iPad Pro 12.9 inch 256GB WiFi',
          price: 28000000,
        stock: 1,
          status: 'ACTIVE',
          category: 'Máy tính bảng',
          images: [],
          createdAt: '2024-01-12T10:00:00Z',
          updatedAt: '2024-01-12T10:00:00Z'
        },
        {
          id: 6,
          name: 'AirPods Pro 2',
          description: 'Tai nghe AirPods Pro 2 với chống ồn chủ động',
          price: 5500000,
        stock: 8,
          status: 'ACTIVE',
          category: 'Phụ kiện',
          images: [],
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-01-12T10:00:00Z'
        },
        {
          id: 7,
          name: 'Sony WH-1000XM5',
          description: 'Tai nghe Sony WH-1000XM5 chống ồn cao cấp',
          price: 8500000,
        stock: 6,
          status: 'ACTIVE',
          category: 'Phụ kiện',
          images: [],
          createdAt: '2024-01-19T10:00:00Z',
          updatedAt: '2024-01-19T10:00:00Z'
        },
        {
          id: 8,
          name: 'iPad Air 5',
          description: 'Máy tính bảng iPad Air 5 64GB WiFi',
          price: 12000000,
          stock: 0,
          status: 'SOLD',
          category: 'Máy tính bảng',
          images: [],
          createdAt: '2024-01-18T10:00:00Z',
          updatedAt: '2024-01-18T10:00:00Z'
        },
        {
          id: 9,
          name: 'ASUS ROG Strix G15',
          description: 'Laptop gaming ASUS ROG Strix G15 RTX 3060',
          price: 28000000,
        stock: 2,
          status: 'ACTIVE',
          category: 'Laptop',
          images: [],
          createdAt: '2024-01-17T10:00:00Z',
          updatedAt: '2024-01-17T10:00:00Z'
        },
        {
          id: 10,
          name: 'Xiaomi 13 Pro',
          description: 'Điện thoại Xiaomi 13 Pro 256GB Leica Camera',
          price: 18000000,
        stock: 4,
          status: 'ACTIVE',
          category: 'Điện thoại',
          images: [],
          createdAt: '2024-01-16T10:00:00Z',
          updatedAt: '2024-01-16T10:00:00Z'
      },
      {
        id: 11,
        name: 'Logitech MX Master 3S',
        description: 'Chuột không dây Logitech MX Master 3S',
        price: 2500000,
        stock: 10,
        status: 'ACTIVE',
        category: 'Phụ kiện',
        images: [],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 12,
        name: 'Surface Pro 9',
        description: 'Máy tính bảng Surface Pro 9 256GB',
        price: 35000000,
        stock: 1,
        status: 'ACTIVE',
        category: 'Máy tính bảng',
        images: [],
        createdAt: '2024-01-14T10:00:00Z',
        updatedAt: '2024-01-14T10:00:00Z'
      },
      {
        id: 13,
        name: 'OnePlus 11',
        description: 'Điện thoại OnePlus 11 256GB Snapdragon 8 Gen 2',
        price: 16000000,
        stock: 0,
        status: 'HIDDEN',
        category: 'Điện thoại',
        images: [],
        createdAt: '2024-01-13T10:00:00Z',
        updatedAt: '2024-01-13T10:00:00Z'
      },
      {
        id: 14,
        name: 'Lenovo ThinkPad X1',
        description: 'Laptop Lenovo ThinkPad X1 Carbon Gen 10',
        price: 42000000,
        stock: 2,
        status: 'ACTIVE',
        category: 'Laptop',
        images: [],
        createdAt: '2024-01-12T10:00:00Z',
        updatedAt: '2024-01-12T10:00:00Z'
      },
      {
        id: 15,
        name: 'Samsung Galaxy Tab S9',
        description: 'Máy tính bảng Samsung Galaxy Tab S9 128GB',
        price: 15000000,
        stock: 3,
        status: 'ACTIVE',
        category: 'Máy tính bảng',
        images: [],
        createdAt: '2024-01-11T10:00:00Z',
        updatedAt: '2024-01-11T10:00:00Z'
      },
      {
        id: 16,
        name: 'Keychron K8 Pro',
        description: 'Bàn phím cơ Keychron K8 Pro RGB',
        price: 3200000,
        stock: 7,
        status: 'ACTIVE',
        category: 'Phụ kiện',
        images: [],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 17,
        name: 'Huawei MateBook X Pro',
        description: 'Laptop Huawei MateBook X Pro 2023',
        price: 38000000,
        stock: 1,
        status: 'ACTIVE',
        category: 'Laptop',
        images: [],
        createdAt: '2024-01-09T10:00:00Z',
        updatedAt: '2024-01-09T10:00:00Z'
      },
      {
        id: 18,
        name: 'Nothing Phone 2',
        description: 'Điện thoại Nothing Phone 2 256GB',
        price: 14000000,
        stock: 5,
        status: 'ACTIVE',
        category: 'Điện thoại',
        images: [],
        createdAt: '2024-01-08T10:00:00Z',
        updatedAt: '2024-01-08T10:00:00Z'
      },
      {
        id: 19,
        name: 'Apple Watch Series 9',
        description: 'Đồng hồ thông minh Apple Watch Series 9 GPS',
        price: 12000000,
        stock: 0,
        status: 'SOLD',
        category: 'Phụ kiện',
        images: [],
        createdAt: '2024-01-07T10:00:00Z',
        updatedAt: '2024-01-07T10:00:00Z'
      },
      {
        id: 20,
        name: 'MSI Gaming Laptop',
        description: 'Laptop gaming MSI Katana GF66 RTX 4060',
        price: 25000000,
        stock: 2,
        status: 'ACTIVE',
        category: 'Laptop',
        images: [],
        createdAt: '2024-01-06T10:00:00Z',
        updatedAt: '2024-01-06T10:00:00Z'
      }
    ];

    // Số lượng tồn kho khác nhau theo chi nhánh (giá giống nhau)
    const stockByBranch = {
      'branch-1': { // Hải Châu
        1: 5,   // iPhone 14 Pro
        2: 0,   // MacBook Air M2 (hết hàng)
        3: 3,   // Samsung Galaxy S24
        4: 2,   // Dell XPS 13
        5: 1,   // iPad Pro 12.9
        6: 4,   // AirPods Pro 2
        7: 2,   // Apple Watch Series 9
        8: 3    // Sony WH-1000XM5
      },
      'branch-2': { // Thanh Khê
        1: 8,   // iPhone 14 Pro
        2: 2,   // MacBook Air M2
        3: 1,   // Samsung Galaxy S24
        4: 5,   // Dell XPS 13
        5: 3,   // iPad Pro 12.9
        6: 6,   // AirPods Pro 2
        7: 4,   // Apple Watch Series 9
        8: 2    // Sony WH-1000XM5
      },
      'branch-3': { // Sơn Trà (chờ duyệt)
        1: 0,   // iPhone 14 Pro
        2: 0,   // MacBook Air M2
        3: 0,   // Samsung Galaxy S24
        4: 0,   // Dell XPS 13
        5: 0,   // iPad Pro 12.9
        6: 0,   // AirPods Pro 2
        7: 0,   // Apple Watch Series 9
        8: 0    // Sony WH-1000XM5
      }
    };

    // Cập nhật số lượng tồn kho theo chi nhánh (giá không đổi)
    return baseProducts.map(product => ({
      ...product,
      stock: stockByBranch[branchId]?.[product.id] || 0,
      status: stockByBranch[branchId]?.[product.id] === 0 ? 'SOLD' : 'ACTIVE'
    }));
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const mockProducts = getMockProductsByBranch(currentStore?.id);
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Memoized filtered products for better performance
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || product.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const handleStatusChange = async (productId, newStatus) => {
    try {
      // Optimistic update
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, status: newStatus, updatedAt: new Date().toISOString() }
            : product
        )
      );
      console.log(`Product ${productId} status changed to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        setProducts(prevProducts => 
          prevProducts.filter(product => product.id !== productId)
        );
        console.log(`Product ${productId} deleted`);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const openStockModal = (product) => {
    setSelectedProduct(product);
    setStockInput(product.stock.toString());
    setShowStockModal(true);
  };

  const closeStockModal = () => {
    setShowStockModal(false);
    setSelectedProduct(null);
    setStockInput('');
  };

  const handleStockSubmit = () => {
    if (!stockInput || stockInput < 0) return;

    try {
      const newStock = parseInt(stockInput);
      const newStatus = newStock > 0 ? 'ACTIVE' : 'SOLD';
      
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === selectedProduct.id 
            ? { 
                ...product, 
                stock: newStock, 
                status: newStatus,
                updatedAt: new Date().toISOString() 
              }
            : product
        )
      );
      
      console.log(`Product ${selectedProduct.id} stock updated to ${newStock}, status: ${newStatus}`);
      closeStockModal();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const getModalTitle = (status) => {
    return status === 'SOLD' ? 'Nhập hàng mới' : 'Cập nhật số lượng';
  };

  const getModalDescription = (status) => {
    return status === 'SOLD' 
      ? 'Nhập số lượng hàng mới để chuyển sản phẩm về trạng thái đang bán'
      : 'Cập nhật số lượng hàng hiện tại của sản phẩm';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'HIDDEN': return 'bg-yellow-100 text-yellow-800';
      case 'SOLD': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ACTIVE': return 'Đang bán';
      case 'HIDDEN': return 'Đã ẩn';
      case 'SOLD': return 'Đã hết hàng';
      default: return status;
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100">
      {/* Product Image */}
      <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
            {getStatusLabel(product.status)}
          </span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-2 line-clamp-1">{product.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-red-600">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(product.price)}
          </span>
          <div className="text-right text-xs text-gray-500">
            <p>Số lượng: <span className="font-medium text-gray-700">{product.stock}</span></p>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex justify-center gap-1">
          {product.status === 'ACTIVE' && (
            <>
              <button
                onClick={() => handleStatusChange(product.id, 'HIDDEN')}
                className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center justify-center transition-colors"
                title="Ẩn sản phẩm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                </svg>
              </button>
              <button
                onClick={() => openStockModal(product)}
                className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors"
                title="Kho hàng"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </button>
            </>
          )}
          
          {product.status === 'HIDDEN' && (
            <>
              <button
                onClick={() => handleStatusChange(product.id, 'ACTIVE')}
                className="w-7 h-7 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center transition-colors"
                title="Hiện sản phẩm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
              <button
                onClick={() => openStockModal(product)}
                className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors"
                title="Kho hàng"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </button>
            </>
          )}
          
          {product.status === 'SOLD' && (
            <button
              onClick={() => openStockModal(product)}
              className="w-7 h-7 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center justify-center transition-colors"
              title="Đã có hàng"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </button>
          )}
          
          <button
            onClick={() => navigate(`/store/products/${product.id}`)}
            className="w-7 h-7 bg-gray-500 hover:bg-gray-600 text-white rounded-md flex items-center justify-center transition-colors"
            title="Xem chi tiết sản phẩm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
          <button
            onClick={() => handleDeleteProduct(product.id)}
            className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center transition-colors"
            title="Xóa sản phẩm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <StoreLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải sản phẩm...</p>
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
            <p className="text-gray-500 mb-4">Vui lòng chọn chi nhánh để xem sản phẩm</p>
          </div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý sản phẩm">
    <StoreLayout>
        {/* Products Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Quản lý sản phẩm
                    </h1>
                    <p className="text-gray-600 mt-1">Quản lý danh sách sản phẩm của bạn</p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
              </div>
                      <div>
                        <p className="text-sm text-green-600 font-medium">Đang bán</p>
                        <p className="text-lg font-bold text-green-700">
                          {products.filter(p => p.status === 'ACTIVE').length}
                        </p>
            </div>
          </div>
        </div>

                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                        </svg>
                      </div>
              <div>
                        <p className="text-sm text-yellow-600 font-medium">Đã ẩn</p>
                        <p className="text-lg font-bold text-yellow-700">
                          {products.filter(p => p.status === 'HIDDEN').length}
                        </p>
              </div>
            </div>
          </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
          </div>
              <div>
                        <p className="text-sm text-red-600 font-medium">Hết hàng</p>
                        <p className="text-lg font-bold text-red-700">
                          {products.filter(p => p.status === 'SOLD').length}
                        </p>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </div>

          {/* Search, Filter and Add Product */}
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
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-12 pr-12 py-3 bg-white border-2 border-green-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200 text-gray-700 placeholder-gray-400"
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
                  {/* Search results indicator */}
                  {searchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="p-2 text-sm text-gray-600">
                        Tìm thấy {filteredProducts.length} sản phẩm
                      </div>
                    </div>
                  )}
              </div>
            </div>
            
              {/* Filter Section */}
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
                    <option value="ACTIVE">🟢 Đang bán</option>
                    <option value="HIDDEN">🟡 Đã ẩn</option>
                    <option value="SOLD">🔴 Đã hết hàng</option>
              </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Add Product Button */}
              <div className="lg:w-auto">
                <Link
                  to="/store/products/add"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Thêm sản phẩm
                </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.591"/>
                  </svg>
              </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'Không tìm thấy sản phẩm' : 'Chưa có sản phẩm nào'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? `Không có sản phẩm nào khớp với "${searchTerm}"`
                    : 'Hãy thêm sản phẩm đầu tiên của bạn'
                  }
                </p>
                {!searchTerm && (
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Thêm sản phẩm đầu tiên
                  </button>
                )}
                </div>
            )}
              </div>
            </div>

        {/* Stock Update Modal */}
        {showStockModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {getModalTitle(selectedProduct.status)}
                </h3>
                <p className="text-gray-600">
                  {getModalDescription(selectedProduct.status)}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng hàng
                </label>
                <input
                  type="number"
                  value={stockInput}
                  onChange={(e) => setStockInput(e.target.value)}
                  placeholder={selectedProduct.status === 'SOLD' ? 'Nhập số lượng hàng mới' : 'Nhập số lượng hiện tại'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                  min="0"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={closeStockModal}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  onClick={handleStockSubmit}
                  disabled={!stockInput || stockInput < 0}
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed"
                >
                  {selectedProduct.status === 'SOLD' ? 'Nhập hàng' : 'Cập nhật'}
                </button>
              </div>
            </div>
          </div>
        )}
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreProducts;
