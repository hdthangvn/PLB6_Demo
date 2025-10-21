import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const ProductInfo = ({ product, variants = [], variantsLoading = false }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart, getProductQuantityInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  // ✅ Lấy colors và storage từ variants thay vì mock data
  const colors = variants.length > 0 
    ? [...new Set(variants.map(v => v.color).filter(Boolean))] 
    : []; // Không có mock data
  
  const storageOptions = variants.length > 0 
    ? [...new Set(variants.map(v => v.storage).filter(Boolean))] 
    : []; // Không có mock data

  // ✅ TÍCH HỢP VARIANTS API: Lấy giá từ variant được chọn
  const selectedVariant = variants.find(v => 
    v.color === selectedColor && v.storage === selectedStorage
  ) || variants[0] || null;
  
  const displayPrice = selectedVariant?.price || product?.price;
  const displayOriginalPrice = selectedVariant?.originalPrice || product?.originalPrice;

  // ✅ DEBUG: Log giá để kiểm tra
  console.log('🔍 DEBUG ProductInfo:', {
    productId: product?.id,
    productPrice: product?.price,
    selectedVariant: selectedVariant,
    variantPrice: selectedVariant?.price,
    displayPrice: displayPrice,
    displayOriginalPrice: displayOriginalPrice
  });

  const currentOptions = {
    color: selectedColor || null,
    storage: selectedStorage || null
  };

  const productInCart = isInCart(product?.id, currentOptions);
  const totalQuantityInCart = getProductQuantityInCart(product?.id, currentOptions);

  const handleAddToCart = async () => {
    if (!product) return;
    
    // ✅ KIỂM TRA ĐĂNG NHẬP
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigate('/auth?mode=login');
      return;
    }
    
    setIsAdding(true);
    try {
      // ✅ LUÔN DÙNG forceNew = false để cộng dồn số lượng
      const result = await addToCart(product, quantity, currentOptions, false);
      
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
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Lỗi khi thêm vào giỏ hàng: ' + error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // ✅ SỬA: handleBuyNow sử dụng forceNew = true (để tạo item riêng cho "Mua ngay")
  const handleBuyNow = async () => {
    if (!product) return;
    
    // ✅ KIỂM TRA ĐĂNG NHẬP
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để mua sản phẩm!');
      navigate('/auth?mode=login');
      return;
    }
    
    setIsBuying(true);
    try {
      // Thêm sản phẩm vào giỏ hàng trước (tạo item riêng cho "Mua ngay")
      const result = await addToCart(product, quantity, currentOptions, true);
      
      if (result.success) {
        // Show processing notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
        notification.innerHTML = `
          <div class="flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
            Đang thêm vào giỏ hàng...
          </div>
        `;
        document.body.appendChild(notification);
        
        // Navigate with state sau 1 giây
        setTimeout(() => {
          navigate('/cart', { 
            state: { fromBuyNow: true }
          });
          
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 1000);
        
        setQuantity(1);
      }
    } catch (error) {
      console.error('Error in buy now:', error);
      alert('Lỗi khi mua ngay: ' + error.message);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Title & Badge */}
      <div className="animate-in fade-in duration-700">
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900 transition-all duration-300 ease-in-out hover:text-blue-600">{product?.name}</h1>
          {product?.badge && (
            <span className={`px-2 py-1 rounded text-xs font-medium text-white transition-all duration-300 ease-in-out transform hover:scale-110 ${
              product.badge === 'Hot' ? 'bg-red-500 hover:bg-red-600' :
              product.badge === 'Mới nhất' ? 'bg-green-500 hover:bg-green-600' :
              product.badge === 'Gaming' ? 'bg-purple-500 hover:bg-purple-600' :
              'bg-blue-500 hover:bg-blue-600'
            }`}>
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-gray-600 transition-colors duration-300 ease-in-out hover:text-gray-800">{product?.subtitle}</p>
      </div>

      {/* Price */}
      <div className="space-y-1 animate-in slide-in-from-left duration-500 delay-100">
        <div className="flex items-center space-x-3">
          {displayPrice ? (
            <>
              <span className="text-3xl font-bold text-red-600 transition-all duration-300 ease-in-out hover:scale-105">
                {typeof displayPrice === 'string' ? displayPrice : displayPrice.toLocaleString()}đ
              </span>
              {displayOriginalPrice && (
                <span className="text-lg text-gray-500 line-through transition-all duration-300 ease-in-out hover:text-gray-700">
                  {typeof displayOriginalPrice === 'string' ? displayOriginalPrice : displayOriginalPrice.toLocaleString()}đ
                </span>
              )}
            </>
          ) : (
            <span className="text-3xl font-bold text-gray-500 transition-all duration-300 ease-in-out">
              Liên hệ
            </span>
          )}
        </div>
        {displayOriginalPrice && displayPrice && (
          <div className="text-sm text-green-600 transition-all duration-300 ease-in-out hover:text-green-700 hover:scale-105 transform">
            Tiết kiệm: {(parseInt(displayOriginalPrice?.replace(/\./g, '') || '0') - 
                        parseInt(displayPrice?.replace(/\./g, '') || '0')).toLocaleString()}đ
          </div>
        )}
        
        {/* ✅ TÍCH HỢP VARIANTS API: Hiển thị thông tin variant */}
        {selectedVariant && variants.length > 0 && (
          <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-xs text-blue-600 font-medium mb-1">🔧 Variant Info</div>
            <div className="text-xs text-blue-700">
              {selectedVariant.name} - {selectedVariant.color} {selectedVariant.storage}
            </div>
          </div>
        )}
        
        {/* ✅ DEBUG: Hiển thị variants loading state */}
        {variantsLoading && (
          <div className="mt-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-xs text-yellow-600 font-medium mb-1">⏳ Đang tải variants...</div>
          </div>
        )}
        
        {/* ✅ DEBUG: Hiển thị khi không có variants */}
        {!variantsLoading && variants.length === 0 && (
          <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-600 font-medium mb-1">ℹ️ Không có variants</div>
          </div>
        )}
      </div>

      {/* Color Selection - chỉ hiển thị khi có variants */}
      {colors.length > 0 && (
        <div className="animate-in slide-in-from-right duration-500 delay-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2 transition-colors duration-300 ease-in-out hover:text-blue-600">Màu sắc:</h3>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                  selectedColor === color
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage Selection - chỉ hiển thị khi có variants */}
      {storageOptions.length > 0 && (
        <div className="animate-in slide-in-from-left duration-500 delay-300">
          <h3 className="text-sm font-medium text-gray-900 mb-2 transition-colors duration-300 ease-in-out hover:text-blue-600">Dung lượng:</h3>
          <div className="grid grid-cols-2 gap-2">
            {storageOptions.map((storage) => (
              <button
                key={storage}
                onClick={() => setSelectedStorage(storage)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                  selectedStorage === storage
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                {storage}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="animate-in slide-in-from-right duration-500 delay-400">
        <h3 className="text-sm font-medium text-gray-900 mb-2 transition-colors duration-300 ease-in-out hover:text-blue-600">Số lượng:</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 hover:border-gray-400 hover:shadow-md"
          >
            -
          </button>
          <span className="text-lg font-medium min-w-[2rem] text-center transition-all duration-300 ease-in-out">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 hover:border-gray-400 hover:shadow-md"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-500">
        {!isAuthenticated ? (
          // ✅ HIỂN THỊ KHI CHƯA ĐĂNG NHẬP
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-yellow-800 font-medium">Cần đăng nhập để mua hàng</span>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng và mua hàng
              </p>
              <Button
                onClick={() => navigate('/auth?mode=login')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                size="lg"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Đăng nhập ngay
                </div>
              </Button>
            </div>
          </div>
        ) : (
          // ✅ HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP
          <>
            <Button
              onClick={handleBuyNow}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-xl"
              size="lg"
              loading={isBuying}
              disabled={isAdding || isBuying}
            >
              {isBuying ? 'Đang xử lý...' : 'Mua ngay'}
            </Button>
            
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg hover:border-blue-700"
              size="lg"
              loading={isAdding}
              disabled={isAdding || isBuying}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 ease-in-out group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-9 0V9a2 2 0 012-2h6a2 2 0 012 2v4.01"/>
                </svg>
                Thêm vào giỏ hàng
              </div>
            </Button>
          </>
        )}
      </div>

      {/* Cart Status - chỉ hiển thị khi đã đăng nhập */}
      {isAuthenticated && productInCart && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-in slide-in-from-top-2 duration-500">
          <div className="flex items-center text-green-700">
            <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-medium">Đã có {totalQuantityInCart} sản phẩm này trong giỏ hàng</span>
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2 group">
          <svg className="w-5 h-5 text-green-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="transition-colors duration-300 ease-in-out group-hover:text-gray-800">Miễn phí vận chuyển toàn quốc</span>
        </div>
        <div className="flex items-center space-x-2 group">
          <svg className="w-5 h-5 text-green-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="transition-colors duration-300 ease-in-out group-hover:text-gray-800">Bảo hành chính hãng 12 tháng</span>
        </div>
        <div className="flex items-center space-x-2 group">
          <svg className="w-5 h-5 text-green-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="transition-colors duration-300 ease-in-out group-hover:text-gray-800">Đổi trả trong 7 ngày</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;