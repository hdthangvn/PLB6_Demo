import React, { useState, useEffect } from 'react';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('complaints'); // complaints, reports

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Mock complaints data
      const mockComplaints = [
        {
          id: 'complaint-1',
          orderId: 'ORD-2025-001',
          customerName: 'Nguyễn Văn A',
          customerEmail: 'nguyenvana@email.com',
          customerPhone: '0123456789',
          storeName: 'TechPro Store',
          productName: 'iPhone 15 Pro',
          complaintType: 'product_damaged',
          complaintTypeText: 'Sản phẩm bị hỏng',
          description: 'Sản phẩm iPhone 15 Pro khi nhận về đã bị hỏng màn hình, không thể sử dụng được.',
          images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
          status: 'pending',
          statusText: 'Chờ xử lý',
          priority: 'high',
          createdAt: '2024-01-23T10:30:00Z',
          expectedResolution: '2024-01-25T10:30:00Z'
        },
        {
          id: 'complaint-2',
          orderId: 'ORD-2025-002',
          customerName: 'Trần Thị B',
          customerEmail: 'tranthib@email.com',
          customerPhone: '0987654321',
          storeName: 'Mobile World',
          productName: 'MacBook Pro M4',
          complaintType: 'delivery_delay',
          complaintTypeText: 'Giao hàng chậm',
          description: 'Đơn hàng được đặt ngày 20/01 nhưng đến nay vẫn chưa được giao, đã quá hạn cam kết.',
          images: [],
          status: 'in_progress',
          statusText: 'Đang xử lý',
          priority: 'medium',
          createdAt: '2024-01-22T16:30:00Z',
          expectedResolution: '2024-01-24T16:30:00Z'
        },
        {
          id: 'complaint-3',
          orderId: 'ORD-2025-003',
          customerName: 'Lê Văn C',
          customerEmail: 'levanc@email.com',
          customerPhone: '0369258147',
          storeName: 'Audio Store',
          productName: 'Sony WH-1000XM5',
          complaintType: 'wrong_product',
          complaintTypeText: 'Sai sản phẩm',
          description: 'Đặt Sony WH-1000XM5 màu đen nhưng nhận được màu trắng.',
          images: ['https://via.placeholder.com/150'],
          status: 'resolved',
          statusText: 'Đã xử lý',
          priority: 'medium',
          createdAt: '2024-01-21T14:20:00Z',
          expectedResolution: '2024-01-23T14:20:00Z',
          resolution: 'Đã đổi sản phẩm đúng màu cho khách hàng',
          resolvedAt: '2024-01-22T09:15:00Z'
        }
      ];

      // Mock reports data
      const mockReports = [
        {
          id: 'report-1',
          reporterName: 'Nguyễn Thị D',
          reporterEmail: 'nguyenthid@email.com',
          storeName: 'ABC Electronics',
          storeId: 'store-3',
          reportType: 'fake_products',
          reportTypeText: 'Bán hàng giả',
          description: 'Store này bán iPhone giả với giá rẻ, chất lượng kém và không có bảo hành.',
          evidence: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
          status: 'pending',
          statusText: 'Chờ xử lý',
          priority: 'high',
          createdAt: '2024-01-23T09:15:00Z'
        },
        {
          id: 'report-2',
          reporterName: 'Phạm Văn E',
          reporterEmail: 'phamvane@email.com',
          storeName: 'Gaming Zone',
          storeId: 'store-4',
          reportType: 'poor_service',
          reportTypeText: 'Dịch vụ kém',
          description: 'Store này có thái độ phục vụ khách hàng rất kém, không hỗ trợ khi có vấn đề.',
          evidence: [],
          status: 'investigating',
          statusText: 'Đang điều tra',
          priority: 'medium',
          createdAt: '2024-01-22T11:45:00Z'
        },
        {
          id: 'report-3',
          reporterName: 'Hệ thống',
          reporterEmail: 'system@admin.com',
          storeName: 'TechPro Store',
          storeId: 'store-1',
          reportType: 'policy_violation',
          reportTypeText: 'Vi phạm chính sách',
          description: 'Store này có nhiều đánh giá tiêu cực và tỷ lệ hoàn trả cao.',
          evidence: [],
          status: 'resolved',
          statusText: 'Đã xử lý',
          priority: 'low',
          createdAt: '2024-01-20T08:30:00Z',
          resolution: 'Đã cảnh báo store và yêu cầu cải thiện dịch vụ',
          resolvedAt: '2024-01-21T10:00:00Z'
        }
      ];

      if (activeTab === 'complaints') {
        setComplaints(mockComplaints);
      } else {
        setReports(mockReports);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus, type) => {
    try {
      if (type === 'complaint') {
        setComplaints(prev => 
          prev.map(complaint => 
            complaint.id === id 
              ? { 
                  ...complaint, 
                  status: newStatus,
                  statusText: getStatusText(newStatus),
                  resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : complaint.resolvedAt
                }
              : complaint
          )
        );
      } else {
        setReports(prev => 
          prev.map(report => 
            report.id === id 
              ? { 
                  ...report, 
                  status: newStatus,
                  statusText: getStatusText(newStatus),
                  resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : report.resolvedAt
                }
              : report
          )
        );
      }
      alert('Cập nhật trạng thái thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'in_progress':
        return 'Đang xử lý';
      case 'investigating':
        return 'Đang điều tra';
      case 'resolved':
        return 'Đã xử lý';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
      case 'investigating':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const currentData = activeTab === 'complaints' ? complaints : reports;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Khiếu nại & Báo cáo</h1>
          <p className="text-gray-600 mt-1">Quản lý khiếu nại khách hàng và báo cáo vi phạm</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'complaints', label: 'Khiếu nại', count: complaints.length },
              { key: 'reports', label: 'Báo cáo', count: reports.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {currentData.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {activeTab === 'complaints' ? `Khiếu nại #${item.id}` : `Báo cáo #${item.id}`}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority === 'high' ? 'Cao' : item.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {activeTab === 'complaints' ? `Đơn hàng: ${item.orderId}` : `Store: ${item.storeName}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activeTab === 'complaints' ? `Khách hàng: ${item.customerName}` : `Người báo cáo: ${item.reporterName}`}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {item.statusText}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {activeTab === 'complaints' ? 'Loại khiếu nại:' : 'Loại báo cáo:'}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {activeTab === 'complaints' ? item.complaintTypeText : item.reportTypeText}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-700">Mô tả:</span>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>

                {(item.images?.length > 0 || item.evidence?.length > 0) && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Hình ảnh:</span>
                    <div className="flex gap-2 mt-2">
                      {(item.images || item.evidence || []).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Evidence ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>📅 Tạo lúc: {formatDate(item.createdAt)}</span>
                  {item.expectedResolution && (
                    <span>⏰ Dự kiến xử lý: {formatDate(item.expectedResolution)}</span>
                  )}
                </div>

                {item.resolution && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Giải pháp:</span>
                    <p className="text-sm text-green-700 mt-1">{item.resolution}</p>
                    {item.resolvedAt && (
                      <p className="text-xs text-green-600 mt-1">
                        Xử lý lúc: {formatDate(item.resolvedAt)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {item.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(item.id, 'in_progress', activeTab)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Bắt đầu xử lý
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, 'resolved', activeTab)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Đánh dấu đã xử lý
                    </button>
                  </>
                )}
                {item.status === 'in_progress' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(item.id, 'resolved', activeTab)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Hoàn thành xử lý
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, 'pending', activeTab)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      Quay lại chờ xử lý
                    </button>
                  </>
                )}
                {item.status === 'investigating' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(item.id, 'resolved', activeTab)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Kết thúc điều tra
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, 'pending', activeTab)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      Quay lại chờ xử lý
                    </button>
                  </>
                )}
                {item.status === 'resolved' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'in_progress', activeTab)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Mở lại xử lý
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentData.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">{activeTab === 'complaints' ? '⚠️' : '🚨'}</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không có {activeTab === 'complaints' ? 'khiếu nại' : 'báo cáo'} nào
          </h3>
          <p className="text-gray-600">
            Không có {activeTab === 'complaints' ? 'khiếu nại' : 'báo cáo'} nào phù hợp với bộ lọc hiện tại.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
