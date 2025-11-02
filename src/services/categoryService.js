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
      // Chỉ dùng danh mục thực tế từ CSDL, không tự thêm
      // Chuẩn hóa key theo slug của tên để khớp URL frontend
      const slugify = (str) =>
        String(str || '')
          .normalize('NFKD')
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .toLowerCase();

      const mappedCategories = (Array.isArray(data) ? data : data?.data || []).map(category => {
        const rawName = category?.name || '';
        const key = slugify(rawName); // ví dụ: 'Phone' -> 'phone', 'Laptop' -> 'laptop'
        // Icon đơn giản theo nhóm chính; KHÔNG gán image (mock sẽ lo phần ảnh)
        const icon = /laptop/i.test(rawName) ? '💻' : /phone|điện thoại/i.test(rawName) ? '📱' : '📦';
        return {
          key,
          name: rawName,
          icon,
          image: undefined
        };
      });

      return { success: true, data: mappedCategories };
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