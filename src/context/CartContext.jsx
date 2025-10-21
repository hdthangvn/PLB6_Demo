import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

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

  // Load cart từ server khi khởi tạo (nếu đã đăng nhập) - CHỈ KHI CẦN
  useEffect(() => {
    const loadCartFromServer = async () => {
      const token = localStorage.getItem('token');
      if (!token || token.startsWith('mock-token-') || token.startsWith('session-')) {
        // Nếu không có token hoặc là mock/session token, load từ localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            const parsed = JSON.parse(savedCart);
            const normalized = Array.isArray(parsed)
              ? parsed.map(item => ({ ...item, selected: item.selected !== false }))
              : [];
            setCartItems(normalized);
          } catch (error) {
            console.error('Error loading cart from localStorage:', error);
          }
        }
        return;
      }

      // ✅ CHỈ LOAD CART KHI USER THỰC SỰ CẦN (không tự động)
      // Cart sẽ được load khi:
      // 1. User click vào cart icon
      // 2. User thêm sản phẩm vào cart
      // 3. User vào trang cart
      
      console.log('JWT token detected, cart will be loaded on demand');
    };
  }, []);


  // ✅ FUNCTION addToCart - THÊM VÀO DATABASE
  const addToCart = async (product, quantity = 1, options = {}, forceNew = false) => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // ✅ KIỂM TRA ĐĂNG NHẬP
      if (!token || token.startsWith('mock-token-') || token.startsWith('session-')) {
        throw new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      }
      
      // ✅ LẤY PRODUCT VARIANT ID
      let productVariantId = product.id;
      try {
        const variantsResponse = await fetch(`${API_BASE_URL}/product-variants/product/${product.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (variantsResponse.ok) {
          const variantsData = await variantsResponse.json();
          if (variantsData.data?.content && variantsData.data.content.length > 0) {
            productVariantId = variantsData.data.content[0].id;
          }
        }
      } catch (variantError) {
        console.warn('Could not fetch product variants:', variantError);
      }
      
      // ✅ GỬI LÊN SERVER
      const cartDTO = [{
        productVariantId: productVariantId,
        quantity: quantity,
        colorId: options.color !== 'default' ? options.color : null,
        storageId: options.storage !== 'default' ? options.storage : null
      }];
      
      console.log('🛒 Adding to cart:', cartDTO);
      const result = await cartService.addToCart(cartDTO);
      
      if (result.success) {
        // ✅ RELOAD CART TỪ SERVER
        const cartResult = await cartService.getCart();
        if (cartResult.success && cartResult.data?.cartItems) {
          const serverCartItems = cartResult.data.cartItems.map(item => ({
            id: item.id || `${item.productVariantId}-${Date.now()}`,
            product: {
              id: item.productVariant?.product?.id || item.productVariantId,
              name: item.productVariant?.product?.name || 'Unknown Product',
              price: item.productVariant?.price?.toString() || '0',
              image: item.productVariant?.image || '📦',
              originalPrice: item.productVariant?.originalPrice?.toString(),
              category: item.productVariant?.product?.category,
              store: item.productVariant?.product?.store
            },
            quantity: item.quantity || 1,
            options: {
              color: item.colorId || 'default',
              storage: item.storageId || 'default'
            },
            selected: true,
            addedAt: item.createdAt || new Date().toISOString()
          }));
          setCartItems(serverCartItems);
          localStorage.setItem('cart', JSON.stringify(serverCartItems));
        }
        return { success: true, message: `Đã thêm ${quantity} ${product.name} vào giỏ hàng` };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Helper function for localStorage fallback
  const addToCartLocal = (product, quantity = 1, options = {}, forceNew = false) => {
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
      const price = parseFloat(item.product.price?.replace(/[^\d]/g, '') || '0') || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // Tính tổng tiết kiệm
  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.product.originalPrice) {
        const originalPrice = parseFloat(item.product.originalPrice?.replace(/[^\d]/g, '') || '0') || 0;
        const currentPrice = parseFloat(item.product.price?.replace(/[^\d]/g, '') || '0') || 0;
        return total + ((originalPrice - currentPrice) * item.quantity);
      }
      return total;
    }, 0);
  };

  const getSelectedTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      if (!item.selected) return total;
      if (item.product.originalPrice) {
        const originalPrice = parseFloat(item.product.originalPrice?.replace(/[^\d]/g, '') || '0') || 0;
        const currentPrice = parseFloat(item.product.price?.replace(/[^\d]/g, '') || '0') || 0;
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