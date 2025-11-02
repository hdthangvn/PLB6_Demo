import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currentStore } = useStoreContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [showAddVariantModal, setShowAddVariantModal] = useState(false);
  const [newVariant, setNewVariant] = useState({
    name: '',
    price: 0,
    stock: 0,
    attributes: {}
  });

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      
      // Kiểm tra localStorage trước
      const products = JSON.parse(localStorage.getItem('store_products') || '{}');
      if (products[productId]) {
        setProduct(products[productId]);
        setEditedProduct(products[productId]);
        setLoading(false);
        return;
      }

      // Mock data cho chi tiết sản phẩm
      const mockProducts = {
        '1': {
          id: '1',
          name: 'iPhone 14 Pro',
          description: 'Điện thoại iPhone 14 Pro 128GB màu tím với chip A16 Bionic mạnh mẽ',
          category: 'Điện thoại',
          brand: 'Apple',
          price: 25000000,
          originalPrice: 28000000,
          stock: 5,
          minStock: 2,
          maxStock: 50,
          weight: 206,
          dimensions: '147.5 x 71.5 x 7.85 mm',
          warranty: '12 tháng',
          status: 'ACTIVE',
          images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&crop=center'
          ],
          variants: [
            {
              id: 'VAR-001',
              name: '128GB - Màu tím',
              price: 25000000,
              stock: 3,
              status: 'APPROVED',
              attributes: {
                storage: '128GB',
                color: 'Màu tím'
              }
            },
            {
              id: 'VAR-002',
              name: '256GB - Màu tím',
              price: 28000000,
              stock: 2,
              status: 'PENDING',
              attributes: {
                storage: '256GB',
                color: 'Màu tím'
              }
            }
          ],
          specifications: {
            'Màn hình': '6.1 inch Super Retina XDR',
            'Chip': 'A16 Bionic',
            'Camera': '48MP chính + 12MP góc rộng + 12MP tele',
            'Pin': 'Lên đến 23 giờ video',
            'Hệ điều hành': 'iOS 16',
            'Kết nối': '5G, Wi-Fi 6E, Bluetooth 5.3',
            'Chống nước': 'IP68'
          },
          tags: ['iPhone', 'Apple', '5G', 'Camera Pro'],
          seoTitle: 'iPhone 14 Pro - Điện thoại cao cấp của Apple',
          seoDescription: 'iPhone 14 Pro với chip A16 Bionic, camera 48MP và thiết kế cao cấp',
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        '2': {
          id: '2',
          name: 'MacBook Air M2',
          description: 'Laptop MacBook Air M2 13 inch 256GB với hiệu năng mạnh mẽ và thiết kế mỏng nhẹ',
          category: 'Laptop',
          brand: 'Apple',
          price: 32000000,
          originalPrice: 35000000,
          stock: 0,
          minStock: 1,
          maxStock: 20,
          weight: 1240,
          dimensions: '304.1 x 215.0 x 11.3 mm',
          warranty: '12 tháng',
          status: 'SOLD',
          images: [
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center'
          ],
          variants: [
            {
              id: 'VAR-003',
              name: '13 inch 256GB',
              price: 32000000,
              stock: 0,
              status: 'REJECTED',
              attributes: {
                size: '13 inch',
                storage: '256GB'
              }
            }
          ],
          specifications: {
            'Màn hình': '13.6 inch Liquid Retina',
            'Chip': 'Apple M2',
            'RAM': '8GB',
            'Ổ cứng': '256GB SSD',
            'Pin': 'Lên đến 18 giờ',
            'Hệ điều hành': 'macOS Ventura',
            'Kết nối': '2x Thunderbolt 4, 3.5mm jack',
            'Trọng lượng': '1.24 kg'
          },
          tags: ['MacBook', 'Apple', 'M2', 'Laptop'],
          seoTitle: 'MacBook Air M2 - Laptop cao cấp của Apple',
          seoDescription: 'MacBook Air với chip M2, thiết kế mỏng nhẹ và hiệu năng mạnh mẽ',
          createdAt: '2024-01-08T10:00:00Z',
          updatedAt: '2024-01-14T10:00:00Z'
        },
        '3': {
          id: '3',
          name: 'Samsung Galaxy S24',
          description: 'Điện thoại Samsung Galaxy S24 Ultra 256GB với camera 200MP và S Pen',
          category: 'Điện thoại',
          brand: 'Samsung',
          price: 28000000,
          originalPrice: 30000000,
          stock: 3,
          minStock: 1,
          maxStock: 30,
          weight: 232,
          dimensions: '162.3 x 79.0 x 8.6 mm',
          warranty: '12 tháng',
          status: 'HIDDEN',
          images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop&crop=center'
          ],
          variants: [
            {
              id: 'VAR-004',
              name: '256GB - Màu đen',
              price: 28000000,
              stock: 2,
              status: 'APPROVED',
              attributes: {
                storage: '256GB',
                color: 'Màu đen'
              }
            },
            {
              id: 'VAR-005',
              name: '512GB - Màu đen',
              price: 32000000,
              stock: 1,
              status: 'PENDING',
              attributes: {
                storage: '512GB',
                color: 'Màu đen'
              }
            }
          ],
          specifications: {
            'Màn hình': '6.8 inch Dynamic AMOLED 2X',
            'Chip': 'Snapdragon 8 Gen 3',
            'Camera': '200MP chính + 50MP tele + 10MP tele + 12MP góc rộng',
            'Pin': '5000 mAh',
            'Hệ điều hành': 'Android 14',
            'Kết nối': '5G, Wi-Fi 7, Bluetooth 5.3',
            'Chống nước': 'IP68',
            'S Pen': 'Có'
          },
          tags: ['Samsung', 'Galaxy', 'S24', 'S Pen'],
          seoTitle: 'Samsung Galaxy S24 Ultra - Điện thoại cao cấp nhất',
          seoDescription: 'Galaxy S24 Ultra với camera 200MP, S Pen và hiệu năng mạnh mẽ',
          createdAt: '2024-01-05T10:00:00Z',
          updatedAt: '2024-01-12T10:00:00Z'
        },
        '4': {
          id: '4',
          name: 'Dell XPS 13',
          description: 'Laptop Dell XPS 13 4K Touch 16GB RAM 512GB SSD với thiết kế cao cấp',
          category: 'Laptop',
          brand: 'Dell',
          price: 35000000,
          originalPrice: 38000000,
          stock: 2,
          minStock: 1,
          maxStock: 15,
          weight: 1270,
          dimensions: '295.7 x 198.7 x 14.8 mm',
          warranty: '12 tháng',
          status: 'ACTIVE',
          images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&crop=center'
          ],
          variants: [
            {
              id: 'VAR-006',
              name: '16GB RAM 512GB SSD',
              price: 35000000,
              stock: 1,
              attributes: {
                ram: '16GB',
                storage: '512GB SSD'
              }
            },
            {
              id: 'VAR-007',
              name: '32GB RAM 1TB SSD',
              price: 42000000,
              stock: 1,
              attributes: {
                ram: '32GB',
                storage: '1TB SSD'
              }
            }
          ],
          specifications: {
            'Màn hình': '13.4 inch 4K Touch',
            'CPU': 'Intel Core i7-1360P',
            'RAM': '16GB LPDDR5',
            'Ổ cứng': '512GB SSD',
            'GPU': 'Intel Iris Xe',
            'Pin': 'Lên đến 12 giờ',
            'Hệ điều hành': 'Windows 11',
            'Kết nối': '2x Thunderbolt 4, microSD',
            'Trọng lượng': '1.27 kg'
          },
          tags: ['Dell', 'XPS', 'Laptop', '4K'],
          seoTitle: 'Dell XPS 13 - Laptop cao cấp với màn hình 4K',
          seoDescription: 'Dell XPS 13 với màn hình 4K Touch, hiệu năng mạnh mẽ và thiết kế cao cấp',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        'PROD-001': {
          id: 'PROD-001',
          name: 'iPhone 15 Pro Max',
          description: 'iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP và pin lâu dài',
          category: 'Điện thoại',
          brand: 'Apple',
          price: 30000000,
          originalPrice: 32000000,
          stock: 25,
          minStock: 5,
          maxStock: 100,
          weight: 221,
          dimensions: '159.9 x 76.7 x 8.25 mm',
          warranty: '12 tháng',
          status: 'ACTIVE',
          images: [
            'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=iPhone+15+Pro+Max',
            'https://via.placeholder.com/400x400/34C759/FFFFFF?text=iPhone+15+Pro+Max+2',
            'https://via.placeholder.com/400x400/FF9500/FFFFFF?text=iPhone+15+Pro+Max+3'
          ],
          variants: [
            {
              id: 'VAR-001',
              name: '256GB - Titan Xanh',
              price: 30000000,
              stock: 10,
              attributes: {
                storage: '256GB',
                color: 'Titan Xanh'
              }
            },
            {
              id: 'VAR-002',
              name: '512GB - Titan Xanh',
              price: 35000000,
              stock: 8,
              attributes: {
                storage: '512GB',
                color: 'Titan Xanh'
              }
            },
            {
              id: 'VAR-003',
              name: '1TB - Titan Xanh',
              price: 40000000,
              stock: 7,
              attributes: {
                storage: '1TB',
                color: 'Titan Xanh'
              }
            }
          ],
          specifications: {
            'Màn hình': '6.7 inch Super Retina XDR',
            'Chip': 'A17 Pro',
            'Camera': '48MP chính + 12MP góc rộng + 12MP tele',
            'Pin': '4422 mAh',
            'Hệ điều hành': 'iOS 17',
            'Kết nối': '5G, Wi-Fi 6E, Bluetooth 5.3',
            'Chống nước': 'IP68'
          },
          tags: ['iPhone', 'Apple', '5G', 'Camera Pro', 'Premium'],
          seoTitle: 'iPhone 15 Pro Max - Điện thoại cao cấp nhất của Apple',
          seoDescription: 'iPhone 15 Pro Max với chip A17 Pro, camera 48MP và thiết kế titan cao cấp',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-20T14:20:00Z'
        },
        'PROD-002': {
          id: 'PROD-002',
          name: 'MacBook Air M2',
          description: 'MacBook Air với chip M2 mạnh mẽ, thiết kế mỏng nhẹ và pin lâu dài',
          category: 'Laptop',
          brand: 'Apple',
          price: 28000000,
          originalPrice: 30000000,
          stock: 15,
          minStock: 3,
          maxStock: 50,
          weight: 1240,
          dimensions: '304.1 x 215.0 x 11.3 mm',
          warranty: '12 tháng',
          status: 'ACTIVE',
          images: [
            'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=MacBook+Air+M2',
            'https://via.placeholder.com/400x400/34C759/FFFFFF?text=MacBook+Air+M2+2'
          ],
          variants: [
            {
              id: 'VAR-004',
              name: '13 inch 256GB',
              price: 28000000,
              stock: 8,
              attributes: {
                size: '13 inch',
                storage: '256GB'
              }
            },
            {
              id: 'VAR-005',
              name: '13 inch 512GB',
              price: 32000000,
              stock: 7,
              attributes: {
                size: '13 inch',
                storage: '512GB'
              }
            }
          ],
          specifications: {
            'Màn hình': '13.6 inch Liquid Retina',
            'Chip': 'Apple M2',
            'RAM': '8GB',
            'Ổ cứng': '256GB SSD',
            'Pin': 'Lên đến 18 giờ',
            'Hệ điều hành': 'macOS Ventura',
            'Kết nối': '2x Thunderbolt 4, 3.5mm jack',
            'Trọng lượng': '1.24 kg'
          },
          tags: ['MacBook', 'Apple', 'M2', 'Laptop', 'Premium'],
          seoTitle: 'MacBook Air M2 - Laptop cao cấp của Apple',
          seoDescription: 'MacBook Air với chip M2, thiết kế mỏng nhẹ và hiệu năng mạnh mẽ',
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-18T16:30:00Z'
        }
      };

      const mockProduct = mockProducts[productId] || {
        id: productId,
        name: 'Sản phẩm không tồn tại',
        description: 'Sản phẩm này không tồn tại hoặc đã bị xóa',
        category: 'Khác',
        brand: 'Không xác định',
        price: 0,
        originalPrice: 0,
        stock: 0,
        minStock: 0,
        maxStock: 0,
        weight: 0,
        dimensions: 'N/A',
        warranty: 'N/A',
        status: 'INACTIVE',
        images: [],
        variants: [],
        specifications: {},
        tags: [],
        seoTitle: '',
        seoDescription: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setProduct(mockProduct);
      setEditedProduct(mockProduct);
      // Khởi tạo variant đầu tiên
      if (mockProduct.variants && mockProduct.variants.length > 0) {
        setSelectedVariant(mockProduct.variants[0]);
        if (mockProduct.variants[0].attributes?.color) {
          setSelectedColor(mockProduct.variants[0].attributes.color);
        }
        if (mockProduct.variants[0].attributes?.storage) {
          setSelectedStorage(mockProduct.variants[0].attributes.storage);
        }
      }
    } catch (error) {
      console.error('Error fetching product detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVariantChange = (variantId, field, value) => {
    const updatedProduct = {
      ...editedProduct,
      variants: editedProduct.variants.map(variant => 
        variant.id === variantId 
          ? { ...variant, [field]: value }
          : variant
      )
    };

    setEditedProduct(updatedProduct);
    setProduct(updatedProduct);

    // Lưu vào localStorage
    const products = JSON.parse(localStorage.getItem('store_products') || '{}');
    products[productId] = updatedProduct;
    localStorage.setItem('store_products', JSON.stringify(products));
  };

  const handleSpecificationChange = (key, value) => {
    setEditedProduct(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }));
  };

  const handleAddVariant = () => {
    if (!newVariant.name || !newVariant.price) {
      alert('Vui lòng nhập đầy đủ thông tin variant');
      return;
    }

    const variant = {
      id: `VAR-${Date.now()}`,
      name: newVariant.name,
      price: newVariant.price,
      stock: newVariant.stock,
      attributes: newVariant.attributes,
      status: 'PENDING', // Chờ admin duyệt
      createdAt: new Date().toISOString()
    };

    const updatedProduct = {
      ...editedProduct,
      variants: [...(editedProduct.variants || []), variant]
    };

    setEditedProduct(updatedProduct);
    setProduct(updatedProduct);

    // Lưu vào localStorage
    const products = JSON.parse(localStorage.getItem('store_products') || '{}');
    products[productId] = updatedProduct;
    localStorage.setItem('store_products', JSON.stringify(products));

    setNewVariant({
      name: '',
      price: 0,
      stock: 0,
      attributes: {}
    });
    setShowAddVariantModal(false);
    alert('Đã thêm variant thành công! Variant sẽ được gửi để admin duyệt.');
  };

  const handleDeleteVariant = (variantId) => {
    if (window.confirm('Bạn có chắc muốn xóa variant này?')) {
      const updatedProduct = {
        ...editedProduct,
        variants: editedProduct.variants.filter(v => v.id !== variantId)
      };

      setEditedProduct(updatedProduct);
      setProduct(updatedProduct);

      // Lưu vào localStorage
      const products = JSON.parse(localStorage.getItem('store_products') || '{}');
      products[productId] = updatedProduct;
      localStorage.setItem('store_products', JSON.stringify(products));
    }
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProduct(editedProduct);
      setIsEditing(false);
      alert('Cập nhật sản phẩm thành công!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Có lỗi xảy ra khi cập nhật sản phẩm!');
    }
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Tìm variant phù hợp với màu và storage đã chọn
    const variant = editedProduct.variants.find(v => 
      v.attributes?.color === color && 
      v.attributes?.storage === selectedStorage
    );
    if (variant) {
      setSelectedVariant(variant);
      setEditedProduct(prev => ({
        ...prev,
        price: variant.price,
        stock: variant.stock
      }));
    }
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
    // Tìm variant phù hợp với màu và storage đã chọn
    const variant = editedProduct.variants.find(v => 
      v.attributes?.color === selectedColor && 
      v.attributes?.storage === storage
    );
    if (variant) {
      setSelectedVariant(variant);
      setEditedProduct(prev => ({
        ...prev,
        price: variant.price,
        stock: variant.stock
      }));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusText = (status, approvedStock) => {
    if (approvedStock === 0) return 'Chờ duyệt variant';
    switch (status) {
      case 'ACTIVE': return 'Đang bán';
      case 'HIDDEN': return 'Ẩn';
      case 'SOLD': return 'Hết hàng';
      case 'PENDING': return 'Chờ duyệt';
      default: return status;
    }
  };

  const getStatusColor = (status, approvedStock) => {
    if (approvedStock === 0) return 'bg-yellow-100 text-yellow-800';
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'HIDDEN': return 'bg-yellow-100 text-yellow-800';
      case 'SOLD': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  if (loading) {
    return (
      <StoreLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </StoreLayout>
    );
  }

  if (!product) {
    return (
      <StoreLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h2>
          <p className="text-gray-600 mb-6">Sản phẩm này không tồn tại hoặc đã bị xóa.</p>
          <Link
            to="/store/products"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ← Quay lại danh sách sản phẩm
          </Link>
        </div>
      </StoreLayout>
    );
  }

  // Tính tổng stock từ các variant đã duyệt
  const approvedStock = editedProduct.variants 
    ? editedProduct.variants.filter(v => v.status === 'APPROVED').reduce((sum, v) => sum + v.stock, 0)
    : 0;

  return (
    <StoreLayout>
      <StoreStatusGuard currentStore={currentStore} pageName="chi tiết sản phẩm">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/store-dashboard/products"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Chỉnh sửa sản phẩm' : 'Chi tiết sản phẩm'}
                </h1>
                <p className="text-gray-600">Quản lý thông tin sản phẩm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => navigate('/store/products')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Quay lại
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Lưu thay đổi
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={editedProduct.images?.[0] || 'https://via.placeholder.com/500x500/007AFF/FFFFFF?text=Product+Image'}
                  alt={editedProduct.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Thumbnail Images */}
              {editedProduct.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {editedProduct.images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-green-500 transition-colors">
                      <img
                        src={image}
                        alt={`${editedProduct.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Image Navigation */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>1/{editedProduct.images?.length || 1}</span>
                <span>Hover để phóng to</span>
              </div>
              
              {/* Warranty Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Bảo hành chính hãng {editedProduct.warranty}</p>
                    <p className="text-xs text-green-600">Đổi trả trong 7 ngày</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Name & Badge */}
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{editedProduct.name}</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {editedProduct.category}
                </span>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(editedProduct.price)}
                  </span>
                  {editedProduct.originalPrice > editedProduct.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(editedProduct.originalPrice)}
                    </span>
                  )}
                </div>
                {editedProduct.originalPrice > editedProduct.price && (
                  <div className="text-green-600 font-medium">
                    Tiết kiệm: {formatPrice(editedProduct.originalPrice - editedProduct.price)}
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${approvedStock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-medium ${approvedStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {approvedStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                </span>
                <span className="text-gray-500">({approvedStock} sản phẩm)</span>
              </div>

              {/* Variants Selection - Only show approved variants */}
              {editedProduct.variants && editedProduct.variants.filter(v => v.status === 'APPROVED').length > 0 && (
                <div className="space-y-4">
                  {/* Color Variants */}
                  {editedProduct.variants.some(v => v.attributes?.color && v.status === 'APPROVED') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Màu sắc:</label>
                      <div className="flex gap-2 flex-wrap">
                        {Array.from(new Set(editedProduct.variants.filter(v => v.status === 'APPROVED').map(v => v.attributes?.color).filter(Boolean))).map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                              selectedColor === color
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Storage Variants */}
                  {editedProduct.variants.some(v => v.attributes?.storage && v.status === 'APPROVED') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dung lượng:</label>
                      <div className="flex gap-2 flex-wrap">
                        {Array.from(new Set(editedProduct.variants.filter(v => v.status === 'APPROVED').map(v => v.attributes?.storage).filter(Boolean))).map((storage) => (
                          <button
                            key={storage}
                            onClick={() => handleStorageSelect(storage)}
                            className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                              selectedStorage === storage
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {storage}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Show message when no approved variants */}
              {editedProduct.variants && editedProduct.variants.filter(v => v.status === 'APPROVED').length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Chưa có biến thể nào được duyệt</p>
                      <p>Vui lòng thêm biến thể và chờ admin duyệt để có thể bán sản phẩm.</p>
                    </div>
                  </div>
                </div>
              )}


              {/* Management Actions */}
              <div className="space-y-4">
                {/* Stock Management */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Quản lý tồn kho</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-blue-700">Tồn kho hiện tại:</span>
                    <span className="font-semibold text-blue-900">{approvedStock} sản phẩm</span>
                    {isEditing && (
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                        Cập nhật
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Management */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Trạng thái sản phẩm</h4>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(editedProduct.status, approvedStock)}`}>
                      {getStatusText(editedProduct.status, approvedStock)}
                    </span>
                    {isEditing && (
                      <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors">
                        Thay đổi
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm">
                    Cập nhật giá
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm">
                    Nhập hàng
                  </button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm">
                    Xem báo cáo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Biến thể sản phẩm</h3>
              <button
                onClick={() => setShowAddVariantModal(true)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>+</span>
                Thêm biến thể
              </button>
            </div>
            
            {(editedProduct.variants && editedProduct.variants.length > 0) ? (
              <div className="space-y-4">
                {editedProduct.variants.map((variant) => (
                  <div key={variant.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên biến thể</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) => handleVariantChange(variant.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      ) : (
                        <span className="text-gray-900">{variant.name}</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(variant.id, 'price', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      ) : (
                        <span className="text-gray-900">{formatPrice(variant.price)}</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho</label>
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={variant.stock}
                            onChange={(e) => handleVariantChange(variant.id, 'stock', parseInt(e.target.value))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleVariantChange(variant.id, 'stock', variant.stock + 1)}
                              className="w-8 h-6 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-bold transition-colors"
                              title="Thêm 1"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleVariantChange(variant.id, 'stock', Math.max(0, variant.stock - 1))}
                              className="w-8 h-6 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-bold transition-colors"
                              title="Bớt 1"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-medium">{variant.stock}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleVariantChange(variant.id, 'stock', variant.stock + 1)}
                              className="w-6 h-6 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-bold transition-colors"
                              title="Nhập hàng +1"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleVariantChange(variant.id, 'stock', Math.max(0, variant.stock - 1))}
                              className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-bold transition-colors"
                              title="Xuất hàng -1"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thuộc tính</label>
                      <div className="text-sm text-gray-600">
                        {Object.entries(variant.attributes || {}).map(([key, value]) => (
                          <div key={key}>{key}: {value}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                      <div className="mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          variant.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          variant.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          variant.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {variant.status === 'APPROVED' ? '✓ Đã duyệt' :
                           variant.status === 'PENDING' ? '⏳ Chờ duyệt' :
                           variant.status === 'REJECTED' ? '✗ Từ chối' :
                           'Không xác định'}
                        </span>
                      </div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thao tác</label>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleVariantChange(variant.id, 'stock', variant.stock + 10)}
                          className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-medium transition-colors"
                          title="Nhập hàng +10"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleVariantChange(variant.id, 'stock', variant.stock + 5)}
                          className="px-3 py-1.5 bg-green-400 hover:bg-green-500 text-white rounded text-xs font-medium transition-colors"
                          title="Nhập hàng +5"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleVariantChange(variant.id, 'stock', Math.max(0, variant.stock - 5))}
                          className="px-3 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded text-xs font-medium transition-colors"
                          title="Xuất hàng -5"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleVariantChange(variant.id, 'stock', Math.max(0, variant.stock - 10))}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors"
                          title="Xuất hàng -10"
                        >
                          -10
                        </button>
                        {isEditing && (
                          <button
                            onClick={() => handleDeleteVariant(variant.id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition-colors"
                            title="Xóa variant"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📦</div>
                <p>Chưa có biến thể nào</p>
                <button
                  onClick={() => setShowAddVariantModal(true)}
                  className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  Thêm biến thể đầu tiên
                </button>
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(editedProduct.specifications || {}).map(([key, value]) => (
                <div key={key} className="flex">
                  <div className="w-1/3 font-medium text-gray-700">{key}:</div>
                  <div className="w-2/3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleSpecificationChange(key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <span className="text-gray-900">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bổ sung</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trọng lượng (g)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedProduct.weight}
                      onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <span className="text-gray-900">{product.weight}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kích thước</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProduct.dimensions}
                      onChange={(e) => handleInputChange('dimensions', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <span className="text-gray-900">{product.dimensions}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bảo hành</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProduct.warranty}
                      onChange={(e) => handleInputChange('warranty', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <span className="text-gray-900">{product.warranty}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO & Tags</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProduct.seoTitle}
                      onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <span className="text-gray-900">{product.seoTitle}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                  {isEditing ? (
                    <textarea
                      value={editedProduct.seoDescription}
                      onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <span className="text-gray-900">{product.seoDescription}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {(editedProduct.tags || []).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Variant Modal */}
        {showAddVariantModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Thêm variant mới</h2>
                <button
                  onClick={() => setShowAddVariantModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên variant *</label>
                  <input
                    type="text"
                    value={newVariant.name}
                    onChange={(e) => setNewVariant(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="VD: iPhone 14 Pro 128GB Tím"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá *</label>
                  <input
                    type="number"
                    value={newVariant.price}
                    onChange={(e) => setNewVariant(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    placeholder="25000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng tồn kho</label>
                  <input
                    type="number"
                    value={newVariant.stock}
                    onChange={(e) => setNewVariant(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thuộc tính (tùy chọn)</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Màu sắc"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={newVariant.attributes?.color || ''}
                        onChange={(e) => setNewVariant(prev => ({
                          ...prev,
                          attributes: { ...prev.attributes, color: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Dung lượng"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={newVariant.attributes?.storage || ''}
                        onChange={(e) => setNewVariant(prev => ({
                          ...prev,
                          attributes: { ...prev.attributes, storage: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  {Object.keys(newVariant.attributes || {}).length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(newVariant.attributes || {}).map(([key, value]) => (
                        <span key={key} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Lưu ý:</p>
                      <p>Variant mới sẽ được gửi để admin duyệt trước khi có thể bán.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddVariantModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddVariant}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Thêm variant
                </button>
              </div>
            </div>
          </div>
        )}
      </StoreStatusGuard>
    </StoreLayout>
  );
};

export default StoreProductDetail;
