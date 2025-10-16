import React, { useState } from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';
import { useStoreContext } from '../../context/StoreContext';

const StorePayments = () => {
  const { currentStore } = useStoreContext();
  const [activeTab, setActiveTab] = useState('methods');

  // Mock data for payments
  const paymentMethods = [
    {
      id: 'COD',
      name: 'Thanh toán khi nhận hàng',
      description: 'Khách hàng thanh toán khi nhận được hàng',
      isActive: true,
      fee: 0,
      processingTime: 'Ngay lập tức',
      icon: '💰'
    },
    {
      id: 'BANK_TRANSFER',
      name: 'Chuyển khoản ngân hàng',
      description: 'Thanh toán qua chuyển khoản ngân hàng',
      isActive: true,
      fee: 0,
      processingTime: '1-2 ngày làm việc',
      icon: '🏦'
    },
    {
      id: 'CREDIT_CARD',
      name: 'Thẻ tín dụng',
      description: 'Thanh toán bằng thẻ Visa, Mastercard',
      isActive: false,
      fee: 2.5,
      processingTime: 'Ngay lập tức',
      icon: '💳'
    },
    {
      id: 'E_WALLET',
      name: 'Ví điện tử',
      description: 'Thanh toán qua MoMo, ZaloPay, VNPay',
      isActive: false,
      fee: 1.5,
      processingTime: 'Ngay lập tức',
      icon: '📱'
    }
  ];

  const transactions = [
    {
      id: 'TXN001',
      orderId: 'ORD001',
      customerName: 'Nguyễn Văn A',
      amount: 35500000,
      method: 'COD',
      status: 'COMPLETED',
      date: '2024-01-20T10:30:00Z',
      fee: 0
    },
    {
      id: 'TXN002',
      orderId: 'ORD002',
      customerName: 'Trần Thị B',
      amount: 45000000,
      method: 'BANK_TRANSFER',
      status: 'PENDING',
      date: '2024-01-19T14:20:00Z',
      fee: 0
    },
    {
      id: 'TXN003',
      orderId: 'ORD003',
      customerName: 'Lê Văn C',
      amount: 28000000,
      method: 'COD',
      status: 'COMPLETED',
      date: '2024-01-18T16:45:00Z',
      fee: 0
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-600';
      case 'PENDING': return 'bg-yellow-100 text-yellow-600';
      case 'FAILED': return 'bg-red-100 text-red-600';
      case 'CANCELLED': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'COMPLETED': return 'Hoàn thành';
      case 'PENDING': return 'Chờ xử lý';
      case 'FAILED': return 'Thất bại';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const getMethodText = (method) => {
    switch (method) {
      case 'COD': return 'COD';
      case 'BANK_TRANSFER': return 'Chuyển khoản';
      case 'CREDIT_CARD': return 'Thẻ tín dụng';
      case 'E_WALLET': return 'Ví điện tử';
      default: return method;
    }
  };

  const tabs = [
    { id: 'methods', label: 'Phương thức thanh toán', count: paymentMethods.length },
    { id: 'transactions', label: 'Giao dịch', count: transactions.length },
    { id: 'settings', label: 'Cài đặt', count: 0 }
  ];

  const renderMethodsTab = () => (
    <div className="space-y-4">
      {paymentMethods.map(method => (
        <div key={method.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{method.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${method.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                    {method.isActive ? 'Hoạt động' : 'Tạm dừng'}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{method.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Phí: {method.fee}%</span>
                  <span>Xử lý: {method.processingTime}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Chỉnh sửa
              </button>
              <button className={`px-4 py-2 rounded-lg text-sm transition-colors ${method.isActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                {method.isActive ? 'Tạm dừng' : 'Kích hoạt'}
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Thêm phương thức thanh toán</h3>
        <p className="text-gray-600 mb-4">Tích hợp phương thức thanh toán mới</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Thêm phương thức
        </button>
      </div>
    </div>
  );

  const renderTransactionsTab = () => (
    <div className="space-y-4">
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
                placeholder="Tìm kiếm giao dịch..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="ALL">Tất cả trạng thái</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="PENDING">Chờ xử lý</option>
              <option value="FAILED">Thất bại</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giao dịch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">Đơn: {transaction.orderId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPrice(transaction.amount)}</div>
                    {transaction.fee > 0 && (
                      <div className="text-sm text-gray-500">Phí: {formatPrice(transaction.fee)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getMethodText(transaction.method)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Chi tiết</button>
                      {transaction.status === 'PENDING' && (
                        <button className="text-green-600 hover:text-green-900">Xác nhận</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cài đặt thanh toán</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Tự động xác nhận thanh toán</h4>
              <p className="text-sm text-gray-500">Tự động xác nhận thanh toán COD khi giao hàng thành công</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Thông báo thanh toán</h4>
              <p className="text-sm text-gray-500">Nhận thông báo khi có giao dịch mới</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin ngân hàng</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên ngân hàng</label>
            <input
              type="text"
              defaultValue="Vietcombank"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số tài khoản</label>
            <input
              type="text"
              defaultValue="1234567890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên chủ tài khoản</label>
            <input
              type="text"
              defaultValue="TechPro Store"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chi nhánh</label>
            <input
              type="text"
              defaultValue="Chi nhánh TP.HCM"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'methods': return renderMethodsTab();
      case 'transactions': return renderTransactionsTab();
      case 'settings': return renderSettingsTab();
      default: return renderMethodsTab();
    }
  };

  return (
    <StoreStatusGuard currentStore={currentStore} pageName="quản lý thanh toán">
      <StoreLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Quản lý thanh toán
                  </h1>
                  <p className="text-gray-600 mt-1">Quản lý phương thức thanh toán và giao dịch</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng giao dịch</p>
                <p className="text-2xl font-bold text-blue-600">{transactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">{transactions.filter(t => t.status === 'COMPLETED').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Chờ xử lý</p>
                <p className="text-2xl font-bold text-yellow-600">{transactions.filter(t => t.status === 'PENDING').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-purple-600">{formatPrice(transactions.reduce((sum, t) => sum + t.amount, 0))}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} {tab.count > 0 && `(${tab.count})`}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </StoreLayout>
    </StoreStatusGuard>
  );
};

export default StorePayments;
