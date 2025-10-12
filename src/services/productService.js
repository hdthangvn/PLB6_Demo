import { FEATURED_PRODUCTS, PRODUCT_LISTS, DETAILED_PRODUCTS } from '../constants/mockData.js';

// Mock API calls - sẽ thay bằng real API sau
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  // Get hero slider products
  async getHeroProducts() {
    await delay(300);
    return {
      success: true,
      data: FEATURED_PRODUCTS
    };
  },

  // Get products by category
  async getProductsByCategory(category, limit = 10) {
    await delay(200);
    return {
      success: true,
      data: PRODUCT_LISTS[category] || []
    };
  },

  // Get featured products
  async getFeaturedProducts(limit = 5) {
    await delay(200);
    return {
      success: true,
      data: PRODUCT_LISTS.featured
    };
  },

  // ✅ CẬP NHẬT: Get product by ID với detailed info
  async getProductById(id) {
    await delay(100);
    
    // Tìm trong DETAILED_PRODUCTS trước
    const detailedProduct = DETAILED_PRODUCTS[id];
    if (detailedProduct) {
      return {
        success: true,
        data: detailedProduct
      };
    }
    
    // Fallback: tìm trong tất cả products
    const allProducts = [
      ...FEATURED_PRODUCTS,
      ...PRODUCT_LISTS.featured,
      ...PRODUCT_LISTS.laptops,
      ...PRODUCT_LISTS.smartphones,
      ...PRODUCT_LISTS.audio,
      ...PRODUCT_LISTS.camera,
      ...PRODUCT_LISTS.tv,
      ...PRODUCT_LISTS.pc,
      ...PRODUCT_LISTS.accessories,
      ...PRODUCT_LISTS.home
    ];
    
    const product = allProducts.find(p => p.id === parseInt(id));
    return {
      success: !!product,
      data: product || null
    };
  }
};