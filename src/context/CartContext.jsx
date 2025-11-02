import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import * as cartService from '../services/cartService';

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
  const [isInitialized, setIsInitialized] = useState(false);
  const lastAddRef = useRef({ id: null, timestamp: 0 }); // Track last add để chống duplicate

  // Load cart từ backend hoặc localStorage khi khởi tạo
  useEffect(() => {
    const loadCart = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // ✅ NẾU CÓ TOKEN, LOAD TỪ BACKEND
        if (token) {
          console.log('🌐 Loading cart from backend...');
          const result = await cartService.getCart();
          
          if (result.success && result.data) {
            console.log('✅ Cart loaded from backend:', result.data);
            // TODO: Transform backend data to frontend format
            // Tạm thời load từ localStorage
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
              const parsed = JSON.parse(savedCart);
              const normalized = Array.isArray(parsed)
                ? parsed.map(item => ({ 
                    ...item, 
                    selected: item.selected !== false,
                    addedAt: item.addedAt || new Date().toISOString(),
                    options: item.options || {}
                  }))
                : [];
              setCartItems(normalized);
            } else {
              setCartItems([]);
            }
          } else {
            console.error('❌ Failed to load cart from backend:', result.error);
            // Fallback to localStorage
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
              const parsed = JSON.parse(savedCart);
              const normalized = Array.isArray(parsed)
                ? parsed.map(item => ({ 
                    ...item, 
                    selected: item.selected !== false,
                    addedAt: item.addedAt || new Date().toISOString(),
                    options: item.options || {}
                  }))
                : [];
              setCartItems(normalized);
            } else {
              setCartItems([]);
            }
          }
        } else {
          // ✅ GUEST USER: LOAD TỪ LOCALSTORAGE
          console.log('⚠️ No token, loading cart from localStorage (guest mode)');
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            const parsed = JSON.parse(savedCart);
            const normalized = Array.isArray(parsed)
              ? parsed.map(item => ({ 
                  ...item, 
                  selected: item.selected !== false,
                  addedAt: item.addedAt || new Date().toISOString(),
                  options: item.options || {}
                }))
              : [];
            setCartItems(normalized);
            console.log('Cart loaded successfully from localStorage:', normalized);
          } else {
            console.log('No cart found in localStorage, starting with empty cart');
            setCartItems([]);
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
        // Clear corrupted data
        localStorage.removeItem('cart');
      } finally {
        setIsInitialized(true);
      }
    };

    loadCart();
  }, []);

  // ✅ Theo dõi logout event và xóa giỏ hàng khi logout
  useEffect(() => {
    const handleLogout = () => {
      console.log('🔓 User logged out, clearing cart...');
      setCartItems([]);
      localStorage.removeItem('cart'); // ✅ XÓA CART KHỎI LOCALSTORAGE
    };

    // Listen for logout event
    window.addEventListener('userLogout', handleLogout);

    // Listen for storage changes (khi token bị xóa từ tab khác)
    const handleStorageChange = (e) => {
      if (e.key === 'token' && e.oldValue && !e.newValue) {
        // Token đã bị xóa từ tab khác
        console.log('🔓 Token removed from storage, clearing cart...');
        setCartItems([]);
        localStorage.removeItem('cart'); // ✅ XÓA CART KHỎI LOCALSTORAGE
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('userLogout', handleLogout);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Lưu cart vào localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    // Chỉ lưu sau khi đã initialized để tránh ghi đè dữ liệu khi load
    if (!isInitialized) return;
    
    // Không lưu nếu không có token (guest không nên lưu cart lâu dài)
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log('Cart saved to localStorage:', cartItems);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems, isInitialized]);

  // ✅ HELPER: Generate unique ID từ TẤT CẢ options (dynamic)
  const generateCartItemId = (productId, options = {}) => {
    // Sort keys để đảm bảo consistent order
    const optionsString = Object.entries(options)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    
    return optionsString ? `${productId}-${optionsString}` : `${productId}-no-options`;
  };

  // ✅ SỬA LẠI - DYNAMIC CHO TẤT CẢ LOẠI SẢN PHẨM + GỌI API BACKEND
  const addToCart = useCallback(async (product, quantity = 1, options = {}) => {
    const baseId = generateCartItemId(product.id, options);
    const now = Date.now();
    
    console.log('🔵 addToCart called', { 
      product: product?.name, 
      productData: product,
      quantity, 
      baseId,
      lastAddId: lastAddRef.current.id,
      timeDiff: now - lastAddRef.current.timestamp
    });
    
    // ✅ CHỐNG DUPLICATE: Nếu cùng sản phẩm được add trong vòng 300ms, bỏ qua
    if (lastAddRef.current.id === baseId && (now - lastAddRef.current.timestamp) < 300) {
      console.log('⛔ DUPLICATE DETECTED! Preventing double addToCart call');
      return { success: true, message: `Đã thêm ${quantity} ${product.name} vào giỏ hàng` };
    }
    
    // Update timestamp NGAY để block duplicate calls
    lastAddRef.current = { id: baseId, timestamp: now };
    console.log('✅ Updated lastAddRef:', lastAddRef.current);
    
    setLoading(true);
    
    try {
      // ✅ GỌI API BACKEND
      const token = localStorage.getItem('token');
      if (token) {
        console.log('🌐 Calling backend API to add to cart...');
        const result = await cartService.addToCart({
          productVariantId: product.id,
          quantity: quantity
        });
        
        if (result.success) {
          console.log('✅ Backend API success:', result.data);
        } else {
          console.error('❌ Backend API failed:', result.error);
          // Vẫn tiếp tục lưu localStorage nếu API lỗi
        }
      } else {
        console.log('⚠️ No token found, skipping backend API (guest mode)');
      }
    } catch (apiError) {
      console.error('❌ Error calling backend API:', apiError);
      // Vẫn tiếp tục lưu localStorage nếu API lỗi
    }
    
    // ✅ CẬP NHẬT LOCALSTORAGE (fallback cho guest users)
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === baseId);
      
      if (existingItemIndex >= 0) {
        // Cộng dồn số lượng
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        console.log(`📦 Updated existing item: ${baseId}, new quantity: ${updatedItems[existingItemIndex].quantity}`);
        return updatedItems;
      } else {
        // Thêm mới
        const cartItem = {
          id: baseId,
          product,
          quantity,
          options,
          addedAt: new Date().toISOString(),
          selected: true
        };
        console.log(`🆕 Added new item: ${baseId}, quantity: ${quantity}`);
        return [...prevItems, cartItem];
      }
    });

    setLoading(false);

    return { success: true, message: `Đã thêm ${quantity} ${product.name} vào giỏ hàng` };
  }, []);

  // Cập nhật số lượng sản phẩm
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    // ✅ TÌM ITEM ĐỂ LẤY productVariantId
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;

    // ✅ GỌI API BACKEND
    const token = localStorage.getItem('token');
    if (token) {
      try {
        console.log('🌐 Calling backend API to update cart item...');
        const result = await cartService.updateCartItem(item.product.id, {
          quantity: newQuantity,
          colorId: item.options?.color || null
        });
        
        if (result.success) {
          console.log('✅ Backend API success:', result.data);
        } else {
          console.error('❌ Backend API failed:', result.error);
        }
      } catch (apiError) {
        console.error('❌ Error calling backend API:', apiError);
      }
    }

    // ✅ CẬP NHẬT LOCALSTORAGE
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (itemId) => {
    // ✅ TÌM ITEM ĐỂ LẤY productVariantId
    const item = cartItems.find(i => i.id === itemId);
    
    // ✅ GỌI API BACKEND
    const token = localStorage.getItem('token');
    if (token && item) {
      try {
        console.log('🌐 Calling backend API to remove cart item...');
        const result = await cartService.removeFromCart(item.product.id, item.options?.color || null);
        
        if (result.success) {
          console.log('✅ Backend API success:', result.data);
        } else {
          console.error('❌ Backend API failed:', result.error);
        }
      } catch (apiError) {
        console.error('❌ Error calling backend API:', apiError);
      }
    }

    // ✅ CẬP NHẬT LOCALSTORAGE
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Xóa tất cả sản phẩm
  const clearCart = async () => {
    // ✅ GỌI API BACKEND
    const token = localStorage.getItem('token');
    if (token) {
      try {
        console.log('🌐 Calling backend API to clear cart...');
        const result = await cartService.clearCart();
        
        if (result.success) {
          console.log('✅ Backend API success:', result.data);
        } else {
          console.error('❌ Backend API failed:', result.error);
        }
      } catch (apiError) {
        console.error('❌ Error calling backend API:', apiError);
      }
    }

    // ✅ CẬP NHẬT LOCALSTORAGE
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
      const price = typeof item.product.price === 'string' 
        ? parseFloat(item.product.price.replace(/[^\d]/g, '')) || 0
        : parseFloat(item.product.price) || 0;
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
      const price = typeof item.product.price === 'string' 
        ? parseFloat(item.product.price.replace(/[^\d]/g, '')) || 0
        : parseFloat(item.product.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // Tính tổng tiết kiệm
  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.product.originalPrice) {
        const originalPrice = typeof item.product.originalPrice === 'string'
          ? parseFloat(item.product.originalPrice.replace(/[^\d]/g, '')) || 0
          : parseFloat(item.product.originalPrice) || 0;
        const currentPrice = typeof item.product.price === 'string'
          ? parseFloat(item.product.price.replace(/[^\d]/g, '')) || 0
          : parseFloat(item.product.price) || 0;
        return total + ((originalPrice - currentPrice) * item.quantity);
      }
      return total;
    }, 0);
  };

  const getSelectedTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      if (!item.selected) return total;
      if (item.product.originalPrice) {
        const originalPrice = typeof item.product.originalPrice === 'string'
          ? parseFloat(item.product.originalPrice.replace(/[^\d]/g, '')) || 0
          : parseFloat(item.product.originalPrice) || 0;
        const currentPrice = typeof item.product.price === 'string'
          ? parseFloat(item.product.price.replace(/[^\d]/g, '')) || 0
          : parseFloat(item.product.price) || 0;
        return total + ((originalPrice - currentPrice) * item.quantity);
      }
      return total;
    }, 0);
  };

  // ✅ Kiểm tra sản phẩm có trong giỏ hàng không - DYNAMIC
  const isInCart = (productId, options = {}) => {
    const baseId = generateCartItemId(productId, options);
    return cartItems.some(item => item.id === baseId);
  };

  // ✅ Lấy số lượng sản phẩm trong giỏ hàng - DYNAMIC
  const getProductQuantityInCart = (productId, options = {}) => {
    const baseId = generateCartItemId(productId, options);
    const item = cartItems.find(item => item.id === baseId);
    return item ? item.quantity : 0;
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