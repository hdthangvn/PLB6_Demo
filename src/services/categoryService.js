import { CATEGORIES } from '../constants/mockData.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  // Get all categories
  async getCategories() {
    await delay(100);
    // TODO: Thay bằng real API call sau
    // return await fetch(`${API_BASE_URL}/categories`);
    return {
      success: true,
      data: CATEGORIES
    };
  },

  // Get category by key
  async getCategoryByKey(key) {
    await delay(50);
    const category = CATEGORIES.find(c => c.key === key);
    return {
      success: !!category,
      data: category || null
    };
  }
};