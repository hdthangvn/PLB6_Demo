import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, formatPrice } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const itemPrice = parseInt(item.product.price.replace(/\./g, '')) || 0;
  const totalPrice = itemPrice * item.quantity;

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border">
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
        {item.product.image?.startsWith('http') ? (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <span className="text-2xl">{item.product.image || '📦'}</span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        
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
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
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
          className="text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;