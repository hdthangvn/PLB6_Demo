import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  formatDiscountValue,
  formatCurrency,
  isPromotionValid,
  getPromotionErrorMessage,
} from '../../services/promotionService';

const PromotionList = ({ 
  orderTotal, 
  storeId, 
  productIds = [],
  onSelectPromotion,
  selectedCode = null,
}) => {
  const [showList, setShowList] = useState(false);

  // ⚠️ MOCK DATA - API getAvailablePromotions không tồn tại
  // Backend sẽ validate promotion khi checkout
  const promotions = [];

  const handleSelectPromotion = (promotion) => {
    if (isPromotionValid(promotion)) {
      onSelectPromotion(promotion);
      setShowList(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div>
      {/* Button to toggle list */}
      <button
        onClick={() => setShowList(!showList)}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
      >
        <span>🎁</span>
        <span>{showList ? 'Ẩn mã khuyến mãi' : 'Xem mã khuyến mãi có sẵn'}</span>
        <span>{showList ? '▲' : '▼'}</span>
      </button>

      {/* Promotion list modal/dropdown */}
      {showList && (
        <div className="mt-4 border border-gray-200 rounded-lg bg-white shadow-lg max-h-96 overflow-y-auto">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Mã khuyến mãi có sẵn</h3>
            <p className="text-xs text-gray-500 mt-1">
              Chọn mã để áp dụng cho đơn hàng của bạn
            </p>
          </div>

              {promotions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <span className="text-4xl mb-2 block">🎫</span>
              <p>Không có mã khuyến mãi nào khả dụng</p>
              <p className="text-xs text-gray-400 mt-1">
                Hãy quay lại sau để nhận ưu đãi!
              </p>
            </div>
          )}

          {promotions.length > 0 && (
            <div className="divide-y divide-gray-200">
              {promotions.map((promotion) => {
                const isValid = isPromotionValid(promotion);
                const isSelected = selectedCode === promotion.code;
                const errorMsg = !isValid ? getPromotionErrorMessage(promotion, orderTotal) : null;

                return (
                  <div
                    key={promotion.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    } ${!isValid ? 'opacity-60' : 'cursor-pointer'}`}
                    onClick={() => isValid && handleSelectPromotion(promotion)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Code and discount */}
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-mono font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded text-sm">
                            {promotion.code}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                            {formatDiscountValue(promotion)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-700 mb-2">
                          {promotion.description || 'Giảm giá cho đơn hàng'}
                        </p>

                        {/* Conditions */}
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                          {promotion.minOrderAmount > 0 && (
                            <span className="flex items-center space-x-1">
                              <span>📦</span>
                              <span>Đơn tối thiểu: {formatCurrency(promotion.minOrderAmount)}</span>
                            </span>
                          )}
                          <span className="flex items-center space-x-1">
                            <span>📅</span>
                            <span>HSD: {formatDate(promotion.endDate)}</span>
                          </span>
                          {promotion.maxUsageCount && (
                            <span className="flex items-center space-x-1">
                              <span>🎯</span>
                              <span>
                                Còn: {promotion.maxUsageCount - (promotion.currentUsageCount || 0)} lượt
                              </span>
                            </span>
                          )}
                        </div>

                        {/* Error message */}
                        {errorMsg && (
                          <p className="text-xs text-red-600 mt-2 flex items-center space-x-1">
                            <span>⚠️</span>
                            <span>{errorMsg}</span>
                          </p>
                        )}
                      </div>

                      {/* Select button */}
                      {isValid && (
                        <button
                          className={`ml-4 px-4 py-1.5 rounded text-sm font-medium whitespace-nowrap ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPromotion(promotion);
                          }}
                        >
                          {isSelected ? '✓ Đã chọn' : 'Chọn'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

PromotionList.propTypes = {
  orderTotal: PropTypes.number.isRequired,
  storeId: PropTypes.string,
  productIds: PropTypes.arrayOf(PropTypes.string),
  onSelectPromotion: PropTypes.func.isRequired,
  selectedCode: PropTypes.string,
};

export default PromotionList;

