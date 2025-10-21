import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { useStores } from '../../hooks/useStores';
import Button from '../../components/ui/Button';

const StoresPage = () => {
  const navigate = useNavigate();
  const { stores, loading, error } = useStores();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter stores by search query
  const filteredStores = stores.filter(store =>
    store.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải danh sách cửa hàng...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Lỗi tải dữ liệu</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Thử lại
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Danh sách cửa hàng
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý và theo dõi các cửa hàng
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm cửa hàng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  + Thêm cửa hàng
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {filteredStores.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🏪</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'Không tìm thấy cửa hàng' : 'Chưa có cửa hàng nào'}
              </h3>
              <p className="text-gray-600">
                {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Các cửa hàng sẽ xuất hiện ở đây'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Tìm thấy <span className="font-medium text-blue-600">{filteredStores.length}</span> cửa hàng
                  {searchQuery && ` cho "${searchQuery}"`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => handleStoreClick(store.id)}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {/* Store Header */}
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">
                          {store.name?.charAt(0) || 'S'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {store.name || 'Cửa hàng'}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {store.description || 'Cửa hàng uy tín'}
                        </p>
                      </div>
                    </div>

                    {/* Store Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-600">
                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate">{typeof store.address === 'string' ? store.address : 'Địa chỉ chưa cập nhật'}</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600">
                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{store.phone || 'Số điện thoại chưa cập nhật'}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStoreClick(store.id);
                      }}
                      className="w-full text-xs py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      Xem cửa hàng
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default StoresPage;
