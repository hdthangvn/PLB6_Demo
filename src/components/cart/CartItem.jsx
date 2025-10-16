import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, formatPrice, toggleItemSelected } = useCart();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleGoDetail = () => {
    if (item?.product?.id != null) {
      navigate(`/product/${item.product.id}`);
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity > 0 && !isUpdating) {
      setIsUpdating(true);
      try {
        // Optimistic update - UI cập nhật ngay lập tức
        updateQuantity(item.id, newQuantity);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Error updating quantity:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemove = async () => {
    if (!isRemoving) {
      setIsRemoving(true);
      try {
        // Optimistic update - UI cập nhật ngay lập tức
        removeFromCart(item.id);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Error removing item:', error);
      } finally {
        setIsRemoving(false);
      }
    }
  };

  const itemPrice = parseInt(item.product.price.replace(/\./g, '')) || 0;
  const totalPrice = itemPrice * item.quantity;

  return (
    <div className={`flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border transition-all duration-300 ${isUpdating || isRemoving ? 'opacity-60' : ''}`}>
      {/* Select Checkbox */}
      <input
        type="checkbox"
        checked={item.selected !== false}
        onChange={() => toggleItemSelected(item.id)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      {/* Product Image (click to detail) */}
      <button
        type="button"
        onClick={handleGoDetail}
        className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0 hover:ring-2 hover:ring-blue-200 transition"
        aria-label="Xem chi tiết sản phẩm"
      >
        {item.product.image?.startsWith('http') ? (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <span className="text-2xl">{item.product.image || '📦'}</span>
        )}
      </button>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <button
          type="button"
          onClick={handleGoDetail}
          className="font-medium text-gray-900 truncate text-left hover:text-blue-600"
          aria-label="Xem chi tiết sản phẩm"
        >
          {item.product.name}
        </button>
        
        {/* Options */}
        {(item.options?.color !== 'default' || item.options?.storage !== 'default') && (
          <div className="text-sm text-gray-500 mt-1">
            {item.options?.color !== 'default' && (
              <span>Màu: {item.options.color}</span>
            )}
            {item.options?.color !== 'default' && item.options?.storage !== 'default' && (
              <span> • </span>
            )}
            {item.options?.storage !== 'default' && (
              <span>Dung lượng: {item.options.storage}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-red-600">
              {formatPrice(itemPrice)}đ
            </span>
            {item.product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(parseInt(item.product.originalPrice.replace(/\./g, '')))}đ
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1 || isUpdating}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        <span className="w-8 text-center font-medium">
          {isUpdating ? '...' : item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right flex-shrink-0 min-w-[100px]">
        <div className="font-bold text-lg text-red-600">
          {formatPrice(totalPrice)}đ
        </div>
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-sm text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRemoving ? 'Đang xóa...' : 'Xóa'}
        </button>
      </div>
    </div>
  );
};

export default CartItem;