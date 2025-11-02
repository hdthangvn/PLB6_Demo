import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  calculateDiscount,
  formatDiscountValue,
  formatCurrency,
} from '../../services/promotionService';

const PromoCodeInput = ({ 
  orderTotal, 
  storeId, 
  productIds = [], 
  onApplySuccess,
  onRemove,
  appliedPromotion = null,
}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!code.trim()) {
      setError('Vui lòng nhập mã khuyến mãi');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ⚠️ MOCK VALIDATION - Backend sẽ validate khi checkout
      // API validation không được implement vì frontend chỉ gửi code khi đặt hàng
      const upperCode = code.trim().toUpperCase();
      
      // Mock promotion data cho UI demo
      const mockPromotion = {
        code: upperCode,
        discountType: 'PERCENTAGE',
        discountValue: 10, // 10%
        maxDiscountAmount: 50000,
        minOrderAmount: 100000,
        description: `Giảm giá ${upperCode}`,
      };
      
      // Basic validation
      if (orderTotal < mockPromotion.minOrderAmount) {
        setError(`Đơn hàng tối thiểu ${formatCurrency(mockPromotion.minOrderAmount)}`);
        setLoading(false);
        return;
      }
      
      const discount = calculateDiscount(mockPromotion, orderTotal);
      
      onApplySuccess({
        promotion: mockPromotion,
        discount,
        code: upperCode,
      });
      
      setCode('');
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi áp dụng mã');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setCode('');
    setError('');
    onRemove();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  // Nếu đã apply promotion
  if (appliedPromotion) {
    const discount = calculateDiscount(appliedPromotion.promotion, orderTotal);
    
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-green-600 font-semibold">
                🎉 {appliedPromotion.code}
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                {formatDiscountValue(appliedPromotion.promotion)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {appliedPromotion.promotion.description || 'Giảm giá đơn hàng'}
            </p>
            <p className="text-sm font-semibold text-green-600 mt-1">
              Tiết kiệm: {formatCurrency(discount)}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="ml-4 text-red-500 hover:text-red-700 font-medium text-sm"
          >
            Xóa
          </button>
        </div>
      </div>
    );
  }

  // Chưa apply promotion - hiển thị input
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Mã khuyến mãi (nếu có)
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError('');
          }}
          onKeyPress={handleKeyPress}
          placeholder="Nhập mã khuyến mãi"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Đang kiểm tra...' : 'Áp dụng'}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

PromoCodeInput.propTypes = {
  orderTotal: PropTypes.number.isRequired,
  storeId: PropTypes.string,
  productIds: PropTypes.arrayOf(PropTypes.string),
  onApplySuccess: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  appliedPromotion: PropTypes.shape({
    code: PropTypes.string.isRequired,
    promotion: PropTypes.object.isRequired,
    discount: PropTypes.number.isRequired,
  }),
};

export default PromoCodeInput;

