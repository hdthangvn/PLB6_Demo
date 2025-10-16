import React, { useState } from 'react';
import SellerLayout from '../../layouts/SellerLayout';

const SellerShop = () => {
  const [shop, setShop] = useState({
    shopName: 'Shop TechPro',
    description: 'Chuyên cung cấp các sản phẩm công nghệ chất lượng cao với giá cả hợp lý',
    category: 'Công nghệ',
    address: '456 Đường XYZ, Phường 2, Quận 2, TP.HCM',
    phone: '0123456789',
    email: 'shoptechpro@email.com',
    website: 'https://shoptechpro.com',
    businessLicense: 'BL-2024-001234',
    taxCode: '0123456789',
    logo: null
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShop(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Mock save - trong thực tế sẽ gọi API
    console.log('Saving shop info:', shop);
    setIsEditing(false);
    alert('Cập nhật thông tin shop thành công!');
  };

  const handleCancel = () => {
    // Reset về giá trị ban đầu
    setShop({
      shopName: 'Shop TechPro',
      description: 'Chuyên cung cấp các sản phẩm công nghệ chất lượng cao với giá cả hợp lý',
      category: 'Công nghệ',
      address: '456 Đường XYZ, Phường 2, Quận 2, TP.HCM',
      phone: '0123456789',
      email: 'shoptechpro@email.com',
      website: 'https://shoptechpro.com',
      businessLicense: 'BL-2024-001234',
      taxCode: '0123456789',
      logo: null
    });
    setIsEditing(false);
  };

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Thông tin shop
                    </h1>
                    <p className="text-gray-600 mt-1">Quản lý thông tin cửa hàng của bạn</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Chỉnh sửa
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Hủy
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        Lưu thay đổi
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Info Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Logo Section */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                {isEditing && (
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                    Thay đổi logo
                  </button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên shop *
                </label>
                <input
                  type="text"
                  name="shopName"
                  value={shop.shopName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-green-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả shop
                </label>
                <textarea
                  name="description"
                  value={shop.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors resize-none ${
                    isEditing 
                      ? 'border-gray-300 focus:border-green-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục *
                </label>
                <select
                  name="category"
                  value={shop.category}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-green-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                >
                  <option value="Công nghệ">Công nghệ</option>
                  <option value="Thời trang">Thời trang</option>
                  <option value="Gia dụng">Gia dụng</option>
                  <option value="Thể thao">Thể thao</option>
                  <option value="Sách">Sách</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ shop *
                </label>
                <textarea
                  name="address"
                  value={shop.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={2}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors resize-none ${
                    isEditing 
                      ? 'border-gray-300 focus:border-green-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shop.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                      isEditing 
                        ? 'border-gray-300 focus:border-green-500' 
                        : 'border-gray-200 bg-gray-50 text-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shop.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                      isEditing 
                        ? 'border-gray-300 focus:border-green-500' 
                        : 'border-gray-200 bg-gray-50 text-gray-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={shop.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-green-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Thông tin pháp lý</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giấy phép kinh doanh
              </label>
              <input
                type="text"
                name="businessLicense"
                value={shop.businessLicense}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                  isEditing 
                    ? 'border-gray-300 focus:border-green-500' 
                    : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã số thuế
              </label>
              <input
                type="text"
                name="taxCode"
                value={shop.taxCode}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                  isEditing 
                    ? 'border-gray-300 focus:border-green-500' 
                    : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Shop Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Thống kê shop</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Sản phẩm</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">20</div>
              <div className="text-sm text-gray-600">Đơn hàng</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">4.8</div>
              <div className="text-sm text-gray-600">Đánh giá</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">15M</div>
              <div className="text-sm text-gray-600">Doanh thu</div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerShop;
