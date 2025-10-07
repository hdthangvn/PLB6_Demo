const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Import mock data
import { PRODUCT_LISTS } from '../constants/mockData.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const searchService = {
  // Search products by query
  async searchProducts(query, filters = {}) {
    await delay(300); // Simulate API delay
    
    // TODO: Thay bằng real API call
    // const response = await fetch(`${API_BASE_URL}/search?q=${query}&category=${filters.category}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&sortBy=${filters.sortBy}`);
    
    // Mock implementation
    const allProducts = [
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

    let results = allProducts;

    // Filter by search query
    if (query) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.badge?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      results = results.filter(product => product.category === filters.category);
    }

    // Filter by price range
    if (filters.minPrice) {
      results = results.filter(product => {
        const price = parseInt(product.price.replace(/\./g, ''));
        const minPrice = parseInt(filters.minPrice);
        return price >= minPrice;
      });
    }

    if (filters.maxPrice) {
      results = results.filter(product => {
        const price = parseInt(product.price.replace(/\./g, ''));
        const maxPrice = parseInt(filters.maxPrice);
        return price <= maxPrice;
      });
    }

    // Sort results
    if (filters.sortBy) {
      results.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return parseInt(a.price.replace(/\./g, '')) - parseInt(b.price.replace(/\./g, ''));
          case 'price-desc':
            return parseInt(b.price.replace(/\./g, '')) - parseInt(a.price.replace(/\./g, ''));
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }

    return {
      success: true,
      data: {
        products: results,
        total: results.length,
        query: query,
        filters: filters
      }
    };
  },

  // Get search suggestions
  async getSearchSuggestions(query) {
    await delay(100);
    
    // TODO: Replace with real API
    // const response = await fetch(`${API_BASE_URL}/search/suggestions?q=${query}`);
    
    const allProducts = [
      ...PRODUCT_LISTS.featured,
      ...PRODUCT_LISTS.laptops,
      ...PRODUCT_LISTS.smartphones,
      ...PRODUCT_LISTS.audio
    ];

    const suggestions = allProducts
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map(product => product.name);

    return {
      success: true,
      data: suggestions
    };
  }
};