// ✅ MAPPING ATTRIBUTE KEYS SANG TIẾNG VIỆT
export const ATTRIBUTE_LABELS = {
  // Common
  color: 'Màu sắc',
  storage: 'Dung lượng',
  
  // Smartphones & Tablets
  // (sử dụng color và storage ở trên)
  
  // Laptops & PC
  ram: 'RAM',
  cpu: 'Bộ vi xử lý',
  gpu: 'Card đồ họa',
  
  // TV
  size: 'Kích thước màn hình',
  resolution: 'Độ phân giải',
  panel: 'Loại tấm nền',
  
  // Camera
  type: 'Loại kit',
  
  // Audio
  connectivity: 'Kết nối',
  
  // Watch
  material: 'Chất liệu',
  band: 'Loại dây',
  
  // Accessories
  // (sử dụng color và type)
};

// Helper function: Get Vietnamese label for attribute key
export const getAttributeLabel = (key) => {
  return ATTRIBUTE_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
};

