import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StoreLayout from '../../layouts/StoreLayout';
import { useStoreContext } from '../../context/StoreContext';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';

const StoreProducts = () => {
  const navigate = useNavigate();
  const { currentStore, loading: storeLoading } = useStoreContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    if (currentStore) {
      fetchProducts();
    }
    
    // Lắng nghe thay đổi từ localStorage
    const handleStorageChange = () => {
      fetchProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Kiểm tra localStorage mỗi 1 giây để đồng bộ
    const interval = setInterval(() => {
      fetchProducts();
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [currentStore]);

  const getMockProductsByBranch = (branchId) => {
    // Danh sách sản phẩm chung cho tất cả chi nhánh
    const baseProducts = [
        {
          id: 1,
        name: 'iPhone 15 Pro Max 256GB',
        description: 'iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP và pin lâu dài',
        price: 35000000,
        category: 'Điện thoại',
        brand: 'Apple',
          status: 'ACTIVE',
        images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop&crop=center'],
        createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          variants: [
            { id: 'VAR-001', name: '128GB - Màu tím', price: 25000000, stock: 3, status: 'APPROVED' },
            { id: 'VAR-002', name: '256GB - Màu tím', price: 28000000, stock: 2, status: 'PENDING' },
            { id: 'VAR-003', name: '512GB - Màu tím', price: 35000000, stock: 1, status: 'APPROVED' }
          ]
        },
        {
          id: 2,
        name: 'Samsung Galaxy S24 Ultra 512GB',
        description: 'Galaxy S24 Ultra với S Pen, camera 200MP và AI tích hợp',
          price: 32000000,
        category: 'Điện thoại',
        brand: 'Samsung',
        status: 'ACTIVE',
        images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop&crop=center'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        variants: [
          { id: 'VAR-004', name: '256GB - Màu đen', price: 28000000, stock: 2, status: 'APPROVED' },
          { id: 'VAR-005', name: '512GB - Màu đen', price: 32000000, stock: 1, status: 'PENDING' },
          { id: 'VAR-006', name: '1TB - Màu đen', price: 38000000, stock: 0, status: 'REJECTED' }
        ]
        },
        {
          id: 3,
        name: 'MacBook Air M2 256GB',
        description: 'MacBook Air M2 với hiệu năng mạnh mẽ và pin lâu dài',
          price: 28000000,
        category: 'Laptop',
        brand: 'Apple',
        status: 'ACTIVE',
        images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop&crop=center'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        variants: [
          { id: 'VAR-007', name: '13 inch 256GB', price: 28000000, stock: 0, status: 'REJECTED' },
          { id: 'VAR-008', name: '13 inch 512GB', price: 32000000, stock: 2, status: 'APPROVED' }
        ]
        },
        {
          id: 4,
        name: 'Dell XPS 13 512GB',
        description: 'Dell XPS 13 với thiết kế cao cấp và hiệu năng vượt trội',
        price: 25000000,
        category: 'Laptop',
        brand: 'Dell',
        status: 'ACTIVE',
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        variants: [
          { id: 'VAR-009', name: '16GB RAM 512GB SSD', price: 25000000, stock: 1, status: 'APPROVED' },
          { id: 'VAR-010', name: '32GB RAM 1TB SSD', price: 32000000, stock: 1, status: 'PENDING' }
        ]
        },
        {
          id: 5,
        name: 'iPad Pro 12.9 inch 256GB',
        description: 'iPad Pro 12.9 với chip M2 và màn hình Liquid Retina XDR',
        price: 22000000,
          category: 'Máy tính bảng',
        brand: 'Apple',
        status: 'ACTIVE',
        images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop&crop=center'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        variants: [
          { id: 'VAR-011', name: '13 inch 256GB', price: 22000000, stock: 8, status: 'APPROVED' },
          { id: 'VAR-012', name: '13 inch 512GB', price: 25000000, stock: 2, status: 'APPROVED' }
        ]
        },
        {
          id: 6,
          name: 'AirPods Pro 2',
        description: 'AirPods Pro 2 với chống ồn chủ động và không gian âm thanh',
        price: 6500000,
          category: 'Phụ kiện',
        brand: 'Apple',
        status: 'ACTIVE',
        images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop&crop=center'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        variants: [
          { id: 'VAR-013', name: 'Màu trắng', price: 6500000, stock: 20, status: 'APPROVED' },
          { id: 'VAR-014', name: 'Màu đen', price: 6500000, stock: 15, status: 'PENDING' }
        ]
        },
        {
          id: 7,
          name: 'Sony WH-1000XM5',
        description: 'Tai nghe chống ồn Sony WH-1000XM5 với chất lượng âm thanh cao',
          price: 8500000,
          category: 'Phụ kiện',
        brand: 'Sony',
        status: 'ACTIVE',
        images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop&crop=center'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        variants: [
          { id: 'VAR-015', name: 'Màu đen', price: 8500000, stock: 12, status: 'APPROVED' },
          { id: 'VAR-016', name: 'Màu bạc', price: 8500000, stock: 8, status: 'REJECTED' }
        ]
        },
        {
        id: 8,
        name: 'ASUS ROG Strix G15',
        description: 'Laptop gaming ASUS ROG với RTX 4060 và AMD Ryzen 7',
        price: 22000000,
        category: 'Laptop Gaming',
        brand: 'ASUS',
        status: 'ACTIVE',
        images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=500&fit=crop&crop=center'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        variants: [
          { id: 'VAR-017', name: 'RTX 4060 16GB', price: 22000000, stock: 4, status: 'APPROVED' },
          { id: 'VAR-018', name: 'RTX 4070 32GB', price: 28000000, stock: 2, status: 'PENDING' }
        ]
      }
    ];

    // Số lượng tồn kho khác nhau theo chi nhánh
    const stockByBranch = {
      'branch-1-1': { // Chi nhánh Hải Châu - Trung tâm thành phố, tồn kho cao
        1: 25,  // iPhone 15 Pro Max
        2: 18,  // Samsung Galaxy S24 Ultra
        3: 12,  // MacBook Air M2
        4: 8,   // Dell XPS 13
        5: 15,  // iPad Pro 12.9
        6: 30,  // AirPods Pro 2
        7: 20,  // Sony WH-1000XM5
        8: 6    // ASUS ROG Strix G15
      },
      'branch-1-2': { // Chi nhánh Thanh Khê - Khu dân cư, tồn kho trung bình
        1: 15,  // iPhone 15 Pro Max
        2: 12,  // Samsung Galaxy S24 Ultra
        3: 8,   // MacBook Air M2
        4: 5,   // Dell XPS 13
        5: 10,  // iPad Pro 12.9
        6: 20,  // AirPods Pro 2
        7: 12,  // Sony WH-1000XM5
        8: 4    // ASUS ROG Strix G15
      },
      'branch-1-3': { // Chi nhánh Sơn Trà (PENDING) - Chưa có hàng
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0
      },
      'branch-1-4': { // Chi nhánh Cẩm Lệ (PENDING) - Chưa có hàng
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0
      },
      'branch-1-5': { // Chi nhánh Ngũ Hành Sơn (REJECTED) - Chưa có hàng
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0
      }
    };

    // Cập nhật số lượng tồn kho theo chi nhánh và tính từ variants đã duyệt
    return baseProducts.map(product => {
      // Tính tổng stock từ các variant đã duyệt
      const approvedStock = product.variants 
        ? product.variants.filter(v => v.status === 'APPROVED').reduce((sum, v) => sum + v.stock, 0)
        : 0;
      
      // Đếm số variant theo trạng thái
      const variantStats = product.variants ? {
        approved: product.variants.filter(v => v.status === 'APPROVED').length,
        pending: product.variants.filter(v => v.status === 'PENDING').length,
        rejected: product.variants.filter(v => v.status === 'REJECTED').length
      } : { approved: 0, pending: 0, rejected: 0 };

      return {
        ...product,
        stock: approvedStock, // Sử dụng stock từ variants đã duyệt
        variantStats // Thêm thống kê variant
      };
    });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Đọc từ localStorage trước
      const storedProducts = JSON.parse(localStorage.getItem('store_products') || '{}');
      
      // Lấy mock data làm base
      const mockProducts = getMockProductsByBranch(currentStore?.id);
      
      // Merge với dữ liệu từ localStorage
      const mergedProducts = mockProducts.map(product => {
        const storedProduct = storedProducts[product.id];
        if (storedProduct) {
          // Tính tổng stock từ các variant đã duyệt
          const approvedStock = storedProduct.variants 
            ? storedProduct.variants.filter(v => v.status === 'APPROVED').reduce((sum, v) => sum + v.stock, 0)
            : 0;
          
          // Đếm số variant theo trạng thái
          const variantStats = storedProduct.variants ? {
            approved: storedProduct.variants.filter(v => v.status === 'APPROVED').length,
            pending: storedProduct.variants.filter(v => v.status === 'PENDING').length,
            rejected: storedProduct.variants.filter(v => v.status === 'REJECTED').length
          } : { approved: 0, pending: 0, rejected: 0 };

          return {
            ...storedProduct,
            stock: approvedStock, // Sử dụng stock từ variants đã duyệt
            variantStats // Thêm thống kê variant
          };
        }
        
        // Nếu không có trong localStorage, tính từ mock data
        const approvedStock = product.variants 
          ? product.variants.filter(v => v.status === 'APPROVED').reduce((sum, v) => sum + v.stock, 0)
          : 0;
        
        const variantStats = product.variants ? {
          approved: product.variants.filter(v => v.status === 'APPROVED').length,
          pending: product.variants.filter(v => v.status === 'PENDING').length,
          rejected: product.variants.filter(v => v.status === 'REJECTED').length
        } : { approved: 0, pending: 0, rejected: 0 };

        return {
          ...product,
          stock: approvedStock,
          variantStats
        };
      });
      
      setProducts(mergedProducts);
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
            <div className="mt-1 flex gap-1">
              <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                ✓{product.variantStats?.approved || 0}
              </span>
              <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">
                ⏳{product.variantStats?.pending || 0}
              </span>
              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                ✗{product.variantStats?.rejected || 0}
              </span>
            </div>
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
                onClick={() => navigate(`/store-dashboard/products/${product.id}`)}
                className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors"
                title="Quản lý kho hàng"
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
                onClick={() => navigate(`/store-dashboard/products/${product.id}`)}
                className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors"
                title="Quản lý kho hàng"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </button>
            </>
          )}
          
          {product.status === 'SOLD' && (
            <button
              onClick={() => navigate(`/store-dashboard/products/${product.id}`)}
              className="w-7 h-7 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center justify-center transition-colors"
              title="Nhập hàng"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </button>
          )}
          
          <button
            onClick={() => navigate(`/store-dashboard/products/${product.id}`)}
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
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý sản phẩm" loading={storeLoading}>
    <StoreLayout>
        {/* Products Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-2xl p-6">
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      <span className="text-cyan-600">Quản lý</span> <span className="text-blue-600">sản phẩm</span>
                    </h1>
                    <p className="text-gray-600 mt-1">Quản lý danh sách sản phẩm của bạn</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đang bán</p>
                      <p className="text-xl font-bold text-gray-900">{products.filter(p => p.status === 'ACTIVE').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đã ẩn</p>
                      <p className="text-xl font-bold text-gray-900">{products.filter(p => p.status === 'HIDDEN').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hết hàng</p>
                      <p className="text-xl font-bold text-gray-900">{products.filter(p => p.status === 'SOLD').length}</p>
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
                <button
                  onClick={() => navigate('/store-dashboard/products/create')}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Thêm sản phẩm
                </button>
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
                  <button 
                    onClick={() => navigate('/store-dashboard/products/create')}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Thêm sản phẩm đầu tiên
                  </button>
                )}
                </div>
            )}
              </div>
            </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreProducts;
