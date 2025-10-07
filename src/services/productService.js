import { FEATURED_PRODUCTS, PRODUCT_LISTS } from '../constants/mockData.js';

// Mock API calls - sẽ thay bằng real API sau
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  // Get hero slider products
  async getHeroProducts() {
    await delay(300); // Simulate API delay
    // TODO: Thay bằng real API call sau
    // return await fetch(`${API_BASE_URL}/products/hero`);
    return {
      success: true,
      data: FEATURED_PRODUCTS
    };
  },

  // Get products by category
  async getProductsByCategory(category, limit = 10) {
    await delay(200);
    // TODO: Thay bằng real API call sau
    // return await fetch(`${API_BASE_URL}/products?category=${category}&limit=${limit}`);
    return {
      success: true,
      data: PRODUCT_LISTS[category] || []
    };
  },

  // Get featured products
  async getFeaturedProducts(limit = 5) {
    await delay(200);
    // TODO: Thay bằng real API call sau
    // return await fetch(`${API_BASE_URL}/products/featured?limit=${limit}`);
    return {
      success: true,
      data: PRODUCT_LISTS.featured
    };
  },

  // Get product by ID
  async getProductById(id) {
    await delay(100);
    // TODO: Thay bằng real API call sau
    // return await fetch(`${API_BASE_URL}/products/${id}`);
    const allProducts = [
      ...FEATURED_PRODUCTS,
      ...PRODUCT_LISTS.featured,
      ...PRODUCT_LISTS.laptops,
      ...PRODUCT_LISTS.smartphones
    ];
    const product = allProducts.find(p => p.id === parseInt(id));
    return {
      success: !!product,
      data: product || null
    };
  }
};