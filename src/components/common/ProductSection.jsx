import { useCart } from '../../context/CartContext';

const ProductSection = ({ 
  title = "Sản phẩm nổi bật",
  showViewAll = true,
  products = [],
  loading = false,
  columns = "lg:grid-cols-5",
  onProductClick,
  onViewAllClick,
  backgroundColor = "bg-gray-50"
}) => {
  const { addToCart } = useCart();

  // ✅ CẬP NHẬT FUNCTION handleAddToCart
  const handleAddToCart = async (e, product) => {
    e.stopPropagation(); // Ngăn event bubble lên parent
    
    // Luôn tạo item riêng biệt khi thêm từ product grid
    const result = addToCart(product, 1, { color: 'default', storage: 'default' }, true);
    
    if (result.success) {
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      notification.textContent = `✓ Đã thêm ${product.name} vào giỏ hàng`;
      document.body.appendChild(notification);
      
      // Auto remove notification after 2 seconds
      setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }, 2000);
    }
  };

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header với title và button "Xem tất cả" */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {title}
          </h2>
          {showViewAll && (
            <button 
              onClick={onViewAllClick}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Xem tất cả →
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600">Đang tải sản phẩm...</p>
          </div>
        ) : (
          /* Grid sản phẩm */
          <div className={`grid grid-cols-2 sm:grid-cols-3 ${columns} gap-4`}>
            {products.map((product, index) => (
              <div 
                key={product.id || index} 
                onClick={() => onProductClick?.(product)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                {/* Ảnh sản phẩm */}
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-colors">
                    {product.image?.startsWith('http') ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">{product.image}</span>
                    )}
                  </div>
                  {/* Badge (Hot, Giảm giá, v.v.) */}
                  {product.badge && (
                    <span className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                      product.badge === 'Hot' ? 'bg-red-500' :
                      product.badge === 'Mới nhất' ? 'bg-green-500' :
                      product.badge === 'Gaming' ? 'bg-purple-500' :
                      product.badge === 'Bestseller' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                
                {/* Thông tin sản phẩm */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 mb-2 text-xs line-clamp-2 h-8 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Giá sản phẩm */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-bold text-red-600">
                      {product.price}đ
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        {product.originalPrice}đ
                      </span>
                    )}
                  </div>
                  
                  {/* Button thêm vào giỏ */}
                  <div className="mt-2">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-700 transition-colors text-xs font-medium"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;