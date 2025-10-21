const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://e-commerce-raq1.onrender.com/api/v1';

export const categoryService = {
  // Get all categories
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Map API data to frontend format
      const mappedCategories = data.map(category => {
        let key = category.name.toLowerCase();
        let displayName = category.name;
        
        // Map đúng key cho URL và format tên hiển thị
        if (category.name === 'Laptop') {
          key = 'laptops';
          displayName = 'Laptop';
        } else if (category.name === 'Phone') {
          key = 'smartphones';
          displayName = 'Điện thoại';
        }
        
        return {
          key: key,
          name: displayName, // Tên hiển thị đã format
          icon: category.name === 'Laptop' ? '💻' : category.name === 'Phone' ? '📱' : '📦',
          image: category.name === 'Laptop' ? 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop'
        };
      });
      
      // Thêm các danh mục chưa có dữ liệu với format chuẩn
      const additionalCategories = [
        { key: 'audio', name: 'Âm thanh', icon: '🎧', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
        { key: 'camera', name: 'Máy ảnh', icon: '📷', image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=200&fit=crop' },
        { key: 'tv', name: 'Tivi', icon: '📺', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop' },
        { key: 'pc', name: 'PC', icon: '🖥️', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=200&h=200&fit=crop' },
        { key: 'accessories', name: 'Phụ kiện', icon: '🔌', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
        { key: 'home', name: 'Gia dụng', icon: '🏠', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' }
      ];
      
      // Kết hợp danh mục có dữ liệu và danh mục chưa có dữ liệu
      const allCategories = [...mappedCategories, ...additionalCategories];
      
      return { success: true, data: allCategories };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, data: [], error: error.message };
    }
  },

  // Get category by key
  async getCategoryByKey(key) {
    try {
      const categories = await this.getCategories();
      if (categories.success) {
        const category = categories.data.find(c => c.key === key);
        return {
          success: !!category,
          data: category || null
        };
      }
      return { success: false, data: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }
};