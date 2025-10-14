const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'comments_by_product';

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const commentService = {
  async getComments(productId) {
    await delay(150);
    const store = readStore();
    const list = Array.isArray(store[productId]) ? store[productId] : [];
    // sort by createdAt asc for threads
    list.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt));
    return { success: true, data: list };
  },

  async addComment(productId, { userName = 'Khách', userId = null, content, parentId = null }) {
    await delay(150);
    if (!content || !content.trim()) {
      return { success: false, error: 'Nội dung bình luận không được để trống' };
    }
    const store = readStore();
    const list = Array.isArray(store[productId]) ? store[productId] : [];
    const comment = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
      productId: parseInt(productId, 10),
      user: { id: userId, name: userName, avatar: '🗨️' },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      parentId
    };
    store[productId] = [...list, comment];
    writeStore(store);
    return { success: true, data: comment };
  },

  async deleteComment(productId, commentId, currentUserId) {
    await delay(120);
    const store = readStore();
    const list = Array.isArray(store[productId]) ? store[productId] : [];
    const target = list.find(c => c.id === commentId);
    if (!target) return { success: false, error: 'Không tìm thấy bình luận' };
    if (!target.user || target.user.id === undefined || target.user.id === null || String(target.user.id) !== String(currentUserId)) {
      return { success: false, error: 'Bạn không có quyền xóa bình luận này' };
    }
    const remaining = list.filter(c => c.id !== commentId && c.parentId !== commentId); // xóa cả phản hồi con
    store[productId] = remaining;
    writeStore(store);
    return { success: true };
  }
};


