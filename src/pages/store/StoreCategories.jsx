import React, { useState } from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StoreCategories = () => {
  const { currentStore } = useStoreContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for categories
  const categories = [
    {
      id: 1,
      name: 'Điện thoại',
      description: 'Các sản phẩm điện thoại thông minh',
      icon: '📱',
      productCount: 15,
      isActive: true,
      createdAt: '2023-12-01',
      parentId: null
    },
    {
      id: 2,
      name: 'Laptop',
      description: 'Máy tính xách tay và laptop',
      icon: '💻',
      productCount: 8,
      isActive: true,
      createdAt: '2023-12-01',
      parentId: null
    },
    {
      id: 3,
      name: 'Tablet',
      description: 'Máy tính bảng và iPad',
      icon: '📱',
      productCount: 5,
      isActive: true,
      createdAt: '2023-12-01',
      parentId: null
    },
    {
      id: 4,
      name: 'Phụ kiện',
      description: 'Các phụ kiện điện tử',
      icon: '🎧',
      productCount: 25,
      isActive: true,
      createdAt: '2023-12-01',
      parentId: null
    },
    {
      id: 5,
      name: 'iPhone',
      description: 'Điện thoại iPhone của Apple',
      icon: '🍎',
      productCount: 6,
      isActive: true,
      createdAt: '2023-12-15',
      parentId: 1
    },
    {
      id: 6,
      name: 'Samsung',
      description: 'Điện thoại Samsung Galaxy',
      icon: '📱',
      productCount: 4,
      isActive: true,
      createdAt: '2023-12-15',
      parentId: 1
    },
    {
      id: 7,
      name: 'Tai nghe',
      description: 'Tai nghe và headphone',
      icon: '🎧',
      productCount: 12,
      isActive: true,
      createdAt: '2023-12-20',
      parentId: 4
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (isActive) => {
    return isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600';
  };

  const getStatusText = (isActive) => {
    return isActive ? 'Hoạt động' : 'Tạm dừng';
  };

  const getParentName = (parentId) => {
    if (!parentId) return 'Danh mục gốc';
    const parent = categories.find(c => c.id === parentId);
    return parent ? parent.name : 'Không xác định';
  };

  const CategoryCard = ({ category }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{category.icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(category.isActive)}`}>
                {getStatusText(category.isActive)}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{category.description}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>Sản phẩm: {category.productCount}</span>
              <span>Cha: {getParentName(category.parentId)}</span>
              <span>Tạo: {new Date(category.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          Chỉnh sửa
        </button>
        <button className={`px-4 py-2 rounded-lg text-sm transition-colors ${category.isActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
          {category.isActive ? 'Tạm dừng' : 'Kích hoạt'}
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          Xóa
        </button>
      </div>
    </div>
  );

  const CreateCategoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tạo danh mục mới</h2>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên danh mục</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên danh mục"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mô tả danh mục"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục cha</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Danh mục gốc</option>
              {categories.filter(c => !c.parentId).map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <div className="grid grid-cols-8 gap-2">
              {['📱', '💻', '📱', '🎧', '🍎', '📦', '⌚', '📷'].map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tạo danh mục
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý danh mục">
      <StoreLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Quản lý danh mục
                    </h1>
                    <p className="text-gray-600 mt-1">Tổ chức và quản lý danh mục sản phẩm</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Tạo danh mục
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng danh mục</p>
                <p className="text-2xl font-bold text-purple-600">{categories.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📂</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Danh mục gốc</p>
                <p className="text-2xl font-bold text-blue-600">{categories.filter(c => !c.parentId).length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Danh mục con</p>
                <p className="text-2xl font-bold text-green-600">{categories.filter(c => c.parentId).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng sản phẩm</p>
                <p className="text-2xl font-bold text-orange-600">{categories.reduce((sum, c) => sum + c.productCount, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📂</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có danh mục</h3>
              <p className="text-gray-600 mb-4">Chưa có danh mục nào phù hợp với tìm kiếm.</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Tạo danh mục đầu tiên
              </button>
            </div>
          )}
        </div>

        {/* Create Category Modal */}
        {showCreateModal && <CreateCategoryModal />}
      </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StoreCategories;
