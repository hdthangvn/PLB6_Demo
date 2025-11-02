import React, { useState } from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StorePromotions = () => {
  const { currentStore } = useStoreContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);

  // Mock data for promotions theo chi nhánh
  const getMockPromotionsByBranch = (branchId) => {
    const branchPromotions = {
      'branch-1-1': [ // Hải Châu - Đã duyệt - Nhiều khuyến mãi điện thoại
    {
      id: 1,
      name: 'Giảm giá iPhone 15',
      description: 'Giảm giá 10% cho tất cả iPhone 15 series',
      type: 'PERCENTAGE',
      value: 10,
      minOrderAmount: 20000000,
      maxDiscount: 5000000,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      usageLimit: 100,
      usedCount: 25,
      status: 'ACTIVE',
      createdAt: '2023-12-20'
    },
    {
      id: 2,
      name: 'Freeship điện thoại',
      description: 'Miễn phí vận chuyển cho điện thoại từ 1 triệu',
      type: 'FREESHIP',
      value: 0,
      minOrderAmount: 1000000,
      maxDiscount: 50000,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      usageLimit: 1000,
      usedCount: 156,
      status: 'ACTIVE',
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      name: 'Giảm giá Samsung Galaxy',
      description: 'Giảm giá 2 triệu cho Galaxy S24 Ultra',
      type: 'FIXED_AMOUNT',
      value: 2000000,
      minOrderAmount: 25000000,
      maxDiscount: 2000000,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      usageLimit: 50,
      usedCount: 8,
      status: 'ACTIVE',
      createdAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'Flash Sale iPhone',
      description: 'Giảm giá 20% iPhone trong ngày cuối tuần',
      type: 'PERCENTAGE',
      value: 20,
      minOrderAmount: 15000000,
      maxDiscount: 10000000,
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      usageLimit: 200,
      usedCount: 0,
      status: 'SCHEDULED',
      createdAt: '2024-01-25'
    },
    {
      id: 5,
      name: 'Khuyến mãi AirPods',
      description: 'Giảm giá 30% cho AirPods Pro 2',
      type: 'PERCENTAGE',
      value: 30,
      minOrderAmount: 5000000,
      maxDiscount: 1500000,
      startDate: '2023-11-24',
      endDate: '2023-11-26',
      usageLimit: 500,
      usedCount: 500,
      status: 'EXPIRED',
      createdAt: '2023-11-20'
    }
      ],
      'branch-1-2': [ // Thanh Khê - Đã duyệt - Khuyến mãi laptop
        {
          id: 21,
          name: 'Giảm giá Laptop Gaming',
          description: 'Giảm giá 15% cho tất cả laptop gaming',
          type: 'PERCENTAGE',
          value: 15,
          minOrderAmount: 15000000,
          maxDiscount: 5000000,
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          usageLimit: 50,
          usedCount: 12,
          status: 'ACTIVE',
          createdAt: '2023-12-25'
        },
        {
          id: 22,
          name: 'Freeship Thanh Khê',
          description: 'Miễn phí vận chuyển trong Thanh Khê',
          type: 'FREESHIP',
          value: 0,
          minOrderAmount: 300000,
          maxDiscount: 30000,
          startDate: '2024-01-10',
          endDate: '2024-02-10',
          usageLimit: 200,
          usedCount: 45,
          status: 'ACTIVE',
          createdAt: '2024-01-05'
        }
      ],
      'branch-3': [ // Sơn Trà (chờ duyệt) - Ít khuyến mãi
        {
          id: 31,
          name: 'Khuyến mãi mở cửa',
          description: 'Giảm giá 5% cho khách hàng đầu tiên',
          type: 'PERCENTAGE',
          value: 5,
          minOrderAmount: 1000000,
          maxDiscount: 1000000,
          startDate: '2024-01-20',
          endDate: '2024-02-20',
          usageLimit: 10,
          usedCount: 1,
          status: 'ACTIVE',
          createdAt: '2024-01-20'
        }
      ],
      'branch-4': [], // Cẩm Lệ (bị từ chối) - Không có khuyến mãi
      'branch-5': []  // Liên Chiểu (bị từ chối) - Không có khuyến mãi
    };
    
    return branchPromotions[branchId] || [];
  };

  const promotions = getMockPromotionsByBranch(currentStore?.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-600';
      case 'SCHEDULED': return 'bg-blue-100 text-blue-600';
      case 'EXPIRED': return 'bg-gray-100 text-gray-600';
      case 'PAUSED': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ACTIVE': return 'Đang hoạt động';
      case 'SCHEDULED': return 'Sắp diễn ra';
      case 'EXPIRED': return 'Đã hết hạn';
      case 'PAUSED': return 'Tạm dừng';
      default: return status;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'PERCENTAGE': return 'Phần trăm';
      case 'FIXED_AMOUNT': return 'Số tiền cố định';
      case 'FREESHIP': return 'Miễn phí ship';
      default: return type;
    }
  };

  const filteredPromotions = promotions.filter(promotion =>
    promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePromotion = (promotion) => {
    setPromotionToDelete(promotion);
    setShowDeleteModal(true);
  };

  const confirmDeletePromotion = () => {
    if (promotionToDelete) {
      // Logic xóa khuyến mãi
      console.log('Deleting promotion:', promotionToDelete.id);
      // Có thể thêm API call ở đây
      setShowDeleteModal(false);
      setPromotionToDelete(null);
    }
  };

  const cancelDeletePromotion = () => {
    setShowDeleteModal(false);
    setPromotionToDelete(null);
  };

  const PromotionCard = ({ promotion }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{promotion.name}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(promotion.status)}`}>
              {getStatusText(promotion.status)}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{promotion.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Loại khuyến mãi</p>
              <p className="text-sm font-medium text-gray-900">{getTypeText(promotion.type)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Giá trị</p>
              <p className="text-sm font-medium text-gray-900">
                {promotion.type === 'PERCENTAGE' ? `${promotion.value}%` : 
                 promotion.type === 'FIXED_AMOUNT' ? formatPrice(promotion.value) : 
                 'Miễn phí'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Đơn tối thiểu</p>
              <p className="text-sm font-medium text-gray-900">{formatPrice(promotion.minOrderAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Giảm tối đa</p>
              <p className="text-sm font-medium text-gray-900">{formatPrice(promotion.maxDiscount)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Ngày bắt đầu</p>
              <p className="text-sm font-medium text-gray-900">{new Date(promotion.startDate).toLocaleDateString('vi-VN')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày kết thúc</p>
              <p className="text-sm font-medium text-gray-900">{new Date(promotion.endDate).toLocaleDateString('vi-VN')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Giới hạn sử dụng</p>
              <p className="text-sm font-medium text-gray-900">{promotion.usageLimit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Đã sử dụng</p>
              <p className="text-sm font-medium text-gray-900">{promotion.usedCount}</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(promotion.usedCount / promotion.usageLimit) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            Đã sử dụng {promotion.usedCount}/{promotion.usageLimit} lượt
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          Chỉnh sửa
        </button>
        {promotion.status === 'ACTIVE' ? (
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Tạm dừng
          </button>
        ) : promotion.status === 'PAUSED' ? (
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Kích hoạt
          </button>
        ) : null}
        <button 
          onClick={() => handleDeletePromotion(promotion)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Xóa
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          Sao chép
        </button>
      </div>
    </div>
  );

  const CreatePromotionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tạo khuyến mãi mới</h2>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên khuyến mãi</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên khuyến mãi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mô tả khuyến mãi"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại khuyến mãi</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="PERCENTAGE">Phần trăm</option>
                <option value="FIXED_AMOUNT">Số tiền cố định</option>
                <option value="FREESHIP">Miễn phí ship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giá trị</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập giá trị"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Đơn hàng tối thiểu</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giảm giá tối đa</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giới hạn sử dụng</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Số lượt sử dụng tối đa"
            />
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
              Tạo khuyến mãi
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý khuyến mãi">
      <StoreLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-2xl p-6">
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      <span className="text-cyan-600">Quản lý</span> <span className="text-blue-600">khuyến mãi</span>
                    </h1>
                    <p className="text-gray-600 mt-1">Tạo và quản lý các chương trình khuyến mãi</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Tạo khuyến mãi
                </button>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tổng khuyến mãi</p>
                      <p className="text-xl font-bold text-gray-900">{promotions.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                      <p className="text-xl font-bold text-gray-900">{promotions.filter(p => p.status === 'ACTIVE').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sắp hết hạn</p>
                      <p className="text-xl font-bold text-gray-900">{promotions.filter(p => p.status === 'EXPIRING').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đã kết thúc</p>
                      <p className="text-xl font-bold text-gray-900">{promotions.filter(p => p.status === 'EXPIRED').length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm khuyến mãi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="ACTIVE">Đang hoạt động</option>
                <option value="SCHEDULED">Sắp diễn ra</option>
                <option value="EXPIRED">Đã hết hạn</option>
                <option value="PAUSED">Tạm dừng</option>
              </select>
            </div>
          </div>
        </div>

        {/* Promotions List */}
        <div className="space-y-4">
          {filteredPromotions.length > 0 ? (
            filteredPromotions.map(promotion => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có khuyến mãi</h3>
              <p className="text-gray-600 mb-4">Chưa có khuyến mãi nào phù hợp với tìm kiếm.</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Tạo khuyến mãi đầu tiên
              </button>
            </div>
          )}
        </div>

        {/* Create Promotion Modal */}
        {showCreateModal && <CreatePromotionModal />}
        
        {/* Delete Confirmation Modal */}
        {showDeleteModal && <DeleteConfirmationModal />}
      </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

const DeleteConfirmationModal = ({ promotionToDelete, onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa</h3>
          <p className="text-sm text-gray-600">Hành động này không thể hoàn tác</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700">
          Bạn có chắc chắn muốn xóa khuyến mãi <strong>"{promotionToDelete?.name}"</strong> không?
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Tất cả dữ liệu liên quan đến khuyến mãi này sẽ bị xóa vĩnh viễn.
        </p>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={cancelDeletePromotion}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={confirmDeletePromotion}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Xóa khuyến mãi
        </button>
      </div>
    </div>
  </div>
);

export default StorePromotions;