import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ THÊM IMPORT
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const ProductInfo = ({ product }) => {
  const navigate = useNavigate(); // ✅ THÊM HOOK
  const { addToCart, isInCart, getProductQuantityInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Đen');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false); // ✅ THÊM STATE
  const [addMode, setAddMode] = useState('combine'); // 'combine' hoặc 'separate'

  // Mock data - trong thực tế sẽ từ product object
  const colors = ['Đen', 'Trắng', 'Xanh', 'Hồng'];
  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

  const currentOptions = {
    color: selectedColor,
    storage: selectedStorage
  };

  const productInCart = isInCart(product?.id, currentOptions);
  const totalQuantityInCart = getProductQuantityInCart(product?.id, currentOptions);

  const handleAddToCart = async (forceNew = false) => {
    if (!product) return;
    
    setIsAdding(true);
    try {
      // ✅ SỬ DỤNG THAM SỐ forceNew
      const result = addToCart(product, quantity, currentOptions, forceNew || addMode === 'separate');
      
      if (result.success) {
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
        notification.textContent = result.message;
        document.body.appendChild(notification);
        
        // Auto remove notification after 3 seconds
        setTimeout(() => {
          notification.classList.add('opacity-0', 'translate-x-full');
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }, 3000);
        
        // Reset quantity về 1 sau khi thêm thành công
        setQuantity(1);
      }
    } finally {
      setIsAdding(false);
    }
  };

  // ✅ SỬA LẠI handleBuyNow
  const handleBuyNow = async () => {
    if (!product) return;
    
    setIsBuying(true);
    try {
      // Thêm sản phẩm vào giỏ hàng trước
      const result = addToCart(product, quantity, currentOptions, true);
      
      if (result.success) {
        // Show success notification nhưng ngắn hơn
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
        notification.innerHTML = `
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Đang chuyển đến giỏ hàng...
          </div>
        `;
        document.body.appendChild(notification);
        
        // Chuyển hướng đến cart page sau 800ms (đủ thời gian hiển thị notification)
        setTimeout(() => {
          navigate('/cart');
          
          // Remove notification sau khi navigate
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 800);
        
        // Reset quantity
        setQuantity(1);
      }
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Title & Badge */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{product?.name}</h1>
          {product?.badge && (
            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${
              product.badge === 'Hot' ? 'bg-red-500' :
              product.badge === 'Mới nhất' ? 'bg-green-500' :
              product.badge === 'Gaming' ? 'bg-purple-500' :
              'bg-blue-500'
            }`}>
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-gray-600">{product?.subtitle}</p>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-red-600">
            {product?.price}đ
          </span>
          {product?.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              {product.originalPrice}đ
            </span>
          )}
        </div>
        {product?.originalPrice && (
          <div className="text-sm text-green-600">
            Tiết kiệm: {(parseInt(product.originalPrice.replace(/\./g, '')) - 
                        parseInt(product.price.replace(/\./g, ''))).toLocaleString()}đ
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Màu sắc:</h3>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 rounded-lg border text-sm ${
                selectedColor === color
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Dung lượng:</h3>
        <div className="grid grid-cols-2 gap-2">
          {storageOptions.map((storage) => (
            <button
              key={storage}
              onClick={() => setSelectedStorage(storage)}
              className={`px-4 py-2 rounded-lg border text-sm ${
                selectedStorage === storage
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ THÊM CHẾ ĐỘ THÊM VÀO GIỎ HÀNG */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Chế độ thêm vào giỏ:</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setAddMode('combine')}
            className={`px-4 py-2 rounded-lg border text-sm ${
              addMode === 'combine'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Cộng dồn số lượng
          </button>
          <button
            onClick={() => setAddMode('separate')}
            className={`px-4 py-2 rounded-lg border text-sm ${
              addMode === 'separate'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Tạo item riêng biệt
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {addMode === 'combine' 
            ? 'Sản phẩm cùng loại sẽ được cộng dồn số lượng trong giỏ hàng' 
            : 'Mỗi lần thêm sẽ tạo một item riêng biệt trong giỏ hàng'
          }
        </p>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Số lượng:</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="text-lg font-medium min-w-[2rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons - ✅ CẬP NHẬT BUTTONS */}
      <div className="space-y-3">
        <Button
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800" // ✅ THÊM STYLE ĐẶC BIỆT
          size="lg"
          loading={isBuying} // ✅ SỬ DỤNG isBuying STATE
          disabled={isAdding || isBuying} // ✅ DISABLE KHI ĐANG PROCESS
        >
          {isBuying ? 'Đang xử lý...' : 'Mua ngay'}
        </Button>
        
        <Button
          onClick={() => handleAddToCart(false)}
          variant="outline"
          className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          size="lg"
          loading={isAdding}
          disabled={isAdding || isBuying} // ✅ DISABLE KHI ĐANG PROCESS
        >
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-9 0V9a2 2 0 012-2h6a2 2 0 012 2v4.01"/>
            </svg>
            Thêm vào giỏ hàng
          </div>
        </Button>
      </div>

      {/* Cart Status */}
      {productInCart && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center text-green-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Đã có {totalQuantityInCart} sản phẩm này trong giỏ hàng
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Miễn phí vận chuyển toàn quốc</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Bảo hành chính hãng 12 tháng</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Đổi trả trong 7 ngày</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;