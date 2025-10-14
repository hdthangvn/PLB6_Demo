import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart từ localStorage khi khởi tạo
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        const normalized = Array.isArray(parsed)
          ? parsed.map(item => ({ ...item, selected: item.selected !== false }))
          : [];
        setCartItems(normalized);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Lưu cart vào localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ CẬP NHẬT FUNCTION addToCart
  const addToCart = (product, quantity = 1, options = {}, forceNew = false) => {
    setLoading(true);
    
    // Tạo unique ID cho item
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    
    // Nếu forceNew = true, luôn tạo item mới
    const itemId = forceNew 
      ? `${product.id}-${options.color || 'default'}-${options.storage || 'default'}-${timestamp}-${randomId}`
      : `${product.id}-${options.color || 'default'}-${options.storage || 'default'}`;
    
    const cartItem = {
      id: itemId,
      product,
      quantity,
      options,
      addedAt: new Date().toISOString(),
      selected: true
    };

    setCartItems(prevItems => {
      // Nếu forceNew = true, luôn thêm item mới
      if (forceNew) {
        return [...prevItems, cartItem];
      }

      // Logic cũ: tìm item tương tự và cộng dồn số lượng
      const existingItemIndex = prevItems.findIndex(item => item.id === cartItem.id);
      
      if (existingItemIndex >= 0) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Nếu sản phẩm chưa có, thêm mới
        return [...prevItems, cartItem];
      }
    });

    setLoading(false);
    return { success: true, message: `Đã thêm ${quantity} ${product.name} vào giỏ hàng` };
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Xóa tất cả sản phẩm
  const clearCart = () => {
    setCartItems([]);
  };

  // Chọn/bỏ chọn một sản phẩm
  const toggleItemSelected = (itemId) => {
    setCartItems(prevItems => prevItems.map(item => item.id === itemId ? { ...item, selected: !item.selected } : item));
  };

  const setItemSelected = (itemId, selected) => {
    setCartItems(prevItems => prevItems.map(item => item.id === itemId ? { ...item, selected } : item));
  };

  // Chọn tất cả / bỏ chọn tất cả
  const selectAll = (selected) => {
    setCartItems(prevItems => prevItems.map(item => ({ ...item, selected })));
  };

  // Xóa các item đã chọn (sau khi thanh toán)
  const removeSelectedItems = () => {
    setCartItems(prevItems => prevItems.filter(item => !item.selected));
  };

  // Tính tổng số lượng items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Tính tổng giá trị giỏ hàng
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace(/[^\d]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // Tổng theo các sản phẩm đã chọn
  const getSelectedItems = () => cartItems.filter(item => item.selected);

  const getSelectedTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.selected ? item.quantity : 0), 0);
  };

  const getSelectedTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (!item.selected) return total;
      const price = parseFloat(item.product.price.replace(/[^\d]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // Tính tổng tiết kiệm
  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.product.originalPrice) {
        const originalPrice = parseFloat(item.product.originalPrice.replace(/[^\d]/g, '')) || 0;
        const currentPrice = parseFloat(item.product.price.replace(/[^\d]/g, '')) || 0;
        return total + ((originalPrice - currentPrice) * item.quantity);
      }
      return total;
    }, 0);
  };

  const getSelectedTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      if (!item.selected) return total;
      if (item.product.originalPrice) {
        const originalPrice = parseFloat(item.product.originalPrice.replace(/[^\d]/g, '')) || 0;
        const currentPrice = parseFloat(item.product.price.replace(/[^\d]/g, '')) || 0;
        return total + ((originalPrice - currentPrice) * item.quantity);
      }
      return total;
    }, 0);
  };

  // Kiểm tra sản phẩm có trong giỏ hàng không
  const isInCart = (productId, options = {}) => {
    const itemId = `${productId}-${options.color || 'default'}-${options.storage || 'default'}`;
    return cartItems.some(item => item.id.startsWith(itemId));
  };

  // ✅ HÀM MỚI: Đếm số lượng sản phẩm cùng loại trong giỏ
  const getProductQuantityInCart = (productId, options = {}) => {
    const baseId = `${productId}-${options.color || 'default'}-${options.storage || 'default'}`;
    return cartItems
      .filter(item => item.id.startsWith(baseId))
      .reduce((total, item) => total + item.quantity, 0);
  };

  // Format số tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleItemSelected,
    setItemSelected,
    selectAll,
    removeSelectedItems,
    getTotalItems,
    getTotalPrice,
    getTotalSavings,
    getSelectedItems,
    getSelectedTotalItems,
    getSelectedTotalPrice,
    getSelectedTotalSavings,
    isInCart,
    getProductQuantityInCart, // ✅ THÊM HÀM MỚI
    formatPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};