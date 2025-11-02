import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerLayout from '../../layouts/SellerLayout';
import SellerAuthGuard from '../../components/auth/SellerAuthGuard';

const SellerCreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    weight: '',
    dimensions: '',
    warranty: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Tạo sản phẩm mới với ID tự động
      const newProduct = {
        id: `PROD-${Date.now()}`, // ID tạm thời
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price) || 0,
        originalPrice: parseInt(formData.price) || 0,
        category: formData.category,
        brand: formData.brand,
        stock: parseInt(formData.stock) || 0,
        minStock: 1,
        maxStock: 100,
        weight: parseInt(formData.weight) || 0,
        dimensions: formData.dimensions,
        warranty: formData.warranty,
        status: 'ACTIVE', // Tự động kích hoạt
        images: ['https://via.placeholder.com/400x400/007AFF/FFFFFF?text=New+Product'],
        variants: [],
        specifications: {},
        tags: [],
        seoTitle: formData.name,
        seoDescription: formData.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Lưu vào localStorage
      const products = JSON.parse(localStorage.getItem('seller_products') || '{}');
      products[newProduct.id] = newProduct;
      localStorage.setItem('seller_products', JSON.stringify(products));

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Sản phẩm đã được tạo thành công! Sản phẩm đã được đăng và có thể bán ngay.');
      navigate('/seller-dashboard/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Có lỗi xảy ra khi tạo sản phẩm!');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Điện thoại',
    'Laptop',
    'Tai nghe',
    'Loa',
    'Đồng hồ thông minh',
    'Phụ kiện',
    'Khác'
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Dell',
    'HP',
    'Lenovo',
    'Sony',
    'Bose',
    'JBL',
    'Khác'
  ];

  return (
    <SellerLayout>
      <SellerAuthGuard>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/seller-dashboard/products')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Thêm sản phẩm mới</h1>
                <p className="text-gray-600">Tạo sản phẩm mới để bán trên TechStore</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="VD: iPhone 15 Pro Max"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thương hiệu *
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn thương hiệu</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh mục *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá bán (VNĐ) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="25000000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số lượng tồn kho *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trọng lượng (g)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="206"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả sản phẩm *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mô tả chi tiết về sản phẩm..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kích thước
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="147.5 x 71.5 x 7.85 mm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bảo hành
                    </label>
                    <input
                      type="text"
                      name="warranty"
                      value={formData.warranty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="12 tháng"
                    />
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  <div className="text-sm text-green-800">
                    <p className="font-medium">Thông tin quan trọng:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Sản phẩm sẽ được đăng ngay lập tức và có thể bán</li>
                      <li>Bạn có thể chỉnh sửa hoặc gỡ sản phẩm bất cứ lúc nào</li>
                      <li>Hãy đảm bảo thông tin sản phẩm chính xác và đầy đủ</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/seller-dashboard/products')}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Đang tạo...
                    </>
                  ) : (
                    'Tạo sản phẩm'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </SellerAuthGuard>
    </SellerLayout>
  );
};

export default SellerCreateProduct;
