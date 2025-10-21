import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart, getProductQuantityInCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
      return;
    }

    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
      return;
    }

    try {
      await addToCart(product, 1);
      navigate('/checkout');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const quantityInCart = getProductQuantityInCart(product.id);
  const isProductInCart = isInCart(product.id);

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleProductClick}
    >
      {/* Status Badge */}
      {product.status && (
        <div className="text-center mb-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            product.status === 'APPROVED' 
              ? 'bg-green-100 text-green-800' 
              : product.status === 'OUT_OF_STOCK'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {product.status === 'APPROVED' ? 'Đang bán' : 
             product.status === 'OUT_OF_STOCK' ? 'Đã hết hàng' : 'Đã ẩn'}
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        )}
      </div>

      {/* Product Name */}
      <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
        {product.name || 'Sản phẩm'}
      </h3>

      {/* Product Description */}
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {product.description || 'Mô tả sản phẩm'}
      </p>

      {/* Price */}
      <div className="mb-3">
        {product.price && typeof product.price === 'string' ? (
          <span className="text-sm font-bold text-red-600">
            {parseInt(product.price.replace(/\./g, '')).toLocaleString()} ₫
          </span>
        ) : (
          <span className="text-sm font-bold text-gray-500">
            Liên hệ
          </span>
        )}
      </div>

      {/* Quantity */}
      <div className="text-xs text-gray-500 mb-4">
        Số lượng: {product.quantity || 0}
      </div>

      {/* CHỈ CÓ 1 BUTTON THÊM VÀO GIỎ */}
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Ngăn navigate khi bấm button
          handleAddToCart(e);
        }}
        className={`w-full text-sm py-2 rounded-lg transition-colors ${
          isProductInCart 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isProductInCart ? (
          <span className="flex items-center justify-center">
            <span className="mr-1">✓</span>
            Đã thêm vào giỏ {quantityInCart > 0 && `(${quantityInCart})`}
          </span>
        ) : (
          'Thêm vào giỏ'
        )}
      </Button>
    </div>
  );
};

export default ProductCard;
