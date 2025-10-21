import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { adminService } from '../../services/adminService';

const AdminProductVariants = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchVariants();
  }, [currentPage]);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await adminService.getPendingProductVariants(currentPage, 10);

      if (result.success) {
        setVariants(result.data.content || []);
        setTotalPages(result.data.totalPages || 0);
        setTotalElements(result.data.totalElements || 0);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (variantId) => {
    if (!confirm('Bạn có chắc chắn muốn duyệt biến thể này?')) return;

    try {
      const result = await adminService.approveProductVariant(variantId);
      if (result.success) {
        alert('Duyệt biến thể thành công!');
        fetchVariants(); // Refresh data
      } else {
        alert('Lỗi: ' + result.error);
      }
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleReject = async (variantId) => {
    const reason = prompt('Nhập lý do từ chối:');
    if (!reason) return;

    try {
      const result = await adminService.rejectProductVariant(variantId, reason);
      if (result.success) {
        alert('Từ chối biến thể thành công!');
        fetchVariants(); // Refresh data
      } else {
        alert('Lỗi: ' + result.error);
      }
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý biến thể sản phẩm</h1>
          <p className="mt-1 text-sm text-gray-500">
            Duyệt và quản lý các biến thể sản phẩm đang chờ phê duyệt
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Lỗi tải dữ liệu</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : variants.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Không có biến thể</h3>
            <p className="mt-1 text-sm text-gray-500">
              Không có biến thể sản phẩm nào chờ duyệt
            </p>
          </div>
        ) : (
          <>
            {/* Variants List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {variants.map((variant) => (
                  <li key={variant.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            {variant.image ? (
                              <img
                                className="h-16 w-16 rounded-lg object-cover"
                                src={`https://e-commerce-raq1.onrender.com${variant.image}`}
                                alt={variant.name}
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 font-medium text-lg">
                                  🔧
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{variant.name}</p>
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Chờ duyệt
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              <p>ID: {variant.id}</p>
                              <p>Màu sắc: {variant.color}</p>
                              <p>Kích thước: {variant.size}</p>
                              <p>Giá: {formatPrice(variant.price)}</p>
                              <p>Số lượng: {variant.quantity}</p>
                              <p>Ngày tạo: {formatDate(variant.createdAt)}</p>
                              {variant.product && (
                                <p>Sản phẩm: {variant.product.name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(variant.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            ✅ Duyệt
                          </button>
                          <button
                            onClick={() => handleReject(variant.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            ❌ Từ chối
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Trước
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị <span className="font-medium">{currentPage * 10 + 1}</span> đến{' '}
                      <span className="font-medium">{Math.min((currentPage + 1) * 10, totalElements)}</span> trong{' '}
                      <span className="font-medium">{totalElements}</span> kết quả
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Trước
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                        disabled={currentPage === totalPages - 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Sau
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProductVariants;
